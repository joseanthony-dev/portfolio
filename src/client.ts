import './index.css'

// Tout le contenu du site est déjà dans le HTML, écrit au build. Ce fichier ne
// rend rien : il branche les quatre comportements qui demandent du JavaScript,
// et rien d'autre. Le site reste entièrement lisible s'il ne s'exécute pas.

const racine = document.documentElement

// Doit rester aligné sur --fond dans src/index.css : c'est la couleur que les
// navigateurs mobiles appliquent à leur barre d'adresse.
const couleurBarre = { clair: '#fbfaf8', sombre: '#0d1013' } as const

/* ── Thème ──────────────────────────────────────────────────────────────── */

// Le script inline d'index.html a déjà posé le thème avant le premier rendu :
// on ne fait que le basculer, sans jamais avoir à le deviner.
document.querySelector<HTMLButtonElement>('[data-bascule-theme]')?.addEventListener('click', () => {
  const theme = racine.dataset.theme === 'sombre' ? 'clair' : 'sombre'
  racine.dataset.theme = theme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', couleurBarre[theme])
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // préférence non persistée, sans conséquence pour l'affichage
  }
})

/* ── Menu mobile ────────────────────────────────────────────────────────── */

const entete = document.querySelector('.entete')
const burger = document.querySelector<HTMLButtonElement>('[data-bascule-menu]')
const nav = document.getElementById('nav-principale')

function menu(ouvert: boolean) {
  if (!burger || !nav) return
  burger.setAttribute('aria-expanded', String(ouvert))
  burger.setAttribute('aria-label', (ouvert ? burger.dataset.fermer : burger.dataset.ouvrir) ?? '')
  nav.classList.toggle('entete__nav--ouverte', ouvert)
}

burger?.addEventListener('click', () => menu(burger.getAttribute('aria-expanded') !== 'true'))
nav?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => menu(false)))

// Échap referme et rend le focus au bouton ; un clic hors de l'en-tête referme.
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && burger?.getAttribute('aria-expanded') === 'true') {
    menu(false)
    burger.focus()
  }
})
document.addEventListener('pointerdown', (e) => {
  if (burger?.getAttribute('aria-expanded') === 'true' && !entete?.contains(e.target as Node)) {
    menu(false)
  }
})

/* ── Copie de l'adresse ─────────────────────────────────────────────────── */

const copie = document.querySelector<HTMLButtonElement>('[data-copier]')
const libelle = copie?.querySelector('.contact__copie-libelle')

copie?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copie.dataset.copier ?? '')
  } catch {
    // Presse-papiers indisponible (contexte non sécurisé, permission refusée) :
    // le lien mailto juste à côté reste utilisable, on ne fait rien de plus.
    return
  }
  copie.classList.add('est-copie')
  if (libelle) libelle.textContent = copie.dataset.libelleOk ?? ''
  window.setTimeout(() => {
    copie.classList.remove('est-copie')
    if (libelle) libelle.textContent = copie.dataset.libelle ?? ''
  }, 2000)
})

/* ── Section lue ────────────────────────────────────────────────────────── */

const liens = [...document.querySelectorAll<HTMLAnchorElement>('[data-section]')]
const lienLangue = document.querySelector<HTMLAnchorElement>('[data-lien-langue]')
const cibles = liens
  .map((a) => document.getElementById(a.dataset.section!))
  .filter((el): el is HTMLElement => el !== null)

if (cibles.length > 0 && lienLangue) {
  const versAutreLangue = lienLangue.getAttribute('href') ?? ''

  // L'observateur ne rapporte que les sections dont la visibilité a changé, pas
  // l'état complet : on tient donc nous-mêmes la liste de celles qui croisent la
  // bande centrale, sans quoi on ne saurait jamais qu'il n'y en a plus aucune —
  // au-dessus de « Projets », dans le hero ou À propos.
  const croisent = new Map<string, number>()

  const observateur = new IntersectionObserver(
    (entrees) => {
      for (const e of entrees) {
        if (e.isIntersecting) croisent.set(e.target.id, e.intersectionRatio)
        else croisent.delete(e.target.id)
      }
      let actif = ''
      let ratio = -1
      for (const [id, r] of croisent) {
        if (r > ratio) [actif, ratio] = [id, r]
      }
      for (const a of liens) a.classList.toggle('est-actif', a.dataset.section === actif)
      // Changer de langue recharge la page : on y reporte l'ancre de la section
      // lue, les identifiants étant les mêmes des deux côtés.
      lienLangue.setAttribute('href', actif ? `${versAutreLangue}#${actif}` : versAutreLangue)
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
  )
  cibles.forEach((c) => observateur.observe(c))
}
