// Insère dans dist/index.html le HTML rendu au build, pour que le texte du site
// soit présent dès la première réponse : lisible sans JavaScript, indexable, et
// affiché avant que le bundle ne soit chargé.
//
// Tourne après `vite build` (qui produit dist/index.html) et après le build SSR
// (qui produit dist-ssr/entree-serveur.js).

import { readFileSync, rmSync, writeFileSync } from 'node:fs'

import { rendu } from '../dist-ssr/entree-serveur.js'

const CIBLE = 'dist/index.html'
const MARQUEUR = '<div id="root"></div>'

const html = readFileSync(CIBLE, 'utf8')

if (!html.includes(MARQUEUR)) {
  throw new Error(
    `Point d'insertion introuvable dans ${CIBLE} : « ${MARQUEUR} » attendu. ` +
      "Si index.html a changé, mettre à jour MARQUEUR — sans quoi le site serait " +
      'publié sans son contenu pré-rendu.',
  )
}

writeFileSync(CIBLE, html.replace(MARQUEUR, `<div id="root">${rendu()}</div>`))
rmSync('dist-ssr', { recursive: true, force: true })

console.log(`✓ ${CIBLE} pré-rendu`)
