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

// Rendu une seule fois, au build, par scripts/prerendu.mjs. Rien de tout ceci
// n'atteint le navigateur : il reçoit le HTML produit et src/client.ts, qui se
// contente d'y brancher les quelques comportements interactifs.
//
// La langue et la page viennent toutes deux de l'URL : chaque combinaison est
// pré-rendue à part, avec son <html lang> et ses métadonnées. Il n'y a donc pas
// de routeur — `projet` dit simplement quoi rendre dans <main>.
export default function App({ langue, projet }: { langue: Langue; projet?: string }) {
  const t = contenus[langue]
  const cas = projet ? t.projets.liste.find((p) => p.id === projet) : undefined

  return (
    <>
      <a className="lien-evitement" href="#contenu">
        {t.a11y.allerAuContenu}
      </a>

      <EnTete t={t} langue={langue} projet={cas?.id} />

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
