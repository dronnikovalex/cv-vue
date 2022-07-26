/// <reference types="cypress" />

import AppAbout from './AppAbout'
import Sidebar from '../../../cypress/support/PageObjects/Sidebar_PO'
import { faker } from  '@faker-js/faker'

describe('Test AppAbout component', () => {
  it('should render default sidebar about', () => {
    cy.mount(AppAbout)
    
    Sidebar.getInfo()
      .should('exist')
      .and('have.class', 'sidebar__info')
  })

  it('should render sidebar by given prop', () => {
    cy.mount(AppAbout, {
      props: {
        source: 'header'
      }
    })
    
    Sidebar.getInfo()
      .should('exist')
      .and('have.class', 'header__info')
  })

  it('about section not visible due "about" prop not given', () => {
    cy.mount(AppAbout)
    
    Sidebar.getInfo()
      .should('exist')
    cy.get('.sidebar__summary')
      .should('not.exist')
  })

  it('about section should be visible when "about" prop given', () => {
    const randomAboutText = faker.lorem.text()

    cy.mount(AppAbout, {
      props: {
        about: randomAboutText
      }
    })
    
    Sidebar.getAbout()
      .should('exist')
      .find('p')
        .should('have.text', randomAboutText)
  })
})