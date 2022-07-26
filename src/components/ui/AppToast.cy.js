/// <reference types="cypress" />
import AppToast from './AppToast.vue'
import HomePage from '../../../cypress/support/PageObjects/HomePage_PO'

describe('Test AppToast component', () => {

  it('Toast should be visible when isVisible prop given', () => {
    const SlotContent = 'Succes'

    cy.mount(AppToast, {
      props: {
        isVisible: true
      },
      slots: {
        default: () => SlotContent
      }
    })

    HomePage.getToast()
      .should('be.visible')
  })

  it('Toast should be visible when isVisible prop was not given', () => {
    const SlotContent = 'Succes'

    cy.mount(AppToast, {
      slots: {
        default: () => SlotContent
      }
    })

    HomePage.getToast()
      .should('not.exist')
  })

  it('Toast should contain expected text when slot given', () => {
    const SlotContent = 'Succes'

    cy.mount(AppToast, {
      props: {
        isVisible: true
      },
      slots: {
        default: () => SlotContent
      }
    })

    HomePage.getToast()
      .should('have.text', SlotContent)
  })

  it('Toast should contain default text when slot was not given', () => {
    const defaultSlotContent = '[Ошибка] Что-то пошло не так.'

    cy.mount(AppToast, {
      props: {
        isVisible: true
      },
      slots: {
        default: () => defaultSlotContent
      }
    })
    
    HomePage.getToast()
      .should('have.text', defaultSlotContent)
  })



})