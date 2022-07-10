const silent = { log: false }

export default class HomePage {

  static openPage() {
    cy.visit('/')
  }

  static getToast() {
    return cy.get('[data-cy="toast"]', silent)
  }
}