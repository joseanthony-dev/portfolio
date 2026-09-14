import type { Contenu } from './types'

// Fiche schema.org de la personne, écrite dans le <head> de chaque page par
// scripts/prerendu.mjs. Elle vivait en dur dans index.html, donc en français
// jusque sur les pages anglaises ; elle est désormais construite à partir du
// contenu de la langue rendue, comme les balises og:.
//
// Elle est inerte tant que le site porte noindex — aucun moteur ne la lira — et
// reste en place pour le jour où il cesserait de le porter, au même titre que
// les canoniques et les hreflang.

/** Établissement et adresse : des noms propres, identiques dans les deux langues. */
const ETABLISSEMENT = 'Université Claude Bernard Lyon 1'
const ADRESSE = {
  '@type': 'PostalAddress',
  addressLocality: 'Montagny',
  addressRegion: 'Rhône',
  addressCountry: 'FR',
} as const

/**
 * Sérialise la fiche de la page.
 *
 * Le résultat est destiné au contenu d'un <script>, qui est du texte brut : les
 * entités HTML n'y sont pas décodées, et l'échapper comme un attribut le
 * casserait. Seul `<` est neutralisé, sous sa forme d'échappement JSON, pour
 * qu'un texte contenant `</script>` ne puisse pas refermer la balise.
 *
 * @param t Contenu de la langue rendue.
 * @param url URL absolue de la page, celle-là même que porte la canonique.
 */
export function donneesStructurees(t: Contenu, url: string): string {
  const fiche = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: t.hero.nom,
    url,
    jobTitle: t.schema.jobTitle,
    email: `mailto:${t.contact.email}`,
    address: ADRESSE,
    alumniOf: { '@type': 'CollegeOrUniversity', name: ETABLISSEMENT },
    // Les comptes sont déjà déclarés une fois, sur la page de contact : les
    // relire ici évite qu'une adresse change d'un côté sans l'autre.
    sameAs: t.contact.liens.map((lien) => lien.url),
    knowsAbout: t.schema.knowsAbout,
  }

  return JSON.stringify(fiche).replace(/</g, '\\u003c')
}
