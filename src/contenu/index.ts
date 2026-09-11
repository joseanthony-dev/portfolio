import type { Contenu, Langue } from '../types'
import { fr } from './fr'
import { en } from './en'

export const contenus: Record<Langue, Contenu> = { fr, en }
