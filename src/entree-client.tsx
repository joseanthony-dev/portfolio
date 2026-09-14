import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import type { Langue } from './types'

// La langue et la page sont celles du document servi, toutes deux déclarées sur
// <html> par le pré-rendu : le premier rendu client part donc forcément du même
// contenu que le HTML reçu, sans interpréter l'URL de son côté.
const racine = document.documentElement
const langue: Langue = racine.lang === 'en' ? 'en' : 'fr'
const projet = racine.dataset.projet

// Le HTML est déjà rendu au build (voir scripts/prerendu.mjs) : on l'hydrate
// au lieu de le reconstruire, pour ne pas remplacer un DOM déjà à l'écran.
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <App langue={langue} projet={projet} />
  </StrictMode>,
)
