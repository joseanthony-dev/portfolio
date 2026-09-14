import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { contenus } from './contenu'
import { AUTRE, CHEMINS, LANGUES, LOCALES, urlAbsolue } from './langues'
import type { Langue } from './types'

export type Page = {
  langue: Langue
  /** Chemin du fichier à écrire sous dist/, sans le nom index.html. */
  chemin: string
  url: string
  urlAutre: string
  locale: string
  localeAutre: string
  titre: string
  description: string
  descriptionPartage: string
  html: string
}

// Appelé une fois au build, dans Node. Chaque langue donne une page complète :
// son balisage et tout ce qu'il faut pour en écrire les métadonnées.
export function pages(): Page[] {
  return LANGUES.map((langue) => ({
    langue,
    chemin: CHEMINS[langue],
    url: urlAbsolue(langue),
    urlAutre: urlAbsolue(AUTRE[langue]),
    locale: LOCALES[langue],
    localeAutre: LOCALES[AUTRE[langue]],
    ...contenus[langue].meta,
    html: renderToString(
      <StrictMode>
        <App langue={langue} />
      </StrictMode>,
    ),
  }))
}
