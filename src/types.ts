export type Langue = 'fr' | 'en'

export type Lien = {
  label: string
  url: string
  type: 'github' | 'demo' | 'telechargement' | 'site' | 'linkedin' | 'email'
}

/** Une section rédigée d'une page de cas : un titre, un ou plusieurs paragraphes. */
export type SectionCas = { titre: string; paragraphes: string[] }

/**
 * Le fond d'une page de cas : ce qu'une carte ne peut pas porter — les
 * contraintes, les arbitrages, les résultats. Entièrement facultatif. Un projet
 * sans `cas` a quand même sa page, bâtie sur son contexte et ses réalisations ;
 * ces sections-là viennent s'y ajouter quand elles sont écrites.
 */
export type Cas = {
  /** Phrase d'attaque, affichée sous le titre. */
  chapo?: string
  sections: SectionCas[]
  /** Résultats chiffrés, mis en avant en tête de page. */
  chiffres?: { valeur: string; libelle: string }[]
  /** Fichiers déposés dans public/, référencés par leur nom seul. */
  images?: { fichier: string; alt: string; legende?: string }[]
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
  cas?: Cas
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
    /**
     * Le CV proposé au téléchargement. `langue` est celle du document, pas celle
     * de la page : tant qu'une version anglaise n'existe pas, la page anglaise
     * sert le CV français et doit le dire plutôt que de le laisser découvrir à
     * l'ouverture du fichier.
     */
    cv: { fichier: string; langue: Langue }
  }
  apropos: { titre: string; paragraphes: string[] }
  projets: {
    titre: string
    sousTitre: string
    technosLabel: string
    /** Libellés de la page de cas. */
    cas: {
      lire: string
      retour: string
      contexte: string
      realisations: string
      chiffres: string
    }
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
    copieOk: string
  }
  /**
   * Les seuls champs traduisibles de la fiche schema.org — le nom, l'adresse et
   * les comptes n'ont pas de version par langue. Voir donnees-structurees.ts.
   */
  schema: { jobTitle: string; knowsAbout: string[] }
  /** Page servie pour une adresse qui ne mène nulle part. */
  erreur: { titre: string; message: string; retour: string }
  pied: { droits: string; construitAvec: string }
  a11y: {
    changerLangue: string
    themeSombre: string
    themeClair: string
    menu: string
    ouvrirMenu: string
    fermerMenu: string
    allerAuContenu: string
  }
}

/**
 * Une page à écrire sous `dist/`, telle que le rendu la remet au pré-rendu.
 *
 * Ce type vit ici, et non dans `entree-serveur.tsx`, parce que `scripts/` doit
 * pouvoir le lire : les scripts sont en résolution `nodenext` là où `src/` est en
 * résolution `bundler`, et ce fichier — sans le moindre import — est le seul que
 * les deux projets savent charger. C'est le contrat entre les deux étapes du
 * build, et il est vérifié des deux côtés.
 */
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
  /** Image d'aperçu du partage, absolue : aucune plateforme ne résout un chemin. */
  imagePartage: string
  /** Fiche schema.org sérialisée, prête à être écrite telle quelle dans le <head>. */
  donneesStructurees: string
  html: string
}
