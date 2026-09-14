*[Version française](README.md)*

# Portfolio — Anthony Jose

Personal site presenting my background, projects and skills in systems, networks and security.

**→ [joseanthony-dev.github.io/portfolio](https://joseanthony-dev.github.io/portfolio/)**

Bilingual French / English — one URL per language —, light and dark themes, responsive, keyboard
accessible.
The site loads **no external resources** at runtime: no Google Fonts, no CDN, no third-party
scripts. Everything is served from the domain, so visiting it sends no request to any third party.

## Stack

TypeScript · Vite 8 · plain CSS (no styling framework) · React **at build time only**

The site is fully static: the build emits HTML, CSS and 1 kB of JavaScript, hostable anywhere.
**No runtime dependencies at all**, React included.

## A few deliberate choices

**Content kept apart from presentation.** Every string lives in `src/contenu/fr.ts` and
`src/contenu/en.ts`, never in a component. Both files must satisfy the same `Contenu` type
(`src/types.ts`): if a translation is missing a field, compilation fails. The two languages
therefore cannot drift apart in silence.

**Rendered at build time.** The pages carry the whole text of the site, not just an empty
`<div id="root">`: `scripts/prerendu.mjs` renders the application under Node at the end of the
build and inserts the result. The content is readable without JavaScript, and painted without
waiting for anything.

**React never leaves the build.** The components in `src/composants/` are there to write the pages,
not to animate them: the browser receives the generated HTML and `src/client.ts`, roughly 1 kB of
plain JavaScript wiring the four interactive behaviours — theme toggle, mobile menu, copying the
address, tracking the section being read. There is no hydration, so no React tree to rebuild or to
reconcile.

The gain is not theoretical: a first visit went from 120 kB down to **29 kB**. The bundle used to
carry React and both languages' content — six projects, their case studies, in French and in
English — in order to attach four click handlers.

**One URL per language.** French sits at the root, English under `/en/`, each prerendered in its
own language with its own `<html lang>`, title, description and `og:locale`, and each declaring the
other through `hreflang`. Each language is a page in its own right, which a language held in React
state on a single address rules out.

The language is not detected: it is read from `<html lang>`, which the prerender wrote. The first
client render is therefore already correct, nothing needs fixing afterwards, and an English-speaking
visitor never watches French go by while the bundle loads. The FR / EN switch is a real link —
crawlable, openable in a new tab — and it carries the anchor of the section being read, so changing
language keeps your place.

Every project also gets its own case-study page under the same regime: `/projets/<id>/` in
French, `/projects/<id>/` in English, each declaring **the same project** in the other language
through `hreflang` rather than the home page. The build therefore emits one page per
language / project pair, plus the two home pages.

There is no router. The page to render is written onto `<html data-projet>` by the prerender and
read back by `entree-client.tsx`: the first client render starts from the same tree as the HTML it
received, without parsing the URL itself, and navigation happens through real links.

`src/langues.ts` holds the site's public address and the path of each language. Canonical URLs,
`og:url` and the `hreflang` links all derive from it: it is the only place to change
when deploying elsewhere.

**Case studies that are filled in, never hollow.** A case-study page is built from what the card
already carries — the context and what was done — and grows with a project's optional `cas` field
once it is written: a standfirst, free-form sections, headline figures, screenshots. A project
without `cas` still gets a complete page rather than a page full of gaps.

```ts
cas: {
  chapo: 'One sentence framing the problem.',
  chiffres: [{ valeur: '80%', libelle: 'less time spent on cleanup' }],
  sections: [
    { titre: 'The constraint', paragraphes: ['…'] },
    { titre: 'What I traded off', paragraphes: ['…', '…'] },
  ],
  images: [{ fichier: 'cas-purge.webp', alt: '…', legende: '…' }],
}
```

Images go in `public/` and are referenced by file name alone. Like everything else, `cas` is bound
by the `Contenu` type: a section added in French must be added in English too, or compilation
fails.

**No theme flash.** An inline script in `index.html` applies the stored theme before the first
render, which avoids the white flash on load in dark mode. Every `localStorage` read is guarded, so
the site works in private browsing or with site data blocked. Since the theme is known before React
runs, CSS picks the sun / moon icon rather than a ternary: the markup does not depend on the theme,
which keeps it identical to the prerendered HTML either way.

**Accessibility.** Skip link, keyboard navigation, contrast checked in both themes, and
`prefers-reduced-motion` honoured. State changes are perceivable by more than sight: the copy
confirmation is announced (`aria-live`), the section being read carries `aria-current` rather than
just a colour, and the theme button announces where it takes you — “Switch to the dark theme” —
rather than some undetermined action.

**A strict security policy.** The site loads nothing from outside, which allows a closed CSP:
`default-src 'self'`, `object-src 'none'`, `base-uri 'none'`, `form-action 'none'`, and neither
`unsafe-inline` nor `unsafe-eval`. The two inline scripts — the theme and the structured data — are
allowed **by SHA-256 hash**, computed at build time over the HTML actually produced rather than
written by hand. A script changed without the policy following would fail the build before anything
is published.

Since GitHub Pages allows no HTTP headers, the policy travels in a `<meta>` tag — hence no
`frame-ancestors` and no `report-uri`, which a tag ignores.

**The build re-reads itself.** `scripts/verifier.mjs` reopens the generated pages and refuses to let
through a dead internal link, an anchor with no target, a wrong `<html lang>`, a canonical that does
not name its own page, an `hreflang` set that fails to reference itself, a page missing `noindex`, or a CSP whose hashes
no longer match the page's scripts. A build that finishes is no proof the site holds together: this
one checks.

**Images.** The portrait is WebP: the same photograph as a PNG weighed 196 kB, more than the whole
rest of the site put together. The build target (`chrome111`, `safari16.4`) is more recent than
WebP support, and the CSS already uses `color-mix()`: no browser able to render the site correctly
lacks WebP, so there is no `<picture>` fallback to maintain. The source stays larger than its
display size — a 205 px circle — to hold up on high-density screens.

`public/apercu.png` is the exception and stays a PNG: the site never loads it, only link-preview
crawlers fetch it, and their WebP support is uneven.

**Styling.** Roughly 12 kB of hand-written CSS, driven by theme variables grouped at the top of
`src/index.css`. Changing the accent colour takes one line.

## Getting started

```bash
npm install
npm run dev        # development server
npm run build      # emits dist/
npm run preview    # serves the compiled dist/
npm run lint
```

Node 22 or newer.

## Layout

The source is written in French, file names included.

```
src/
  types.ts              data contract, guarantor of FR / EN parity
  langues.ts            site address and path of each language
  contenu/fr.ts         French copy
  contenu/en.ts         English copy
  App.tsx               theme, and assembly of the sections
  index.css             all styling (theme variables at the top)
  client.ts             the only JavaScript sent to the browser (~1 kB)
  entree-serveur.tsx    entry point for the build-time render
  composants/
    EnTete.tsx          navigation, link to the other language, theme, mobile menu
    PageProjet.tsx      a project's case-study page
    Hero.tsx  APropos.tsx  Projets.tsx  Parcours.tsx
    Competences.tsx  Contact.tsx  PiedDePage.tsx  Icones.tsx
scripts/
  prerendu.mjs          writes every page and the error page
  verifier.mjs          re-reads the built dist/ and fails the build if it is off
```

## Licence

The code — `src/`, `scripts/`, the configuration — is under the MIT licence. The content and
personal media — `src/contenu/`, `public/`: biography, case studies, CV, portrait — remain all
rights reserved. The detail is in [LICENSE](LICENSE).

The split is deliberate: the code may be of use to someone, my background is not.

## Deployment

Published to GitHub Pages by `.github/workflows/deploy.yml`, which builds and ships the site on
every `push` to `main`. `dist/404.html`, bilingual and without navigation, is served for any missing
address — a dead link takes you home instead of returning GitHub's generic page. `.github/workflows/ci.yml` runs lint and build on pull requests.

Because the site is served from a subdirectory, `vite.config.ts` sets `base: '/portfolio/'`. Without
that base, assets would be requested from the domain root and the page would come up blank. To
deploy elsewhere, drop `base` and change `SITE` in `src/langues.ts`.

**The site is not meant to be indexed.** Every page carries
`<meta name="robots" content="noindex, nofollow">`: it is shared by link, in an application, not
found by searching my name. There is therefore no sitemap and no submission to any search engine.

It is an instruction, not a protection: serious engines honour it, the page stays readable to
anything that does not, and it remains publicly reachable to anyone holding the address. The `og:`
tags stay — they drive the preview LinkedIn and messaging apps show, and those read the page
directly without consulting any index. The `hreflang` links and canonical URLs stay too: inert
while `noindex` is there, correct the day it is not.
