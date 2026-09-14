import type { Contenu } from '../types'

// Sans année : le composant n'est rendu qu'au build, donc `new Date()` donnait
// l'année de la dernière mise en ligne et non celle de la visite. Une année figée
// finit par être fausse, et un portfolio daté de deux ans en arrière se lit comme
// un site abandonné. La mention vaut sans millésime.
export function PiedDePage({ t }: { t: Contenu }) {
  return (
    <footer className="pied">
      <div className="section__interieur pied__contenu">
        <p>© {t.pied.droits}</p>
        <p>{t.pied.construitAvec}</p>
      </div>
    </footer>
  )
}
