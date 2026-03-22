#!/usr/bin/env node
/**
 * generate-rss.js — Generates RSS 2.0 feeds (feed.xml and en/feed.xml)
 * by reading blog HTML files and extracting title, description, and date metadata.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BASE_URL = 'https://joseanthony-dev.github.io/portfolio';

const BLOG_ARTICLES = [
  'domotique-home-assistant.html',
  'flutter-planning.html',
  'photobooth-site.html',
  'purge-ansible.html'
];

/**
 * Extract metadata from an HTML file.
 * - title from <title>...</title>
 * - description from <meta name="description" content="...">
 * - date from <lastmod> in sitemap (fallback to file mtime)
 */
function extractMeta(htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf-8');

  // Title: strip " — JOSE Anthony" suffix
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  let title = titleMatch ? titleMatch[1].trim() : '';
  title = title.replace(/\s*—\s*JOSE Anthony$/, '');
  // Decode HTML entities for RSS
  title = decodeEntities(title);

  // Description from <meta name="description" content="...">
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
  let description = descMatch ? descMatch[1].trim() : '';
  description = decodeEntities(description);

  return { title, description };
}

function decodeEntities(str) {
  return str
    .replace(/&eacute;/g, 'e')
    .replace(/&egrave;/g, 'e')
    .replace(/&agrave;/g, 'a')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&Eacute;/g, 'E');
}

/**
 * Try to get the date from sitemap.xml <lastmod> for a given URL path.
 */
function getDatesFromSitemap() {
  const dates = {};
  const sitemapPath = path.join(ROOT, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) return dates;

  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  // Match each <url> block
  const urlBlocks = sitemap.match(/<url>[\s\S]*?<\/url>/g) || [];
  for (const block of urlBlocks) {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    const modMatch = block.match(/<lastmod>([^<]+)<\/lastmod>/);
    if (locMatch && modMatch) {
      dates[locMatch[1]] = modMatch[1];
    }
  }
  return dates;
}

function toRFC822(dateStr) {
  const d = new Date(dateStr + 'T00:00:00Z');
  return d.toUTCString();
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateFeed(lang) {
  const isFr = lang === 'fr';
  const blogDir = isFr ? path.join(ROOT, 'blog') : path.join(ROOT, 'en', 'blog');
  const feedUrl = isFr
    ? `${BASE_URL}/feed.xml`
    : `${BASE_URL}/en/feed.xml`;
  const blogUrl = isFr
    ? `${BASE_URL}/blog.html`
    : `${BASE_URL}/en/blog.html`;
  const channelTitle = 'Blog \u2014 JOSE Anthony';
  const channelDesc = isFr
    ? "Articles techniques sur l'administration Linux, l'automatisation (Bash/Ansible) et les retours d'experience."
    : 'Technical articles on Linux administration, automation (Bash/Ansible) and experience reports.';

  const sitemapDates = getDatesFromSitemap();

  let items = '';
  let latestDate = '2026-01-01';

  for (const file of BLOG_ARTICLES) {
    const htmlPath = path.join(blogDir, file);
    if (!fs.existsSync(htmlPath)) {
      console.warn(`Warning: ${htmlPath} not found, skipping.`);
      continue;
    }

    const meta = extractMeta(htmlPath);
    const articleUrl = isFr
      ? `${BASE_URL}/blog/${file}`
      : `${BASE_URL}/en/blog/${file}`;

    // Get date from sitemap
    const dateStr = sitemapDates[articleUrl] || '2026-03-18';
    if (dateStr > latestDate) latestDate = dateStr;

    items += `    <item>
      <title>${escapeXml(meta.title)}</title>
      <link>${articleUrl}</link>
      <description>${escapeXml(meta.description)}</description>
      <pubDate>${toRFC822(dateStr)}</pubDate>
      <guid isPermaLink="true">${articleUrl}</guid>
    </item>\n`;
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <description>${escapeXml(channelDesc)}</description>
    <link>${blogUrl}</link>
    <language>${lang}</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${toRFC822(latestDate)}</lastBuildDate>
${items}  </channel>
</rss>
`;

  const outPath = isFr
    ? path.join(ROOT, 'feed.xml')
    : path.join(ROOT, 'en', 'feed.xml');
  fs.writeFileSync(outPath, rss, 'utf-8');
  console.log(`Generated ${outPath}`);
}

generateFeed('fr');
generateFeed('en');
