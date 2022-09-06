const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
  },

  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'custom-title',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
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
