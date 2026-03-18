export default [
  {
    ignores: ["**/*.min.js"]
  },
  {
    files: ["assets/js/**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        localStorage: "readonly",
        location: "readonly",
        setTimeout: "readonly",
        requestAnimationFrame: "readonly",
        IntersectionObserver: "readonly",
        URLSearchParams: "readonly",
        CONFIG: "readonly",
        fetch: "readonly",
        caches: "readonly",
        self: "readonly",
        Promise: "readonly",
        Array: "readonly",
        Math: "readonly",
        console: "readonly",
        URL: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "eqeqeq": ["warn", "smart"],
      "semi": ["warn", "always"],
      "no-console": "off"
    }
  }
];
