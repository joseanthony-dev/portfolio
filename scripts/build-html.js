#!/usr/bin/env node
/**
 * build-html.js — Assembles final HTML pages from src/layout.html + src/pages/*.html
 *
 * Each source page has JSON frontmatter in an HTML comment, followed by content.
 * The script replaces placeholders in the layout template and writes to the project root.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LAYOUT_PATH = path.join(ROOT, 'src', 'layout.html');
const PAGES_DIR = path.join(ROOT, 'src', 'pages');
const BASE_URL = 'https://joseanthony-dev.github.io/portfolio';

// FR <-> EN page mapping (root pages only)
const FR_TO_EN = {
  'index.html': 'en/index.html',
  'projets.html': 'en/projects.html',
  'competences.html': 'en/skills.html',
  'experience.html': 'en/experience.html',
  'contact.html': 'en/contact.html',
  'blog.html': 'en/blog.html',
  'mentions-legales.html': 'en/legal.html',
};

// Blog articles have same filename in both languages
const BLOG_ARTICLES = [
  'domotique-home-assistant.html',
  'flutter-planning.html',
  'photobooth-site.html',
  'purge-ansible.html',
];

// Build full bidirectional mapping
const EN_TO_FR = {};
for (const [fr, en] of Object.entries(FR_TO_EN)) {
  EN_TO_FR[en] = fr;
}
for (const article of BLOG_ARTICLES) {
  FR_TO_EN['blog/' + article] = 'en/blog/' + article;
  EN_TO_FR['en/blog/' + article] = 'blog/' + article;
}

// Read layout template
const layout = fs.readFileSync(LAYOUT_PATH, 'utf8');

// Recursively find all .html files in src/pages/
function findPages(dir, base) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? base + '/' + entry.name : entry.name;
    if (entry.isDirectory()) {
      results.push(...findPages(path.join(dir, entry.name), rel));
    } else if (entry.name.endsWith('.html')) {
      results.push(rel);
    }
  }
  return results;
}

// Parse frontmatter from <!-- { ... } --> comment
function parseFrontmatter(raw) {
  const match = raw.match(/^<!--\s*\n([\s\S]*?)\n-->\s*\n/);
  if (!match) throw new Error('No frontmatter found');
  const meta = JSON.parse(match[1]);
  const content = raw.slice(match[0].length);
  return { meta, content };
}

function getLang(p) { return p.startsWith('en/') ? 'en' : 'fr'; }

function getAssetPrefix(p) {
  const depth = p.split('/').length - 1;
  return depth === 0 ? '' : '../'.repeat(depth);
}

function getCanonicalUrl(p) {
  return p === 'index.html' ? BASE_URL + '/' : BASE_URL + '/' + p;
}

// Build CSP string
function buildCSP(meta) {
  const ce = meta.csp_connect_extra ? ' ' + meta.csp_connect_extra.join(' ') : '';
  const fe = meta.csp_form_extra ? ' ' + meta.csp_form_extra.join(' ') : '';
  return "default-src 'self'; script-src 'self' 'unsafe-inline' https://gc.zgo.at; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://*.goatcounter.com" + ce + "; font-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'" + fe + ';';
}

// Compact JSON-LD serializer
function compactJsonLd(obj) {
  let s = JSON.stringify(obj, null, 2);
  // Collapse short arrays of strings onto one line (only short ones)
  s = s.replace(/\[\s*\n(\s*"[^"\n]*"(?:,\s*\n\s*"[^"\n]*")*)\s*\n\s*\]/g, (m, inner) => {
    const items = inner.match(/"[^"]*"/g);
    const oneline = '[' + items.join(', ') + ']';
    // Only inline if short enough and no URLs (URLs keep expanded for readability)
    if (oneline.length <= 90 && !oneline.includes('http')) return oneline;
    return m;
  });
  // Collapse {"@type":"Person","name":"..."} onto one line
  s = s.replace(/\{\s*\n\s*"@type": "Person",\s*\n\s*"name": "([^"]*)"\s*\n\s*\}/g,
    '{"@type": "Person", "name": "$1"}');
  // Collapse BreadcrumbList ListItem with position/name/item
  s = s.replace(/\{\s*\n\s*"@type": "ListItem",\s*\n\s*"position": (\d+),\s*\n\s*"name": "([^"]*)",\s*\n\s*"item": "([^"]*)"\s*\n\s*\}/g,
    '{"@type": "ListItem", "position": $1, "name": "$2", "item": "$3"}');
  // Collapse DefinedTerm
  s = s.replace(/\{\s*\n\s*"@type": "DefinedTerm",\s*\n\s*"name": "([^"]*)",\s*\n\s*"description": "([^"]*)"\s*\n\s*\}/g,
    '{"@type": "DefinedTerm", "name": "$1", "description": "$2"}');
  // Collapse ListItem wrapping inline DefinedTerm
  s = s.replace(/\{\s*\n\s*"@type": "ListItem",\s*\n\s*"position": (\d+),\s*\n\s*"item": (\{"@type": "DefinedTerm"[^}]+\})\s*\n\s*\}/g,
    '{"@type": "ListItem", "position": $1, "item": $2}');
  return s;
}

/**
 * Build everything between the referrer meta and the <style> block.
 * This section varies heavily between pages (OG, dns-prefetch, canonical, etc.)
 */
function buildHeadMiddle(relPath, meta) {
  const lang = getLang(relPath);
  const prefix = getAssetPrefix(relPath);
  const canonical = getCanonicalUrl(relPath);
  const isNoindex = !!meta.noindex;

  // --- 404 page ---
  if (isNoindex) {
    return [
      '  <meta name="theme-color" content="#0b1220">',
      `  <link rel="icon" href="${prefix}assets/img/favicon.svg" type="image/svg+xml">`,
      `  <link rel="apple-touch-icon" href="${prefix}assets/img/apple-touch-icon.png">`,
      `  <link rel="manifest" href="${prefix}manifest.json">`,
      '  <meta name="robots" content="noindex">',
      `  <title>${meta.title}</title>`,
      `  <meta name="description" content="${meta.description}" />`,
    ].join('\n') + '\n';
  }

  const ogLocale = lang === 'en' ? 'en_US' : 'fr_FR';
  const ogType = meta.og_type || 'website';
  const ogTitle = meta.og_title || meta.title;
  const ogDesc = meta.og_description || meta.description;
  const dns = meta.dns_prefetch || [];
  const isContact = relPath.includes('contact');
  const isBlogArticle = relPath.includes('blog/') && relPath !== 'blog.html' && relPath !== 'en/blog.html';

  const L = [];

  // dns-prefetch BEFORE OG (for index, projets etc. -- non-contact pages)
  if (dns.length && !isContact) {
    dns.forEach(u => L.push(`  <link rel="dns-prefetch" href="${u}">`));
  }

  L.push('');
  L.push(`  <meta property="og:locale" content="${ogLocale}" />`);
  L.push(`  <meta property="og:title" content="${ogTitle}" />`);
  L.push(`  <meta property="og:description" content="${ogDesc}" />`);
  L.push(`  <meta property="og:type" content="${ogType}" />`);
  L.push(`  <meta property="og:url" content="${canonical}" />`);
  L.push(`  <meta property="og:image" content="${BASE_URL}/assets/img/og-cover.jpg" />`);
  L.push('  <meta name="twitter:card" content="summary_large_image" />');
  if (!isContact || !dns.length) L.push('');

  L.push('  <meta name="theme-color" content="#0b1220">');
  L.push(`  <link rel="icon" href="${prefix}assets/img/favicon.svg" type="image/svg+xml">`);
  L.push(`  <link rel="apple-touch-icon" href="${prefix}assets/img/apple-touch-icon.png">`);
  L.push(`  <link rel="manifest" href="${prefix}manifest.json">`);

  // Canonical
  L.push(`  <link rel="canonical" href="${canonical}" />`);

  // Alternates
  let frPath, enPath;
  if (lang === 'fr') { frPath = relPath; enPath = FR_TO_EN[relPath]; }
  else { enPath = relPath; frPath = EN_TO_FR[relPath]; }

  const frUrl = frPath ? BASE_URL + '/' + frPath : null;
  const enUrl = enPath ? BASE_URL + '/' + enPath : null;

  if (isBlogArticle) {
    // Blog articles: en first, then fr
    if (enUrl) L.push(`  <link rel="alternate" hreflang="en" href="${enUrl}" />`);
    if (frUrl) L.push(`  <link rel="alternate" hreflang="fr" href="${frUrl}" />`);
  } else {
    if (frUrl) L.push(`  <link rel="alternate" hreflang="fr" href="${frUrl}" />`);
    if (enUrl) L.push(`  <link rel="alternate" hreflang="en" href="${enUrl}" />`);
  }

  // dns-prefetch AFTER alternates (for contact pages)
  if (dns.length && isContact) {
    dns.forEach(u => L.push(`  <link rel="dns-prefetch" href="${u}">`));
  }

  // RSS
  if (meta.rss) {
    const feedUrl = lang === 'en' ? BASE_URL + '/en/feed.xml' : BASE_URL + '/feed.xml';
    L.push(`  <link rel="alternate" type="application/rss+xml" title="Blog RSS — JOSE Anthony" href="${feedUrl}" />`);
  }

  L.push(`  <title>${meta.title}</title>`);
  L.push(`  <meta name="description" content="${meta.description}" />`);

  return L.join('\n') + '\n';
}

function buildJsonLd(meta) {
  if (!meta.json_ld || !meta.json_ld.length) return '';
  return meta.json_ld.map(obj => {
    const j = compactJsonLd(obj);
    return '  <script type="application/ld+json">\n  ' + j.split('\n').join('\n  ') + '\n  </script>';
  }).join('\n') + '\n';
}

function buildNoscriptNav(relPath) {
  const lang = getLang(relPath);
  const prefix = getAssetPrefix(relPath);

  if (lang === 'fr') {
    return `  <noscript><style>.fade-in{opacity:1;transform:none}.loader{display:none}[data-component]{display:none}.back-to-top{display:none}.particles{display:none}.scroll-progress{display:none}</style><nav aria-label="Menu principal" style="padding:1rem;text-align:center;border-bottom:1px solid rgba(255,255,255,.08)"><a href="${prefix}index.html">Accueil</a> | <a href="${prefix}projets.html">Projets</a> | <a href="${prefix}competences.html">Comp\u00e9tences</a> | <a href="${prefix}experience.html">Exp\u00e9rience</a> | <a href="${prefix}blog.html">Blog</a> | <a href="${prefix}contact.html">Contact</a></nav></noscript>`;
  }
  const np = relPath.startsWith('en/blog/') ? '../' : '';
  return `  <noscript><style>.fade-in{opacity:1;transform:none}.loader{display:none}[data-component]{display:none}.back-to-top{display:none}.particles{display:none}.scroll-progress{display:none}</style><nav aria-label="Main menu" style="padding:1rem;text-align:center;border-bottom:1px solid rgba(255,255,255,.08)"><a href="${np}index.html">Home</a> | <a href="${np}projects.html">Projects</a> | <a href="${np}skills.html">Skills</a> | <a href="${np}experience.html">Experience</a> | <a href="${np}blog.html">Blog</a> | <a href="${np}contact.html">Contact</a></nav></noscript>`;
}

function buildLoader(relPath, meta) {
  if (meta.noindex)
    return '  <div class="loader"><div class="loader-skeleton"><div class="skel skel-nav"></div><div class="skel skel-title"></div><div class="skel skel-text"></div></div></div>';
  const b = path.basename(relPath);
  const twoCards = (b === 'index.html' && !relPath.includes('blog/'))
    || b === 'projets.html' || b === 'projects.html'
    || b === 'competences.html' || b === 'skills.html'
    || b === 'experience.html';
  const cards = twoCards
    ? '<div class="skel skel-card"></div><div class="skel skel-card"></div>'
    : '<div class="skel skel-card"></div>';
  return '  <div class="loader"><div class="loader-skeleton"><div class="skel skel-nav"></div><div class="skel skel-title"></div><div class="skel skel-text"></div><div class="skel skel-text-short"></div>' + cards + '</div></div>';
}

// ===== Main =====
const pageFiles = findPages(PAGES_DIR, '');
let count = 0;

for (const relPath of pageFiles) {
  const raw = fs.readFileSync(path.join(PAGES_DIR, relPath), 'utf8');
  const { meta, content } = parseFrontmatter(raw);

  const lang = getLang(relPath);
  const ap = getAssetPrefix(relPath);
  const isNoindex = !!meta.noindex;

  const headMiddle = buildHeadMiddle(relPath, meta);
  const jsonLd = buildJsonLd(meta);
  const preload = isNoindex ? '' : `  <link rel="preload" href="${ap}assets/js/main.min.js" as="script">\n`;
  const bodyOpen = (meta.json_ld && meta.json_ld.length) ? '\n<body>' : '<body>';

  let html = layout;
  html = html.replace('{{lang}}', lang);
  html = html.replace('{{csp}}', buildCSP(meta));

  if (isNoindex) {
    // For 404: replace head_middle through json_ld with the minimal head
    // Then remove the style/preload/noscript-css section between head_middle and </head>
    // since 404 has its own style block in the head_middle already... wait, no.
    // 404 still has the style block. Let me just use the normal replacement.
    html = html.replace('{{head_middle}}', headMiddle);
    html = html.replace('{{json_ld}}', '');
  } else {
    html = html.replace('{{head_middle}}', headMiddle);
    html = html.replace('{{json_ld}}', jsonLd);
  }

  html = html.split('{{asset_prefix}}').join(ap);
  html = html.replace('{{preload}}', preload);
  html = html.replace('{{body_open}}', bodyOpen);
  html = html.replace('{{noscript_nav}}', buildNoscriptNav(relPath));
  html = html.replace('{{loader}}', buildLoader(relPath, meta));
  html = html.replace('{{skip_label}}', lang === 'en' ? 'Skip to content' : 'Aller au contenu');
  html = html.replace('{{back_to_top_label}}', lang === 'en' ? 'Back to top' : 'Retour en haut');
  html = html.replace('{{content}}', content.trimEnd());

  const outPath = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('  ' + relPath);
  count++;
}

console.log('\nBuilt ' + count + ' pages.');
