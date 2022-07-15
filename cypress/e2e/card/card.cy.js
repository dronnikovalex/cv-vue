/// <reference types="cypress" />

import HomePage from '../../support/PageObjects/HomePage_PO'

beforeEach(() => {
  HomePage.openPage()
})


describe('Test main page', () => {

  it('should see cv page', () => {
    cy.location()
      .its('pathname')
      .should('eq', '/cv-vue/')
  })

  it.only('get contacts', () => {

    const TODO_ITEM_ONE = "Buy Milk"
    const TODO_ITEM_TWO = "Pay Rent"
    const TODO_ITEM_THREE = "Pickup Dry Cleaning"
    
    const cmd = Cypress.log({
      name: "create default todos",
      consoleProps() {
        return {
          "Inserted Todos": [TODO_ITEM_ONE, TODO_ITEM_TWO, TODO_ITEM_THREE],
        }
      },
    })  

    cy.get('.contacts__item-md').then(function (listItems)  {
      cmd.set({el: listItems}).snapshot().end()
    })

    cy.get('[data-cy="button"]').click().then(function ()  {
      cmd.snapshot().end()
    })
  })
})