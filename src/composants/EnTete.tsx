import type { Contenu, Langue } from '../types'
import { AUTRE, lienLangue, lienProjet } from '../langues'
import { IconeLune, IconeSoleil } from './Icones'

type Props = {
  t: Contenu
  langue: Langue
  /** Identifiant du projet quand on est sur sa page de cas, sinon rien. */
  projet?: string
}

const sections = ['projets', 'parcours', 'competences', 'contact'] as const

// Composant sans état : il n'est rendu qu'au build. Tout ce qui bouge — menu,
// thème, section active — est repris côté navigateur par src/client.ts, qui
// agit sur ce balisage plutôt que de le reconstruire.
export function EnTete({ t, langue, projet }: Props) {
  // Les sections de la navigation vivent sur l'accueil. Depuis une page de cas,
  // leurs ancres doivent donc être précédées de l'adresse de l'accueil, sans quoi
  // elles pointeraient sur des identifiants absents de la page.
  const accueil = lienLangue(langue)
  const versSection = (id: string) => (projet ? `${accueil}#${id}` : `#${id}`)

  return (
    <header className="entete">
      <div className="entete__contenu">
        <a className="entete__marque" href={projet ? accueil : '#haut'} aria-label={t.hero.nom}>
          <span className="entete__initiales" aria-hidden="true">
            AJ
          </span>
          <span className="entete__nom" aria-hidden="true">
            {t.hero.nom}
          </span>
        </a>

        <nav id="nav-principale" className="entete__nav" aria-label={t.a11y.menu}>
          {sections.map((id) => (
            <a key={id} href={versSection(id)} data-section={id}>
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="entete__actions">
          {/* Le libellé annonce la destination, pas l'action : « Passer au thème
              sombre » dit à la fois ce que fait le bouton et où l'on se trouve.
              client.ts le réaligne au démarrage, le thème réel pouvant différer
              de celui du pré-rendu, puis l'échange à chaque bascule. */}
          <button
            type="button"
            className="bouton-icone"
            data-bascule-theme
            aria-label={t.a11y.themeSombre}
            title={t.a11y.themeSombre}
            data-vers-sombre={t.a11y.themeSombre}
            data-vers-clair={t.a11y.themeClair}
          >
            {/* Les deux icônes sont dans le HTML ; le CSS montre celle qui
                correspond au thème déjà posé sur <html>, donc elle est juste
                dès le HTML pré-rendu, sans attendre le moindre script. */}
            <IconeSoleil className="icone-theme icone-theme--sombre" />
            <IconeLune className="icone-theme icone-theme--clair" />
          </button>

          {/* Chaque langue est une page à part : la bascule est un vrai lien,
              ce qui la rend suivable et ouvrable dans un onglet. Sur l'accueil,
              client.ts y reporte l'ancre de la section lue. */}
          <a
            className="bouton-langue"
            href={projet ? lienProjet(AUTRE[langue], projet) : lienLangue(AUTRE[langue])}
            hrefLang={AUTRE[langue]}
            data-lien-langue
            aria-label={t.a11y.changerLangue}
            title={t.a11y.changerLangue}
          >
            <span className={langue === 'fr' ? 'est-actif' : ''}>FR</span>
            <span aria-hidden="true">/</span>
            <span className={langue === 'en' ? 'est-actif' : ''}>EN</span>
          </a>

          <button
            type="button"
            className="bouton-icone entete__burger"
            data-bascule-menu
            aria-expanded="false"
            aria-controls="nav-principale"
            aria-label={t.a11y.ouvrirMenu}
            data-ouvrir={t.a11y.ouvrirMenu}
            data-fermer={t.a11y.fermerMenu}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path className="burger-ouvrir" d="M4 7h16M4 12h16M4 17h16" />
              <path className="burger-fermer" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
