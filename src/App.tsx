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

// Ces deux fonctions touchent au navigateur : elles ne sont appelées qu'après
// l'hydratation, jamais pendant le rendu au build.

function litLangue(): Langue {
  try {
    const stockee = localStorage.getItem('langue')
    if (stockee === 'fr' || stockee === 'en') return stockee
  } catch {
    // localStorage indisponible : on retombe sur la langue du navigateur.
  }
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

// Le script inline d'index.html a déjà résolu le thème avant le premier rendu :
// on relit sa décision plutôt que de refaire la détection, ce qui garantit que
// l'état React et l'attribut sur <html> partent d'accord dès le départ. Aucun
// élément du balisage ne dépend du thème, donc lire cette valeur pendant le
// rendu ne met pas l'hydratation en défaut.
function litTheme(): Theme {
  if (typeof document === 'undefined') return 'clair'
  return document.documentElement.dataset.theme === 'sombre' ? 'sombre' : 'clair'
}

export default function App() {
  // Le HTML pré-rendu au build est en français : le premier rendu client doit dire
  // la même chose, sinon l'hydratation trouve un DOM qu'elle n'a pas produit. La
  // préférence réelle est lue juste après, une fois l'hydratation faite.
  const [langue, setLangue] = useState<Langue>('fr')
  const [theme, setTheme] = useState<Theme>(litTheme)
  const [prefsLues, setPrefsLues] = useState(false)
  const t = contenus[langue]

  // Un setState dans un effet, volontairement : la préférence de langue vit dans
  // le navigateur, et la lire pendant le rendu donnerait un premier rendu client
  // différent du HTML pré-rendu. L'effet est le seul moment où l'hydratation est
  // terminée et où l'on peut donc s'écarter du français du build.
  useEffect(() => {
    // eslint-disable-next-line react/set-state-in-effect
    setLangue(litLangue())
    // eslint-disable-next-line react/set-state-in-effect
    setPrefsLues(true)
  }, [])

  // Tant que la préférence n'est pas lue, `langue` vaut le français du pré-rendu :
  // l'écrire dans localStorage écraserait un choix « en » encore non chargé.
  useEffect(() => {
    if (!prefsLues) return
    document.documentElement.lang = langue
    document.title = t.meta.titre
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    try {
      localStorage.setItem('langue', langue)
    } catch {
      // préférence non persistée, sans conséquence pour l'affichage
    }
  }, [langue, prefsLues, t])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', couleurBarre[theme])
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // idem
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
        onLangue={setLangue}
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
