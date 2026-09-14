import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Le HTML est déjà rendu au build (voir scripts/prerendu.mjs) : on l'hydrate
// au lieu de le reconstruire, pour ne pas remplacer un DOM déjà à l'écran.
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <App />
  </StrictMode>,
)
