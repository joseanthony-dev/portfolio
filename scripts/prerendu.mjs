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

import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'

import { pages } from '../dist-ssr/entree-serveur.js'

const GABARIT = 'dist/index.html'
const RACINE = '<div id="root"></div>'
const DEBUT = '<!-- métadonnées de langue -->'
const FIN = '<!-- fin métadonnées de langue -->'

/** Échappe une valeur destinée à un attribut HTML ou au contenu de <title>. */
const ech = (v) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Remplace un fragment unique, ou échoue. Une substitution silencieusement
 * ignorée publierait une page aux métadonnées fausses — mieux vaut ne rien
 * construire du tout.
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

// Chaque page déclare toutes ses versions, elle-même comprise — Google ignore un
// ensemble hreflang dont un membre ne se référence pas. x-default désigne celle
// que sert un moteur quand aucune langue ne correspond : le français, version
// canonique, de cette page-ci et non de l'accueil.
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
    <meta property="og:image:alt" content="${ech(p.titre)}" />
    <meta property="og:locale" content="${p.locale}" />
    <meta property="og:locale:alternate" content="${p.localeAutre}" />
    ${FIN}`

  // La page à rendre est écrite sur <html>, d'où entree-client.tsx la relit : le
  // premier rendu client part donc du même arbre que le HTML reçu, sans avoir à
  // interpréter l'URL de son côté.
  const racine = `<html lang="${p.langue}"${p.projet ? ` data-projet="${p.projet}"` : ''}`

  let html = gabarit
  const bloc = html.slice(html.indexOf(DEBUT), html.indexOf(FIN) + FIN.length)
  html = remplacer(html, bloc, meta, 'métadonnées de langue')
  html = remplacer(html, '<html lang="fr"', racine, 'langue du document')
  html = remplacer(html, RACINE, `<div id="root">${p.html}</div>`, "point d'insertion")

  const cible = `dist/${p.chemin}index.html`
  mkdirSync(`dist/${p.chemin}`, { recursive: true })
  writeFileSync(cible, html)
}

console.log(`✓ ${liste.length} pages pré-rendues`)

rmSync('dist-ssr', { recursive: true, force: true })
