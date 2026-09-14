import type { Contenu, Langue, Projet } from '../types'
import { lienLangue } from '../langues'
import { IconeFleche, IconeGithub, IconeLien } from './Icones'

/**
 * Page de cas d'un projet. Elle est bâtie sur ce que la carte porte déjà — le
 * contexte et les réalisations — et s'étoffe des sections rédigées dans `cas`
 * quand elles existent. Un projet sans `cas` a donc une page complète, jamais
 * une page à trous.
 */
export function PageProjet({ t, langue, projet }: { t: Contenu; langue: Langue; projet: Projet }) {
  const cas = projet.cas

  return (
    <article className="cas">
      <div className="section__interieur">
        <a className="cas__retour" href={`${lienLangue(langue)}#projets`}>
          <IconeFleche />
          {t.projets.cas.retour}
        </a>

        <header className="cas__entete">
          <div className="cas__meta">
            <span className={`etiquette etiquette--${projet.statut}`}>
              {t.projets.statuts[projet.statut]}
            </span>
            <span className="cas__periode">{projet.periode}</span>
          </div>
          <h1 className="cas__titre">{projet.titre}</h1>
          <p className="cas__resume">{cas?.chapo ?? projet.resume}</p>
        </header>

        {cas?.chiffres && cas.chiffres.length > 0 && (
          <section className="cas__chiffres" aria-label={t.projets.cas.chiffres}>
            {cas.chiffres.map((c) => (
              <div className="chiffre" key={c.libelle}>
                <strong className="chiffre__valeur">{c.valeur}</strong>
                <span className="chiffre__libelle">{c.libelle}</span>
              </div>
            ))}
          </section>
        )}

        <div className="cas__corps">
          <section className="cas__section">
            <h2>{t.projets.cas.contexte}</h2>
            <p>{projet.contexte}</p>
          </section>

          <section className="cas__section">
            <h2>{t.projets.cas.realisations}</h2>
            <ul className="cas__points">
              {projet.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </section>

          {cas?.sections.map((section) => (
            <section className="cas__section" key={section.titre}>
              <h2>{section.titre}</h2>
              {section.paragraphes.map((paragraphe, i) => (
                <p key={i}>{paragraphe}</p>
              ))}
            </section>
          ))}

          {cas?.images?.map((image) => (
            <figure className="cas__figure" key={image.fichier}>
              <img
                src={`${import.meta.env.BASE_URL}${image.fichier}`}
                alt={image.alt}
                loading="lazy"
                decoding="async"
              />
              {image.legende && <figcaption>{image.legende}</figcaption>}
            </figure>
          ))}
        </div>

        <footer className="cas__pied">
          <ul className="technos" aria-label={t.projets.technosLabel}>
            {projet.technos.map((techno) => (
              <li key={techno}>{techno}</li>
            ))}
          </ul>

          {projet.liens.length > 0 && (
            <div className="carte__liens">
              {projet.liens.map((lien) => (
                <a
                  key={lien.url}
                  className="lien-externe"
                  href={lien.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {lien.type === 'github' ? <IconeGithub /> : <IconeLien />}
                  {lien.label}
                </a>
              ))}
            </div>
          )}
        </footer>
      </div>
    </article>
  )
}
