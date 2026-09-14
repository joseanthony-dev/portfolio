import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

// Appelé une fois au build, dans Node. Le rendu est celui du français et du
// thème clair — les valeurs par défaut de App — corrigés côté client dès
// l'hydratation pour les visiteurs dont la préférence diffère.
export function rendu(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
