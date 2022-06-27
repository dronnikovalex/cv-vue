/// <reference types="cypress" />
import AppModal from './AppModal.vue'

describe('Test AppModal component', () => {
  const modalSelector = '[data-testid="modal"]'

  it('should be visible when modalVisibility prop given', () => {
    cy.mount(AppModal, {
      props: { 
        modalVisibility: true,
      }
    })
      .get(modalSelector)
      .should('exist')
      .and('be.visible')

  })
  
  it('should not be visible when no props given', () => {
    cy.mount(AppModal)
    cy.get(modalSelector)
      .should('not.exist')
  })

  it('should close when click close-button', () => {
    const closeBtn = '[data-testid="close-button"]'

    cy.mount(AppModal, {
      props: { 
        modalVisibility: true,
      }
    })
    cy.get(modalSelector)
      .should('exist')  
      .and('be.visible')

    cy.get(closeBtn)
      .should('have.text', ' × ')
      .click()
    cy.get(modalSelector)
      .should('not.exist')  
  })
  
  it('should emit close-form event when user clicks on close button', () => {
    const closeBtn = '[data-testid="close-button"]'
    const onCloseFormSpy = cy.spy().as('onCloseFormSpy')

    cy.mount(AppModal, {
      props: { 
        modalVisibility: true,
        onCloseForm: onCloseFormSpy
      }
    })

    cy.get(closeBtn).click()
    cy.get('@onCloseFormSpy')
      .should('be.calledOnce')
  })

  it('should emit close-form event when user clicks on backdrop', () => {
    const backdropSelector = '[data-testid="modal-backdrop"]'
    const onCloseFormSpy = cy.spy().as('onCloseFormSpy')

    cy.mount(AppModal, {
      props: { 
        modalVisibility: true,
        onCloseForm: onCloseFormSpy
      }
    })

    cy.get(backdropSelector).click({ force: true })
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
      .get(modalSelector)
      .should('contain.text', slotContent)
  })
})
