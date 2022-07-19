/// <reference types="cypress" />

import ContactsListItem from './ContactsListItem'

describe('Test ContactsListItem component', () => {
  const testContact = {
    link: 'testLink',
    name: 'testName',
    type: 'testType',
    value: 'testValue',
  }

  it('should render md component by default', () => {
    cy.mount(ContactsListItem, {
      props: {
        contact: testContact
      }
    })
    
    cy.get('.item__placeholder')
      .should('exist')
      .and('be.visible')
    cy.get('[data-cy="md-link"]')
      .should('exist')
      .and('be.visible')
  })

  it('should render small component when prop "isMobileVie === true"', () => {
    cy.mount(ContactsListItem, {
      props: {
        contact: testContact,
        isMobileView: true
      }
    })
    
    cy.get('[data-cy="sm-link"]')
      .should('exist')
      .and('be.visible')
  })

  it('should render md component when prop "isMobileView === false" ', () => {
    cy.mount(ContactsListItem, {
      props: {
        contact: testContact,
        isMobileView: false,
      }
    })
    
    cy.get('.item__placeholder')
      .should('exist')
      .and('be.visible')
    cy.get('[data-cy="md-link"]')
      .should('exist')
      .and('be.visible')
  })

  it.only('sholud throw console.warn error if prop "contact" was not provided', () => {
    cy.stub(window.console, 'warn').as('missedProp')

    cy.mount(ContactsListItem)

    cy.get('@missedProp') 
      .should('have.been.called')
      .and('be.calledWithMatch', 'Missing required prop: "contact"')
  })
})