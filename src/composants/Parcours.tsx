import type { Contenu } from '../types'

export function Parcours({ t }: { t: Contenu }) {
  return (
    <section className="section section--alternee" id="parcours">
      <div className="section__interieur">
        <h2 className="section__titre">{t.parcours.titre}</h2>

        <div className="parcours__colonnes">
          <div>
            <h3 className="parcours__sous-titre">{t.parcours.experienceTitre}</h3>
            <ol className="frise">
              {t.parcours.experiences.map((poste, i) => (
                <li key={i} className="frise__element">
                  <div className="frise__periode">{poste.periode}</div>
                  <h4 className="frise__titre">{poste.titre}</h4>
                  <p className="frise__organisation">
                    {poste.organisation}
                    {poste.lieu ? ` — ${poste.lieu}` : ''}
                  </p>
                  <ul className="frise__details">
                    {poste.details.map((detail, j) => (
                      <li key={j}>{detail}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="parcours__sous-titre">{t.parcours.formationTitre}</h3>
            <ol className="frise">
              {t.parcours.formations.map((formation, i) => (
                <li key={i} className="frise__element">
                  <div className="frise__periode">{formation.periode}</div>
                  <h4 className="frise__titre">{formation.diplome}</h4>
                  <p className="frise__organisation">
                    {formation.etablissement}
                    {formation.lieu ? ` — ${formation.lieu}` : ''}
                  </p>
                  <ul className="frise__details">
                    {formation.details.map((detail, j) => (
                      <li key={j}>{detail}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <h3 className="parcours__sous-titre parcours__sous-titre--large">
          {t.parcours.certificationsTitre}
        </h3>
        <ul className="certifications">
          {t.parcours.certifications.map((certif, i) => (
            <li key={i} className="certification">
              <div className="frise__periode">{certif.periode}</div>
              <h4 className="frise__titre">{certif.intitule}</h4>
              <p className="frise__organisation">{certif.organisme}</p>
              <ul className="frise__details">
                {certif.details.map((detail, j) => (
                  <li key={j}>{detail}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
