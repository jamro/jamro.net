module.exports = {
  tmp: ".tmp/",
  dist: "dist/",
  app: "app/",
  test: "test/**/*.test.js",
  scripts: "app/scripts/",
  entry: {
    app: "app/scripts/entry-app.js",
    assets: "app/scripts/entry-assets.js",
    vendor1: "app/scripts/entry-vendor1.js",
    vendor2: "app/scripts/entry-vendor2.js"
  },
  static: "app/static/**/*",
  ga: "" // Google analytics code
};
