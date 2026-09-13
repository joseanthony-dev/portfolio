import type { Contenu } from '../types'

// ─────────────────────────────────────────────────────────────────────────────
//  CONTENU FRANÇAIS — c'est ICI que tu modifies le texte du site.
//  Ce qui est marqué « À COMPLÉTER » attend encore tes informations.
// ─────────────────────────────────────────────────────────────────────────────

export const fr: Contenu = {
  meta: {
    titre: 'Anthony Jose — Systèmes, réseaux & sécurité',
    description:
      "Étudiant en Master Informatique à Lyon, parcours SRS, en recherche d'alternance pour la rentrée 2027. Administration système et réseau, supervision, automatisation, cybersécurité.",
  },

  nav: {
    projets: 'Projets',
    parcours: 'Parcours',
    competences: 'Compétences',
    contact: 'Contact',
  },

  hero: {
    salutation: 'Bonjour, je suis',
    nom: 'Anthony Jose',
    titre: 'Systèmes, réseaux & sécurité',
    accroche:
      "Je viens de l'exploitation : une année d'alternance en informatique de production à l'Assurance Maladie, à traiter les incidents d'une chaîne de remboursement et à superviser serveurs et traitements sous Centreon. Linux, automatisation, fiabilité — et le développement en prolongement, pour construire les outils qui manquent.",
    recherche:
      'En recherche d’une alternance pour mon Master 2 — rentrée 2027, entre Lyon et Saint-Étienne, ou en télétravail.',
    ctaProjets: 'Voir mes projets',
    ctaContact: 'Me contacter',
    ctaCv: 'Télécharger mon CV',
  },

  apropos: {
    titre: 'À propos',
    paragraphes: [
      "Étudiant en Master Informatique à l'Université Claude Bernard Lyon 1, je me dirige vers le parcours SRS — Systèmes, Réseaux et Sécurité. C'est la suite logique de mon BTS CIEL option Informatique et Réseaux : administration système et réseau, cybersécurité, et une année d'alternance passée en informatique de production.",
      "Ce qui m'intéresse, c'est que ça tourne. À l'Assurance Maladie, j'ai traité les incidents de la chaîne de remboursement, surveillé serveurs et traitements sous Centreon, et automatisé la purge des anciennes versions applicatives qui saturaient l'espace disque. Linux au quotidien, et de l'automatisation partout où elle remplace un geste manuel répété.",
      "Le développement est venu en prolongement, et je continue : une application de bureau en production chez une entreprise de location de photobooths, des applis mobiles, du C++, et une maison entière automatisée sous Home Assistant à force de curiosité. Savoir construire l'outil qui manque, c'est ce qui rend l'administration système vraiment intéressante. Je cherche une alternance pour mon Master 2, entre Lyon et Saint-Étienne.",
    ],
  },

  projets: {
    titre: 'Projets',
    sousTitre: 'Des applications réelles, conçues et développées de bout en bout.',
    voirTout: 'Voir le code',
    statuts: { 'en-cours': 'En cours', livre: 'En production' },
    liste: [
      {
        id: 'photomaton-locations',
        titre: 'Photomaton Locations',
        resume:
          "Application de bureau de gestion des locations de photobooth, utilisée en production par Le Petit Flash.",
        contexte:
          "Une entreprise de location de photomatons gérait ses réservations dans des fichiers dispersés. J'ai conçu une application de bureau qui centralise clients, matériel, contrats et planning, et qui se synchronise avec leur ERP Odoo.",
        points: [
          'Application Electron multiplateforme distribuée en paquet .deb, versionnée et publiée en continu (v1.31).',
          "Import et synchronisation bidirectionnelle des clients depuis Odoo, avec gestion des contraintes de champs de l'ERP.",
          'Base de données locale : les données restent chez le client, aucune dépendance à un serveur tiers.',
          'Suite de tests Vitest avec rapport de couverture, ESLint et Prettier intégrés au flux de travail.',
        ],
        technos: ['Electron', 'React', 'TypeScript', 'Vite', 'Vitest', 'Odoo XML-RPC', 'Node.js'],
        periode: '2025 — aujourd’hui',
        statut: 'livre',
        vedette: true,
        // Dépôt privé pour l'instant. Pour afficher le lien une fois rendu public :
        // liens: [{ label: 'Code source', url: 'https://github.com/joseanthony-dev/photomaton-locations', type: 'github' }],
        liens: [],
      },
      {
        id: 'mes-cours',
        titre: 'Mes cours',
        resume:
          "Application web hors-ligne qui rassemble emploi du temps, notes, devoirs et supports de cours d'un semestre de Master.",
        contexte:
          "Entre le calendrier ADE, les PDF de cours et les échéances de rendu, l'information était éparpillée. J'ai construit une PWA qui agrège tout et fonctionne sans connexion.",
        points: [
          "Import du calendrier universitaire ADE au format iCalendar et affichage d'un emploi du temps consolidé.",
          'Lecture des supports PDF directement dans le navigateur via PDF.js, sans téléchargement préalable.',
          'Progressive Web App : service worker généré au build, application installable et consultable hors connexion.',
          'Tests unitaires Vitest et tests de bout en bout Playwright, dont un contrôle d’accessibilité automatisé (axe-core).',
        ],
        technos: ['React', 'Vite', 'PDF.js', 'Service Worker', 'Playwright', 'Vitest'],
        periode: '2025',
        statut: 'livre',
        vedette: true,
        liens: [],
      },
      {
        id: 'suivi-forme',
        titre: 'Suivi Forme',
        resume:
          'Application mobile de suivi de poids et d’habitudes, pensée « local-first » : aucune donnée ne quitte le téléphone.',
        contexte:
          "Les applications de suivi du marché demandent un compte et exploitent les données de santé. J'ai voulu l'inverse : tout est stocké localement, l'export reste à la main de l'utilisateur.",
        points: [
          'Stockage local via AsyncStorage, sans compte ni serveur.',
          'Graphiques de progression dessinés en SVG natif (react-native-svg), sans bibliothèque de charting lourde.',
          'Photos de suivi, import/export de sauvegardes et notifications de rappel.',
          'Suite de tests Jest avec jest-expo, build de distribution via EAS.',
        ],
        technos: ['React Native', 'Expo', 'AsyncStorage', 'react-native-svg', 'Jest', 'EAS Build'],
        periode: '2025',
        statut: 'en-cours',
        vedette: true,
        liens: [],
      },
      {
        id: 'tapis-vert',
        titre: 'Tapis Vert',
        resume:
          "Application mobile d'analyse de sessions de roulette : suivi des mises, statistiques et visualisation des résultats.",
        contexte:
          'Un projet personnel pour explorer la modélisation probabiliste et la restitution de statistiques en temps réel sur mobile.',
        points: [
          'Calcul et affichage en direct des statistiques de session (répartition, écarts, bilan).',
          'Interface dessinée en SVG pour représenter le tapis et l’historique des tirages.',
          'Architecture testée avec Jest, état applicatif isolé de la couche d’affichage.',
        ],
        technos: ['React Native', 'Expo', 'react-native-svg', 'Jest'],
        periode: '2025',
        statut: 'en-cours',
        vedette: false,
        liens: [],
      },
    ],
  },

  parcours: {
    titre: 'Parcours',
    experienceTitre: 'Expérience',
    formationTitre: 'Formation',
    experiences: [
      {
        titre: 'Développeur — application de gestion sur mesure',
        organisation: 'Le Petit Flash (entreprise familiale)',
        lieu: 'Montagny (69)',
        periode: '2025 — aujourd’hui',
        details: [
          'Projet mené seul de bout en bout : recueil du besoin auprès des utilisateurs, conception, développement, mise en production et maintenance.',
          "Conception et développement de l'application de bureau qui gère aujourd'hui l'ensemble des locations de l'entreprise.",
          "Intégration avec l'ERP Odoo de l'entreprise (synchronisation des clients et du catalogue).",
          'Application en service depuis la première version, avec des mises à jour régulières (v1.31).',
        ],
      },
      {
        titre: 'Stage puis alternance — informatique de production',
        organisation: 'Assurance Maladie — CTI de Saint-Étienne',
        lieu: 'Saint-Étienne (42)',
        periode: '2024 — 2025',
        details: [
          "Stage de 6 semaines en 2024, prolongé par une année d'alternance (2024 — 2025) au Centre de Traitement Informatique de l'Assurance Maladie.",
          "Traitement des incidents de la chaîne de remboursement, au cœur d'un système d'information de grande échelle.",
          'Interventions sur le superviseur Centreon : surveillance des serveurs et des traitements de production.',
          "Automatisation de la purge des anciennes versions applicatives : à chaque montée de version, les livraisons précédentes restaient sur les serveurs et saturaient l'espace disque — la purge libère la place sans intervention manuelle.",
        ],
      },
      {
        titre: 'Responsable — management terrain',
        organisation: 'Alliance Healthcare',
        lieu: 'Montagny (69)',
        periode: 'Depuis 2022',
        details: [
          'Poste de responsable tenu chaque samedi depuis 2022, en parallèle des études.',
          "Encadrement d'une équipe de 15 personnes : organisation du travail, répartition des tâches et suivi sur le terrain.",
        ],
      },
    ],
    formations: [
      {
        diplome: 'Master Informatique',
        etablissement: 'Université Claude Bernard Lyon 1',
        lieu: 'Lyon',
        periode: '2026 — 2028',
        details: [
          'Actuellement en M1 (tronc commun) ; spécialisation en M2 : parcours SRS — Systèmes, Réseaux et Sécurité.',
          'Enseignements suivis : conception d’applications, traitement du signal, bases de données, architecture logicielle.',
        ],
      },
      {
        diplome: 'Licence Informatique',
        etablissement: 'Université Claude Bernard Lyon 1',
        lieu: 'Lyon',
        periode: '2025 — 2026',
        details: [
          'Admission directe en 3ᵉ année à l’issue du BTS.',
          'Algorithmique, programmation orientée objet, bases de données, systèmes et réseaux.',
          'À COMPLÉTER — mention obtenue et projet de fin de licence, si tu veux les afficher.',
        ],
      },
      {
        diplome: 'BTS CIEL — option A, Informatique et Réseaux',
        etablissement: 'Lycée Georges Brassens',
        lieu: 'Rive-de-Gier (42)',
        periode: '2023 — 2025',
        details: [
          'Administration de réseaux et de systèmes, développement logiciel, cybersécurité et bases de données.',
          "2ᵉ année effectuée en alternance à l'Assurance Maladie, au CTI de Saint-Étienne.",
          'Socle réseaux et sécurité que je prolonge aujourd’hui avec la spécialisation SRS du Master.',
        ],
      },
    ],
  },

  competences: {
    titre: 'Compétences',
    sousTitre: 'Les outils que j’utilise réellement, en production comme sur mes projets.',
    groupes: [
      {
        categorie: 'Systèmes & réseaux',
        items: ['Linux', 'Administration système & réseau', 'Supervision (Centreon)', 'Cybersécurité', 'Home Assistant', 'Automatisation'],
      },
      { categorie: 'Langages', items: ['TypeScript', 'JavaScript', 'C++', 'Java', 'Python', 'SQL', 'HTML / CSS'] },
      {
        categorie: 'Front-end',
        items: ['React', 'Vite', 'React Native / Expo', 'Flutter / Firebase', 'PWA & Service Workers', 'SVG', 'Accessibilité (WCAG)'],
      },
      {
        categorie: 'Back-end & données',
        items: ['Node.js', 'API REST', 'Odoo / XML-RPC', 'SQLite', 'Tomcat / Jakarta EE'],
      },
      {
        categorie: 'Desktop & distribution',
        items: ['Electron', 'electron-builder', 'Paquets .deb', 'EAS Build'],
      },
      {
        categorie: 'Qualité & outillage',
        items: ['Vitest', 'Jest', 'Playwright', 'ESLint', 'Prettier', 'Git', 'CI/CD'],
      },
      {
        categorie: 'Langues',
        items: ['Français — langue maternelle', 'Anglais — B2, courant professionnel'],
      },
    ],
  },

  contact: {
    titre: 'Me contacter',
    accroche:
      "Une opportunité d'alternance, une question sur un projet, ou simplement l'envie d'échanger ? J'essaie de répondre sous 48 h.",
    email: 'anthony.jose@outlook.fr',
    telephone: '06 42 16 24 15',
    localisation: 'Montagny (69) — mobile entre Lyon et Saint-Étienne, ouvert au télétravail',
    liens: [
      { label: 'GitHub', url: 'https://github.com/joseanthony-dev', type: 'github' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/joseanthony-zacharias', type: 'linkedin' },
    ],
    copie: 'Copier l’adresse',
    copie_ok: 'Adresse copiée',
  },

  pied: {
    droits: 'Anthony Jose',
    construitAvec: 'Conçu et développé avec React, TypeScript et Vite.',
  },

  a11y: {
    changerLangue: 'Passer le site en anglais',
    changerTheme: 'Changer de thème (clair / sombre)',
    menu: 'Menu de navigation',
  },
}
