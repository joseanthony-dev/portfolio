import { useEffect, useState } from 'react'
import type { Langue } from './types'
import { contenus } from './contenu'
import { EnTete } from './composants/EnTete'
import { Hero } from './composants/Hero'
import { APropos } from './composants/APropos'
import { Projets } from './composants/Projets'
import { Parcours } from './composants/Parcours'
import { Competences } from './composants/Competences'
import { Contact } from './composants/Contact'
import { PiedDePage } from './composants/PiedDePage'

type Theme = 'clair' | 'sombre'

function litLangue(): Langue {
  try {
    const stockee = localStorage.getItem('langue')
    if (stockee === 'fr' || stockee === 'en') return stockee
  } catch {
    // localStorage indisponible : on retombe sur la langue du navigateur.
  }
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

function litTheme(): Theme {
  try {
    const stocke = localStorage.getItem('theme')
    if (stocke === 'clair' || stocke === 'sombre') return stocke
  } catch {
    // idem : on suit la préférence système.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'sombre' : 'clair'
}

export default function App() {
  const [langue, setLangue] = useState<Langue>(litLangue)
  const [theme, setTheme] = useState<Theme>(litTheme)
  const t = contenus[langue]

  useEffect(() => {
    document.documentElement.lang = langue
    document.title = t.meta.titre
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    try {
      localStorage.setItem('langue', langue)
    } catch {
      // préférence non persistée, sans conséquence pour l'affichage
    }
  }, [langue, t])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // idem
    }
  }, [theme])

  return (
    <>
      <a className="lien-evitement" href="#projets">
        {langue === 'fr' ? 'Aller au contenu' : 'Skip to content'}
      </a>

      <EnTete
        t={t}
        langue={langue}
        onLangue={setLangue}
        theme={theme}
        onTheme={() => setTheme((v) => (v === 'clair' ? 'sombre' : 'clair'))}
      />

      <main>
        <Hero t={t} />
        <APropos t={t} />
        <Projets t={t} />
        <Parcours t={t} />
        <Competences t={t} />
        <Contact t={t} />
      </main>

      <PiedDePage t={t} />
    </>
  )
}
