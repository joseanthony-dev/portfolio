import type { Contenu } from '../types'
import {
  IconeCheck,
  IconeCopie,
  IconeGithub,
  IconeLien,
  IconeLieu,
  IconeLinkedin,
  IconeMail,
  IconeTelephone,
} from './Icones'

export function Contact({ t }: { t: Contenu }) {
  return (
    <section className="section section--alternee" id="contact">
      <div className="section__interieur contact">
        <h2 className="section__titre">{t.contact.titre}</h2>
        <p className="section__sous-titre">{t.contact.accroche}</p>

        <div className="contact__bloc">
          <a className="contact__email" href={`mailto:${t.contact.email}`}>
            <IconeMail />
            {t.contact.email}
          </a>
          {/* Les deux icônes sont présentes ; client.ts bascule une classe et
              échange le libellé, plutôt que de reconstruire le bouton. Si le
              presse-papiers est indisponible, le lien mailto reste utilisable. */}
          <button
            type="button"
            className="bouton bouton--discret contact__copie"
            data-copier={t.contact.email}
            data-libelle={t.contact.copie}
            data-libelle-ok={t.contact.copie_ok}
          >
            <IconeCopie className="icone-copie" />
            <IconeCheck className="icone-check" />
            <span className="contact__copie-libelle">{t.contact.copie}</span>
          </button>
        </div>

        {t.contact.telephone && (
          <p className="contact__ligne">
            <IconeTelephone />
            <a href={`tel:${t.contact.telephone.replace(/\s/g, '')}`}>{t.contact.telephone}</a>
          </p>
        )}

        <p className="contact__ligne">
          <IconeLieu />
          {t.contact.localisation}
        </p>

        <div className="contact__reseaux">
          {t.contact.liens.map((lien) => (
            <a key={lien.url} className="bouton bouton--secondaire" href={lien.url} target="_blank" rel="noreferrer noopener">
              {lien.type === 'github' ? <IconeGithub /> : lien.type === 'linkedin' ? <IconeLinkedin /> : <IconeLien />}
              {lien.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
