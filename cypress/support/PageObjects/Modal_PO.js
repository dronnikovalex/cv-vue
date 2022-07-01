export default class Modal {
  static getModal() {
    return cy.get('[data-testid="modal"]')
  }

  static getModalBackdrop() {
    return cy.get('[data-testid="modal-backdrop"]')
  }

  static openModal() {
    cy.get('[data-cy="contact-me"]').click()
  }

  static closeModal() {
    cy.get('[data-testid="close-button"]').click()
  }

  static getNameInput() {
    return cy.get('#name')
  }
  
  static getPositionInput() {
    return cy.get('#position')
  }

  static getContactsInput() {
    return cy.get('#contacts')
  }

  static getDescriptionArea() {
    return cy.get('#description')
  }

  static fillForm({ name, position, contacts, description }) {
    this.getNameInput().type(name)
    this.getPositionInput().type(position)
    this.getContactsInput().type(contacts)
    this.getDescriptionArea().type(description)
  }

  static getSubmitButton() {
    return cy.get('[data-cy="send-form"]')
  }

  static submitForm() {
    cy.get('[data-cy="send-form"]').click()
  }
}