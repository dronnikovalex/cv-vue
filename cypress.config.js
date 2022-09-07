const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
  },

  e2e: {
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results/mocha',
      overwrite: false,
      quiet: true,
      html: false,
      json: true,
    },
    screenshotsFolder: "mochareports/assets",
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://localhost:8080/cv-vue/',
    viewportHeight: 1080,
    viewportWidth: 1920,
    env: {
      apiHost: 'https://cv-vue-storage-default-rtdb.europe-west1.firebasedatabase.app'
    },
    video: false
  },
});
