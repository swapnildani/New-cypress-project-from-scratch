const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
  username: "admin",
  password: "admin",
},
  retries: 0,
  trashAssetsBeforeRuns: true,
  pageLoadTimeout: 80000,
  defaultCommandTimeout: 80000,
  requestTimeout: 20000,
  watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
     baseUrl: 'https://the-internet.herokuapp.com/',
  },
});
