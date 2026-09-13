import type { Contenu } from '../types'
import { IconeMail, IconeTelechargement } from './Icones'

export function Hero({ t }: { t: Contenu }) {
  return (
    <section className="hero" id="haut">
      <div className="hero__grille" aria-hidden="true" />
      <div className="section__interieur hero__interieur">
        <p className="hero__salutation">{t.hero.salutation}</p>
        <h1 className="hero__nom">{t.hero.nom}</h1>
        <p className="hero__titre">{t.hero.titre}</p>
        <p className="hero__accroche">{t.hero.accroche}</p>

        <p className="hero__dispo">
          <span className="pastille" aria-hidden="true" />
          {t.hero.recherche}
        </p>

        <div className="hero__actions">
          <a className="bouton bouton--principal" href="#projets">
            {t.hero.ctaProjets}
          </a>
          <a className="bouton bouton--secondaire" href="#contact">
            <IconeMail />
            {t.hero.ctaContact}
          </a>
          <a className="bouton bouton--discret" href={`${import.meta.env.BASE_URL}cv.pdf`} download>
            <IconeTelechargement />
            {t.hero.ctaCv}
          </a>
        </div>
      </div>
    </section>
  )
}
