const silent = { log: false }

export default class Card {
  static getCard() {
    return cy.get('[data-cy="card-container"]')
  }

  static getBanner() {
    return cy.get('[data-cy="skills-banner"]')
  }

  static getBannerItem(idx) {
    return cy.get('.banner__item').eq(idx)
  }

  static getSkills() {
    return cy.get('[data-cy="skills"]')
  }

  static getStudy() {
    return cy.get('#study')
  }

  static getStudyItems(number) {
    if (number) {
      return cy.get('[data-cy="study-item"]').eq(number, silent)
    }
    return cy.get('[data-cy="study-item"]')
  }

  static getSTudyDetails() {
    return cy.get('[data-cy="study-details"]')
  }

  static toggleStudyDetails() {
    this.getSTudyDetails()
      .click()
  }
}