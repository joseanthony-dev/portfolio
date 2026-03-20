// Config
var CONFIG = {
  LOADER_REMOVE_DELAY: 400,
  FADE_THRESHOLD: 0.1,
  MAGNETIC_STRENGTH: 0.15,
  PARTICLE_COUNT: 10,
  PARTICLE_MIN_DURATION: 8,
  PARTICLE_DURATION_RANGE: 12,
  PARTICLE_MAX_DELAY: 10,
  PARTICLE_MIN_SIZE: 2,
  PARTICLE_SIZE_RANGE: 3,
  TILT_ANGLE: 6,
  TILT_PERSPECTIVE: 800,
  COUNTER_DURATION: 1200,
  COUNTER_THRESHOLD: 0.5,
  PARALLAX_FACTOR: 0.15,
  BACK_TO_TOP_OFFSET: 400,
  TOAST_DURATION: 2000,
  PAGE_TRANSITION_DELAY: 150,
  EASTER_EGG_RESET_DELAY: 600
};

// Loader
window.addEventListener("load", function () {
  var loader = document.querySelector(".loader");
  if (loader) {
    loader.classList.add("hidden");
    setTimeout(function () { loader.remove(); }, CONFIG.LOADER_REMOVE_DELAY);
  }
});

// Theme toggle
(function () {
  const root = document.documentElement;
  var saved; try { saved = localStorage.getItem("theme"); } catch (e) { saved = null; }
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
        try { localStorage.setItem("theme", "dark"); } catch (e) {}
      } else {
        root.setAttribute("data-theme", "light");
        try { localStorage.setItem("theme", "light"); } catch (e) {}
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
  }, { threshold: CONFIG.FADE_THRESHOLD });
  els.forEach(function (el) { observer.observe(el); });
})();

// Back to top (click only, scroll handled in unified handler)
(function () {
  var btn = document.querySelector(".back-to-top");
  if (!btn) return;
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

// Lightbox
(function () {
  var overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Image agrandie");
  overlay.innerHTML = '<button class="lightbox-close" aria-label="Fermer">&times;</button><img src="" alt=""><span class="sr-only" role="status" aria-live="polite"></span>';
  document.body.appendChild(overlay);
  var img = overlay.querySelector("img");
  var closeBtn = overlay.querySelector(".lightbox-close");
  var liveRegion = overlay.querySelector("[role='status']");
  var lastFocused = null;

  function openLightbox(href, alt) {
    lastFocused = document.activeElement;
    img.src = href;
    img.alt = alt;
    liveRegion.textContent = "Image agrandie : " + alt;
    overlay.classList.add("active");
    closeBtn.focus();
  }

  function closeLightbox() {
    overlay.classList.remove("active");
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll(".gallery a").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      openLightbox(a.href, a.querySelector("img").alt);
    });
  });

  closeBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    closeLightbox();
  });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (!overlay.classList.contains("active")) return;
    if (e.key === "Escape") { closeLightbox(); return; }
    // Focus trap: keep Tab within lightbox
    if (e.key === "Tab") {
      e.preventDefault();
      closeBtn.focus();
    }
  });
})();

// Deferred visual effects (non-critical, loaded after main content)
var deferEffect = window.requestIdleCallback || function (cb) { setTimeout(cb, 200); };

deferEffect(function () {
  // Magnetic buttons (throttled)
  document.querySelectorAll(".btn.primary").forEach(function (btn) {
    var ticking = false;
    btn.addEventListener("mousemove", function (e) {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = "translate(" + (x * CONFIG.MAGNETIC_STRENGTH) + "px," + (y * CONFIG.MAGNETIC_STRENGTH) + "px)";
        ticking = false;
      });
    });
    btn.addEventListener("mouseleave", function () {
      btn.style.transform = "";
    });
  });

  // Particles
  var container = document.createElement("div");
  container.className = "particles";
  document.body.appendChild(container);
  for (var i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
    var p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDuration = (CONFIG.PARTICLE_MIN_DURATION + Math.random() * CONFIG.PARTICLE_DURATION_RANGE) + "s";
    p.style.animationDelay = (Math.random() * CONFIG.PARTICLE_MAX_DELAY) + "s";
    p.style.width = p.style.height = (CONFIG.PARTICLE_MIN_SIZE + Math.random() * CONFIG.PARTICLE_SIZE_RANGE) + "px";
    container.appendChild(p);
  }

  // Pause animations when page is hidden
  document.addEventListener("visibilitychange", function () {
    var paused = document.hidden;
    document.body.style.animationPlayState = paused ? "paused" : "running";
    document.querySelectorAll(".particle, .pulse-dot, .badge-available").forEach(function (el) {
      el.style.animationPlayState = paused ? "paused" : "running";
    });
  });

  // 3D tilt on cards (throttled, desktop only)
  if (!window.matchMedia("(pointer: coarse)").matches) {
    document.querySelectorAll(".card").forEach(function (card) {
      var ticking = false;
      card.addEventListener("mousemove", function (e) {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var rect = card.getBoundingClientRect();
          var x = (e.clientX - rect.left) / rect.width - 0.5;
          var y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = "perspective(" + CONFIG.TILT_PERSPECTIVE + "px) rotateY(" + (x * CONFIG.TILT_ANGLE) + "deg) rotateX(" + (-y * CONFIG.TILT_ANGLE) + "deg) translateY(-3px)";
          ticking = false;
        });
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  // Easter egg (Konami code)
  var seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","KeyB","KeyA"];
  var pos = 0;
  document.addEventListener("keydown", function (e) {
    if (e.code === seq[pos]) {
      pos++;
      if (pos === seq.length) {
        pos = 0;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        document.body.style.transition = "transform .5s ease";
        document.body.style.transform = "rotate(360deg)";
        setTimeout(function () { document.body.style.transform = ""; }, CONFIG.EASTER_EGG_RESET_DELAY);
      }
    } else { pos = 0; }
  });
});

// Animated counters
(function () {
  var counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.getAttribute("data-count"), 10);
      var duration = CONFIG.COUNTER_DURATION;
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
  }, { threshold: CONFIG.COUNTER_THRESHOLD });
  counters.forEach(function (el) { observer.observe(el); });
})();

// Scroll handlers (unified)
(function () {
  var hero = document.querySelector(".hero");
  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.prepend(bar);
  var btt = document.querySelector(".back-to-top");
  var ticking = false;

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        var y = window.scrollY;
        var h = document.documentElement.scrollHeight - window.innerHeight;
        // progress bar
        bar.style.width = h > 0 ? (y / h * 100) + "%" : "0%";
        // parallax
        if (hero) hero.style.transform = "translateY(" + (y * CONFIG.PARALLAX_FACTOR) + "px)";
        // back to top
        if (btt) btt.classList.toggle("show", y > CONFIG.BACK_TO_TOP_OFFSET);
        ticking = false;
      });
      ticking = true;
    }
  });
})();

// Prefetch: eager for likely next pages, hover for others
(function () {
  var prefetched = {};
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var priorities = {
    "index.html": ["projets.html", "contact.html"],
    "projets.html": ["contact.html", "competences.html"],
    "competences.html": ["experience.html", "projets.html"],
    "experience.html": ["contact.html", "competences.html"],
    "contact.html": ["projets.html"],
    "blog.html": ["projets.html", "contact.html"],
    "projects.html": ["contact.html", "skills.html"],
    "skills.html": ["experience.html", "projects.html"],
    "experience.html": ["contact.html", "skills.html"]
  };

  // Eager prefetch for priority pages (after load)
  window.addEventListener("load", function () {
    var next = priorities[page] || [];
    next.forEach(function (href) {
      if (prefetched[href]) return;
      prefetched[href] = true;
      var link = document.createElement("link");
      link.rel = "prefetch";
      link.href = href;
      document.head.appendChild(link);
    });
  });

  // Hover prefetch for all other internal links
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
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.textContent = "Email copié !";
  document.body.appendChild(toast);

  document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
    a.addEventListener("click", function () {
      var email = a.href.replace("mailto:", "");
      navigator.clipboard.writeText(email).then(function () {
        toast.classList.add("show");
        setTimeout(function () { toast.classList.remove("show"); }, CONFIG.TOAST_DURATION);
      });
    });
  });
})();

// Page transitions (View Transitions API with fallback)
(function () {
  document.querySelectorAll('a[href]').forEach(function (a) {
    var href = a.getAttribute("href") || "";
    if (href.startsWith("http") || href.startsWith("mailto") || href.startsWith("#") || a.target === "_blank") return;
    a.addEventListener("click", function (e) {
      e.preventDefault();
      function navigate() { window.location.href = href; }
      if (document.startViewTransition) {
        document.startViewTransition(function () {
          document.body.classList.add("page-exit");
          return new Promise(function (resolve) {
            setTimeout(function () { resolve(); navigate(); }, CONFIG.PAGE_TRANSITION_DELAY);
          });
        });
      } else {
        document.body.classList.add("page-exit");
        setTimeout(navigate, CONFIG.PAGE_TRANSITION_DELAY);
      }
    });
  });
})();

// Project filters
(function () {
  var buttons = document.querySelectorAll(".filter-btn");
  if (!buttons.length) return;
  var sections = document.querySelectorAll(".project-section");
  var separators = document.querySelectorAll("#main > .hr");

  // ARIA: mark filter bar as tablist
  var filterBar = document.querySelector(".filter-bar");
  if (filterBar) filterBar.setAttribute("role", "tablist");
  buttons.forEach(function (b) {
    b.setAttribute("role", "tab");
    b.setAttribute("aria-selected", String(b.classList.contains("active")));
  });

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      var filter = btn.getAttribute("data-filter");

      sections.forEach(function (section) {
        var cat = section.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          section.classList.remove("hidden-filter");
        } else {
          section.classList.add("hidden-filter");
        }
      });

      // Hide separators between hidden sections
      separators.forEach(function (hr) {
        var prev = hr.previousElementSibling;
        var next = hr.nextElementSibling;
        if ((prev && prev.classList.contains("hidden-filter")) || (next && next.classList.contains("hidden-filter"))) {
          hr.classList.add("hidden-filter");
        } else {
          hr.classList.remove("hidden-filter");
        }
      });
    });
  });
})();

// Visited projects indicator
(function () {
  var key = "visited-projects";
  var visited; try { visited = JSON.parse(localStorage.getItem(key) || "[]"); } catch (e) { visited = []; }

  // Mark current project as visited (on projets.html with hash)
  if (location.hash && location.pathname.indexOf("projets") !== -1) {
    var id = location.hash.slice(1);
    if (id && visited.indexOf(id) === -1) {
      visited.push(id);
      try { localStorage.setItem(key, JSON.stringify(visited)); } catch (e) {}
    }
  }

  // On index.html, mark project cards linking to visited sections
  document.querySelectorAll('a[href*="projets.html#"]').forEach(function (a) {
    var hash = a.getAttribute("href").split("#")[1];
    if (hash && visited.indexOf(hash) !== -1) {
      var card = a.closest(".card");
      if (card && !card.querySelector(".visited-badge")) {
        var badge = document.createElement("span");
        badge.className = "visited-badge";
        badge.textContent = "Vu";
        badge.setAttribute("aria-label", "Projet déjà consulté");
        var title = card.querySelector(".title");
        if (title) title.appendChild(badge);
      }
    }
  });

  // On projets.html, observe sections to mark as visited on scroll
  document.querySelectorAll(".project-section[id]").forEach(function (section) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var sid = section.id;
          var current; try { current = JSON.parse(localStorage.getItem(key) || "[]"); } catch (e) { current = []; }
          if (current.indexOf(sid) === -1) {
            current.push(sid);
            try { localStorage.setItem(key, JSON.stringify(current)); } catch (e) {}
          }
          obs.unobserve(section);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(section);
  });

  // On projets.html, mark visited sections
  visited.forEach(function (id) {
    var section = document.getElementById(id);
    if (section && !section.querySelector(".visited-badge")) {
      var badge = document.createElement("span");
      badge.className = "visited-badge";
      badge.textContent = "Vu";
      badge.setAttribute("aria-label", "Projet déjà consulté");
      var title = section.querySelector(".section-title");
      if (title) title.appendChild(badge);
    }
  });
})();

// Footer year
document.querySelectorAll(".year").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Service Worker registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  });
}

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

    // focus trap in mobile menu
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Tab" || !links.classList.contains("open")) return;
      var focusable = [btn].concat(Array.from(links.querySelectorAll("a")));
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    // close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && links.classList.contains("open")) {
        setOpen(false);
        btn.focus();
      }
    });
  }
})();
