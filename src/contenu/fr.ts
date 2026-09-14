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
    descriptionPartage:
      'Administration système et réseau, supervision, automatisation et cybersécurité — et du développement. Projets, parcours et CV.',
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
      "Le développement est venu en prolongement, et je continue : une application de bureau en production dans mon entreprise de location de photobooths, des applis mobiles, du C++, et une installation domotique que j’héberge et administre chez moi sous Home Assistant. Savoir construire l'outil qui manque, c'est ce qui rend l'administration système vraiment intéressante. Je cherche une alternance pour mon Master 2, entre Lyon et Saint-Étienne.",
    ],
  },

  projets: {
    titre: 'Projets',
    sousTitre: 'Je développe aussi : des applications réelles, conçues et livrées de bout en bout.',
    technosLabel: 'Technologies utilisées',
    cas: {
      lire: 'Lire le cas',
      retour: 'Tous les projets',
      contexte: 'Le contexte',
      realisations: 'Ce que j’ai fait',
      chiffres: 'Résultats',
    },
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
          'Jusqu’à 80 % de temps gagné : une purge passe d’une heure à moins de dix minutes.',
          'Procédures rédigées pour que l’équipe puisse reprendre et adapter les outils.',
        ],
        technos: ['Bash', 'Ansible', 'cron', 'Linux'],
        periode: '2024 — 2025',
        statut: 'livre',
        vedette: true,
        liens: [],
        cas: {
          chapo:
            'Au moins une purge par jour, une heure de travail à chaque fois. Le script qui a remplacé ce geste devait surtout pouvoir se tromper sans rien casser.',
          chiffres: [
            { valeur: '1 h → 2-10 min', libelle: 'pour une purge, auparavant manuelle' },
            { valeur: '1 h → 5 min', libelle: 'pour un contrôle d’installation' },
            { valeur: '50 à 80 %', libelle: 'd’espace disque libéré par passage' },
            { valeur: 'J+1', libelle: 'entre la mise à l’écart et la suppression définitive' },
          ],
          sections: [
            {
              titre: 'Reconnaître une version supprimable',
              paragraphes: [
                'Chaque montée de version laissait la précédente en place, et rien ne disait laquelle pouvait partir : il fallait le déduire. Le critère retenu est le lien symbolique — une version vers laquelle plus aucun lien ne pointe n’est plus servie.',
                'Le script conserve la version en production et la n-1, et ne regarde que ce qui est au-delà. Garder la n-1 n’est pas un confort : c’est ce qui permet de revenir en arrière si la version en cours se révèle défaillante. Une purge qui emporte le seul point de retour transforme un incident mineur en incident majeur.',
              ],
            },
            {
              titre: 'Renommer avant de supprimer',
              paragraphes: [
                'Un script de suppression qui se trompe sur tout un parc fait plus de dégâts qu’une année de nettoyage oublié. La purge ne supprime donc rien le jour où elle s’exécute : elle renomme.',
                'Les versions jugées obsolètes sont mises de côté, puis on attend le run du soir. S’il se déroule normalement, la suppression définitive a lieu le lendemain. Sinon, relancer le script restaure les versions renommées et l’on retrouve l’état d’avant.',
                'Cette fenêtre de vérification est ce qui sépare un outil qu’on ose lancer sur un parc de production d’un outil qu’on garde pour plus tard.',
              ],
            },
            {
              titre: 'Se greffer sur l’existant plutôt qu’ajouter un outil',
              paragraphes: [
                'Ansible était déjà en place. Plutôt que de déployer les scripts par un autre canal, je les ai intégrés au lanceur que l’équipe utilisait déjà : la purge devient une entrée de plus, pas une procédure à part avec ses propres habitudes. Quelques ajustements de son interface ont suffi.',
                'Le vrai travail était ailleurs. Une partie du parc n’était pas encore raccordée au serveur maître, donc hors de portée de l’automatisation. Il a fallu l’y ramener avant que le reste ait un sens.',
                'Le bénéfice de ce choix s’est vu au second outil. Une fois le chemin ouvert, ajouter le contrôle automatique des installations n’a coûté qu’un script de plus au même endroit — pas un nouveau canal de déploiement, pas une nouvelle habitude à faire prendre.',
              ],
            },
            {
              titre: 'Deux familles de systèmes, deux jeux de commandes',
              paragraphes: [
                'Le premier échec est venu de là. Le parc n’est pas homogène : deux familles de systèmes y cohabitent, et les commandes ne s’y comportent pas de la même façon — mêmes noms, options et sorties différentes. Un script écrit et validé sur l’une échoue sur l’autre sans prévenir.',
                'Il a fallu détecter le système au démarrage et brancher sur le jeu de commandes correspondant. C’est ce qui a le plus pesé sur le calendrier, et ce qui m’a appris à ne jamais supposer qu’un parc est uniforme.',
              ],
            },
            {
              titre: 'Mise en service et mesure',
              paragraphes: [
                'Un mois d’exécution en environnement de non-production avant la moindre approche de la production : le temps de voir passer les cas qu’on n’avait pas prévus, sur des serveurs qu’on peut casser.',
                'Le gain se lit au chronomètre. Une purge demandait environ une heure ; elle prend désormais entre deux et dix minutes, et un contrôle d’installation est passé d’une heure à cinq minutes.',
                'L’espace regagné se relève avant et après passage : entre 50 et 80 % de l’occupation selon les serveurs, l’écart tenant au nombre de versions que chacun avait accumulées.',
                'Des procédures écrites accompagnent les scripts, pour que l’équipe puisse les reprendre et les adapter sans moi.',
              ],
            },
          ],
        },
      },
      {
        id: 'domotique-home-assistant',
        titre: 'Domotique — Home Assistant',
        resume:
          'Installation Home Assistant auto-hébergée sur Raspberry Pi : équipements Matter, automatisations, tableaux de bord et sauvegardes.',
        contexte:
          'Un service que j’héberge et que j’administre chez moi, de l’installation aux sauvegardes : l’occasion de tenir quelque chose en état de marche sur la durée, et d’écrire les automatisations qui font réagir la maison sans qu’on lui demande.',
        points: [
          'Home Assistant OS sur Raspberry Pi, administré de bout en bout : mises à jour, sauvegardes, restauration.',
          'Cinq équipements Matter intégrés, avec automatisations déclenchées par capteurs, horaires et présence.',
          'Tableau de bord de santé qui signale un équipement qui ne répond plus.',
          'Sauvegardes doublées, locale et hors site : perdre le Raspberry Pi n’est pas perdre l’installation.',
          'Aucun accès depuis l’extérieur, par choix : des capteurs et des lumières ne le justifient pas. La question se reposera quand volets et chauffage seront pilotés.',
        ],
        technos: ['Home Assistant', 'Matter', 'Raspberry Pi', 'YAML'],
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
          "Mon entreprise de location de photobooths pilotait ses locations depuis une boîte mail. J'ai conçu une application de bureau qui centralise clients, matériel, contrats et planning, reçoit les demandes venues d'Odoo, et dialogue avec la borne elle-même.",
        points: [
          'Application Electron empaquetée en .deb, versionnée et publiée en continu (v1.31).',
          "Les demandes arrivent par un formulaire Odoo et créent directement la location dans l'application, contraintes de champs de l'ERP comprises.",
          'Supervision de la borne par dialogue avec son Raspberry Pi : état du PC et de l’imprimante, impressions restantes, photos locales, verrouillage logiciel.',
          'Base de données locale : les données restent sur le poste, aucune dépendance à un serveur tiers.',
          'Suite de tests Vitest avec rapport de couverture, ESLint et Prettier intégrés au flux de travail.',
        ],
        technos: ['Electron', 'React', 'TypeScript', 'Vite', 'Vitest', 'Odoo XML-RPC', 'Raspberry Pi', 'Node.js'],
        periode: '2025 — aujourd’hui',
        statut: 'livre',
        vedette: true,
        // Dépôt privé pour l'instant. Pour afficher le lien une fois rendu public :
        // liens: [{ label: 'Code source', url: 'https://github.com/joseanthony-dev/photomaton-locations', type: 'github' }],
        liens: [],
        cas: {
          chapo:
            'Une entreprise qui tient ses locations dans une boîte mail marche — jusqu’au jour où il faut retrouver quelque chose. L’application a remplacé la boîte mail, puis elle est allée parler à la borne.',
          chiffres: [
            { valeur: 'v1.31', libelle: 'en production dans l’entreprise' },
            { valeur: 'Hors ligne', libelle: 'tout reste consultable sans réseau' },
            { valeur: 'Aucun serveur', libelle: 'à héberger ni à administrer' },
          ],
          sections: [
            {
              titre: 'Une boîte mail n’est pas une base de données',
              paragraphes: [
                'Tout passait par le courrier électronique : la demande, les échanges, le contrat, les dates. Chaque information existait, quelque part, dans un fil. La retrouver supposait de se souvenir de qui l’avait écrite et quand.',
                'L’application ne fait au fond qu’une chose : donner une place à chaque information. Clients, matériel, contrats, planning. Le reste en découle.',
              ],
            },
            {
              titre: 'Pourquoi une application de bureau',
              paragraphes: [
                'Le métier se pratique sur place, dans des salles où le réseau n’est pas un acquis. C’est précisément là qu’il faut pouvoir ouvrir une fiche client, vérifier un contrat, consulter le planning.',
                'Un site web aurait été inutilisable au moment exact où il sert. L’application de bureau garde ses données sur le poste : sans connexion, tout reste consultable. Ce n’est pas un choix de confort, c’est la condition pour que l’outil existe sur le terrain.',
              ],
            },
            {
              titre: 'Des données locales, et rien à administrer',
              paragraphes: [
                'Le corollaire est agréable : aucun serveur à héberger, à sauvegarder, à mettre à jour ou à payer. Pas de fournisseur à qui confier le carnet de clients d’une entreprise.',
                'Pour un outil à un seul poste, c’est le bon échelon d’infrastructure. Ajouter un serveur aurait ajouté un service à tenir en état de marche, sans rien apporter que l’application ne fasse déjà.',
              ],
            },
            {
              titre: 'De la demande à la location',
              paragraphes: [
                'Les demandes arrivent par un formulaire Odoo et créent directement la location dans l’application. Le flux va dans un seul sens : Odoo ne tient pas de fiche client, il reçoit la demande et la transmet.',
                'Ce choix évite le problème le plus coûteux de ce genre d’intégration — deux systèmes qui détiennent la même information et qui divergent. Ici, une seule source fait autorité, et il n’y a donc jamais de conflit à arbitrer. Le travail a surtout consisté à composer avec les contraintes de champs de l’ERP.',
                'Une fois la location créée, l’application prend le relais sur tout ce qui se faisait à la main : envoi des courriels, demandes d’avis, signature, création des espaces de partage des photos, choix du cadre.',
              ],
            },
            {
              titre: 'Parler à la borne',
              paragraphes: [
                'La partie la plus intéressante n’est pas dans la gestion. Chaque borne abrite un Raspberry Pi, et l’application dialogue avec lui.',
                'Elle en remonte l’état du poste et de l’imprimante, le nombre d’impressions restantes, et donne accès aux photos stockées localement. Elle permet aussi de verrouiller la borne par logiciel.',
                'Autrement dit : savoir qu’une imprimante est à court de papier avant qu’un invité ne s’en aperçoive. C’est de la supervision d’équipement distant, au sens où on l’entend en exploitation — construite ici pour un parc de bornes plutôt que pour un parc de serveurs.',
              ],
            },
            {
              titre: 'Un seul utilisateur, et pourtant une vraie chaîne',
              paragraphes: [
                'Je suis le seul à m’en servir. Les versions sont malgré tout empaquetées en .deb, numérotées et publiées, et je récupère les mises à jour comme n’importe quel utilisateur le ferait. La suite de tests Vitest, la couverture, ESLint et Prettier tournent dans le même flux.',
                'Cette discipline n’est pas du décor. Sans elle, un outil à usage unique devient un programme qui ne fonctionne que sur la machine où il a été écrit, et dont on n’ose plus changer une ligne. C’est aussi ce qui permettra de le confier à quelqu’un d’autre le jour où l’entreprise aura besoin d’un deuxième poste.',
              ],
            },
          ],
        },
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
    ouvrirMenu: 'Ouvrir le menu de navigation',
    fermerMenu: 'Fermer le menu de navigation',
    allerAuContenu: 'Aller au contenu',
  },
}
