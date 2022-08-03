const silent = { log: false }

export default class HomePage {

  static openPage() {
    cy.visit('/')
  }

  static getToast() {
    return cy.get('[data-cy="toast"]', silent)
  }

  static getErrorPlaceholder() {
    return cy.get('[data-cy="error"]', silent)
  }

  static getErrorText() {
    return cy.get('[data-cy="error-text"]', silent)
  }

  static getPlaceholderRepeatBtn() {
    return cy.contains('.error__button', 'Повторить')
  }
}