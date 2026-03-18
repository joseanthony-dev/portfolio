// Shared header & footer — single source of truth
(function () {
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  var badges = {
    "index.html": '<span class="badge">Admin systèmes \u2022 Linux \u2022 Automatisation</span><span class="badge badge-available"><span class="pulse-dot"></span> Disponible</span>',
    "projets.html": '<span class="badge">Portfolio</span>',
    "competences.html": '<span class="badge">Comp\u00e9tences</span>',
    "experience.html": '<span class="badge">Exp\u00e9rience</span>',
    "contact.html": '<span class="badge">Contact</span>',
    "404.html": '<span class="badge">Portfolio</span>'
  };

  var badge = badges[page] || '<span class="badge">Portfolio</span>';

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
            '<button class="theme-toggle" data-theme-toggle aria-label="Changer de th\u00e8me"></button>' +
            '<button class="menu-btn" data-menu-btn aria-controls="site-nav" aria-expanded="false">Menu</button>' +
          '</div>' +
          '<nav id="site-nav" class="nav-links" data-nav-links>' +
            '<a href="index.html">Accueil</a>' +
            '<a href="projets.html">Projets</a>' +
            '<a href="competences.html">Comp\u00e9tences</a>' +
            '<a href="experience.html">Exp\u00e9rience</a>' +
            '<a href="assets/cv/CV_JOSE_Anthony.pdf" target="_blank" rel="noopener">CV</a>' +
            '<a href="contact.html">Contact</a>' +
          '</nav>' +
        '</div>' +
      '</header>';
  }

  // Footer
  var footer = document.querySelector("[data-component='footer']");
  if (footer) {
    footer.outerHTML =
      '<div class="footer-wave"></div>' +
      '<footer class="footer container">' +
        '<div class="inline-links">' +
          '<span>\u00a9 <span class="year"></span> JOSE Anthony</span>' +
          '<span class="muted">\u2022</span>' +
          '<a href="index.html">Accueil</a>' +
          '<a href="projets.html">Projets</a>' +
          '<a href="competences.html">Comp\u00e9tences</a>' +
          '<a href="experience.html">Exp\u00e9rience</a>' +
          '<a href="contact.html">Contact</a>' +
          '<span class="muted">\u2022</span>' +
          '<a href="https://github.com/joseanthony-dev" target="_blank" rel="noopener">GitHub</a>' +
          '<a href="https://www.linkedin.com/in/joseanthony-zacharias" target="_blank" rel="noopener">LinkedIn</a>' +
          '<span class="muted">\u2022</span>' +
          '<a href="mentions-legales.html">Mentions l\u00e9gales</a>' +
        '</div>' +
      '</footer>';
  }
})();
