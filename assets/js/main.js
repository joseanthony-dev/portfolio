// Config
var CONFIG = {
  LOADER_REMOVE_DELAY: 400,
  FADE_THRESHOLD: 0.1,
  MAGNETIC_STRENGTH: 0.15,
  PARTICLE_COUNT: 20,
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
  overlay.innerHTML = '<button class="lightbox-close" aria-label="Fermer">&times;</button><img src="" alt="">';
  document.body.appendChild(overlay);
  var img = overlay.querySelector("img");
  var closeBtn = overlay.querySelector(".lightbox-close");
  var lastFocused = null;

  function openLightbox(href, alt) {
    lastFocused = document.activeElement;
    img.src = href;
    img.alt = alt;
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
    if (e.key === "Escape" && overlay.classList.contains("active")) closeLightbox();
  });
})();

// Magnetic buttons (throttled)
(function () {
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
})();

// Particles
(function () {
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
})();

// Pause animations when page is hidden
(function () {
  document.addEventListener("visibilitychange", function () {
    var paused = document.hidden;
    document.body.style.animationPlayState = paused ? "paused" : "running";
    document.querySelectorAll(".particle, .pulse-dot, .badge-available").forEach(function (el) {
      el.style.animationPlayState = paused ? "paused" : "running";
    });
  });
})();

// 3D tilt on cards (throttled, desktop only)
(function () {
  if (window.matchMedia("(pointer: coarse)").matches) return;
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
})();

// Easter egg (Konami code)
(function () {
  var seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","KeyB","KeyA"];
  var pos = 0;
  document.addEventListener("keydown", function (e) {
    if (e.code === seq[pos]) {
      pos++;
      if (pos === seq.length) {
        pos = 0;
        document.body.style.transition = "transform .5s ease";
        document.body.style.transform = "rotate(360deg)";
        setTimeout(function () { document.body.style.transform = ""; }, CONFIG.EASTER_EGG_RESET_DELAY);
      }
    } else { pos = 0; }
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
      var duration = CONFIG.COUNTER_DURATION;
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

// Page transitions
(function () {
  document.querySelectorAll('a[href]').forEach(function (a) {
    var href = a.getAttribute("href") || "";
    if (href.startsWith("http") || href.startsWith("mailto") || href.startsWith("#") || a.target === "_blank") return;
    a.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.classList.add("page-exit");
      setTimeout(function () { window.location.href = href; }, CONFIG.PAGE_TRANSITION_DELAY);
    });
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
