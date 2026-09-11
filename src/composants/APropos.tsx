import type { Contenu } from '../types'

export function APropos({ t }: { t: Contenu }) {
  return (
    <section className="section section--apropos" id="apropos">
      <div className="section__interieur">
        <h2 className="section__titre">{t.apropos.titre}</h2>
        <div className="apropos__texte">
          {t.apropos.paragraphes.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
