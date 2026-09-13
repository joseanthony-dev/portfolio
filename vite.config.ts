import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Le site est servi depuis un sous-dossier sur GitHub Pages
  // (https://joseanthony-dev.github.io/portfolio/) : sans cette base,
  // le CSS et le JS seraient demandés à la racine et renverraient des 404.
  base: '/portfolio/',
})
