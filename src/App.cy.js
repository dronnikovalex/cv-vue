/// <reference types="cypress" />

import App from './App.vue'
import Card from '../cypress/support/PageObjects/Card_PO'
import HomePage from '../cypress/support/PageObjects/HomePage_PO'
import Sidebar from '../cypress/support/PageObjects/Sidebar_PO'
import Modal from '../cypress/support/PageObjects/Modal_PO'

describe('Test App component', { viewportHeight: 720, viewportWidth: 1280 }, () => {
  it('should render', () => {
    cy.mount(App)

    HomePage.getHomepage().should('be.visible')
    Card.getCard().should('be.visible')
    Sidebar.getSidebar().should('be.visible')
  }) 

  it('should shown loader if prop "loading" given', () => {
    cy.mount(App, {
      props: {
        loading: true
      }
    })

    HomePage.getLoader().should('be.visible')
  })

  it('should show placeholder when error occurs', () => {
    const errorText = '[Error] Some error'

    cy.mount(App, {
      data() {
        return {
          errOnLoadPage: true,
          errorMessage: errorText
        }
      }
    })

    HomePage.getErrorText()
      .should('be.visible')
      .and('have.text', errorText)
  })

  it('should render sidebar and not render header on laptop and higher displays', () => {
    cy.mount(App)

    cy.get('@vue')
      .its('vm')
      .then(vueInstance => {
        expect(vueInstance.isLaptopView, 'sidebar renders when width >= 993px').to.be.true
      })
    Sidebar.getSidebar().should('be.visible')

    cy.get('[data-cy="header"]').should('not.exist')
  })

  it('should not render sidebar and render header small devices', () => {
    cy.viewport('iphone-7')

    cy.mount(App)

    cy.get('@vue')
      .its('vm')
      .then(vueInstance => {
        expect(vueInstance.isLaptopView, 'sidebar renders when width >= 993px').to.be.false
      })
    Sidebar.getSidebar().should('not.exist')

    cy.get('[data-cy="header"]').should('be.visible')
  })

  it('should not render card section if no data given', () => {
    cy.intercept('GET', '**/profile-data.json', { fixture: 'empty_card_profile.json' }).as('profileInfo')

    cy.mount(App)
    cy.wait('@profileInfo')

    Card.getSkills().find('.skills__description').should('not.exist')
    Card.getExperience().should('not.exist')
    Card.getStudy().should('not.exist')
  })  

  it('should not render footer on laptop and higher displays', () => {
    cy.mount(App)

    HomePage.getFooter().should('not.exist')
  })

  it('should render footer on tablet and lower displays', () => {
    cy.viewport('iphone-7')

    cy.mount(App)

    HomePage.getFooter().should('be.visible')
  })

  it('should call openModal method when click request button in sidebar', () => {
    cy.spy(App.methods, 'openModal').as('openModalSpy')

    cy.mount(App)
    Modal.openModal()

    cy.get('@openModalSpy').should('have.been.calledOnce')
  })

  it('should call openModal method when click request button in footer', () => {
    cy.viewport('iphone-7')
    cy.spy(App.methods, 'openModal').as('openModalSpy')

    cy.mount(App)
    Modal.openModal()

    cy.get('@openModalSpy').should('have.been.calledOnce')
  })

  it.only('should call closeModal when click close modal', () => {
    cy.spy(App.methods, 'closeForm').as('closeFormSpy')

    cy.mount(App)
    Modal.openModal()
    Modal.closeModal()

    cy.get('@closeFormSpy').should('have.been.calledOnce')

  })

  it('should show toast when toastVisibility equals true', () => {
    const toastMessage = 'Test toast'

    cy.mount(App, {
      data() {
        return {
          toastVisibility: true,
          toastMessage: toastMessage
        }
      }
    })

    HomePage.getToast()
      .should('be.visible')
      .and('have.text', toastMessage)
  })
})