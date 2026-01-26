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
    btn.addEventListener("click", () => links.classList.toggle("open"));
    document.addEventListener("click", (e) => {
      if (!links.contains(e.target) && e.target !== btn) links.classList.remove("open");
    });
  }
})();
