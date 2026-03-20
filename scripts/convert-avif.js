const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const IMG_DIR = path.join(__dirname, "..", "assets", "img");

function findWebp(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(findWebp(full));
    else if (entry.name.endsWith(".webp")) results.push(full);
  }
  return results;
}

async function convert() {
  const files = findWebp(IMG_DIR);
  console.log(`Found ${files.length} WebP files`);
  let done = 0;
  for (const src of files) {
    const dest = src.replace(/\.webp$/, ".avif");
    if (fs.existsSync(dest)) { done++; continue; }
    await sharp(src).avif({ quality: 50, effort: 4 }).toFile(dest);
    const srcSize = fs.statSync(src).size;
    const destSize = fs.statSync(dest).size;
    const saving = ((1 - destSize / srcSize) * 100).toFixed(1);
    console.log(`${path.relative(IMG_DIR, dest)} (${saving}% smaller)`);
    done++;
  }
  console.log(`Done: ${done} files converted`);
}

convert().catch(console.error);
