/// <reference types="cypress" />

import AppButton from './AppButton'

describe('Test AppButton component', () => {
  const buttonSelector = '[data-cy="button"]'

  it('should render default slot text', () => {
    cy.mount(AppButton)
      .get('[data-cy="contact-me"]')
      .should('exist')
      .and('include.text', 'Связаться')
  })

  it('should render given slot text', () => {
    const slotContent = 'Кнопка'

    cy.mount(AppButton, {
      slots: {
        default: () => slotContent,
      }
    })
      
    cy.get(buttonSelector)
      .should('exist')
      .and('have.text', slotContent)
  })

  it('should not be disabled by default', () => {
    cy.mount(AppButton)
      .get(buttonSelector)
      .should('exist')
      .and('not.be.disabled')
    
    cy.get('@warnSpy')
  })

  it('should retun warn message if requred prop not given', () => {
    cy.stub(window.console, 'warn').as('warnSpy')

    cy.mount(AppButton)
      .get(buttonSelector)
      .should('exist')
      .and('not.be.disabled')
    
    cy.get('@warnSpy')
      .should('be.calledWithMatch', 'Missing required prop: "disabled"')
  })

  it('should be disabled due "disabled" prop given', () => {
    cy.mount(AppButton, {
      props: {
        disabled: true,
      }
    })
      
    cy.get(buttonSelector)
      .should('exist')
      .and('be.disabled')
  })

  it.only('should emit "action" when click on button', () => {
    const onActionSpy = cy.spy().as('onActionSpy')

    cy.mount(AppButton, {
      props: {
        onAction: onActionSpy
      }
    })

    cy.get(buttonSelector).click()
    cy.get('@onActionSpy')
      .should('have.been.calledOnce')
  })

})