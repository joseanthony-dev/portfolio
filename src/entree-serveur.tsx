import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { Page404 } from './composants/Page404'
import { contenus } from './contenu'
import { AUTRE, CHEMINS, IMAGE_PARTAGE, LANGUES, LOCALES, cheminProjet, urlAbsolue, urlProjet } from './langues'
import type { Langue, Page } from './types'

const rendre = (langue: Langue, projet?: string) =>
  renderToString(
    <StrictMode>
      <App langue={langue} projet={projet} />
    </StrictMode>,
  )

// Appelé une fois au build. Chaque langue donne l'accueil et une page par projet,
// chacune avec son balisage et tout ce qu'il faut pour en écrire les métadonnées.
/**
 * Page d'erreur, unique pour tout le site : GitHub Pages sert un seul fichier
 * 404 quelle que soit l'adresse demandée. Elle n'a ni canonique ni hreflang —
 * elle ne désigne aucune ressource — mais garde le reste du gabarit.
 */
export function page404(): string {
  return renderToString(
    <StrictMode>
      <Page404 />
    </StrictMode>,
  )
}

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
      imagePartage: IMAGE_PARTAGE,
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
      // Site-wide aujourd'hui, mais porté par la page : le jour où un projet
      // mérite son propre aperçu, il n'y a qu'ici à changer.
      imagePartage: IMAGE_PARTAGE,
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
