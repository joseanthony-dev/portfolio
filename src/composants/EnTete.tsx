import { useEffect, useRef, useState } from 'react'
import type { Contenu, Langue } from '../types'
import { IconeLune, IconeSoleil } from './Icones'

type Props = {
  t: Contenu
  langue: Langue
  onLangue: (l: Langue) => void
  theme: 'clair' | 'sombre'
  onTheme: () => void
}

const sections = ['projets', 'parcours', 'competences', 'contact'] as const

export function EnTete({ t, langue, onLangue, theme, onTheme }: Props) {
  const [ouvert, setOuvert] = useState(false)
  const [actif, setActif] = useState<string>('')
  const entete = useRef<HTMLElement>(null)
  const burger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const cibles = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observateur = new IntersectionObserver(
      (entrees) => {
        const visible = entrees
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActif(visible.target.id)
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
            {theme === 'sombre' ? <IconeSoleil /> : <IconeLune />}
          </button>

          <button
            type="button"
            className="bouton-langue"
            onClick={() => onLangue(langue === 'fr' ? 'en' : 'fr')}
            aria-label={t.a11y.changerLangue}
            title={t.a11y.changerLangue}
          >
            <span className={langue === 'fr' ? 'est-actif' : ''}>FR</span>
            <span aria-hidden="true">/</span>
            <span className={langue === 'en' ? 'est-actif' : ''}>EN</span>
          </button>

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
