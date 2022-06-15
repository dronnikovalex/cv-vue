/// <reference types="cypress" />

describe('Test fetchProfileInfo method', () => {
  it('should be called on page visit', () => {
    cy.intercept('/profile.json').as('fetchProfileData')

    cy.visit('/')
    cy.wait('@fetchProfileData')
      .its('state')
      .should('eql', 'Complete')
  })

  it.only('should return 200 OK', () => {
    cy.request(`${Cypress.env('apiHost')}/profile.json`)
      .its('status').should('eql', 200)
  })
})