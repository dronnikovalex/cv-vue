/// <reference types="cypress" />

import Modal from '../../support/PageObjects/Modal_PO'
import HomePage from '../../support/PageObjects/HomePage_PO'

beforeEach(() => {
  HomePage.openPage()
})

describe('Modal tests', () => {
  it('should open modal by clicking "contact me" button', () => {
    Modal.getModal()
      .should('not.exist')
    Modal.openModal()
    Modal.getModal()
      .should('exist')
      .and('be.visible')
  })

  it('should have possibilty to close modal window by close button', () => {
    Modal.openModal()
    Modal.getModal()
      .should('be.visible')
      .find('[data-testid="close-button"]')
      .click()
    Modal.getModal()
      .should('not.exist')
  })

  it.only('should have possibilty to close modal window Esc key', () => {
    Modal.openModal()
    Modal.getModal()
      .should('be.visible')
    cy.get('input#name')
      .focus()
      .type('asd')
      .trigger('keypress', { keyCode: 27, which: 27 })
    Modal.getModal()
      .should('not.exist')
  })
})