/// <reference types="cypress" />

describe('Test fetchProfileInfo method', () => {
  it('should be called on page visit', () => {
    cy.intercept('/profile.json').as('fetchProfileData')

    cy.visit('/')
    cy.wait('@fetchProfileData')
      .its('state')
      .should('eql', 'Complete')
  })

  it('should return 200 OK', () => {
    cy.request(`${Cypress.env('apiHost')}/profile.json`)
      .its('status').should('eql', 200)
  })

  it('response should match expected schema', () => {
    cy.request(`${Cypress.env('apiHost')}/profile.json`)
      .its('body')
      .should(spok({
        about: spok.type('string'),
        contacts: spok.type('object'),
        experience: spok.type('object'),
        links: spok.type('object'),
        stack: spok.type('object'),
        study: spok.type('object'),
      }))
  })
})