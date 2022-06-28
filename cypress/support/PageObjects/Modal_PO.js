export default class Modal {
  static getModal() {
    return cy.get('[data-testid="modal"]')
  }

  static openModal() {
    cy.get('[data-cy="contact-me"]').click()
  }
}