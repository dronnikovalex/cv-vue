/// <reference types="cypress" />
import AppModal from './AppModal.vue'
import Modal from '../../../cypress/support/PageObjects/Modal_PO'

describe('Test AppModal component', () => {

  it('should be visible when modalVisibility prop given', () => {
    cy.mount(AppModal, {
      props: { 
        modalVisibility: true,
      }
    })
    Modal.getModal()
      .should('exist')
      .and('be.visible')

  })
  
  it('should not be visible when no props given', () => {
    cy.mount(AppModal)
    Modal.getModal()
      .should('not.exist')
  })

  it('should close when click close-button', () => {
    cy.mount(AppModal, {
      props: { 
        modalVisibility: true,
      }
    })
    Modal.getModal()
      .should('exist')  
      .and('be.visible')

    Modal.getCloseButton()
      .should('have.text', ' × ')
      .click()
    Modal.getModal()
      .should('not.exist')  
  })

  it('should close when click "Esc" button', () => {
    cy.mount(AppModal, {
      props: { 
        modalVisibility: true,
      }
    })
    Modal.getModal()
      .should('exist')  
      .and('be.visible')
    
    cy.realPress('Escape')
    
    Modal.getModal()
      .should('not.exist')  
  })
  
  it('should emit close-form event when user clicks on close button', () => {
    const onCloseFormSpy = cy.spy().as('onCloseFormSpy')

    cy.mount(AppModal, {
      props: { 
        modalVisibility: true,
        onCloseForm: onCloseFormSpy
      }
    })

    Modal.closeModal()

    cy.get('@onCloseFormSpy')
      .should('be.calledOnce')
  })

  it('should emit close-form event when user clicks on backdrop', () => {
    const onCloseFormSpy = cy.spy().as('onCloseFormSpy')

    cy.mount(AppModal, {
      props: { 
        modalVisibility: true,
        onCloseForm: onCloseFormSpy
      }
    })

    Modal.getModalBackdrop()
      .click({ force: true })
    cy.get('@onCloseFormSpy')
      .should('be.calledOnce')
  })

  it('should render given slot content', () => {
    const slotContent = 'Sample text'

    cy.mount(AppModal, {
      props: {
        modalVisibility: true,
      },
      slots: {
        default: () => slotContent
      }
    })
    
    Modal.getModal()
      .should('contain.text', slotContent)
  })
})
