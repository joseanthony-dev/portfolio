import { contenus } from '../contenu'
import { LANGUES, lienLangue } from '../langues'
import { IconeFleche } from './Icones'

/**
 * Servie par GitHub Pages pour toute adresse absente, quelle que soit la langue
 * visée — il n'y a qu'un fichier 404 pour tout le site. Elle s'adresse donc aux
 * deux publics à la fois, plutôt que de deviner.
 *
 * Volontairement dépouillée : ni navigation ni pied de page. Depuis une adresse
 * qui n'existe pas, la seule chose utile est de revenir quelque part.
 */
export function Page404() {
  return (
    <main id="contenu" className="erreur" tabIndex={-1}>
      <div className="section__interieur erreur__contenu">
        <span className="erreur__code" aria-hidden="true">
          404
        </span>

        {LANGUES.map((langue) => {
          const t = contenus[langue]
          return (
            <section className="erreur__langue" key={langue} lang={langue}>
              {langue === LANGUES[0] ? (
                <h1 className="erreur__titre">{t.erreur.titre}</h1>
              ) : (
                <h2 className="erreur__titre">{t.erreur.titre}</h2>
              )}
              <p className="erreur__message">{t.erreur.message}</p>
              <a className="bouton bouton--principal" href={lienLangue(langue)}>
                <IconeFleche />
                {t.erreur.retour}
              </a>
            </section>
          )
        })}
      </div>
    </main>
  )
}
