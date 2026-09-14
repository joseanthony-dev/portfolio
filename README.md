# Portfolio — Anthony Jose

Site personnel présentant mon parcours, mes projets et mes compétences en systèmes, réseaux
et sécurité.

**→ [joseanthony-dev.github.io/portfolio](https://joseanthony-dev.github.io/portfolio/)**

Bilingue français / anglais, thème clair et sombre, responsive, accessible au clavier.
Le site ne charge **aucune ressource externe** à l'exécution : pas de police Google, pas de CDN,
pas de script tiers. Tout est servi depuis le domaine, ce qui évite toute requête vers un service
tiers pour le visiteur.

## Stack

React 19 · TypeScript · Vite 8 · CSS natif (aucun framework de style)

Le site est entièrement statique : le build produit du HTML, du CSS et un bundle JS, hébergeables
n'importe où. Aucune dépendance d'exécution en dehors de React.

## Quelques partis pris

**Contenu et présentation séparés.** Tout le texte vit dans `src/contenu/fr.ts` et
`src/contenu/en.ts`, jamais dans les composants. Les deux fichiers doivent satisfaire le même type
`Contenu` (`src/types.ts`) : si une traduction manque un champ, la compilation échoue. Les deux
langues ne peuvent donc pas diverger silencieusement.

**Rendu au build.** `dist/index.html` contient tout le texte du site, pas seulement un
`<div id="root">` vide : `scripts/prerendu.mjs` rend l'application dans Node à la fin du build et
insère le résultat. Le contenu est donc lisible sans JavaScript, indexable, et affiché avant que
les 82 ko du bundle ne soient chargés — le navigateur n'attend plus React pour peindre la page.
React s'hydrate ensuite sur ce DOM au lieu de le reconstruire.

Cela impose une contrainte : le premier rendu client doit produire exactement le HTML du build.
Toute lecture du navigateur — langue stockée, `navigator.language` — est donc repoussée après
l'hydratation, dans un effet, et non faite pendant le rendu. Le HTML pré-rendu est en français,
la version canonique du site ; un visiteur anglophone voit donc le français le temps que le bundle
charge. Servir les deux langues sans ce décalage demanderait deux URL — `/` et `/en/` — ce qui
ferait de la langue une vraie navigation plutôt qu'un état React.

**Thème sans clignotement.** Un script inline dans `index.html` applique le thème enregistré avant
le premier rendu, ce qui évite l'éclair blanc au chargement en mode sombre. Toute lecture de
`localStorage` est protégée : le site fonctionne en navigation privée ou site data bloqué.
Comme le thème est connu avant React, c'est le CSS qui choisit l'icône soleil / lune : le balisage
ne dépend pas du thème, ce qui le rend identique au HTML pré-rendu dans les deux cas.

**Accessibilité.** Lien d'évitement, navigation au clavier, contrastes vérifiés dans les deux
thèmes, et `prefers-reduced-motion` respecté.

**Styles.** Environ 12 ko de CSS écrits à la main, pilotés par des variables de thème regroupées en
tête de `src/index.css`. Changer la couleur d'accent tient en une ligne.

## Démarrer

```bash
npm install
npm run dev        # serveur de développement
npm run build      # génère dist/
npm run preview    # sert le dist/ compilé
npm run lint
```

Node 22 ou plus.

## Structure

```
src/
  types.ts              contrat de données, garant de la parité FR / EN
  contenu/fr.ts         texte français
  contenu/en.ts         texte anglais
  App.tsx               langue, thème, assemblage des sections
  index.css             mise en forme complète (variables de thème en tête)
  entree-client.tsx     point d'entrée navigateur, hydrate le HTML pré-rendu
  entree-serveur.tsx    point d'entrée du rendu au build
  composants/
    EnTete.tsx          navigation, bascule langue et thème, menu mobile
    Hero.tsx  APropos.tsx  Projets.tsx  Parcours.tsx
    Competences.tsx  Contact.tsx  PiedDePage.tsx  Icones.tsx
scripts/
  prerendu.mjs          insère le HTML rendu au build dans dist/index.html
```

## Déploiement

Publié sur GitHub Pages par `.github/workflows/deploy.yml`, qui construit et met en ligne le site
à chaque `push` sur `main`.

Le site étant servi depuis un sous-dossier, `vite.config.ts` fixe `base: '/portfolio/'`. Sans cette
base, les assets seraient demandés à la racine du domaine et la page s'afficherait vide. Pour
déployer ailleurs, retirer `base` et mettre à jour les URL canoniques de `index.html`.

---

## In English

A personal site presenting my background, projects and skills in systems, networks and security.
Bilingual, light and dark themes, responsive, keyboard accessible, and with **no external runtime
dependencies** — no web fonts, no CDN, no third-party scripts.

Built with React 19, TypeScript and Vite. All copy lives in two content files that must satisfy the
same TypeScript type, so the French and English versions cannot drift apart without the build
failing. The app is rendered to static HTML at build time and hydrated in the browser, so the
content is readable without JavaScript and paints before the bundle loads. Deployed to GitHub Pages
on every push to `main`.
