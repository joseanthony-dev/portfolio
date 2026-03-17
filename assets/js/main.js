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
    // Update theme-color meta
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = isLight ? "#f4f6fb" : "#0b1220";
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

// Fade-in on scroll
(function () {
  const els = document.querySelectorAll(".fade-in");
  if (!els.length) return;
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(function (el) { observer.observe(el); });
})();

// Back to top
(function () {
  var btn = document.querySelector(".back-to-top");
  if (!btn) return;
  window.addEventListener("scroll", function () {
    btn.classList.toggle("show", window.scrollY > 400);
  });
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

// Lightbox
(function () {
  var overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.innerHTML = '<img src="" alt="">';
  document.body.appendChild(overlay);
  var img = overlay.querySelector("img");

  document.querySelectorAll(".gallery a").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      img.src = a.href;
      img.alt = a.querySelector("img").alt;
      overlay.classList.add("active");
    });
  });

  overlay.addEventListener("click", function () {
    overlay.classList.remove("active");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") overlay.classList.remove("active");
  });
})();

// Animated counters
(function () {
  var counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.getAttribute("data-count"), 10);
      var duration = 1200;
      var start = 0;
      var startTime = null;
      function step(time) {
        if (!startTime) startTime = time;
        var progress = Math.min((time - startTime) / duration, 1);
        var ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + "+";
      }
      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(function (el) { observer.observe(el); });
})();

// Hero parallax
(function () {
  var hero = document.querySelector(".hero");
  if (!hero) return;
  window.addEventListener("scroll", function () {
    hero.style.transform = "translateY(" + (window.scrollY * 0.15) + "px)";
  });
})();

// Scroll progress bar
(function () {
  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.prepend(bar);
  window.addEventListener("scroll", function () {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = h > 0 ? (window.scrollY / h * 100) + "%" : "0%";
  });
})();

// Prefetch on hover
(function () {
  var prefetched = {};
  document.querySelectorAll('a[href]').forEach(function (a) {
    var href = a.getAttribute("href") || "";
    if (!href.endsWith(".html") || href.startsWith("http")) return;
    a.addEventListener("mouseenter", function () {
      if (prefetched[href]) return;
      prefetched[href] = true;
      var link = document.createElement("link");
      link.rel = "prefetch";
      link.href = href;
      document.head.appendChild(link);
    }, { once: true });
  });
})();

// Copy email on click
(function () {
  var toast = document.createElement("div");
  toast.className = "copy-toast";
  toast.textContent = "Email copié !";
  document.body.appendChild(toast);

  document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var email = a.href.replace("mailto:", "");
      navigator.clipboard.writeText(email).then(function () {
        toast.classList.add("show");
        setTimeout(function () { toast.classList.remove("show"); }, 2000);
      });
    });
  });
})();

// Page transitions
(function () {
  document.querySelectorAll('a[href]').forEach(function (a) {
    var href = a.getAttribute("href") || "";
    if (href.startsWith("http") || href.startsWith("mailto") || href.startsWith("#") || a.target === "_blank") return;
    a.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.classList.add("page-exit");
      setTimeout(function () { window.location.href = href; }, 150);
    });
  });
})();

// Footer year
document.querySelectorAll(".year").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

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
