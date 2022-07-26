const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'hyrfv8',
  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
    video: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:8080/cv-vue/',
    viewportHeight: 1080,
    viewportWidth: 1920,
    env: {
      apiHost: 'https://cv-vue-storage-default-rtdb.europe-west1.firebasedatabase.app'
    },
    video: false,
  },
})
