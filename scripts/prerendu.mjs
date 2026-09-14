// Écrit les pages statiques du site à partir du gabarit produit par Vite.
//
// Chaque langue donne l'accueil et une page de cas par projet — dist/index.html,
// dist/projets/<id>/index.html, et leurs équivalents sous dist/en/. Toutes sont
// rendues au build plutôt qu'au chargement : leur texte est présent dès la
// première réponse, lisible sans JavaScript, indexable, et affiché avant que le
// bundle ne soit chargé.
//
// Chaque page porte ses propres métadonnées et déclare en hreflang la même page
// dans l'autre langue — un cas renvoie au même cas, pas à l'accueil. Ces balises
// sont inertes tant que le site porte noindex (voir index.html), et restent en
// place pour le jour où il cesserait de le porter.
//
// Tourne après `vite build` (qui produit le gabarit dist/index.html) et après le
// build SSR (qui produit dist-ssr/entree-serveur.js).

import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'

/** @typedef {import('../src/types.ts').Page} Page */

// Spécifiant sorti dans une constante à dessein : dist-ssr/ n'existe qu'après le
// build SSR, donc après `tsc`, et TypeScript ne peut pas le résoudre au moment où
// il vérifie ce fichier. L'annotation ci-dessous redit le contrat attendu ; `Page`
// vient du type partagé, donc une dérive côté rendu se voit ici.
const CHEMIN_SSR = '../dist-ssr/entree-serveur.js'

/** @type {{ page404: () => string; pages: () => Page[] }} */
const { page404, pages } = await import(CHEMIN_SSR)

const GABARIT = 'dist/index.html'
const RACINE = '<div id="root"></div>'
const CSP = '<!-- politique de sécurité -->'
const DEBUT = '<!-- métadonnées de langue -->'
const FIN = '<!-- fin métadonnées de langue -->'

/**
 * Échappe une valeur destinée à un attribut HTML ou au contenu de <title>.
 * @param {string} v
 * @returns {string}
 */
const ech = (v) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Remplace un fragment unique, ou échoue. Une substitution silencieusement
 * ignorée publierait une page aux métadonnées fausses — mieux vaut ne rien
 * construire du tout.
 *
 * @param {string} source
 * @param {string} ancien
 * @param {string} nouveau
 * @param {string} quoi Ce qu'on remplaçait, pour que l'erreur soit lisible.
 * @returns {string}
 */
function remplacer(source, ancien, nouveau, quoi) {
  const n = source.split(ancien).length - 1
  if (n !== 1) {
    throw new Error(
      `${quoi} : ${n} occurrence(s) de « ${ancien.slice(0, 60)} » dans ${GABARIT}, 1 attendue. ` +
        'Le gabarit a changé sans que ce script suive.',
    )
  }
  return source.replace(ancien, nouveau)
}

const gabarit = readFileSync(GABARIT, 'utf8')
const liste = pages()

/**
 * Le site ne charge rien d'extérieur : la politique peut donc être aussi fermée
 * que possible. Les deux scripts inline — le thème et les données structurées —
 * sont autorisés par empreinte plutôt que par 'unsafe-inline', ce qui n'ouvre la
 * porte qu'à ces contenus-là, à l'octet près.
 *
 * Les empreintes sont calculées sur le HTML produit, jamais écrites à la main :
 * un script modifié sans que la politique suive casserait le site en silence.
 *
 * `frame-ancestors` et `report-uri` sont absents à dessein : une politique posée
 * par balise les ignore, et GitHub Pages ne permet pas d'en-tête HTTP.
 *
 * @param {string} html HTML définitif de la page, scripts inline compris.
 * @returns {string} La balise <meta> à insérer.
 */
function politique(html) {
  const empreintes = [...html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)]
    .map(([, corps]) => `'sha256-${createHash('sha256').update(corps).digest('base64')}'`)
    .join(' ')

  const regles = [
    "default-src 'self'",
    `script-src 'self' ${empreintes}`,
    "style-src 'self'",
    "img-src 'self'",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
  ].join('; ')

  return `<meta http-equiv="Content-Security-Policy" content="${regles}" />`
}

// Chaque page déclare toutes ses versions, elle-même comprise — Google ignore un
// ensemble hreflang dont un membre ne se référence pas. x-default désigne celle
// que sert un moteur quand aucune langue ne correspond : le français, version
// canonique, de cette page-ci et non de l'accueil.
/** @param {Page} p */
const alternatives = (p) =>
  [
    [p.langue, p.url],
    [p.langueAutre, p.urlAutre],
    ['x-default', p.langue === 'fr' ? p.url : p.urlAutre],
  ]
    .map(([code, url]) => `<link rel="alternate" hreflang="${code}" href="${url}" />`)
    .join('\n    ')

for (const p of liste) {
  if (p.html.length < 2000) {
    throw new Error(
      `Rendu ${p.chemin || 'racine'} anormalement court (${p.html.length} octets) : la page ` +
        'serait publiée vide ou amputée. Construction interrompue.',
    )
  }

  const meta = `${DEBUT}
    <title>${ech(p.titre)}</title>
    <meta name="description" content="${ech(p.description)}" />
    <link rel="canonical" href="${p.url}" />
    ${alternatives(p)}
    <meta property="og:title" content="${ech(p.titre)}" />
    <meta property="og:description" content="${ech(p.descriptionPartage)}" />
    <meta property="og:url" content="${p.url}" />
    <meta property="og:image" content="${p.imagePartage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${ech(p.titre)}" />
    <meta property="og:locale" content="${p.locale}" />
    <meta property="og:locale:alternate" content="${p.localeAutre}" />
    ${FIN}`

  // Il n'y a pas de routeur : le choix de la page est fait ici, au build, et le
  // navigateur ne reçoit que le HTML de celle-ci. Seule la langue a besoin d'être
  // portée par le document, pour les lecteurs d'écran et la césure.
  const racine = `<html lang="${p.langue}"`

  let html = gabarit
  const bloc = html.slice(html.indexOf(DEBUT), html.indexOf(FIN) + FIN.length)
  html = remplacer(html, bloc, meta, 'métadonnées de langue')
  html = remplacer(html, '<html lang="fr"', racine, 'langue du document')
  html = remplacer(html, RACINE, `<div id="root">${p.html}</div>`, "point d'insertion")
  // Calculée en dernier, sur le HTML définitif de cette page.
  html = remplacer(html, CSP, politique(html), 'politique de sécurité')

  const cible = `dist/${p.chemin}index.html`
  mkdirSync(`dist/${p.chemin}`, { recursive: true })
  writeFileSync(cible, html)
}

// GitHub Pages sert ce fichier pour toute adresse absente sous /portfolio/.
// Sans lui, un lien mort renvoie la page d'erreur générique de GitHub, sans
// rapport visuel avec le site ni moyen d'en revenir.
{
  const corps = page404()
  const bloc = gabarit.slice(gabarit.indexOf(DEBUT), gabarit.indexOf(FIN) + FIN.length)
  let html = gabarit
  html = remplacer(
    html,
    bloc,
    `${DEBUT}\n    <title>404 — ${liste[0].titre}</title>\n` +
      `    <meta property="og:image" content="${liste[0].imagePartage}" />\n    ${FIN}`,
    'métadonnées de la 404',
  )
  html = remplacer(html, RACINE, `<div id="root">${corps}</div>`, "point d'insertion de la 404")
  html = remplacer(html, CSP, politique(html), 'politique de sécurité de la 404')
  writeFileSync('dist/404.html', html)
}

console.log(`✓ ${liste.length} pages pré-rendues, plus la page d'erreur`)

rmSync('dist-ssr', { recursive: true, force: true })
