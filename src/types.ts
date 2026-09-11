export type Langue = 'fr' | 'en'

export type Lien = {
  label: string
  url: string
  type: 'github' | 'demo' | 'telechargement' | 'site' | 'linkedin' | 'email'
}

export type Projet = {
  id: string
  titre: string
  resume: string
  contexte: string
  points: string[]
  technos: string[]
  periode: string
  statut: 'en-cours' | 'livre'
  vedette: boolean
  liens: Lien[]
}

export type Poste = {
  titre: string
  organisation: string
  lieu: string
  periode: string
  details: string[]
}

export type Formation = {
  diplome: string
  etablissement: string
  lieu: string
  periode: string
  details: string[]
}

export type GroupeCompetences = {
  categorie: string
  items: string[]
}

export type Contenu = {
  meta: { titre: string; description: string }
  nav: { projets: string; parcours: string; competences: string; contact: string }
  hero: {
    salutation: string
    nom: string
    titre: string
    accroche: string
    recherche: string
    ctaProjets: string
    ctaContact: string
    ctaCv: string
  }
  apropos: { titre: string; paragraphes: string[] }
  projets: {
    titre: string
    sousTitre: string
    voirTout: string
    statuts: { 'en-cours': string; livre: string }
    liste: Projet[]
  }
  parcours: {
    titre: string
    experienceTitre: string
    formationTitre: string
    experiences: Poste[]
    formations: Formation[]
  }
  competences: { titre: string; sousTitre: string; groupes: GroupeCompetences[] }
  contact: {
    titre: string
    accroche: string
    email: string
    telephone?: string
    localisation: string
    liens: Lien[]
    copie: string
    copie_ok: string
  }
  pied: { droits: string; construitAvec: string }
  a11y: { changerLangue: string; changerTheme: string; menu: string }
}
