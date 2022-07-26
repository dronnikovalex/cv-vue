/// <reference types="cypress" />

import MainExperienceItem from './MainExperienceItem'
import { createRandomExperienceItem } from '../../../cypress/utils'

const silent = { log: false }

describe('Test MainExperienceItem', () => {
  const itemSelector = '[data-cy="experience-item"]'

  it('should render component', () => {
    const testItem = createRandomExperienceItem()

    cy.mount(MainExperienceItem, {
      props: {
        experienceItem: testItem
      }
    })

    cy.get(itemSelector, silent)
      .should('be.visible')
      .within(silent, () => {
        cy.get('h3')
          .should('have.text', `${testItem.name} | ${testItem.dateFrom} - ${testItem.dateTo}`)
        cy.get('.experience__position')
          .should('have.text', `Должность - ${testItem.position}`)
        cy.get('.experience__description')
          .should('have.text', testItem.description)
    })
  })

  it.skip('should has css class "experience__last" if prop "last" equal true', () => {
    
  })

  it.skip('should render default placeholder item if prop "experienceItem" not given', () => {
    
  })

})