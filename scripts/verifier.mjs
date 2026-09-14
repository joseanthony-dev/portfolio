// Contrôle ce que le build a réellement produit, plutôt que le fait qu'il se soit
// terminé. Un lien interne cassé, une page sans noindex ou un hreflang qui ne se
// référence pas franchiraient sans bruit tsc, le lint et le pré-rendu.
//
// Tourne en fin de `npm run build`, donc aussi bien en local qu'en CI, et fait
// échouer la chaîne avant qu'une page fautive ne soit publiée.

import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { gzipSync } from 'node:zlib'

const DIST = 'dist'

// Poids d'une première visite, en octets : le HTML de l'accueil, la feuille de
// style, le script client — comptés compressés, comme ils transitent — plus le
// portrait, déjà compressé par son format. Le README annonce un chiffre ; sans
// cette borne, rien ne l'empêcherait de devenir faux en silence.
const BUDGET = 34 * 1024

/** @type {string[]} */
const erreurs = []

/**
 * @param {string} page Chemin de la page fautive, relatif à dist/.
 * @param {string} message
 */
const faute = (page, message) => erreurs.push(`${page} : ${message}`)

/**
 * Échappe une chaîne destinée à une expression régulière.
 * @param {string} v
 * @returns {string}
 */
const echRe = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Parcours maison plutôt que fs.glob, qui demanderait Node 22 : le script doit
// tourner sur la même version que le reste du projet, sans imposer davantage.
/**
 * @param {string} dossier
 * @returns {string[]} Chemins des index.html trouvés, dossier compris.
 */
function pagesDe(dossier) {
  return readdirSync(dossier, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? pagesDe(join(dossier, e.name))
      : e.name === 'index.html'
        ? [join(dossier, e.name)]
        : [],
  )
}

// La page d'erreur subit les mêmes contrôles que les autres, à deux exceptions
// près : elle ne désigne aucune ressource, donc ni canonique ni hreflang.
const pages = [...pagesDe(DIST), join(DIST, '404.html')].sort()

if (pages.length === 0) throw new Error(`Aucune page trouvée dans ${DIST}/.`)

// La base est lue sur le build plutôt qu'écrite ici : elle ne vit que dans
// vite.config.ts, et ce script vérifie ce qui a réellement été produit. Écrite
// en dur, elle rendait ce vérificateur muet le jour où on déploie ailleurs —
// plus aucun lien ne correspondait au motif, et tout passait sans contrôle.
const BASE = (readFileSync(join(DIST, 'index.html'), 'utf8').match(
  /<script[^>]+\ssrc="([^"]*\/)assets\//,
) ?? [])[1]

if (!BASE) {
  throw new Error(
    "Base introuvable dans dist/index.html : aucun <script src=\"…/assets/…\"> à y lire. " +
      'Vite a changé la forme de ce qu\'il émet, et ce script ne sait plus quoi vérifier.',
  )
}

const motifInterne = new RegExp(`(?:href|src)="(${echRe(BASE)}[^"]*)"`, 'g')
let internesVus = 0

const connues = new Set(pages.map((f) => BASE + relative(DIST, f).replace(/index\.html$/, '')))

for (const fichier of pages) {
  const page = relative(DIST, fichier)
  const erreur404 = page === '404.html'
  const html = readFileSync(fichier, 'utf8')
  /** @param {RegExp} motif @returns {string | undefined} */
  const attr = (motif) => (html.match(motif) ?? [])[1]

  // Le site se partage par lien et n'a pas vocation à être indexé.
  if (!/name="robots" content="noindex/.test(html)) faute(page, 'pas de noindex')

  // Une page qui n'annonce pas sa langue n'est pas lisible correctement.
  const lang = attr(/<html lang="([^"]+)"/)
  const attendue = page.startsWith('en/') ? 'en' : 'fr'
  if (lang !== attendue) faute(page, `lang="${lang}" au lieu de "${attendue}"`)

  // Un seul titre de premier niveau par page.
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length
  if (h1 !== 1) faute(page, `${h1} <h1> au lieu d'un seul`)

  // Le pré-rendu a-t-il bien inséré du contenu ?
  const corps = html.split('<div id="root">')[1] ?? ''
  const texte = corps.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const minimum = erreur404 ? 80 : 500
  if (texte.length < minimum) faute(page, `seulement ${texte.length} caractères de texte`)

  if (!erreur404) {
    // Le canonique doit désigner la page elle-même.
    const canonique = attr(new RegExp(`rel="canonical" href="[^"]*?(${echRe(BASE)}[^"]*)"`))
    const propre = BASE + relative(DIST, fichier).replace(/index\.html$/, '')
    if (canonique !== propre) faute(page, `canonique ${canonique} au lieu de ${propre}`)

    // Un ensemble hreflang dont un membre ne se référence pas est ignoré en bloc.
    const alternatives = [
      ...html.matchAll(new RegExp(`hreflang="([\\w-]+)" href="[^"]*?(${echRe(BASE)}[^"]*)"`, 'g')),
    ]
    if (!alternatives.some(([, code, url]) => code === lang && url === propre)) {
      faute(page, 'hreflang ne se référence pas elle-même')
    }
    if (!alternatives.some(([, code]) => code === 'x-default')) faute(page, 'pas de hreflang x-default')
  }

  // Une empreinte de CSP obsolète ne se voit pas à la lecture : le navigateur
  // refuse simplement d'exécuter le script, et le thème cesse de fonctionner sans
  // le moindre message. On recalcule donc ce que la politique devrait contenir.
  const csp = attr(/http-equiv="Content-Security-Policy" content="([^"]+)"/)
  if (!csp) {
    faute(page, 'pas de politique de sécurité')
  } else {
    const declarees = new Set(csp.match(/'sha256-[A-Za-z0-9+/=]+'/g) ?? [])
    const reelles = [...html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(
      ([, corps]) => `'sha256-${createHash('sha256').update(corps).digest('base64')}'`,
    )
    for (const e of reelles) {
      if (!declarees.has(e)) faute(page, `script inline non couvert par la CSP (${e})`)
    }
    if (declarees.size !== reelles.length) {
      faute(page, `${declarees.size} empreinte(s) déclarée(s) pour ${reelles.length} script(s) inline`)
    }
    for (const d of ["default-src 'self'", "object-src 'none'", "base-uri 'none'"]) {
      if (!csp.includes(d)) faute(page, `CSP sans ${d}`)
    }
    if (csp.includes("'unsafe-inline'") || csp.includes("'unsafe-eval'")) {
      faute(page, 'CSP relâchée par unsafe-inline ou unsafe-eval')
    }
  }

  // Tout lien ou ressource interne doit aboutir sur un fichier réellement produit.
  for (const [, cible] of html.matchAll(motifInterne)) {
    internesVus += 1
    const chemin = cible.split('#')[0].split('?')[0]
    if (!chemin || connues.has(chemin)) continue
    const sur = join(DIST, chemin.slice(BASE.length))
    const existe = existsSync(sur) && statSync(sur).isFile()
    if (!existe && !existsSync(join(sur, 'index.html'))) faute(page, `lien mort ${cible}`)
  }

  // Les ancres visées sur la page elle-même doivent exister.
  for (const [, ancre] of html.matchAll(/href="#([\w-]+)"/g)) {
    if (!html.includes(`id="${ancre}"`)) faute(page, `ancre #${ancre} sans cible`)
  }
}

// Un vérificateur qui ne trouve plus rien à vérifier se tait exactement comme un
// site sans défaut. Chaque page porte au minimum son favicon, sa feuille de style
// et son script : en dessous d'un lien interne par page, c'est le contrôle qui est
// cassé, pas le site qui est parfait.
if (internesVus < pages.length) {
  erreurs.push(
    `contrôle des liens : ${internesVus} lien(s) interne(s) examiné(s) pour ${pages.length} ` +
      `page(s), avec la base « ${BASE} ». Le motif ne reconnaît plus ce que le build produit.`,
  )
}

// Poids d'une première visite sur l'accueil. Le HTML, la CSS et le JS voyagent
// compressés ; le WebP, non — il l'est déjà.
{
  /** @param {string} f @returns {number} */
  const gz = (f) => gzipSync(readFileSync(f)).length
  const assets = join(DIST, 'assets')
  /** @param {string} ext @returns {string[]} */
  const parExt = (ext) =>
    readdirSync(assets)
      .filter((f) => f.endsWith(ext))
      .map((f) => join(assets, f))

  /** @type {[string, number][]} */
  const poids = [
    ['index.html', gz(join(DIST, 'index.html'))],
    .../** @type {[string, number][]} */ (parExt('.css').map((f) => [relative(DIST, f), gz(f)])),
    .../** @type {[string, number][]} */ (parExt('.js').map((f) => [relative(DIST, f), gz(f)])),
    ['photo.webp', statSync(join(DIST, 'photo.webp')).size],
  ]
  const total = poids.reduce((n, [, o]) => n + o, 0)

  if (total > BUDGET) {
    erreurs.push(
      `poids : une première visite pèse ${(total / 1024).toFixed(1)} ko pour un budget de ` +
        `${(BUDGET / 1024).toFixed(0)} ko — ` +
        poids.map(([n, o]) => `${n} ${(o / 1024).toFixed(1)} ko`).join(', '),
    )
  } else {
    console.log(
      `✓ première visite : ${(total / 1024).toFixed(1)} ko sur ${(BUDGET / 1024).toFixed(0)} ko ` +
        `(${poids.map(([n, o]) => `${n.replace(/^assets\//, '')} ${(o / 1024).toFixed(1)}`).join(' + ')})`,
    )
  }
}

if (erreurs.length > 0) {
  console.error(`\n✗ ${erreurs.length} problème(s) dans les pages produites :\n`)
  for (const e of erreurs) console.error('   ' + e)
  console.error('')
  process.exit(1)
}

console.log(
  `✓ ${pages.length} pages vérifiées (${internesVus} liens internes) — liens, ancres, langue, ` +
    `canoniques, hreflang, noindex, CSP`,
)
