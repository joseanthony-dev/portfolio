import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import type { Langue } from './types'

// La langue est celle de la page servie, déclarée sur <html> par le pré-rendu :
// le premier rendu client part donc forcément du même contenu que le HTML reçu.
const langue: Langue = document.documentElement.lang === 'en' ? 'en' : 'fr'

// Le HTML est déjà rendu au build (voir scripts/prerendu.mjs) : on l'hydrate
// au lieu de le reconstruire, pour ne pas remplacer un DOM déjà à l'écran.
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <App langue={langue} />
  </StrictMode>,
)
