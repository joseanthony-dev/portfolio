import type { Contenu } from '../types'

// ─────────────────────────────────────────────────────────────────────────────
//  CONTENU FRANÇAIS — c'est ICI que tu modifies le texte du site.
//  Ce qui est marqué « À COMPLÉTER » attend encore tes informations.
// ─────────────────────────────────────────────────────────────────────────────

export const fr: Contenu = {
  meta: {
    titre: 'Anthony Jose — Développeur logiciel',
    description:
      "Étudiant en Master Informatique à Lyon, en recherche d'alternance pour la rentrée 2027. Applications web, desktop et mobile : React, TypeScript, Electron, React Native.",
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
    titre: 'Développeur logiciel — web, desktop & mobile',
    accroche:
      "Je conçois et je livre des applications complètes, de la première maquette au déploiement chez l'utilisateur. React et TypeScript au quotidien, Electron pour le desktop, React Native pour le mobile.",
    recherche:
      'En recherche d’une alternance pour mon Master 2 — rentrée 2027, région lyonnaise ou télétravail.',
    ctaProjets: 'Voir mes projets',
    ctaContact: 'Me contacter',
    ctaCv: 'Télécharger mon CV',
  },

  apropos: {
    titre: 'À propos',
    paragraphes: [
      "Étudiant en Master Informatique à l'Université Claude Bernard Lyon 1, je passe le plus clair de mon temps libre à construire des logiciels qui servent vraiment à quelqu'un : un outil de gestion utilisé quotidiennement par une entreprise de photobooth, une application qui me suit dans mes cours, des applis mobiles pensées pour un usage réel.",
      "Ce qui m'intéresse, c'est le produit fini : une interface claire, des données qui ne se perdent pas, une application qui s'installe et qui tourne. Je travaille en TypeScript strict, je teste ce que j'écris (Vitest, Jest, Playwright) et je documente pour que le code reste lisible six mois plus tard.",
      'À COMPLÉTER — ajoute ici une ou deux phrases plus personnelles : ce qui t’a amené au développement, ce que tu vises après le Master, tes centres d’intérêt.',
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
        titre: 'À COMPLÉTER — autre expérience (stage, alternance, job, association)',
        organisation: 'À COMPLÉTER',
        lieu: 'À COMPLÉTER',
        periode: 'À COMPLÉTER',
        details: ['À COMPLÉTER — 2 à 3 puces concrètes : ce que tu as fait, avec quoi, quel résultat.'],
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
        diplome: 'BTS CIEL — Cybersécurité, Informatique et réseaux, Électronique',
        etablissement: 'Lycée Georges Brassens',
        lieu: 'Rive-de-Gier (42)',
        periode: 'À COMPLÉTER — ex. 2023 — 2025',
        details: [
          'À COMPLÉTER — option suivie : Informatique et Réseaux (IR) ou Électronique et Réseaux (ER).',
          'Socle réseaux, systèmes et sécurité que je prolonge aujourd’hui avec la spécialisation SRS du Master.',
        ],
      },
    ],
  },

  competences: {
    titre: 'Compétences',
    sousTitre: 'Les outils que j’utilise réellement sur mes projets.',
    groupes: [
      { categorie: 'Langages', items: ['TypeScript', 'JavaScript', 'Java', 'Python', 'SQL', 'HTML / CSS'] },
      {
        categorie: 'Front-end',
        items: ['React', 'Vite', 'React Native / Expo', 'PWA & Service Workers', 'SVG', 'Accessibilité (WCAG)'],
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
    localisation: 'Montagny (69) — région lyonnaise, mobile et ouvert au télétravail',
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
