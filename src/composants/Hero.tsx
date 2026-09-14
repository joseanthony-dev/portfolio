import type { Contenu } from '../types'
import { IconeMail, IconeTelechargement } from './Icones'

export function Hero({ t }: { t: Contenu }) {
  return (
    <section className="hero" id="haut">
      <div className="hero__grille" aria-hidden="true" />
      <div className="section__interieur hero__interieur">
        <div className="hero__texte">
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
          {/* `hrefLang` porte la langue du document, qui n'est pas forcément
              celle de la page : le libellé le dit déjà à l'écran, ceci le dit
              aux technologies d'assistance. */}
          <a
            className="bouton bouton--discret"
            href={`${import.meta.env.BASE_URL}${t.hero.cv.fichier}`}
            hrefLang={t.hero.cv.langue}
            download
          >
            <IconeTelechargement />
            {t.hero.ctaCv}
          </a>
        </div>
        </div>

        {/* Le plus gros élément peint de la page, et le seul à télécharger avant
            que le hero soit complet : on le sort en priorité haute. Les
            dimensions sont déclarées pour réserver la place et éviter que le
            texte ne saute quand l'image arrive. */}
        <img
          className="hero__photo"
          src={`${import.meta.env.BASE_URL}photo.webp`}
          alt={t.hero.photoAlt}
          width={308}
          height={461}
          fetchPriority="high"
          decoding="async"
        />
      </div>
    </section>
  )
}
