const { test, expect } = require("@playwright/test");

const PAGES = [
  { name: "accueil", path: "/" },
  { name: "projets", path: "/projets.html" },
  { name: "competences", path: "/competences.html" },
  { name: "contact", path: "/contact.html" },
  { name: "blog", path: "/blog.html" },
];

for (const page of PAGES) {
  test(`${page.name} visual regression`, async ({ page: p }) => {
    await p.goto(page.path);
    await p.waitForLoadState("networkidle");
    // Hide animated elements to avoid flaky diffs
    await p.addStyleTag({
      content: `
        .particle, .pulse-dot, .loader, .scroll-progress,
        .badge-available .pulse-dot { display: none !important; }
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
        }
      `,
    });
    await expect(p).toHaveScreenshot(`${page.name}.png`, {
      fullPage: true,
    });
  });
}
