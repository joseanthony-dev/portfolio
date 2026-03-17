// Theme toggle
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  if (theme === "light") root.setAttribute("data-theme", "light");

  function updateIcon() {
    const isLight = root.getAttribute("data-theme") === "light";
    document.querySelectorAll("[data-theme-toggle]").forEach(btn => {
      btn.textContent = isLight ? "\u263C" : "\u263E";
    });
  }
  updateIcon();

  document.querySelectorAll("[data-theme-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      if (isLight) {
        root.removeAttribute("data-theme");
        localStorage.setItem("theme", "dark");
      } else {
        root.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
      updateIcon();
    });
  });
})();

// Active link + mobile menu
(function () {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
  });

  const btn = document.querySelector("[data-menu-btn]");
  const links = document.querySelector("[data-nav-links]");

  if (btn && links) {
    const setOpen = (open) => {
      links.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    };

    btn.addEventListener("click", () => setOpen(!links.classList.contains("open")));

    // ferme le menu quand on clique un lien
    links.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => setOpen(false));
    });

    // ferme si clic en dehors
    document.addEventListener("click", (e) => {
      if (!links.contains(e.target) && e.target !== btn) setOpen(false);
    });
  }
})();
