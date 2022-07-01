// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "cypress-real-events/support";
const Ajv = require("ajv");

//Schema validation custom command
Cypress.Commands.add('validateSchema', (schema, response) => {
  const ajv = new Ajv({ verbose: true });
  const validate = ajv.compile(schema);
  const isValid = validate(response);

  if (!isValid) {
    const { dataPath, keyword, message } = validate.errors[0]

    throw new Error(`Field: ${dataPath} is invalid. Cause: requested ${keyword} ${message}`)
  } else {
    expect(isValid, 'Schema validated!').to.eq(true)
  }
});