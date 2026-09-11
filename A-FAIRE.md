# À compléter avant de diffuser le site

## Déjà intégré

- Recherche d'**alternance pour le M2, rentrée 2027**
- **Le Petit Flash** : projet familial mené seul, Montagny (69), depuis 2025
- **Master Informatique** Lyon 1, M1 tronc commun → M2 **SRS** (Systèmes, Réseaux et Sécurité)
- **Anglais B2**
- **GitHub** <https://github.com/joseanthony-dev> et **LinkedIn** <https://www.linkedin.com/in/joseanthony-zacharias>
- **Téléphone** 06 42 16 24 15 et e-mail anthony.jose@outlook.fr

## Il reste

Pour les retrouver dans le code : `grep -rn "À COMPLÉTER\|TO FILL IN" src/`

- [ ] **Vérifier le nom affiché** — le site écrit « Anthony Jose » (déduit de ton e-mail), mais ton
      LinkedIn dit « joseanthony-zacharias ». Dis-moi l'orthographe exacte que tu veux en gros
      titre, j'ajuste aussi les initiales « AJ » du logo.
- [ ] **Deuxième expérience** (`parcours.experiences[1]`) — LinkedIn bloque la lecture automatique
      (HTTP 999), je n'ai pas pu la récupérer. Copie-colle-moi le texte, je le mets en forme.
      Si tu n'as pas d'autre expérience, supprime le bloc dans les deux fichiers.
- [ ] **Licence** (`parcours.formations[1]`) — établissement, ville, années, mention.
- [ ] **À propos, 3ᵉ paragraphe** — 1 ou 2 phrases plus personnelles. Donne-moi des notes en vrac,
      je rédige.
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
