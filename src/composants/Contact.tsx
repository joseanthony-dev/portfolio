import { useState } from 'react'
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
  const [copie, setCopie] = useState(false)

  async function copierEmail() {
    try {
      await navigator.clipboard.writeText(t.contact.email)
      setCopie(true)
      window.setTimeout(() => setCopie(false), 2000)
    } catch {
      // Presse-papiers indisponible (contexte non sécurisé, permission refusée) :
      // le lien mailto reste utilisable, on ne fait rien de plus.
    }
  }

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
          <button type="button" className="bouton bouton--discret" onClick={copierEmail}>
            {copie ? <IconeCheck /> : <IconeCopie />}
            {copie ? t.contact.copie_ok : t.contact.copie}
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
