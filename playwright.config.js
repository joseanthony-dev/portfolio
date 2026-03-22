const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  snapshotPathTemplate: "{testDir}/screenshots/{arg}{ext}",
  use: {
    baseURL: "http://localhost:8080",
    screenshot: "off",
  },
  projects: [
    {
      name: "desktop",
      use: { viewport: { width: 1280, height: 720 } },
    },
    {
      name: "mobile",
      use: { viewport: { width: 375, height: 667 } },
    },
  ],
  webServer: {
    command: "python3 -m http.server 8080",
    port: 8080,
    reuseExistingServer: true,
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },
});
