import type { Langue } from './types'

// Chaque langue a son URL. C'est ce qui permet aux moteurs d'indexer les deux
// versions séparément et de les déclarer l'une à l'autre en hreflang — ce qu'une
// langue portée par un état React, sur une seule adresse, ne permet pas.

// Adresse publique du site, racine comprise. Seul endroit où elle est écrite :
// les URL canoniques, og:url, hreflang et le sitemap en découlent.
export const SITE = 'https://joseanthony-dev.github.io/portfolio/'

// Chemin de chaque langue sous la racine du site. Le français est à la racine.
export const CHEMINS: Record<Langue, string> = { fr: '', en: 'en/' }

export const AUTRE: Record<Langue, Langue> = { fr: 'en', en: 'fr' }

export const LOCALES: Record<Langue, string> = { fr: 'fr_FR', en: 'en_US' }

export const LANGUES = ['fr', 'en'] as const

// Segment d'URL des pages de cas, traduit : /projets/<id>/ et /projects/<id>/.
export const SEGMENTS: Record<Langue, string> = { fr: 'projets', en: 'projects' }

/** URL absolue d'une version, pour les métadonnées et le sitemap. */
export const urlAbsolue = (l: Langue) => `${SITE}${CHEMINS[l]}`

/** Lien interne vers une version, servi depuis la base configurée dans Vite. */
export const lienLangue = (l: Langue) => `${import.meta.env.BASE_URL}${CHEMINS[l]}`

/** Chemin d'une page de cas sous la racine du site, barre oblique finale comprise. */
export const cheminProjet = (l: Langue, id: string) => `${CHEMINS[l]}${SEGMENTS[l]}/${id}/`

export const urlProjet = (l: Langue, id: string) => `${SITE}${cheminProjet(l, id)}`

export const lienProjet = (l: Langue, id: string) =>
  `${import.meta.env.BASE_URL}${cheminProjet(l, id)}`
