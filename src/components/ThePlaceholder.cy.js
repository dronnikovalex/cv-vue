/// <reference types="cypress" />

import ThePlaceholder from './ThePlaceholder.vue'
import HomePage from '../../cypress/support/PageObjects/HomePage_PO'

const _ = undefined

describe('Test ThePlaceholder component', () => {
  function renderPlaceholder(isWaiting = false, errorMessage) {
    const options = {
      props: {
        waitingForResponse: isWaiting
      }
    }

    if (errorMessage) options.props.errorMessage = errorMessage

    return cy.mount(ThePlaceholder, options)
  }

  it('should render component', () => {
    renderPlaceholder()

    HomePage.getErrorPlaceholder().should('be.visible')
  }) 

  it('should render default errorText if prop "errorMesage" not provided', () => {
    renderPlaceholder()

    HomePage.getErrorText()
      .should('be.visible')
      .and('have.text', '[Ошибка] Что-то пошло не так.')
  })

  it('should render custom error message', () => {
    const customErrorMessage = '[Error] Some error'

    renderPlaceholder(_, customErrorMessage)

    HomePage.getErrorText()
      .should('be.visible')
      .and('have.text', customErrorMessage)
  })

  it('should emmit event when click on repeat button', () => {
    const repeatEventSpy = cy.spy().as('repeatEventSpy')

    cy.mount(ThePlaceholder, {
      props: {
        onRepeatLoading: repeatEventSpy
      }
    })

    HomePage.getPlaceholderRepeatBtn().click()
    
    cy.get('@repeatEventSpy').should('have.been.calledOnce')
  })

  it.only('should have loader on button if prop "waitingForResponse" given', () => {
    renderPlaceholder(true)

    cy.get('.error__button')
      .find('div').first()
      .should('have.class', 'lds-ring-sm')
  })
  
})