/// <reference types="cypress" />

import MainEducationItem from './MainEducationItem'
import Card from '../../../cypress/support/PageObjects/Card_PO'
import { createRandomStudyItem } from '../../../cypress/utils'

describe('Test MainEducation component', () => {

  function assertStudyItem({ title, dateFrom, dateTo, description }) {
    cy.contains('.study__title', title).should('be.visible')
    cy.contains('.study__years', `${dateFrom} - ${dateTo}`).should('be.visible')
    cy.contains('.study__description', description).should('be.visible')
  }
  
  it('should render component', () => {
    const testItem = createRandomStudyItem()

    cy.mount(MainEducationItem, {
      props: {
        instance: testItem
      }
    })

    Card.getStudyItems()
      .should('be.visible')
      .within({ log: false }, () => {
        assertStudyItem(testItem)
      })
  })

  it('sholud render placeholder instance if prop "instance" not given', () => {
    cy.mount(MainEducationItem)
      .then(() => {
        const placeholderItem = Cypress.vue.instance
        assertStudyItem(placeholderItem)
      })

  })

})