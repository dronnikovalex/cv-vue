export default class Card {
  static getCard() {
    return cy.get('[data-cy="card-container"]')
  }

  static getBanner() {
    return cy.get('data-cy="skills_banner"')
  }

  static getBannerItem(idx) {
    return cy.get('.banner__item').eq(idx)
  }

  static getSkills() {
    return cy.get('[data-cy="skills"]')
  }

  static toggleStudyDetails() {
    return cy.get('[data-cy="study-details"]').click()
  }

}