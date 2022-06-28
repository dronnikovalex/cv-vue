/// <reference types="cypress" />

import Modal from '../../support/PageObjects/Modal_PO'
import HomePage from '../../support/PageObjects/HomePage_PO'

beforeEach(() => {
  HomePage.openPage()
})

describe('', () => {  
  it.only('should open modal by clicking "contact me" button', () => {
    Modal.getModal()
      .should('not.exist')
    Modal.openModal()
    Modal.getModal()
      .should('exist')
      .and('be.visible')
  })
})