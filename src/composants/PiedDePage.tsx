import type { Contenu } from '../types'

export function PiedDePage({ t }: { t: Contenu }) {
  return (
    <footer className="pied">
      <div className="section__interieur pied__contenu">
        <p>
          © {new Date().getFullYear()} {t.pied.droits}
        </p>
        <p>{t.pied.construitAvec}</p>
      </div>
    </footer>
  )
}
