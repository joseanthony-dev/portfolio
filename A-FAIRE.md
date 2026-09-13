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
- **Expérience Assurance Maladie**, informatique de production au CTI de Saint-Étienne
- **Expérience Alliance Healthcare**, responsable / management terrain, chaque samedi
- **À propos, 3ᵉ paragraphe** rédigé à partir du résumé LinkedIn
- **Compétences** : C++, Flutter / Firebase, Linux, admin système & réseau, cybersécurité, Home Assistant
- **Zone de recherche** élargie à Lyon **et Saint-Étienne**

## Il reste

Pour les retrouver dans le code : `grep -rn "À COMPLÉTER\|TO FILL IN" src/`

L'export LinkedIn fourni était la version **Basic** : il ne contient que `Profile.csv` (identité,
titre et résumé), sans `Positions.csv` ni `Education.csv`. Les deux expériences ont donc été
reconstituées à partir du résumé — il manque les **dates**, le **lieu d'Alliance Healthcare** et
les **puces concrètes**. Pour les obtenir d'un coup : LinkedIn → *Préférences* → *Obtenir une copie
de vos données* → **« Télécharger l'archive complète »** (et non « Basic »).

- [ ] **Assurance Maladie / CTI Saint-Étienne** : dates (mois + année), et 2 à 3 puces concrètes —
      chaînes et outils, incidents traités, ce que tu as automatisé. Stage de BTS ?
- [ ] **Alliance Healthcare** : ville, dates (depuis quand ?), et 2 à 3 puces — taille de l'équipe,
      périmètre, résultat.
- [ ] **Mention de licence** et projet de fin de licence, si tu veux les afficher.
- [ ] **Projets à ajouter ?** Ton compte GitHub contient d'autres travaux qui mériteraient une
      carte, notamment **lifprojet-emotion-recognition** (reconnaissance d'émotions) et
      **photomaton-portail-render** (portail web). Dis-moi ce qu'ils font, je les rédige.

## Fichiers à déposer

- [ ] `public/cv.pdf` — ton CV, le bouton pointe déjà dessus. (Je peux te le générer à partir du
      contenu du site si tu n'en as pas sous la main.)
- [ ] `public/apercu.png` — 1200 × 630 px, l'aperçu affiché quand on partage le lien.
- [ ] Dans `index.html` : remplacer `https://exemple.vercel.app/` par ta vraie URL une fois déployé.

## Dépôts GitHub

Tes 4 projets sont en dépôt **privé**, donc les cartes n'affichent aucun lien « Code source »
(mieux qu'un lien mort). Si tu rends un dépôt public, décommente la ligne `liens:` correspondante
dans `src/contenu/fr.ts` **et** `src/contenu/en.ts` — voir le README.

Pour un recruteur technique, du code visible vaut beaucoup : même un seul dépôt public bien
présenté (README, capture d'écran, instructions d'installation) change l'impression.
