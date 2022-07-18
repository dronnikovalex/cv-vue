/// <reference types="cypress" />

import ContactsList from './ContactsList.vue'

describe('Test ContactsList component', () => {
  const requestBtnSelector = '[data-cy="request-btn"]'
  const contactsSelector = '[data-cy="contacts"]'

  const testContacts = [{
    link: 'testLink',
    name: 'testName',
    type: 'testType',
    value: 'testValue',
  }]

  it('should render component if props given', () => {
    cy.mount(ContactsList, {
      props: {
        contacts: testContacts,
        source: 'testSource',
      }
    })
    
    cy.contains(testContacts[0].name).should('exist').and('be.visible')
    cy.contains('Контакты').should('exist').and('be.visible')
    cy.get(requestBtnSelector).should('exist')
  })

  it('should not show title if prop "source" === "header"', () => {
    cy.mount(ContactsList, {
      props: {
        source: 'header',
      }
    })
  })

  it('should not show title if prop "source" not given', () => {
    cy.mount(ContactsList)
  })

  it('sholud throw console.warn error if prop "contacts" not given', () => {
    cy.stub(window.console, 'warn').as('missedProp')

    cy.mount(ContactsList)

    cy.get('@missedProp')
      .should('have.been.called')
      .and('be.calledWithMatch', 'Missing required prop: "contacts"')
  })

  it('should emit "open-modal" event by click modal button', () => {
    const onOpenModalSpy = cy.spy().as('onOpenModalSpy')

    cy.mount(ContactsList, {
      props: {
        source: 'sidebar',
        onOpenModal: onOpenModalSpy
      }
    })

    cy.get(requestBtnSelector).click()
    cy.get('@onOpenModalSpy').should('be.calledOnce')
  })

  it('should return sm postfix on small devices', () => {
    cy.mount(ContactsList, {
      props: {
        source: 'sidebar',
        contacts: testContacts,
        isMobileView: true
      }
    })

    cy.get(contactsSelector)
      .find('.contacts__item-sm')
      .should('exist')
      .and('be.visible')
  })

  it('should return md postfix by default', () => {
    cy.mount(ContactsList, {
      props: {
        source: 'sidebar',
        contacts: testContacts,
      }
    })

    cy.get(contactsSelector)
      .find('.contacts__item-md')
      .should('exist')
      .and('be.visible')
  })

  it('should return md postfix on medium devices', () => {
    cy.mount(ContactsList, {
      props: {
        source: 'sidebar',
        contacts: testContacts,
        isMobileView: false
      }
    })

    cy.get(contactsSelector)
      .find('.contacts__item-md')
      .should('exist')
      .and('be.visible')
  })
  
})