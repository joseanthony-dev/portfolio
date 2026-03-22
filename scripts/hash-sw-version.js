#!/usr/bin/env node
// Generates a short content hash from key static assets
// and injects it as CACHE_VERSION in sw.js

var fs = require("fs");
var crypto = require("crypto");
var path = require("path");

var ROOT = path.resolve(__dirname, "..");

var FILES_TO_HASH = [
  "assets/css/style.min.css",
  "assets/js/main.min.js",
  "assets/js/components.min.js",
  "assets/img/favicon.svg",
  "assets/img/profile.webp",
  "manifest.json"
];

var hash = crypto.createHash("sha256");

FILES_TO_HASH.forEach(function (f) {
  var full = path.join(ROOT, f);
  if (fs.existsSync(full)) {
    hash.update(fs.readFileSync(full));
  }
});

var short = hash.digest("hex").slice(0, 8);

var swPath = path.join(ROOT, "sw.js");
var sw = fs.readFileSync(swPath, "utf8");
var updated = sw.replace(
  /var CACHE_VERSION = "[^"]*"/,
  'var CACHE_VERSION = "' + short + '"'
);

if (sw !== updated) {
  fs.writeFileSync(swPath, updated);
  console.log("sw.js: CACHE_VERSION → " + short);
} else {
  console.log("sw.js: CACHE_VERSION already up to date (" + short + ")");
}
