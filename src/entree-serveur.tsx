import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { contenus } from './contenu'
import { AUTRE, CHEMINS, LANGUES, LOCALES, cheminProjet, urlAbsolue, urlProjet } from './langues'
import type { Langue } from './types'

export type Page = {
  langue: Langue
  langueAutre: Langue
  /** Identifiant du projet, pour les pages de cas ; absent sur l'accueil. */
  projet?: string
  /** Chemin du dossier à écrire sous dist/, barre oblique finale comprise. */
  chemin: string
  url: string
  /** La même page dans l'autre langue, pour hreflang. */
  urlAutre: string
  locale: string
  localeAutre: string
  titre: string
  description: string
  descriptionPartage: string
  html: string
}

const rendre = (langue: Langue, projet?: string) =>
  renderToString(
    <StrictMode>
      <App langue={langue} projet={projet} />
    </StrictMode>,
  )

// Appelé une fois au build. Chaque langue donne l'accueil et une page par projet,
// chacune avec son balisage et tout ce qu'il faut pour en écrire les métadonnées.
export function pages(): Page[] {
  return LANGUES.flatMap((langue) => {
    const t = contenus[langue]
    const autre = AUTRE[langue]

    const accueil: Page = {
      langue,
      langueAutre: autre,
      chemin: CHEMINS[langue],
      url: urlAbsolue(langue),
      urlAutre: urlAbsolue(autre),
      locale: LOCALES[langue],
      localeAutre: LOCALES[autre],
      ...t.meta,
      html: rendre(langue),
    }

    const cas: Page[] = t.projets.liste.map((projet) => ({
      langue,
      langueAutre: autre,
      projet: projet.id,
      chemin: cheminProjet(langue, projet.id),
      url: urlProjet(langue, projet.id),
      urlAutre: urlProjet(autre, projet.id),
      locale: LOCALES[langue],
      localeAutre: LOCALES[autre],
      titre: `${projet.titre} — ${t.hero.nom}`,
      // Le résumé du projet fait une description de page : une phrase, écrite
      // pour être lue seule.
      description: projet.resume,
      descriptionPartage: projet.resume,
      html: rendre(langue, projet.id),
    }))

    return [accueil, ...cas]
  })
}
