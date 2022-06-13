// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
<<<<<<< HEAD
import '../../src/setup'
=======
import '../../src/assets/index.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faVk, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faHSquare, faEnvelope, faPhone, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

library.add(faGithub, faVk, faHSquare, faEnvelope, faPhone, faTelegram, faCircleQuestion);

// Alternatively you can use CommonJS syntax:
// require('./commands')
>>>>>>> 5c0e3fd (Add project resources support to Cypress)

import { mount } from 'cypress/vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Cypress.Commands.add('mount', (component, options = {}) => {
  // Setup options object
  options.global = options.global || {}
  options.global.components = options.global.components || {}

  // Register global components
  options.global.components['FontAwesomeIcon'] = FontAwesomeIcon

  return mount(component, options)
})
<<<<<<< HEAD
=======
// Example use:
// cy.mount(MyComponent)
>>>>>>> 5c0e3fd (Add project resources support to Cypress)
