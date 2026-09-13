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
    titre: 'Systems, networks & security — and a bit of development',
    accroche:
      'I come from operations: a year as an apprentice in IT production at the French national health insurance fund, handling incidents on a reimbursement processing chain and watching over servers and batch jobs with Centreon. Linux, automation, reliability — and development as the extension of it, to build the tools that are missing.',
    recherche:
      'Looking for a one-year apprenticeship alongside my final master’s year — starting September 2027, between Lyon and Saint-Étienne, or remote.',
    ctaProjets: 'See my work',
    ctaContact: 'Get in touch',
    ctaCv: 'Download my résumé',
  },

  apropos: {
    titre: 'About',
    paragraphes: [
      "I'm a computer science master's student at Université Claude Bernard Lyon 1, heading for the SRS track — Systems, Networks and Security. It is the logical next step after my BTS CIEL in computing and networks: system and network administration, cybersecurity, and a year spent as an apprentice in IT production.",
      'What interests me is keeping things running. At the French national health insurance fund I handled incidents on the reimbursement processing chain, watched over servers and batch jobs with Centreon, and automated the purge of superseded application versions that were eating into disk space. Linux daily, and automation anywhere it replaces a repeated manual step.',
      'Development came as the extension of that, and I have kept at it: a desktop application in production at a photo booth rental company, mobile apps, some C++, and a whole house automated with Home Assistant out of sheer curiosity. Being able to build the tool that is missing is what makes system administration genuinely interesting. I am looking for an apprenticeship for my final master\'s year, between Lyon and Saint-Étienne.',
    ],
  },

  projets: {
    titre: 'Projects',
    sousTitre: 'I build things on the side too: real applications, designed and shipped end to end.',
    voirTout: 'View code',
    statuts: { 'en-cours': 'In progress', livre: 'In production' },
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
        id: 'application-planning',
        titre: 'Event planning app',
        resume:
          'A mobile app for running events: sign-ups, attendance replies, statistics and PDF export.',
        contexte:
          'Organising events and keeping track of who is coming quickly becomes a headache. The app centralises the events, collects attendance replies and produces a summary you can actually use.',
        points: [
          'Event management and collection of attendance replies.',
          'Attendance statistics and PDF export of the summary.',
          'Data synced through Firebase and reachable from several devices.',
        ],
        technos: ['Flutter', 'Firebase', 'Dart'],
        periode: '2025',
        statut: 'livre',
        vedette: false,
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
        id: 'photomaton-locations',
        titre: 'Photomaton Locations',
        resume:
          'Desktop application for managing photo booth rentals, running in production at Le Petit Flash.',
        contexte:
          'A photo booth rental business was tracking bookings across scattered files. I designed a desktop application that centralises customers, equipment, contracts and scheduling, and syncs with their Odoo ERP.',
        points: [
          'Cross-platform Electron app distributed as a .deb package, versioned and released continuously (v1.31).',
          'Two-way customer import and synchronisation with Odoo, handling the ERP’s field constraints.',
          'Local database: data stays on the client’s machine, with no dependency on a third-party server.',
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
      {
        id: 'mes-cours',
        titre: 'Mes cours',
        resume:
          'Offline-capable web app gathering a full semester of timetable, grades, assignments and course material.',
        contexte:
          'Between the university calendar, course PDFs and submission deadlines, everything was scattered. I built a PWA that pulls it all together and works without a connection.',
        points: [
          'Imports the university ADE calendar in iCalendar format and renders a consolidated timetable.',
          'Reads course PDFs straight in the browser through PDF.js, with no prior download.',
          'Progressive Web App: service worker generated at build time, installable and fully usable offline.',
          'Vitest unit tests and Playwright end-to-end tests, including an automated accessibility check (axe-core).',
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
        resume: 'Mobile weight and habit tracker built local-first: no data ever leaves the phone.',
        contexte:
          'Mainstream tracking apps require an account and monetise health data. I wanted the opposite: everything stored locally, exports entirely under the user’s control.',
        points: [
          'Local storage through AsyncStorage — no account, no server.',
          'Progress charts drawn with native SVG (react-native-svg) instead of a heavy charting library.',
          'Progress photos, backup import/export and reminder notifications.',
          'Jest test suite with jest-expo, distribution builds through EAS.',
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
          'Mobile app for analysing roulette sessions: bet tracking, statistics and result visualisation.',
        contexte:
          'A personal project to explore probabilistic modelling and real-time statistics rendering on mobile.',
        points: [
          'Live session statistics (distribution, deviations, running balance).',
          'SVG-drawn interface representing the table and the draw history.',
          'Jest-tested architecture with application state kept separate from the view layer.',
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
    titre: 'Background',
    experienceTitre: 'Experience',
    formationTitre: 'Education',
    certificationsTitre: 'Certifications',
    experiences: [
      {
        titre: 'Developer — custom management application',
        organisation: 'Le Petit Flash (family business)',
        lieu: 'Montagny, France',
        periode: '2025 — present',
        details: [
          'Ran the project end to end on my own: gathering requirements from the users, design, development, release and maintenance.',
          'Designed and built the desktop application that now handles all of the company’s rentals.',
          'Integrated the application with the company’s Odoo ERP (customer and catalogue sync).',
          'In service since the first release, with regular updates shipped since (v1.31).',
        ],
      },
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
          'TO FILL IN — honours obtained and final-year project, if you want them shown.',
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
        categorie: 'Development (secondary)',
        items: ['C / C++', 'HTML / CSS / JS', 'React & TypeScript', 'Git', 'Agile methods'],
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
