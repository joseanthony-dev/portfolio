// Écrit les pages statiques du site à partir du gabarit produit par Vite.
//
// Chaque langue donne une page complète — dist/index.html en français,
// dist/en/index.html en anglais — rendue au build plutôt qu'au chargement : le
// texte est présent dès la première réponse, lisible sans JavaScript, indexable,
// et affiché avant que le bundle ne soit chargé.
//
// Chaque page porte ses propres métadonnées et déclare l'autre en hreflang, ce
// qui permet aux moteurs d'indexer les deux versions séparément. Le sitemap les
// reprend toutes les deux.
//
// Tourne après `vite build` (qui produit le gabarit dist/index.html) et après le
// build SSR (qui produit dist-ssr/entree-serveur.js).

import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

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

// Les liens hreflang sont les mêmes sur toutes les pages : chacune déclare
// toutes les versions, elle-même comprise. x-default désigne celle que sert un
// moteur quand aucune langue ne correspond — le français, version canonique.
const alternatives = [
  ...liste.map((p) => `<link rel="alternate" hreflang="${p.langue}" href="${p.url}" />`),
  `<link rel="alternate" hreflang="x-default" href="${liste[0].url}" />`,
].join('\n    ')

for (const p of liste) {
  if (p.html.length < 2000) {
    throw new Error(
      `Rendu ${p.langue} anormalement court (${p.html.length} octets) : la page serait ` +
        'publiée vide ou amputée. Construction interrompue.',
    )
  }

  const meta = `${DEBUT}
    <title>${ech(p.titre)}</title>
    <meta name="description" content="${ech(p.description)}" />
    <link rel="canonical" href="${p.url}" />
    ${alternatives}
    <meta property="og:title" content="${ech(p.titre)}" />
    <meta property="og:description" content="${ech(p.descriptionPartage)}" />
    <meta property="og:url" content="${p.url}" />
    <meta property="og:image:alt" content="${ech(p.titre)}" />
    <meta property="og:locale" content="${p.locale}" />
    <meta property="og:locale:alternate" content="${p.localeAutre}" />
    ${FIN}`

  let html = gabarit
  const bloc = html.slice(html.indexOf(DEBUT), html.indexOf(FIN) + FIN.length)
  html = remplacer(html, bloc, meta, 'métadonnées de langue')
  html = remplacer(html, '<html lang="fr"', `<html lang="${p.langue}"`, 'langue du document')
  html = remplacer(html, RACINE, `<div id="root">${p.html}</div>`, "point d'insertion")

  const cible = `dist/${p.chemin}index.html`
  mkdirSync(dirname(cible), { recursive: true })
  writeFileSync(cible, html)
  console.log(`✓ ${cible} — ${p.langue}, ${(p.html.length / 1024).toFixed(1)} ko de balisage`)
}

const jour = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${liste
  .map(
    (p) => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${jour}</lastmod>
    ${alternatives.replace(/<link /g, '<xhtml:link ')}
  </url>`,
  )
  .join('\n')}
</urlset>
`
writeFileSync('dist/sitemap.xml', sitemap)
console.log('✓ dist/sitemap.xml')

rmSync('dist-ssr', { recursive: true, force: true })
