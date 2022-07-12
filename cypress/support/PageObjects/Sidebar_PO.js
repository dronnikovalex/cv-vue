export default class Sidebar {
  static getSidebar() {
    return cy.get('[data-cy="sidebar"]')
  }

  static getAvatar() {
    return cy.get('[data-cy="avatar"]')
  }

  static getInfo() {
    return cy.get('[data-cy="info"]')
  }

  static getAbout() {
    return cy.get('[data-cy="about"]')
  }

  static getContacts() {
    return cy.get('[data-cy="contacts"]')
  }

  static getLinks() {
    return cy.get('[data-cy="links"]')
  }
}