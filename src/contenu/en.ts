import type { Contenu } from '../types'

// ─────────────────────────────────────────────────────────────────────────────
//  ENGLISH CONTENT — keep it in sync with fr.ts when you edit the French side.
// ─────────────────────────────────────────────────────────────────────────────

export const en: Contenu = {
  meta: {
    titre: 'Anthony Jose — Software Developer',
    description:
      "Computer science master's student in Lyon, France, looking for a September 2027 apprenticeship. Web, desktop and mobile applications: React, TypeScript, Electron, React Native.",
  },

  nav: { projets: 'Projects', parcours: 'Background', competences: 'Skills', contact: 'Contact' },

  hero: {
    salutation: "Hi, I'm",
    nom: 'Anthony Jose',
    titre: 'Software developer — web, desktop & mobile',
    accroche:
      'I design and ship complete applications, from the first mockup to the user’s machine. React and TypeScript daily, Electron for desktop, React Native for mobile.',
    recherche:
      'Looking for a one-year apprenticeship alongside my final master’s year — starting September 2027, Lyon area or remote.',
    ctaProjets: 'See my work',
    ctaContact: 'Get in touch',
    ctaCv: 'Download my résumé',
  },

  apropos: {
    titre: 'About',
    paragraphes: [
      "I'm a computer science master's student at Université Claude Bernard Lyon 1, and I spend most of my spare time building software that someone actually uses: a management tool running daily at a photo booth rental company, an app that follows me through my courses, mobile apps designed for real use.",
      'What interests me is the finished product: a clear interface, data that never gets lost, an application that installs and just runs. I work in strict TypeScript, I test what I write (Vitest, Jest, Playwright) and I document it so the code still reads well six months later.',
      'TO FILL IN — add a sentence or two that is more personal: what got you into development, what you are aiming for after the master’s, your interests.',
    ],
  },

  projets: {
    titre: 'Projects',
    sousTitre: 'Real applications, designed and built end to end.',
    voirTout: 'View code',
    statuts: { 'en-cours': 'In progress', livre: 'In production' },
    liste: [
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
        titre: 'TO FILL IN — other experience (internship, apprenticeship, job, student society)',
        organisation: 'TO FILL IN',
        lieu: 'TO FILL IN',
        periode: 'TO FILL IN',
        details: ['TO FILL IN — 2 or 3 concrete bullets: what you did, with what, what came of it.'],
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
        periode: '2023 — 2026', // TO CHECK — inferred from starting the master's in September 2026.
        details: [
          'General computer science training: algorithms, data structures, object-oriented programming, databases, systems and networks.',
          'TO FILL IN — honours obtained and notable projects (e.g. the final-year LIFPROJET).',
        ],
      },
    ],
  },

  competences: {
    titre: 'Skills',
    sousTitre: 'The tools I actually use on my projects.',
    groupes: [
      { categorie: 'Languages', items: ['TypeScript', 'JavaScript', 'Java', 'Python', 'SQL', 'HTML / CSS'] },
      {
        categorie: 'Front-end',
        items: ['React', 'Vite', 'React Native / Expo', 'PWA & Service Workers', 'SVG', 'Accessibility (WCAG)'],
      },
      { categorie: 'Back-end & data', items: ['Node.js', 'REST APIs', 'Odoo / XML-RPC', 'SQLite', 'Tomcat / Jakarta EE'] },
      { categorie: 'Desktop & distribution', items: ['Electron', 'electron-builder', '.deb packaging', 'EAS Build'] },
      { categorie: 'Quality & tooling', items: ['Vitest', 'Jest', 'Playwright', 'ESLint', 'Prettier', 'Git', 'CI/CD'] },
      { categorie: 'Languages spoken', items: ['French — native', 'English — B2, professional working proficiency'] },
    ],
  },

  contact: {
    titre: 'Get in touch',
    accroche:
      'An apprenticeship opportunity, a question about a project, or just a conversation? I aim to reply within 48 hours.',
    email: 'anthony.jose@outlook.fr',
    telephone: '+33 6 42 16 24 15',
    localisation: 'Montagny, France — Lyon area, happy to relocate or work remotely',
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
