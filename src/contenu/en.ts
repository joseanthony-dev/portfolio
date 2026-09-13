import type { Contenu } from '../types'

// ─────────────────────────────────────────────────────────────────────────────
//  ENGLISH CONTENT — keep it in sync with fr.ts when you edit the French side.
// ─────────────────────────────────────────────────────────────────────────────

export const en: Contenu = {
  meta: {
    titre: 'Anthony Jose — Systems, Networks & Security',
    description:
      "Computer science master's student in Lyon, France, on the Systems, Networks and Security track, looking for a September 2027 apprenticeship. System and network administration, monitoring, automation, cybersecurity — and building the tooling that goes with it.",
  },

  nav: { projets: 'Projects', parcours: 'Background', competences: 'Skills', contact: 'Contact' },

  hero: {
    salutation: "Hi, I'm",
    nom: 'Anthony Jose',
    titre: 'Systems, networks & security — and development',
    accroche:
      'I come from operations: a year as an apprentice in IT production at the French national health insurance fund, handling incidents on a reimbursement processing chain and watching over servers and batch jobs with Centreon. Linux, automation, reliability — and development as the extension of it, to build the tools that are missing.',
    recherche:
      'Looking for a one-year apprenticeship alongside my final master’s year — starting September 2027, between Lyon and Saint-Étienne, or remote.',
    photoAlt: 'Portrait of Anthony Jose',
    ctaProjets: 'See my work',
    ctaContact: 'Get in touch',
    ctaCv: 'Download my résumé',
  },

  apropos: {
    titre: 'About',
    paragraphes: [
      "I'm a computer science master's student at Université Claude Bernard Lyon 1, heading for the SRS track — Systems, Networks and Security. It is the logical next step after my BTS CIEL in computing and networks: system and network administration, cybersecurity, and a year spent as an apprentice in IT production.",
      'What interests me is keeping things running. At the French national health insurance fund I handled incidents on the reimbursement processing chain, watched over servers and batch jobs with Centreon, and automated the purge of superseded application versions that were eating into disk space. Linux daily, and automation anywhere it replaces a repeated manual step.',
      'Development came as the extension of that, and I have kept at it: a desktop application in production at my own photo booth rental business, mobile apps, some C++, and a whole house automated with Home Assistant out of sheer curiosity. Being able to build the tool that is missing is what makes system administration genuinely interesting. I am looking for an apprenticeship for my final master\'s year, between Lyon and Saint-Étienne.',
    ],
  },

  projets: {
    titre: 'Projects',
    sousTitre: 'I build software too: real applications, designed and shipped end to end.',
    voirTout: 'View code',
    statuts: { 'en-cours': 'In progress', livre: 'In production', 'non-distribue': 'Not distributed' },
    liste: [
      {
        id: 'outils-purge-shell',
        titre: 'Shell purge tooling',
        resume:
          'Operations scripts that reclaim disk space on production servers by clearing out superseded application versions.',
        contexte:
          'At the Assurance Maladie data centre, every upgrade left the previous releases sitting on the servers: disk space kept shrinking and the clean-up was done by hand. I wrote the tooling that automates the purge.',
        points: [
          'Bash scripts that clear out old versions and logs, driven by cron.',
          'Scripts deployed and configured across the estate with Ansible.',
          'Up to 80% of the time saved on clean-up work that used to be manual.',
          'Procedures written up so the team can pick the tooling up and adapt it.',
        ],
        technos: ['Bash', 'Ansible', 'cron', 'Linux'],
        periode: '2024 — 2025',
        statut: 'livre',
        vedette: true,
        liens: [],
      },
      {
        id: 'domotique-home-assistant',
        titre: 'Home automation — Home Assistant',
        resume:
          'A full home automation setup on a local network: integrations, automations, dashboards and notifications.',
        contexte:
          'A permanent playground for everything that interests me in systems and networks: mismatched devices that have to talk to each other, a service to keep available, and automations to write so the house reacts without being asked.',
        points: [
          'A range of IoT devices integrated on a local network I control end to end.',
          'Automations and scenarios triggered by sensors, schedules and presence.',
          'Custom dashboards and event-driven notifications.',
          'Self-hosted: monitoring the service, backups and updates.',
        ],
        technos: ['Home Assistant', 'IoT', 'YAML', 'Local networking', 'Linux'],
        periode: 'Ongoing',
        statut: 'en-cours',
        vedette: true,
        liens: [],
      },
      {
        id: 'team-manager',
        titre: 'Team Manager',
        resume:
          'A mobile app for running a team: assigning hours and sectors, availability, car sharing and messaging, with two distinct roles.',
        contexte:
          'Every Saturday I lead a team of around fifteen order pickers. Splitting up the hours and the sectors, knowing who was available and telling everyone in time was done by phone and by text, with the oversights that come with it. I built the tool that was missing — knowing the problem from the inside, since I was the one living it.',
        points: [
          'Two separate roles, lead and picker, backed by Firebase custom claims and distinct screens.',
          'Assignment of hours and sectors, with automatic conflict detection before anything is confirmed.',
          'Availability declarations, car sharing between participants and built-in messaging.',
          'Push notifications (Firebase Cloud Messaging) routed to the right screen on open.',
          'Dashboard, participant feedback and summary export.',
        ],
        technos: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Cloud Messaging', 'App Check'],
        periode: '2025',
        statut: 'non-distribue',
        vedette: true,
        liens: [],
      },
      {
        id: 'site-web-personnel',
        titre: 'Personal website',
        resume: 'A brochure site with an online booking system, served behind Cloudflare.',
        contexte:
          'A plain brochure site, written without a framework, paired with an online booking system. A chance to handle going live end to end: domain name, DNS, certificate and caching.',
        points: [
          'Static site in HTML, CSS and JavaScript, with no external dependencies.',
          'Online booking system.',
          'Published behind Cloudflare: DNS, TLS certificate and caching.',
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
          'A production-chain game in Java: place machines on a grid to manufacture shapes and deliver them.',
        contexte:
          'A university team project inspired by shapez.io. The player lays down mines, belts and machines on a board to cut, stack, paint and mix shapes until they match what the level asks for.',
        points: [
          'Strict MVC architecture: the model (board, machines, items) knows nothing at all about the display.',
          'Eight machines with distinct behaviour — mine, belt, cutter, rotator, stacker, mixer, painter, delivery — derived from a shared base class.',
          'Observer pattern between model and view: the grid redraws on notification, with no coupling.',
          'Saving and reloading a game in progress.',
          'Built as a team under Git, with a project report and an oral defence.',
        ],
        technos: ['Java', 'MVC', 'Swing', 'Observer', 'Maven', 'Git'],
        periode: '2026',
        statut: 'livre',
        vedette: false,
        liens: [],
      },
      {
        id: 'emotion-recognition',
        titre: 'Emotion recognition',
        resume:
          'A full image-processing pipeline: real-time face detection, emotion classification and face generation.',
        contexte:
          'A university project introducing artificial intelligence. Three models chained inside a desktop application: find the faces in a webcam feed, recognise the emotion, and generate new faces conditioned on an emotion.',
        points: [
          'Real-time face detection on a webcam feed (YOLO).',
          'Classification across seven emotions — anger, disgust, fear, joy, sadness, surprise, neutral — with a ResNet18 trained on FER2013.',
          'Face generation through a variational autoencoder, with interpolation in the latent space.',
          'Bilingual PyQt5 interface: video feed, predictions and dataset exploration.',
          'Tooled training: early stopping, TensorBoard tracking, structured logging and 32 pytest tests.',
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
          'Desktop application for managing photo booth rentals, running in production at my own business, Le Petit Flash.',
        contexte:
          'My photo booth rental business was tracking bookings across scattered files. I designed a desktop application that centralises customers, equipment, contracts and scheduling, and syncs with our Odoo ERP.',
        points: [
          'Cross-platform Electron app distributed as a .deb package, versioned and released continuously (v1.31).',
          'Two-way customer import and synchronisation with Odoo, handling the ERP’s field constraints.',
          'Local database: data stays on the machine, with no dependency on a third-party server.',
          'Vitest test suite with coverage reporting, ESLint and Prettier wired into the workflow.',
        ],
        technos: ['Electron', 'React', 'TypeScript', 'Vite', 'Vitest', 'Odoo XML-RPC', 'Node.js'],
        periode: '2025 — present',
        statut: 'livre',
        vedette: true,
        // Private repository for now. To show the link once it is public:
        // liens: [{ label: 'Source code', url: 'https://github.com/joseanthony-dev/photomaton-locations', type: 'github' }],
        liens: [],
      },
    ],
  },

  parcours: {
    titre: 'Background',
    experienceTitre: 'Experience',
    formationTitre: 'Education',
    certificationsTitre: 'Certifications',
    experiences: [
      {
        titre: 'IT production operations analyst — apprentice',
        organisation: 'Assurance Maladie — Saint-Étienne data centre',
        lieu: 'Saint-Étienne, France',
        periode: '2024 — 2025',
        details: [
          'A six-week internship in 2024, extended into a one-year apprenticeship.',
          'Automated operations tasks with Ansible (deployments, configuration): up to 80% of the time saved on some of them.',
          'Application installation and support: diagnosis, fixes, writing the procedures.',
          'Helped make the environments more reliable: configuration tracking, documentation, good practice.',
          'Technical support on the reimbursement processes — triaging and resolving incidents, around three tickets a week.',
        ],
      },
      {
        titre: 'Manager',
        organisation: 'Alliance Healthcare Répartition',
        lieu: 'Montagny, France',
        periode: 'Since 2022',
        details: [
          'Role held every Saturday since 2022, alongside my studies.',
          'Day-to-day management of a team of around 15 order pickers: organising, prioritising, keeping the quality up.',
          'Running the logistics processes and keeping them within the standards.',
          'On my own initiative, built the mobile app that handles the team’s assignments: hours, sectors and availability.',
        ],
      },
      {
        titre: 'Seasonal worker',
        organisation: 'Soleil Levant',
        lieu: '',
        periode: '2020 — 2021',
        details: [
          'Fruit picking and sorting, within the quality and safety standards.',
          'Teamwork and keeping up with the production rates.',
        ],
      },
    ],
    formations: [
      {
        diplome: "Master's in Computer Science",
        etablissement: 'Université Claude Bernard Lyon 1',
        lieu: 'Lyon, France',
        periode: '2026 — 2028',
        details: [
          'Currently in the first year (general track); specialising in year two in SRS — Systems, Networks and Security.',
          'Coursework: application design, signal processing, databases, software architecture.',
        ],
      },
      {
        diplome: "Bachelor's in Computer Science",
        etablissement: 'Université Claude Bernard Lyon 1',
        lieu: 'Lyon, France',
        periode: '2025 — 2026',
        details: [
          'Admitted directly into the final year on the strength of the BTS.',
          'Algorithms, object-oriented programming, databases, systems and networks.',
        ],
      },
      {
        diplome: 'BTS CIEL — Computing and Networks option',
        etablissement: 'LPO Georges Brassens',
        lieu: 'Rive-de-Gier, France',
        periode: '2023 — 2025',
        details: [
          'Two-year higher technical diploma in cybersecurity, computing and networks, and electronics.',
          'Second year completed as an apprentice at the Assurance Maladie data centre in Saint-Étienne.',
          'The networks and security grounding I am now building on with the SRS master’s track.',
        ],
      },
    ],
    certifications: [
      {
        intitule: 'CCNA 1 & 2',
        organisme: 'Cisco Networking Academy',
        periode: '2025 & 2026',
        details: ['Networking fundamentals, switching, routing and IP addressing.'],
      },
      {
        intitule: 'PIX certification',
        organisme: 'PIX',
        periode: '2022 & 2025',
        details: ['Scored 542 in 2025, up from 201 on a first attempt in 2022.'],
      },
    ],
  },

  competences: {
    titre: 'Skills',
    sousTitre: 'The tools I actually use, in production and on my own projects.',
    groupes: [
      {
        categorie: 'Systems',
        items: ['Linux (admin, logs, permissions)', 'cron', 'Disk space management', 'VMware'],
      },
      { categorie: 'Automation', items: ['Bash scripting', 'Ansible', 'Python'] },
      {
        categorie: 'Networks',
        items: [
          'TCP / IP',
          'SSH (keys, scp)',
          'Diagnostics (ping, traceroute, ip)',
          'Routers & switches',
          'Addressing & segmentation (CIDR, VLAN)',
          'DHCP',
        ],
      },
      {
        categorie: 'Operations',
        items: ['Centreon monitoring', 'Nginx', 'Documentation & procedures', 'Ticketing (ICD)'],
      },
      {
        categorie: 'Databases',
        items: ['MySQL (users, privileges, backup basics)', 'SQLite'],
      },
      {
        categorie: 'Development',
        items: ['C / C++', 'Java', 'React & TypeScript', 'Flutter / Dart', 'HTML / CSS / JS', 'Git', 'Agile methods'],
      },
      {
        categorie: 'Working style',
        items: ['Team player', 'Curious', 'Thorough', 'Organised'],
      },
      {
        categorie: 'Languages spoken',
        items: ['French — native', 'English — B2, professional working proficiency'],
      },
    ],
  },

  contact: {
    titre: 'Get in touch',
    accroche:
      'An apprenticeship opportunity, a question about a project, or just a conversation? I aim to reply within 48 hours.',
    email: 'anthony.jose@outlook.fr',
    telephone: '+33 6 42 16 24 15',
    localisation: 'Montagny, France — mobile between Lyon and Saint-Étienne, open to remote work',
    liens: [
      { label: 'GitHub', url: 'https://github.com/joseanthony-dev', type: 'github' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/joseanthony-zacharias', type: 'linkedin' },
    ],
    copie: 'Copy address',
    copie_ok: 'Address copied',
  },

  pied: { droits: 'Anthony Jose', construitAvec: 'Designed and built with React, TypeScript and Vite.' },

  a11y: {
    changerLangue: 'Switch the site to French',
    changerTheme: 'Toggle theme (light / dark)',
    menu: 'Navigation menu',
  },
}
