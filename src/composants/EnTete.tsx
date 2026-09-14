import { useEffect, useRef, useState } from 'react'
import type { Contenu, Langue } from '../types'
import { AUTRE, lienLangue } from '../langues'
import { IconeLune, IconeSoleil } from './Icones'

type Props = {
  t: Contenu
  langue: Langue
  onTheme: () => void
}

const sections = ['projets', 'parcours', 'competences', 'contact'] as const

export function EnTete({ t, langue, onTheme }: Props) {
  const [ouvert, setOuvert] = useState(false)
  const [actif, setActif] = useState<string>('')
  const entete = useRef<HTMLElement>(null)
  const burger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const cibles = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    // L'observateur ne rapporte que les sections dont la visibilité a changé, pas
    // l'état complet : on tient donc nous-mêmes la liste de celles qui croisent
    // la bande centrale, sans quoi on ne saurait jamais qu'il n'y en a plus
    // aucune — au-dessus de « Projets », dans le hero ou À propos.
    const croisent = new Map<string, number>()

    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (e.isIntersecting) croisent.set(e.target.id, e.intersectionRatio)
          else croisent.delete(e.target.id)
        }
        let meilleur = ''
        let ratio = -1
        for (const [id, r] of croisent) {
          if (r > ratio) [meilleur, ratio] = [id, r]
        }
        setActif(meilleur)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    cibles.forEach((c) => observateur.observe(c))
    return () => observateur.disconnect()
  }, [])

  // Menu mobile ouvert : Échap le referme et rend le focus au bouton,
  // un clic en dehors de l'en-tête le referme aussi.
  useEffect(() => {
    if (!ouvert) return

    function surTouche(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOuvert(false)
        burger.current?.focus()
      }
    }
    function surClic(e: MouseEvent) {
      if (!entete.current?.contains(e.target as Node)) setOuvert(false)
    }

    document.addEventListener('keydown', surTouche)
    document.addEventListener('pointerdown', surClic)
    return () => {
      document.removeEventListener('keydown', surTouche)
      document.removeEventListener('pointerdown', surClic)
    }
  }, [ouvert])

  return (
    <header className="entete" ref={entete}>
      <div className="entete__contenu">
        <a className="entete__marque" href="#haut" aria-label={t.hero.nom}>
          <span className="entete__initiales" aria-hidden="true">
            AJ
          </span>
          <span className="entete__nom" aria-hidden="true">
            {t.hero.nom}
          </span>
        </a>

        <nav
          id="nav-principale"
          className={`entete__nav ${ouvert ? 'entete__nav--ouverte' : ''}`}
          aria-label={t.a11y.menu}
        >
          {sections.map((id) => (
            <a key={id} href={`#${id}`} className={actif === id ? 'est-actif' : ''} onClick={() => setOuvert(false)}>
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="entete__actions">
          <button type="button" className="bouton-icone" onClick={onTheme} aria-label={t.a11y.changerTheme} title={t.a11y.changerTheme}>
            {/* Les deux icônes sont dans le HTML ; le CSS montre celle qui
                correspond au thème déjà posé sur <html>, donc elle est juste
                dès le HTML pré-rendu, sans attendre React. */}
            <IconeSoleil className="icone-theme icone-theme--sombre" />
            <IconeLune className="icone-theme icone-theme--clair" />
          </button>

          {/* Chaque langue est une page à part : la bascule est un vrai lien,
              ce qui la rend suivable par un moteur et ouvrable dans un onglet.
              L'ancre de la section lue y est reportée — les identifiants sont les
              mêmes dans les deux langues — pour retrouver sa place après le
              changement de page. Vide au premier rendu, donc identique au HTML
              pré-rendu, et les moteurs ne voient que l'URL propre. */}
          <a
            className="bouton-langue"
            href={actif ? `${lienLangue(AUTRE[langue])}#${actif}` : lienLangue(AUTRE[langue])}
            hrefLang={AUTRE[langue]}
            aria-label={t.a11y.changerLangue}
            title={t.a11y.changerLangue}
          >
            <span className={langue === 'fr' ? 'est-actif' : ''}>FR</span>
            <span aria-hidden="true">/</span>
            <span className={langue === 'en' ? 'est-actif' : ''}>EN</span>
          </a>

          <button
            type="button"
            ref={burger}
            className="bouton-icone entete__burger"
            onClick={() => setOuvert((o) => !o)}
            aria-expanded={ouvert}
            aria-controls="nav-principale"
            aria-label={ouvert ? t.a11y.fermerMenu : t.a11y.ouvrirMenu}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {ouvert ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
