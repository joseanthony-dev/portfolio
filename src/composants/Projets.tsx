import type { Contenu, Projet } from '../types'
import { IconeGithub, IconeLien } from './Icones'

function Carte({ projet, t }: { projet: Projet; t: Contenu }) {
  return (
    <article className={`carte ${projet.vedette ? 'carte--vedette' : ''}`}>
      <div className="carte__entete">
        <h3 className="carte__titre">{projet.titre}</h3>
        <span className={`etiquette etiquette--${projet.statut}`}>{t.projets.statuts[projet.statut]}</span>
      </div>

      <p className="carte__periode">{projet.periode}</p>
      <p className="carte__resume">{projet.resume}</p>
      <p className="carte__contexte">{projet.contexte}</p>

      <ul className="carte__points">
        {projet.points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>

      <ul className="technos" aria-label="Technologies">
        {projet.technos.map((techno) => (
          <li key={techno}>{techno}</li>
        ))}
      </ul>

      {projet.liens.length > 0 && (
        <div className="carte__liens">
          {projet.liens.map((lien) => (
            <a key={lien.url} className="lien-externe" href={lien.url} target="_blank" rel="noreferrer noopener">
              {lien.type === 'github' ? <IconeGithub /> : <IconeLien />}
              {lien.label}
            </a>
          ))}
        </div>
      )}
    </article>
  )
}

export function Projets({ t }: { t: Contenu }) {
  return (
    <section className="section" id="projets">
      <div className="section__interieur">
        <h2 className="section__titre">{t.projets.titre}</h2>
        <p className="section__sous-titre">{t.projets.sousTitre}</p>

        <div className="projets__grille">
          {t.projets.liste.map((projet) => (
            <Carte key={projet.id} projet={projet} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
