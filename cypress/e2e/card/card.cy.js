/// <reference types="cypress" />

class HomePage {
  static openPage() {
    cy.visit('/')
  }
}

beforeEach(() => {
  HomePage.openPage()
})

describe('Test main page', () => {
  it('should see cv page', () => {
    cy.location()
      .its('pathname')
      .should('eq', '/cv-vue23/')
  })
})