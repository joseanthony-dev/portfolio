import type { Contenu } from '../types'

// ─────────────────────────────────────────────────────────────────────────────
//  ENGLISH CONTENT — keep it in sync with fr.ts when you edit the French side.
// ─────────────────────────────────────────────────────────────────────────────

export const en: Contenu = {
  meta: {
    titre: 'Anthony Jose — Systems, Networks & Security',
    description:
      "Computer science master's student in Lyon, France, on the Systems, Networks and Security track, looking for a September 2027 apprenticeship. System and network administration, monitoring, automation, cybersecurity — and building the tooling that goes with it.",
    descriptionPartage:
      'System and network administration, monitoring, automation and cybersecurity — and software development. Projects, background and CV.',
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
      'Development came as the extension of that, and I have kept at it: a desktop application in production at my own photo booth rental business, mobile apps, some C++, and a home automation setup I host and administer myself with Home Assistant. Being able to build the tool that is missing is what makes system administration genuinely interesting. I am looking for an apprenticeship for my final master\'s year, between Lyon and Saint-Étienne.',
    ],
  },

  projets: {
    titre: 'Projects',
    sousTitre: 'I build software too: real applications, designed and shipped end to end.',
    technosLabel: 'Technologies used',
    cas: {
      lire: 'Read the case study',
      retour: 'All projects',
      contexte: 'Context',
      realisations: 'What I did',
      chiffres: 'Results',
    },
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
          'Up to 80% less time: a purge goes from an hour to under ten minutes.',
          'Procedures written up so the team can pick the tooling up and adapt it.',
        ],
        technos: ['Bash', 'Ansible', 'cron', 'Linux'],
        periode: '2024 — 2025',
        statut: 'livre',
        vedette: true,
        liens: [],
        cas: {
          chapo:
            'At least one purge a day, an hour of work each time. Above all, the script that replaced that chore had to be able to get it wrong without breaking anything.',
          chiffres: [
            { valeur: '1 h → 2-10 min', libelle: 'for a purge, previously done by hand' },
            { valeur: '1 h → 5 min', libelle: 'for an installation check' },
            { valeur: '50 to 80%', libelle: 'of disk space freed per run' },
            { valeur: 'D+1', libelle: 'between setting aside and actual deletion' },
          ],
          sections: [
            {
              titre: 'Telling which version can go',
              paragraphes: [
                'Every release left the previous one in place, and nothing said which could be removed: it had to be inferred. The criterion is the symbolic link — a version no link points to any more is no longer being served.',
                'The script keeps the version in production and the one before it, and only looks beyond that. Keeping n-1 is not a comfort: it is what makes rolling back possible if the current version turns out to be faulty. A purge that takes away the only way back turns a minor incident into a major one.',
              ],
            },
            {
              titre: 'Rename before deleting',
              paragraphes: [
                'A deletion script that gets it wrong across a whole estate does more damage than a year of forgotten cleanup. So the purge deletes nothing on the day it runs: it renames.',
                'Versions judged obsolete are set aside, then the evening run is awaited. If it goes through normally, the actual deletion happens the next day. If not, running the script again restores the renamed versions and the previous state is back.',
                'That verification window is what separates a tool you dare point at a production estate from one you keep for later.',
              ],
            },
            {
              titre: 'Grafting onto what was there rather than adding a tool',
              paragraphes: [
                'Ansible was already in place. Rather than shipping the scripts through some other channel, I folded them into the launcher the team already used: the purge becomes one more entry, not a separate procedure with habits of its own. A few adjustments to its interface were enough.',
                'The real work was elsewhere. Part of the estate was not yet wired to the master server, and therefore out of reach of any automation. It had to be brought in before the rest meant anything.',
                'The payoff of that choice showed up with the second tool. Once the path existed, adding automated installation checks cost nothing more than another script in the same place — no new deployment channel, no new habit to instil.',
              ],
            },
            {
              titre: 'Two families of systems, two sets of commands',
              paragraphes: [
                'The first failure came from there. The estate is not homogeneous: two families of systems live side by side, and commands do not behave the same way across them — same names, different options and different output. A script written and validated on one fails on the other without warning.',
                'The system had to be detected at start-up and the matching set of commands selected. That weighed on the schedule more than anything else, and it taught me never to assume an estate is uniform.',
              ],
            },
            {
              titre: 'Going live, and measuring',
              paragraphes: [
                'A month of runs in a non-production environment before going anywhere near production: long enough to meet the cases nobody had anticipated, on servers you are allowed to break.',
                'The gain shows on the stopwatch. A purge used to take about an hour; it now takes between two and ten minutes, and an installation check went from an hour to five.',
                'Reclaimed space is recorded before and after each run: between 50 and 80% of what was occupied, depending on the server — the spread reflecting how many releases each had piled up.',
                'Written procedures ship with the scripts, so the team can pick them up and adapt them without me.',
              ],
            },
          ],
        },
      },
      {
        id: 'domotique-home-assistant',
        titre: 'Home automation — Home Assistant',
        resume:
          'A self-hosted Home Assistant setup on a Raspberry Pi: Matter devices, automations, dashboards and backups.',
        contexte:
          'A service I host and administer at home, from install to backups: a chance to keep something running over the long haul, and to write the automations that make the house react without being asked.',
        points: [
          'Home Assistant OS on a Raspberry Pi, administered end to end: updates, backups, restores.',
          'Five Matter devices integrated, with automations triggered by sensors, schedules and presence.',
          'A health dashboard that flags a device which has stopped responding.',
          'Backups kept in two places, local and off-site: losing the Raspberry Pi is not losing the setup.',
          'No access from outside, by choice: sensors and lights do not warrant it. The question comes back when shutters and heating are controlled.',
        ],
        technos: ['Home Assistant', 'Matter', 'Raspberry Pi', 'YAML'],
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
          'Every Saturday I used to lead a team of around fifteen order pickers. Splitting up the hours and the sectors, knowing who was available and telling everyone in time was done by phone and by text, with the oversights that come with it. I built the tool that was missing — knowing the problem from the inside, since I was the one living it.',
        points: [
          'Two separate roles, lead and picker, enforced by Firestore security rules rather than by the interface alone.',
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
        cas: {
          chapo:
            'A tool written for a problem I lived myself, tested, then never put into service: I stopped leading Saturdays before it ever ran. What remains of it is what it taught me.',
          chiffres: [
            { valeur: '~15', libelle: 'pickers to schedule every Saturday' },
            { valeur: '2 roles', libelle: 'separated by Firestore rules, not by screens' },
            { valeur: 'Never shipped', libelle: 'the need disappeared before it went live' },
          ],
          sections: [
            {
              titre: 'A problem known from the inside',
              paragraphes: [
                'Assigning fifteen-odd people to sectors and time slots, knowing who was available, keeping everyone informed: all of it happened by phone and by text. It works, with the oversights that come with it — a sector left uncovered, someone told twice, an unavailability only I knew about.',
                'I had nobody to interview to establish the requirements: I lived them every Saturday. That is comfortable for designing, and misleading for everything else — a sole user who is also the developer never runs into what he found obvious.',
              ],
            },
            {
              titre: 'Separating roles on the server, not on the screen',
              paragraphes: [
                'The application has two roles: lead and picker. On a mobile app, the temptation is to settle for showing different screens. That protects nothing: the data itself stays reachable by anyone who knows how to ask for it.',
                'So the separation is carried by Firestore security rules, which decide at the database level what each role may read and write. The interface follows that decision, it does not stand in for it. App Check rounds it off by restricting API use to legitimate instances of the app.',
              ],
            },
            {
              titre: 'What the application covered',
              paragraphes: [
                'Assignment of hours and sectors, with conflicts detected before anything is confirmed. Availability declared by each person. Car sharing between participants, and built-in messaging to replace scattered chat threads.',
                'Conflict detection blocks confirmation: an assignment that produces one cannot be confirmed. That guard-rail lives in the application, and is not to be confused with the role separation described above, which the database enforces. Preventing a data-entry mistake and preventing an access do not call for the same rigour, nor for the same place.',
                'Push notifications go through Firebase Cloud Messaging and open straight onto the relevant screen — a notification that drops the user on the home page leaves them to go and find what it was about. On top of that: a dashboard, participant feedback, and a summary export.',
              ],
            },
            {
              titre: 'Tested by two, then made redundant',
              paragraphes: [
                'The application ran in a two-person test with a colleague. It never went further: I stopped leading the Saturday team, and the need it answered disappeared with that change.',
                'Nothing failed technically. It is simply what happens to a tool cut for one specific situation when the situation changes — and one more reason to ship early rather than finish before showing.',
              ],
            },
            {
              titre: 'What I would do differently: the web',
              paragraphes: [
                'I would build this as a web application. The mobile app was only distributed on Android, which ruled out part of the team from the start: a coordination tool that will not open on everybody’s phone coordinates nothing.',
                'Choosing Flutter also cost time, since I did not know it. The learning is not wasted, but it was not in the service of this project: the platform is chosen on who has to be able to open the tool, not on what you feel like learning.',
              ],
            },
          ],
        },
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
        cas: {
          chapo:
            'A two-person university project, most of which I wrote, with an architecture fixed by the brief. The point was therefore not to choose it, but to hold to it.',
          chiffres: [
            { valeur: '8', libelle: 'machines with distinct behaviours' },
            { valeur: 'Two of us', libelle: 'a group project, most of which I wrote' },
            { valeur: 'Report and defence', libelle: 'expected alongside the code itself' },
          ],
          sections: [
            {
              titre: 'An imposed architecture, and what comes of it',
              paragraphes: [
                'Strict MVC and the Observer pattern were not choices I made: the brief required them. What is left to do once that is settled turns out to be more instructive than it sounds — holding a boundary you did not decide on.',
                'In practice the model — board, machines, items in transit — has no idea a display exists. It notifies, it does not draw. Every time the easy way out would be to let a display detail creep into the model, another route has to be found. That is constraining in the moment, and it is what kept the eight machines, all derived from a common class, comparable with one another.',
              ],
            },
            {
              titre: 'Zoom and layers',
              paragraphes: [
                'The difficulty did not come from the simulation but from the view. A board you can zoom in and out of forces every coordinate through one same transformation: what gets drawn, but also what gets clicked. The moment a single path escapes it, clicks land somewhere other than what you see.',
                'Layers pose the opposite problem: board, belts, items in transit and machines overlap, and the drawing order decides what is visible. It follows from nothing, it has to be decided — and then honoured everywhere.',
              ],
            },
            {
              titre: 'Saving a game',
              paragraphes: [
                'A game in progress is written to a file and read back on load. It is the kind of feature that puts the architecture to the test: if the model really is independent of the display, writing it out and reading it back is enough. If anything from the view had slipped in, this is where it shows.',
              ],
            },
            {
              titre: 'Two of us, without being half each',
              paragraphes: [
                'There were two of us, and I wrote most of the project; my teammate contributed on a few points. The Git side went without a single conflict, which owes less to our process than to that imbalance: you do not step on each other when you are almost only one.',
                'That is the real gap in this project. I came out of it better at architecture and at rendering, not at collaboration — I never had to review someone else’s code, or defend a decision to somebody who would have done it differently.',
              ],
            },
          ],
        },
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
          'My photo booth rental business was running its rentals out of a mailbox. I designed a desktop application that centralises customers, equipment, contracts and scheduling, takes in the requests coming from Odoo, and talks to the booth itself.',
        points: [
          'Electron app packaged as a .deb, versioned and released continuously (v1.31).',
          'Requests arrive through an Odoo form and create the rental directly in the application, ERP field constraints included.',
          'Booth monitoring by talking to its Raspberry Pi: PC and printer status, prints remaining, local photos, software lock.',
          'Local database: data stays on the machine, with no dependency on a third-party server.',
          'Vitest test suite with coverage reporting, ESLint and Prettier wired into the workflow.',
        ],
        technos: ['Electron', 'React', 'TypeScript', 'Vite', 'Vitest', 'Odoo XML-RPC', 'Raspberry Pi', 'Node.js'],
        periode: '2025 — present',
        statut: 'livre',
        vedette: true,
        // Private repository for now. To show the link once it is public:
        // liens: [{ label: 'Source code', url: 'https://github.com/joseanthony-dev/photomaton-locations', type: 'github' }],
        liens: [],
        cas: {
          chapo:
            'A business that keeps its rentals in a mailbox works — right up until something has to be found again. The application replaced the mailbox, then went on to talk to the booth.',
          chiffres: [
            { valeur: 'v1.31', libelle: 'running in production at the business' },
            { valeur: 'Offline', libelle: 'everything stays readable with no network' },
            { valeur: 'No server', libelle: 'to host or to administer' },
          ],
          sections: [
            {
              titre: 'A mailbox is not a database',
              paragraphes: [
                'Everything went through email: the enquiry, the back and forth, the contract, the dates. Every piece of information existed somewhere in a thread. Finding it again meant remembering who had written it, and when.',
                'The application really does only one thing: it gives every piece of information a place. Customers, equipment, contracts, scheduling. The rest follows from that.',
              ],
            },
            {
              titre: 'Why a desktop application',
              paragraphes: [
                'The work happens on site, in venues where a network is not a given. That is exactly where a customer record has to be opened, a contract checked, a schedule consulted.',
                'A web app would have been unusable at the precise moment it is needed. The desktop application keeps its data on the machine: with no connection, everything stays readable. That is not a convenience, it is the condition for the tool to exist in the field at all.',
              ],
            },
            {
              titre: 'Local data, and nothing to administer',
              paragraphes: [
                'The corollary is a welcome one: no server to host, back up, update or pay for. No provider to hand a business’s customer book to.',
                'For a single-machine tool, that is the right rung of infrastructure. Adding a server would have added a service to keep running, without bringing anything the application does not already do.',
              ],
            },
            {
              titre: 'From enquiry to rental',
              paragraphes: [
                'Enquiries come in through an Odoo form and create the rental directly in the application. The flow runs one way: Odoo holds no customer record, it receives the enquiry and passes it on.',
                'That choice sidesteps the most expensive problem in this kind of integration — two systems holding the same information and drifting apart. Here a single source is authoritative, so there is never a conflict to arbitrate. The work went mostly into living with the ERP’s field constraints.',
                'Once the rental exists, the application takes over everything that used to be done by hand: sending emails, review requests, signature, setting up the photo sharing spaces, choosing the frame.',
              ],
            },
            {
              titre: 'Talking to the booth',
              paragraphes: [
                'The most interesting part is not the management side. Each booth houses a Raspberry Pi, and the application talks to it.',
                'It reports the state of the machine and of the printer, how many prints are left, and gives access to the photos stored locally. It can also lock the booth in software.',
                'Which means: knowing a printer is out of paper before a guest notices. This is remote equipment monitoring in the operational sense of the term — built here for a fleet of booths rather than a fleet of servers.',
              ],
            },
            {
              titre: 'A single user, and a real pipeline anyway',
              paragraphes: [
                'I am the only person who uses it. Releases are still packaged as .deb, numbered and published, and I pull updates the way any user would. The Vitest suite, coverage, ESLint and Prettier all run in the same flow.',
                'That discipline is not decoration. Without it, a single-purpose tool becomes a program that only runs on the machine it was written on, and that nobody dares change a line of. It is also what will make it possible to hand over the day the business needs a second machine.',
              ],
            },
          ],
        },
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
    ouvrirMenu: 'Open the navigation menu',
    fermerMenu: 'Close the navigation menu',
    allerAuContenu: 'Skip to content',
  },
}
