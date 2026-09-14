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

// Doit rester aligné sur --fond dans src/index.css : c'est la couleur que
// les navigateurs mobiles appliquent à leur barre d'adresse.
const couleurBarre: Record<Theme, string> = { clair: '#fbfaf8', sombre: '#0d1013' }

// Le script inline d'index.html a déjà résolu le thème avant le premier rendu :
// on relit sa décision plutôt que de refaire la détection, ce qui garantit que
// l'état React et l'attribut sur <html> partent d'accord dès le départ. Aucun
// élément du balisage ne dépend du thème, donc lire cette valeur pendant le
// rendu ne met pas l'hydratation en défaut.
function litTheme(): Theme {
  if (typeof document === 'undefined') return 'clair'
  return document.documentElement.dataset.theme === 'sombre' ? 'sombre' : 'clair'
}

// La langue vient de l'URL : chaque version est une page à part, pré-rendue dans
// sa langue, avec son <html lang> et ses métadonnées. Rien à détecter ni à
// corriger après coup — le premier rendu client est déjà le bon.
export default function App({ langue }: { langue: Langue }) {
  const [theme, setTheme] = useState<Theme>(litTheme)
  const t = contenus[langue]

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', couleurBarre[theme])
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // préférence non persistée, sans conséquence pour l'affichage
    }
  }, [theme])

  return (
    <>
      <a className="lien-evitement" href="#contenu">
        {t.a11y.allerAuContenu}
      </a>

      <EnTete
        t={t}
        langue={langue}
        onTheme={() => setTheme((v) => (v === 'clair' ? 'sombre' : 'clair'))}
      />

      <main id="contenu" tabIndex={-1}>
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
