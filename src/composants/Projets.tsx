import type { Contenu, Langue, Projet } from '../types'
import { lienProjet } from '../langues'
import { IconeFleche, IconeGithub, IconeLien } from './Icones'

function Carte({ projet, t, langue }: { projet: Projet; t: Contenu; langue: Langue }) {
  const page = lienProjet(langue, projet.id)

  return (
    <article className={`carte ${projet.vedette ? 'carte--vedette' : ''}`}>
      <div className="carte__entete">
        <h3 className="carte__titre">
          <a href={page}>{projet.titre}</a>
        </h3>
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

      <ul className="technos" aria-label={t.projets.technosLabel}>
        {projet.technos.map((techno) => (
          <li key={techno}>{techno}</li>
        ))}
      </ul>

      <div className="carte__liens">
        {/* Le titre mène déjà au cas ; ce lien-ci porte le nom du projet dans son
            libellé accessible, pour ne pas s'annoncer comme un « Lire le cas »
            isolé de tout contexte. */}
        <a className="carte__cas" href={page} aria-label={`${t.projets.cas.lire} — ${projet.titre}`}>
          {t.projets.cas.lire}
          <IconeFleche className="icone-miroir" />
        </a>

        {projet.liens.map((lien) => (
          <a key={lien.url} className="lien-externe" href={lien.url} target="_blank" rel="noreferrer noopener">
            {lien.type === 'github' ? <IconeGithub /> : <IconeLien />}
            {lien.label}
          </a>
        ))}
      </div>
    </article>
  )
}

export function Projets({ t, langue }: { t: Contenu; langue: Langue }) {
  return (
    <section className="section" id="projets">
      <div className="section__interieur">
        <h2 className="section__titre">{t.projets.titre}</h2>
        <p className="section__sous-titre">{t.projets.sousTitre}</p>

        <div className="projets__grille">
          {t.projets.liste.map((projet) => (
            <Carte key={projet.id} projet={projet} t={t} langue={langue} />
          ))}
        </div>
      </div>
    </section>
  )
}
