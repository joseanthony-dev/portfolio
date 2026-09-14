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
  statut: 'en-cours' | 'livre' | 'non-distribue'
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

export type Certification = {
  intitule: string
  organisme: string
  periode: string
  details: string[]
}

export type GroupeCompetences = {
  categorie: string
  items: string[]
}

export type Contenu = {
  // `description` sert la balise meta ; `descriptionPartage`, plus courte,
  // sert les aperçus de liens, où le texte est tronqué plus tôt.
  meta: { titre: string; description: string; descriptionPartage: string }
  nav: { projets: string; parcours: string; competences: string; contact: string }
  hero: {
    salutation: string
    nom: string
    titre: string
    accroche: string
    recherche: string
    photoAlt: string
    ctaProjets: string
    ctaContact: string
    ctaCv: string
  }
  apropos: { titre: string; paragraphes: string[] }
  projets: {
    titre: string
    sousTitre: string
    technosLabel: string
    statuts: { 'en-cours': string; livre: string; 'non-distribue': string }
    liste: Projet[]
  }
  parcours: {
    titre: string
    experienceTitre: string
    formationTitre: string
    certificationsTitre: string
    experiences: Poste[]
    formations: Formation[]
    certifications: Certification[]
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
  a11y: {
    changerLangue: string
    changerTheme: string
    menu: string
    ouvrirMenu: string
    fermerMenu: string
    allerAuContenu: string
  }
}
