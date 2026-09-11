# Portfolio — Anthony Jose

Site vitrine personnel : CV, projets, parcours et contact. Bilingue FR/EN, thème clair/sombre,
responsive, sans aucune dépendance externe au moment de l'exécution (pas de police Google, pas de CDN).

**Stack** : React 19 + TypeScript + Vite. Site 100 % statique → hébergeable gratuitement partout.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # génère dist/
npm run preview    # sert le dist/ compilé
npm run lint
```

## Modifier le contenu

**Tout le texte du site est dans deux fichiers, et nulle part ailleurs :**

| Fichier | Rôle |
|---|---|
| `src/contenu/fr.ts` | version française |
| `src/contenu/en.ts` | version anglaise |

Les deux fichiers ont exactement la même structure (garantie par `src/types.ts` : si tu oublies un
champ, `npm run build` te le signale). Pour ajouter un projet, copie un bloc de `projets.liste`
dans les deux fichiers.

Les endroits marqués **« À COMPLÉTER »** / **« TO FILL IN »** attendent tes informations —
voir `A-FAIRE.md`.

### Afficher le lien GitHub d'un projet

Les dépôts étant privés pour l'instant, les cartes projets n'affichent aucun lien (`liens: []`).
Une fois un dépôt rendu public, décommente la ligne juste au-dessus, dans les **deux** fichiers :

```ts
liens: [{ label: 'Code source', url: 'https://github.com/joseanthony-dev/photomaton-locations', type: 'github' }],
```

### Ajouter ton CV en PDF

Dépose ton CV dans `public/cv.pdf`. Le bouton « Télécharger mon CV » pointe déjà vers ce fichier.
Tant qu'il n'existe pas, le bouton renvoie une erreur 404.

### Changer la couleur d'accent

Une seule variable, en haut de `src/index.css` :

```css
--accent: #0d6a5a;   /* thème clair */
```
et son équivalent dans le bloc `:root[data-theme='sombre']`.

## Déployer

### Vercel (recommandé — gratuit, 2 minutes)

1. Pousse le projet sur GitHub.
2. [vercel.com](https://vercel.com) → *Add New Project* → importe le dépôt.
3. Vercel détecte Vite automatiquement (build `npm run build`, sortie `dist`). Clique *Deploy*.
4. Chaque `git push` redéploie le site tout seul.

Pour un nom propre à mettre sur ton CV, achète un domaine (~10 €/an chez OVH, Gandi ou Namecheap)
et ajoute-le dans *Settings → Domains*.

### GitHub Pages (alternative)

Ajoute la base dans `vite.config.ts` (le site est servi depuis un sous-dossier) :

```ts
export default defineConfig({ plugins: [react()], base: '/portfolio/' })
```

puis publie `dist/` via une action GitHub Pages ou la branche `gh-pages`.

## Avant de diffuser le lien

- [ ] Remplacer les mentions restantes (`grep -rn "À COMPLÉTER\|TO FILL IN" src/`)
- [ ] Déposer `public/cv.pdf`
- [ ] Remplacer `https://exemple.vercel.app/` par ta vraie URL dans `index.html`
      (balises `canonical`, `og:url`, `og:image`)
- [ ] Ajouter une image de partage `public/apercu.png` (1200 × 630 px) — c'est ce qui s'affiche
      quand tu envoies le lien sur LinkedIn ou WhatsApp

## Structure

```
src/
  types.ts              structure des données (contrat entre FR et EN)
  contenu/fr.ts         ← le texte français
  contenu/en.ts         ← le texte anglais
  App.tsx               langue, thème, assemblage des sections
  index.css             toute la mise en forme (variables de thème en haut)
  composants/
    EnTete.tsx          navigation, bascule langue et thème, menu mobile
    Hero.tsx            bandeau d'accueil
    APropos.tsx  Projets.tsx  Parcours.tsx  Competences.tsx  Contact.tsx
    PiedDePage.tsx  Icones.tsx
```
