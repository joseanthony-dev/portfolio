*[English version](README.en.md)*

# Portfolio — Anthony Jose

Site personnel présentant mon parcours, mes projets et mes compétences en systèmes, réseaux
et sécurité.

**→ [joseanthony-dev.github.io/portfolio](https://joseanthony-dev.github.io/portfolio/)**

Bilingue français / anglais — une URL par langue —, thème clair et sombre, responsive,
accessible au clavier.
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

**Rendu au build.** Les pages contiennent tout le texte du site, pas seulement un
`<div id="root">` vide : `scripts/prerendu.mjs` rend l'application dans Node à la fin du build et
insère le résultat. Le contenu est donc lisible sans JavaScript et affiché avant que
les 82 ko du bundle ne soient chargés — le navigateur n'attend plus React pour peindre la page.
React s'hydrate ensuite sur ce DOM au lieu de le reconstruire.

Cela impose une contrainte : le premier rendu client doit produire exactement le HTML du build.
C'est vérifiable — le balisage servi est comparé octet pour octet au rendu d'une compilation
fraîche — et c'est ce qui dicte les deux choix suivants.

**Une URL par langue.** Le français est à la racine, l'anglais sous `/en/`, chacun pré-rendu dans
sa langue avec son `<html lang>`, son titre, sa description et son `og:locale`, et chacun déclarant
l'autre en `hreflang`. Chaque langue est ainsi une page à part entière, ce qu'une langue portée
par un état React, sur une seule adresse, interdit.

La langue n'est pas détectée : elle est lue sur `<html lang>`, que le pré-rendu a écrit. Le premier
rendu client est donc déjà le bon, il n'y a rien à corriger après coup, et un visiteur anglophone ne
voit pas le français défiler le temps du chargement. La bascule FR / EN est un vrai lien — suivable
par un moteur, ouvrable dans un onglet — et il reporte l'ancre de la section en cours de lecture,
pour qu'un changement de langue ne fasse pas perdre sa place.

Chaque projet a par ailleurs sa page de cas, au même régime : `/projets/<id>/` en français,
`/projects/<id>/` en anglais, et chacune déclare en `hreflang` **le même projet** dans l'autre
langue, pas l'accueil. Le build produit ainsi une page par couple langue / projet, plus les deux accueils.

Il n'y a pas de routeur. La page à rendre est écrite sur `<html data-projet>` par le pré-rendu et
relue par `entree-client.tsx` : le premier rendu client part du même arbre que le HTML reçu sans
avoir à interpréter l'URL, et la navigation se fait par de vrais liens.

`src/langues.ts` tient l'adresse publique du site et le chemin de chaque langue. Les URL canoniques,
`og:url` et les liens `hreflang` en découlent tous : c'est le seul endroit à changer
pour déployer ailleurs.

**Pages de cas nourries, jamais à trous.** Une page de cas est bâtie sur ce que la carte porte
déjà — le contexte et les réalisations — et s'étoffe du champ facultatif `cas` d'un projet quand il
est rédigé : un chapô, des sections libres, des résultats chiffrés, des captures. Un projet sans
`cas` a donc une page complète, pas une page pleine de vides.

```ts
cas: {
  chapo: 'Une phrase qui pose l’enjeu.',
  chiffres: [{ valeur: '80 %', libelle: 'de temps gagné sur le nettoyage' }],
  sections: [
    { titre: 'La contrainte', paragraphes: ['…'] },
    { titre: 'Ce que j’ai arbitré', paragraphes: ['…', '…'] },
  ],
  images: [{ fichier: 'cas-purge.webp', alt: '…', legende: '…' }],
}
```

Les images se déposent dans `public/` et se citent par leur nom seul. Comme tout le reste, `cas`
est soumis au type `Contenu` : une section ajoutée en français doit l'être en anglais, sinon la
compilation échoue.

**Thème sans clignotement.** Un script inline dans `index.html` applique le thème enregistré avant
le premier rendu, ce qui évite l'éclair blanc au chargement en mode sombre. Toute lecture de
`localStorage` est protégée : le site fonctionne en navigation privée ou site data bloqué.
Comme le thème est connu avant React, c'est le CSS qui choisit l'icône soleil / lune : le balisage
ne dépend pas du thème, ce qui le rend identique au HTML pré-rendu dans les deux cas.

**Accessibilité.** Lien d'évitement, navigation au clavier, contrastes vérifiés dans les deux
thèmes, et `prefers-reduced-motion` respecté.

**Images.** Le portrait est en WebP : la même photographie en PNG pesait 196 ko, soit plus que
tout le reste du site réuni. Le format cible du build (`chrome111`, `safari16.4`) est plus récent
que la prise en charge du WebP, et le CSS emploie déjà `color-mix()` : aucun navigateur capable
d'afficher le site correctement ne manque le WebP, donc pas de `<picture>` de repli à maintenir.
La source reste plus grande que son affichage — un cercle de 205 px — pour rester nette sur les
écrans à forte densité.

`public/apercu.png` fait exception et reste en PNG : elle n'est jamais chargée par le site, seules
les plateformes de partage la récupèrent, et leur prise en charge du WebP est irrégulière.

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
  langues.ts            adresse du site et chemin de chaque langue
  contenu/fr.ts         texte français
  contenu/en.ts         texte anglais
  App.tsx               thème et assemblage des sections
  index.css             mise en forme complète (variables de thème en tête)
  entree-client.tsx     point d'entrée navigateur, hydrate le HTML pré-rendu
  entree-serveur.tsx    point d'entrée du rendu au build
  composants/
    EnTete.tsx          navigation, lien vers l'autre langue, thème, menu mobile
    PageProjet.tsx      page de cas d'un projet
    Hero.tsx  APropos.tsx  Projets.tsx  Parcours.tsx
    Competences.tsx  Contact.tsx  PiedDePage.tsx  Icones.tsx
scripts/
  prerendu.mjs          écrit toutes les pages
```

## Déploiement

Publié sur GitHub Pages par `.github/workflows/deploy.yml`, qui construit et met en ligne le site
à chaque `push` sur `main`. `.github/workflows/ci.yml` lance le lint et le build sur les pull
requests.

Le site étant servi depuis un sous-dossier, `vite.config.ts` fixe `base: '/portfolio/'`. Sans cette
base, les assets seraient demandés à la racine du domaine et la page s'afficherait vide. Pour
déployer ailleurs, retirer `base` et changer `SITE` dans `src/langues.ts`.

**Le site n'a pas vocation à être indexé.** Toutes les pages portent
`<meta name="robots" content="noindex, nofollow">` : il se partage par lien, dans une candidature,
et non par une recherche sur mon nom. Il n'y a donc ni sitemap ni déclaration à un moteur.

C'est une consigne, pas une protection : les moteurs sérieux la respectent, la page reste lisible
par qui l'ignore, et elle demeure publiquement accessible à qui a l'adresse. Les balises `og:`
restent en place — elles servent l'aperçu affiché par LinkedIn et les messageries, qui lisent la
page directement sans consulter aucun index. Les `hreflang` et les URL canoniques restent
également : inertes tant que `noindex` est là, justes le jour où il ne le serait plus.
