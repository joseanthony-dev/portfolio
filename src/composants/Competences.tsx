import type { Contenu } from '../types'

export function Competences({ t }: { t: Contenu }) {
  return (
    <section className="section" id="competences">
      <div className="section__interieur">
        <h2 className="section__titre">{t.competences.titre}</h2>
        <p className="section__sous-titre">{t.competences.sousTitre}</p>

        <div className="competences__grille">
          {t.competences.groupes.map((groupe) => (
            <div className="competences__groupe" key={groupe.categorie}>
              <h3>{groupe.categorie}</h3>
              <ul className="technos">
                {groupe.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
