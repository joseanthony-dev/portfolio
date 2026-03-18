// Shared header & footer — single source of truth (FR + EN)
(function () {
  var pathname = location.pathname;
  var isEn = pathname.indexOf("/en/") !== -1;
  var filename = (pathname.split("/").pop() || "index.html").toLowerCase();
  var dirParts = pathname.split("/").slice(0, -1);
  var lastDir = dirParts[dirParts.length - 1];
  var isSubDir = (lastDir === "blog");
  var up = isSubDir ? "../" : "";
  var assetPrefix = up + (isEn ? "../" : "");

  // FR <-> EN page name mapping
  var frToEn = {
    "index.html": "index.html",
    "projets.html": "projects.html",
    "competences.html": "skills.html",
    "experience.html": "experience.html",
    "contact.html": "contact.html",
    "blog.html": "blog.html",
    "mentions-legales.html": "legal.html"
  };
  var enToFr = {};
  for (var k in frToEn) enToFr[frToEn[k]] = k;

  // Language switch URL
  var switchUrl;
  if (isEn) {
    var frFile = enToFr[filename] || filename;
    switchUrl = (isSubDir ? "../../" : "../") + (isSubDir ? "blog/" : "") + frFile;
  } else {
    var enFile = frToEn[filename] || filename;
    switchUrl = (isSubDir ? "../../" : "") + "en/" + (isSubDir ? "blog/" : "") + enFile;
  }

  // Badges
  var badgesFr = {
    "index.html": '<span class="badge">Admin syst\u00e8mes \u2022 Linux \u2022 Automatisation</span><span class="badge badge-available"><span class="pulse-dot"></span> Disponible</span>',
    "projets.html": '<span class="badge">Portfolio</span>',
    "competences.html": '<span class="badge">Comp\u00e9tences</span>',
    "experience.html": '<span class="badge">Exp\u00e9rience</span>',
    "contact.html": '<span class="badge">Contact</span>',
    "blog.html": '<span class="badge">Blog</span>',
    "404.html": '<span class="badge">Portfolio</span>'
  };
  var badgesEn = {
    "index.html": '<span class="badge">Sysadmin \u2022 Linux \u2022 Automation</span><span class="badge badge-available"><span class="pulse-dot"></span> Available</span>',
    "projects.html": '<span class="badge">Portfolio</span>',
    "skills.html": '<span class="badge">Skills</span>',
    "experience.html": '<span class="badge">Experience</span>',
    "contact.html": '<span class="badge">Contact</span>',
    "blog.html": '<span class="badge">Blog</span>'
  };

  var badges = isEn ? badgesEn : badgesFr;
  var badge = badges[filename] || '<span class="badge">Portfolio</span>';
  // Blog articles: use Blog badge
  if (isSubDir && filename !== "blog.html") {
    badge = '<span class="badge">Blog</span>';
  }

  // Navigation links
  var navHtml;
  if (isEn) {
    navHtml =
      '<a href="' + up + 'index.html">Home</a>' +
      '<a href="' + up + 'projects.html">Projects</a>' +
      '<a href="' + up + 'skills.html">Skills</a>' +
      '<a href="' + up + 'experience.html">Experience</a>' +
      '<a href="' + up + 'blog.html">Blog</a>' +
      '<a href="' + assetPrefix + 'assets/cv/CV_JOSE_Anthony.pdf" target="_blank" rel="noopener">CV</a>' +
      '<a href="' + up + 'contact.html">Contact</a>';
  } else {
    navHtml =
      '<a href="' + up + 'index.html">Accueil</a>' +
      '<a href="' + up + 'projets.html">Projets</a>' +
      '<a href="' + up + 'competences.html">Comp\u00e9tences</a>' +
      '<a href="' + up + 'experience.html">Exp\u00e9rience</a>' +
      '<a href="' + up + 'blog.html">Blog</a>' +
      '<a href="' + assetPrefix + 'assets/cv/CV_JOSE_Anthony.pdf" target="_blank" rel="noopener">CV</a>' +
      '<a href="' + up + 'contact.html">Contact</a>';
  }

  var langLabel = isEn ? "FR" : "EN";
  var langAriaLabel = isEn ? "Voir en fran\u00e7ais" : "View in English";
  var themeAriaLabel = isEn ? "Toggle theme" : "Changer de th\u00e8me";

  // Header
  var header = document.querySelector("[data-component='header']");
  if (header) {
    header.outerHTML =
      '<header class="nav">' +
        '<div class="nav-inner">' +
          '<div class="brand">' +
            '<span style="font-size:1.05rem;">JOSE Anthony</span>' +
            badge +
          '</div>' +
          '<div style="display:flex;gap:8px;align-items:center">' +
            '<a class="theme-toggle" href="' + switchUrl + '" aria-label="' + langAriaLabel + '" style="text-decoration:none;font-size:.85rem;font-weight:600;">' + langLabel + '</a>' +
            '<button class="theme-toggle" data-theme-toggle aria-label="' + themeAriaLabel + '"></button>' +
            '<button class="menu-btn" data-menu-btn aria-controls="site-nav" aria-expanded="false">Menu</button>' +
          '</div>' +
          '<nav id="site-nav" class="nav-links" data-nav-links>' +
            navHtml +
          '</nav>' +
        '</div>' +
      '</header>';
  }

  // Footer links
  var footerHtml;
  if (isEn) {
    footerHtml =
      '<span>\u00a9 <span class="year"></span> JOSE Anthony</span>' +
      '<span class="muted">\u2022</span>' +
      '<a href="' + up + 'index.html">Home</a>' +
      '<a href="' + up + 'projects.html">Projects</a>' +
      '<a href="' + up + 'skills.html">Skills</a>' +
      '<a href="' + up + 'experience.html">Experience</a>' +
      '<a href="' + up + 'blog.html">Blog</a>' +
      '<a href="' + up + 'contact.html">Contact</a>' +
      '<span class="muted">\u2022</span>' +
      '<a href="https://github.com/joseanthony-dev" target="_blank" rel="noopener">GitHub</a>' +
      '<a href="https://www.linkedin.com/in/joseanthony-zacharias" target="_blank" rel="noopener">LinkedIn</a>' +
      '<span class="muted">\u2022</span>' +
      '<a href="' + up + 'legal.html">Legal</a>';
  } else {
    footerHtml =
      '<span>\u00a9 <span class="year"></span> JOSE Anthony</span>' +
      '<span class="muted">\u2022</span>' +
      '<a href="' + up + 'index.html">Accueil</a>' +
      '<a href="' + up + 'projets.html">Projets</a>' +
      '<a href="' + up + 'competences.html">Comp\u00e9tences</a>' +
      '<a href="' + up + 'experience.html">Exp\u00e9rience</a>' +
      '<a href="' + up + 'blog.html">Blog</a>' +
      '<a href="' + up + 'contact.html">Contact</a>' +
      '<span class="muted">\u2022</span>' +
      '<a href="https://github.com/joseanthony-dev" target="_blank" rel="noopener">GitHub</a>' +
      '<a href="https://www.linkedin.com/in/joseanthony-zacharias" target="_blank" rel="noopener">LinkedIn</a>' +
      '<span class="muted">\u2022</span>' +
      '<a href="' + up + 'mentions-legales.html">Mentions l\u00e9gales</a>';
  }

  // Footer
  var footer = document.querySelector("[data-component='footer']");
  if (footer) {
    footer.outerHTML =
      '<div class="footer-wave"></div>' +
      '<footer class="footer container">' +
        '<div class="inline-links">' +
          footerHtml +
        '</div>' +
      '</footer>';
  }
})();
