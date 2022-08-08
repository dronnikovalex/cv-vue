/// <reference types="cypress" />

import TheHeader from './TheHeader'
import { createRandomContactLinkObj } from '../../cypress/utils'

function appendDivToLayout() {
  const div = document.createElement("div")
  div.style.height = "1000px"
  div.style.border = "thick dotted red";

  const target = document.querySelectorAll('[data-v-app]')
  target.item(0).append(div)
}

describe('Test TheFooter component', { viewportWidth: 990 }, () => {
  const randomContacts = [ createRandomContactLinkObj(), createRandomContactLinkObj(), createRandomContactLinkObj() ]
  const headerSelector = '[data-cy="header"]'
  const contactsSelector = '[data-cy="contacts"]'

  function renderHeader(contacts = [], isMobileView = false) {
    const options = {
      props: {
        contacts,
        isMobileView
      }
    }

    return cy.mount(TheHeader, options)
  }

  it('should render component', () => {
    renderHeader(randomContacts)

    cy.get('.info-wrapper')
      .should('be.visible')

    cy.get(headerSelector)
      .should('exist')
      .and('be.visible')

    cy.get(contactsSelector)
      .find('.item')
      .should('have.length', randomContacts.length)
  })

  it('should not render contacts if they are not provided', () => {
    renderHeader()

    cy.get(contactsSelector).should('not.exist')
  })

  it('should render "md" header by default', () => {
    renderHeader(randomContacts)
    
    cy.get('.header__container-md').should('exist')
    cy.get('.header__contacts-md').should('exist')
  })

  it('should render "sm" header when "isMobileView" prop given', () => {
    renderHeader(randomContacts, true)
    
    cy.get('.header__container-sm').should('exist')
    cy.get('.header__contacts-sm').should('exist')
  })


  it('should add scroll listener when component is mounted', () => {
    cy.spy(TheHeader, 'scrollProgress').as('scrollSpy')

    renderHeader(randomContacts)
      .then(() => {
        appendDivToLayout()
      })
    cy.scrollTo(0, 500)

    cy.get('@scrollSpy').should('have.been.called')
  })
  
  it('sholud throw console.warn error if prop "contacts" not given', () => {
    cy.stub(console, 'warn').as('missedProp')

    cy.mount(TheHeader)

    cy.get('@missedProp')
      .should('have.been.calledWithMatch', 'Missing required prop: "contacts"')
  })

  const isMobileViewArray = [true, false]

  isMobileViewArray.forEach(isMobileProp => {
    it('should calculate correct computed properties depending on "isMobileView" prop', () => {
      renderHeader(randomContacts, isMobileProp)
      
      cy.get('@vue')
        .should(vue => {
          expect(vue.vm.contactsListClass).to.eql(`header__contacts-${isMobileProp ? 'sm': 'md'}`)
          expect(vue.vm.headerContainerClass).to.eql(`header__container-${isMobileProp ? 'sm': 'md'}`)
        })
    })
  })

})