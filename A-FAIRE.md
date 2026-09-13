# À compléter avant de diffuser le site

## Déjà intégré

- Recherche d'**alternance pour le M2, rentrée 2027**
- **Le Petit Flash** : projet familial mené seul, Montagny (69), depuis 2025
- **Master Informatique** Lyon 1, M1 tronc commun → M2 **SRS** (Systèmes, Réseaux et Sécurité)
- **Licence Informatique** Lyon 1, 2025-2026, en admission directe en 3ᵉ année après le BTS
- **BTS CIEL** option A, Informatique et Réseaux (2023 — 2025), lycée Georges Brassens, Rive-de-Gier (42)
- **Anglais B2**
- **GitHub** <https://github.com/joseanthony-dev> et **LinkedIn** <https://www.linkedin.com/in/joseanthony-zacharias>
- **Téléphone** 06 42 16 24 15 et e-mail anthony.jose@outlook.fr
- **Assurance Maladie**, CTI de Saint-Étienne : stage de 6 semaines en 2024 puis alternance
  2024-2025 (purge automatisée des anciennes versions applicatives, incidents de la chaîne de
  remboursement, superviseur Centreon)
- **Alliance Healthcare**, Montagny (69), responsable depuis 2022, équipe de 15 personnes
- **À propos, 3ᵉ paragraphe** rédigé à partir du résumé LinkedIn
- **Compétences** : C++, Flutter / Firebase, Linux, admin système & réseau, cybersécurité, Home Assistant
- **Zone de recherche** élargie à Lyon **et Saint-Étienne**

## Il reste

- [ ] **Photo de profil** — celle du CV, si tu veux l'ajouter au site.
- [ ] **Dates manquantes** : domotique Home Assistant (mise en « En continu »), application
      planning et site web personnel (estimés 2025 et 2024) — à confirmer.
- [ ] **« Site web personnel »** : s'agit-il de ce portfolio, ou d'un autre site ? La carte le
      décrit comme un site vitrine avec réservations, derrière Cloudflare.
- [ ] **Mention de licence** et projet de fin de licence, si tu veux les afficher.

## Fichiers à déposer

- [ ] `public/cv.pdf` — le bouton pointe dessus (`/portfolio/cv.pdf` une fois déployé).
- [ ] `public/apercu.png` — 1200 × 630 px, l'aperçu affiché quand on partage le lien.

## Déploiement

L'URL cible est celle du CV : <https://joseanthony-dev.github.io/portfolio/>.
`vite.config.ts` porte donc `base: '/portfolio/'` — **ne pas l'enlever**, sinon le CSS et le JS
sont demandés à la racine du domaine et le site s'affiche blanc.

- [ ] Créer le dépôt `portfolio` sur GitHub et pousser `main`.
- [ ] Activer GitHub Pages (branche `gh-pages` ou action de déploiement).

## Dépôts GitHub

Tes 4 projets sont en dépôt **privé**, donc les cartes n'affichent aucun lien « Code source »
(mieux qu'un lien mort). Si tu rends un dépôt public, décommente la ligne `liens:` correspondante
dans `src/contenu/fr.ts` **et** `src/contenu/en.ts` — voir le README.

Pour un recruteur technique, du code visible vaut beaucoup : même un seul dépôt public bien
présenté (README, capture d'écran, instructions d'installation) change l'impression.
