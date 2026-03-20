/**
 * Wraps <img> tags that reference .webp files in <picture> elements
 * with an AVIF <source> — only when the corresponding .avif file exists.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const FILES = [
  "index.html",
  "en/index.html",
  "projets.html",
  "en/projects.html",
];

function avifExists(webpPath, htmlDir) {
  const rel = webpPath.replace(/\.webp$/, ".avif");
  const abs = path.resolve(htmlDir, rel);
  return fs.existsSync(abs);
}

function buildAvifSrcset(srcset, htmlDir) {
  // srcset like "img-480w.webp 480w, img.webp 1918w"
  const parts = srcset.split(",").map(s => s.trim());
  const avifParts = [];
  for (const part of parts) {
    const [url, descriptor] = part.split(/\s+/);
    if (url && url.endsWith(".webp") && avifExists(url, htmlDir)) {
      avifParts.push(url.replace(/\.webp$/, ".avif") + (descriptor ? " " + descriptor : ""));
    }
  }
  return avifParts.length > 0 ? avifParts.join(", ") : null;
}

for (const file of FILES) {
  const filePath = path.join(ROOT, file);
  const htmlDir = path.dirname(filePath);
  let html = fs.readFileSync(filePath, "utf-8");

  // Match <img ...> tags that reference .webp (not already inside <picture>)
  // We process multiline img tags
  const imgRegex = /<img\b[^>]*\.webp[^>]*>/gs;
  let changed = 0;

  html = html.replace(imgRegex, (imgTag, offset) => {
    // Check if already inside a <picture>
    const before = html.substring(Math.max(0, offset - 200), offset);
    if (before.includes("<picture>") && !before.includes("</picture>")) {
      return imgTag; // already wrapped
    }

    // Extract srcset if present
    const srcsetMatch = imgTag.match(/srcset="([^"]+)"/);
    const sizesMatch = imgTag.match(/sizes="([^"]+)"/);
    const srcMatch = imgTag.match(/src="([^"]+\.webp)"/);

    let avifSrcset = null;
    if (srcsetMatch) {
      avifSrcset = buildAvifSrcset(srcsetMatch[1], htmlDir);
    } else if (srcMatch && avifExists(srcMatch[1], htmlDir)) {
      avifSrcset = srcMatch[1].replace(/\.webp$/, ".avif");
    }

    if (!avifSrcset) return imgTag; // no AVIF available

    const sizesAttr = sizesMatch ? ` sizes="${sizesMatch[1]}"` : "";
    changed++;
    return `<picture>\n  <source type="image/avif" srcset="${avifSrcset}"${sizesAttr}>\n  ${imgTag}\n</picture>`;
  });

  if (changed > 0) {
    fs.writeFileSync(filePath, html);
    console.log(`${file}: wrapped ${changed} images in <picture>`);
  } else {
    console.log(`${file}: no changes needed`);
  }
}
