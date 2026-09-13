import type { Contenu } from '../types'

// ─────────────────────────────────────────────────────────────────────────────
//  CONTENU FRANÇAIS — tout le texte affiché en français est dans ce fichier.
//  Sa structure est imposée par src/types.ts et doit rester identique à en.ts.
// ─────────────────────────────────────────────────────────────────────────────

export const fr: Contenu = {
  meta: {
    titre: 'Anthony Jose — Systèmes, réseaux & sécurité',
    description:
      "Étudiant en Master Informatique à Lyon, parcours SRS, en recherche d'alternance pour la rentrée 2027. Administration système et réseau, supervision, automatisation, cybersécurité — et le développement des outils qui vont avec.",
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
    titre: 'Systèmes, réseaux & sécurité — et du développement',
    accroche:
      "Je viens de l'exploitation : une année d'alternance en informatique de production à l'Assurance Maladie, à traiter les incidents d'une chaîne de remboursement et à superviser serveurs et traitements sous Centreon. Linux, automatisation, fiabilité — et le développement en prolongement, pour construire les outils qui manquent.",
    recherche:
      'En recherche d’une alternance pour mon Master 2 — rentrée 2027, entre Lyon et Saint-Étienne, ou en télétravail.',
    photoAlt: 'Portrait d’Anthony Jose',
    ctaProjets: 'Voir mes projets',
    ctaContact: 'Me contacter',
    ctaCv: 'Télécharger mon CV',
  },

  apropos: {
    titre: 'À propos',
    paragraphes: [
      "Étudiant en Master Informatique à l'Université Claude Bernard Lyon 1, je me dirige vers le parcours SRS — Systèmes, Réseaux et Sécurité. C'est la suite logique de mon BTS CIEL option Informatique et Réseaux : administration système et réseau, cybersécurité, et une année d'alternance passée en informatique de production.",
      "Ce qui m'intéresse, c'est que ça tourne. À l'Assurance Maladie, j'ai traité les incidents de la chaîne de remboursement, surveillé serveurs et traitements sous Centreon, et automatisé la purge des anciennes versions applicatives qui saturaient l'espace disque. Linux au quotidien, et de l'automatisation partout où elle remplace un geste manuel répété.",
      "Le développement est venu en prolongement, et je continue : une application de bureau en production dans mon entreprise de location de photobooths, des applis mobiles, du C++, et une maison entière automatisée sous Home Assistant à force de curiosité. Savoir construire l'outil qui manque, c'est ce qui rend l'administration système vraiment intéressante. Je cherche une alternance pour mon Master 2, entre Lyon et Saint-Étienne.",
    ],
  },

  projets: {
    titre: 'Projets',
    sousTitre: 'Je développe aussi : des applications réelles, conçues et livrées de bout en bout.',
    voirTout: 'Voir le code',
    statuts: { 'en-cours': 'En cours', livre: 'En production', 'non-distribue': 'Non distribué' },
    liste: [
      {
        id: 'outils-purge-shell',
        titre: 'Outils de purge Shell',
        resume:
          'Scripts d’exploitation qui libèrent l’espace disque des serveurs de production en supprimant les anciennes versions applicatives.',
        contexte:
          'Au CTI de l’Assurance Maladie, chaque montée de version laissait les livraisons précédentes sur les serveurs : l’espace disque se réduisait à vue d’œil et le nettoyage se faisait à la main. J’ai écrit les outils qui automatisent cette purge.',
        points: [
          'Scripts Bash de nettoyage des anciennes versions et des logs, déclenchés par cron.',
          'Déploiement et configuration des scripts sur le parc via Ansible.',
          'Jusqu’à 80 % de temps gagné sur les tâches de nettoyage auparavant manuelles.',
          'Procédures rédigées pour que l’équipe puisse reprendre et adapter les outils.',
        ],
        technos: ['Bash', 'Ansible', 'cron', 'Linux'],
        periode: '2024 — 2025',
        statut: 'livre',
        vedette: true,
        liens: [],
      },
      {
        id: 'domotique-home-assistant',
        titre: 'Domotique — Home Assistant',
        resume:
          'Installation domotique complète sur réseau local : intégrations, automatisations, tableaux de bord et notifications.',
        contexte:
          'Un terrain de jeu permanent pour tout ce qui m’intéresse en systèmes et réseaux : des équipements hétérogènes à faire dialoguer, un service à garder disponible, et de l’automatisation à écrire pour que la maison réagisse sans qu’on lui demande.',
        points: [
          'Intégration d’équipements IoT variés sur un réseau local maîtrisé.',
          'Automatisations et scénarios déclenchés par capteurs, horaires et présence.',
          'Tableaux de bord sur mesure et notifications pilotées par événement.',
          'Auto-hébergement : supervision du service, sauvegardes et mises à jour.',
        ],
        technos: ['Home Assistant', 'IoT', 'YAML', 'Réseau local', 'Linux'],
        periode: 'En continu',
        statut: 'en-cours',
        vedette: true,
        liens: [],
      },
      {
        id: 'team-manager',
        titre: 'Team Manager',
        resume:
          'Application mobile de gestion d’équipe : affectation des heures et des secteurs, disponibilités, covoiturage et messagerie, avec deux rôles distincts.',
        contexte:
          'J’encadre chaque samedi une équipe d’une quinzaine de préparateurs. Répartir les heures et les secteurs, savoir qui est disponible et prévenir tout le monde se faisait au téléphone et par messages, avec les oublis que ça suppose. J’ai développé l’outil qui manquait — en connaissant le problème de l’intérieur, puisque c’est moi qui le vivais.',
        points: [
          'Deux rôles séparés, chef et préparateur, portés par des droits Firebase (custom claims) et des écrans distincts.',
          'Affectation des heures et des secteurs, avec détection automatique des conflits avant validation.',
          'Déclaration des disponibilités, covoiturage entre participants et messagerie intégrée.',
          'Notifications push (Firebase Cloud Messaging) routées vers le bon écran à l’ouverture.',
          'Tableau de bord, retours des participants et export du récapitulatif.',
        ],
        technos: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Cloud Messaging', 'App Check'],
        periode: '2025',
        statut: 'non-distribue',
        vedette: true,
        liens: [],
      },
      {
        id: 'site-web-personnel',
        titre: 'Site web personnel',
        resume: 'Site vitrine avec système de réservations, servi derrière Cloudflare.',
        contexte:
          'Un site vitrine classique, écrit sans framework, doublé d’un système de réservations en ligne. L’occasion de prendre en main la mise en ligne de bout en bout : nom de domaine, DNS, certificat et mise en cache.',
        points: [
          'Site statique en HTML, CSS et JavaScript, sans dépendance externe.',
          'Système de réservations en ligne.',
          'Mise en ligne derrière Cloudflare : DNS, certificat TLS et cache.',
        ],
        technos: ['HTML', 'CSS', 'JavaScript', 'Cloudflare'],
        periode: '2024',
        statut: 'livre',
        vedette: false,
        liens: [],
      },
      {
        id: 'shapez-craft',
        titre: 'Shapez Craft',
        resume:
          'Jeu de chaînes de production en Java : poser des machines sur une grille pour fabriquer des formes et les livrer.',
        contexte:
          'Projet universitaire en équipe, inspiré de shapez.io. Le joueur pose mines, tapis et machines sur un plateau pour découper, empiler, peindre et mélanger des formes jusqu’à obtenir celle que le niveau réclame.',
        points: [
          'Architecture MVC stricte : le modèle (plateau, machines, items) ignore totalement l’affichage.',
          'Huit machines aux comportements distincts — mine, tapis, découpeur, rotateur, empileur, mélangeur, peinture, livraison — dérivées d’une classe commune.',
          'Patron Observer entre le modèle et la vue : la grille se redessine sur notification, sans couplage.',
          'Sauvegarde et rechargement d’une partie en cours.',
          'Travail en groupe sous Git, rapport de projet et soutenance.',
        ],
        technos: ['Java', 'MVC', 'Swing', 'Observer', 'Maven', 'Git'],
        periode: '2026',
        statut: 'livre',
        vedette: false,
        liens: [],
      },
      {
        id: 'emotion-recognition',
        titre: 'Reconnaissance d’émotions',
        resume:
          'Chaîne complète de traitement d’images : détection de visages en temps réel, classification d’émotions et génération de visages.',
        contexte:
          'Projet universitaire d’introduction à l’intelligence artificielle. Trois modèles enchaînés dans une application de bureau : repérer les visages dans un flux webcam, reconnaître l’émotion, et générer de nouveaux visages conditionnés par une émotion.',
        points: [
          'Détection de visages en temps réel sur flux webcam (YOLO).',
          'Classification sur sept émotions — colère, dégoût, peur, joie, tristesse, surprise, neutre — avec un ResNet18 entraîné sur FER2013.',
          'Génération de visages par autoencodeur variationnel, avec interpolation dans l’espace latent.',
          'Interface PyQt5 bilingue : flux vidéo, prédictions et exploration du jeu de données.',
          'Entraînement outillé : early stopping, suivi TensorBoard, journalisation structurée et 32 tests pytest.',
        ],
        technos: ['Python', 'PyTorch', 'YOLO', 'ResNet18', 'VAE', 'PyQt5', 'TensorBoard', 'pytest'],
        periode: '2026',
        statut: 'livre',
        vedette: true,
        liens: [],
      },
      {
        id: 'photomaton-locations',
        titre: 'Photomaton Locations',
        resume:
          "Application de bureau de gestion des locations de photobooths, en production dans mon entreprise, Le Petit Flash.",
        contexte:
          "Mon entreprise de location de photobooths gérait ses réservations dans des fichiers dispersés. J'ai conçu une application de bureau qui centralise clients, matériel, contrats et planning, et qui se synchronise avec notre ERP Odoo.",
        points: [
          'Application Electron multiplateforme distribuée en paquet .deb, versionnée et publiée en continu (v1.31).',
          "Import et synchronisation bidirectionnelle des clients depuis Odoo, avec gestion des contraintes de champs de l'ERP.",
          'Base de données locale : les données restent sur le poste, aucune dépendance à un serveur tiers.',
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
    ],
  },

  parcours: {
    titre: 'Parcours',
    experienceTitre: 'Expérience',
    formationTitre: 'Formation',
    certificationsTitre: 'Certifications',
    experiences: [
      {
        titre: 'Analyste alternant en informatique de production',
        organisation: "Centre de Traitements Informatique — Assurance Maladie",
        lieu: 'Saint-Étienne (42)',
        periode: '2024 — 2025',
        details: [
          "Stage de 6 semaines en 2024, prolongé par une année d'alternance.",
          'Automatisation de tâches d’exploitation via Ansible (déploiements, configurations) : jusqu’à 80 % de temps gagné sur certaines tâches.',
          'Installation et support d’applications : diagnostic, correctifs, rédaction des procédures.',
          'Contribution à la fiabilisation des environnements : suivi de configuration, documentation, bonnes pratiques.',
          'Support technique sur les processus de remboursement — orientation et résolution d’incidents, environ 3 tickets par semaine.',
        ],
      },
      {
        titre: 'Manager',
        organisation: 'Alliance Healthcare Répartition',
        lieu: 'Montagny (69)',
        periode: 'Depuis 2022',
        details: [
          'Poste tenu chaque samedi depuis 2022, en parallèle des études.',
          'Management opérationnel d’une équipe d’environ 15 préparateurs : organisation, priorisation, qualité.',
          'Gestion des process logistiques et respect des normes.',
          'De ma propre initiative, développement de l’application mobile qui gère les affectations de l’équipe : heures, secteurs et disponibilités.',
        ],
      },
      {
        titre: 'Saisonnier',
        organisation: 'Soleil Levant',
        lieu: '',
        periode: '2020 — 2021',
        details: [
          'Récolte et tri des fruits, dans le respect des normes de qualité et de sécurité.',
          'Travail en équipe et gestion des cadences de production.',
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
        ],
      },
      {
        diplome: 'BTS CIEL — option A, Informatique et Réseaux',
        etablissement: 'LPO Georges Brassens',
        lieu: 'Rive-de-Gier (42)',
        periode: '2023 — 2025',
        details: [
          'Cybersécurité, informatique et réseaux, électronique.',
          "2ᵉ année effectuée en alternance à l'Assurance Maladie, au CTI de Saint-Étienne.",
          'Socle réseaux et sécurité que je prolonge aujourd’hui avec la spécialisation SRS du Master.',
        ],
      },
    ],
    certifications: [
      {
        intitule: 'CCNA 1 & 2',
        organisme: 'Cisco Networking Academy',
        periode: '2025 & 2026',
        details: [
          'Fondamentaux des réseaux, commutation, routage et adressage IP.',
        ],
      },
      {
        intitule: 'Certification PIX',
        organisme: 'PIX',
        periode: '2022 & 2025',
        details: ['Score de 542 en 2025, après un premier passage à 201 en 2022.'],
      },
    ],
  },

  competences: {
    titre: 'Compétences',
    sousTitre: 'Les outils que j’utilise réellement, en production comme sur mes projets.',
    groupes: [
      {
        categorie: 'Systèmes',
        items: ['Linux (admin, logs, permissions)', 'cron', 'Gestion de l’espace disque', 'VMware'],
      },
      {
        categorie: 'Automatisation',
        items: ['Scripts Bash', 'Ansible', 'Python'],
      },
      {
        categorie: 'Réseaux',
        items: [
          'TCP / IP',
          'SSH (clés, scp)',
          'Diagnostic (ping, traceroute, ip)',
          'Routeurs & switchs',
          'Adressage & segmentation (CIDR, VLAN)',
          'DHCP',
        ],
      },
      {
        categorie: 'Exploitation',
        items: ['Supervision Centreon', 'Nginx', 'Documentation & procédures', 'Outil de tickets (ICD)'],
      },
      {
        categorie: 'Bases de données',
        items: ['MySQL (utilisateurs, droits, notions de sauvegarde)', 'SQLite'],
      },
      {
        categorie: 'Développement',
        items: ['C / C++', 'Java', 'React & TypeScript', 'Flutter / Dart', 'HTML / CSS / JS', 'Git', 'Méthodes agiles'],
      },
      {
        categorie: 'Savoir-être',
        items: ['Esprit d’équipe', 'Curiosité', 'Rigueur', 'Sens de l’organisation'],
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
