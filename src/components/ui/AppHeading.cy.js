import AppHeading from './AppHeading'

it('Test AppHeading', () => {
  cy.mount(AppHeading)

  cy.get('.card__title')
})