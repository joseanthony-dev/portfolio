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
import { PageProjet } from './composants/PageProjet'
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

// La langue et la page viennent toutes deux de l'URL : chaque combinaison est
// pré-rendue à part, avec son <html lang> et ses métadonnées. Rien à détecter ni
// à corriger après coup — le premier rendu client est déjà le bon, et il n'y a
// donc pas de routeur : `projet` dit simplement quoi rendre dans <main>.
export default function App({ langue, projet }: { langue: Langue; projet?: string }) {
  const [theme, setTheme] = useState<Theme>(litTheme)
  const t = contenus[langue]
  const cas = projet ? t.projets.liste.find((p) => p.id === projet) : undefined

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
        projet={cas?.id}
        onTheme={() => setTheme((v) => (v === 'clair' ? 'sombre' : 'clair'))}
      />

      <main id="contenu" tabIndex={-1}>
        {cas ? (
          <PageProjet t={t} langue={langue} projet={cas} />
        ) : (
          <>
            <Hero t={t} />
            <APropos t={t} />
            <Projets t={t} langue={langue} />
            <Parcours t={t} />
            <Competences t={t} />
            <Contact t={t} />
          </>
        )}
      </main>

      <PiedDePage t={t} />
    </>
  )
}
