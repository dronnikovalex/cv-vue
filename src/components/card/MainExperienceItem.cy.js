/// <reference types="cypress" />

import MainExperienceItem from './MainExperienceItem'
import { createRandomExperienceItem } from '../../../cypress/utils'

const silent = { log: false }

describe('Test MainExperienceItem', () => {
  const itemSelector = '[data-cy="experience-item"]'

  function renderExperienceItem(item) {
    if (item) {
      return cy.mount(MainExperienceItem, {
        props: {
          experienceItem: item
        }
      })
    }

    return cy.mount(MainExperienceItem)
  }

  it('should render component', () => {
    const testItem = createRandomExperienceItem()

    renderExperienceItem(testItem)

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

  it('should has css class "experience__last" if prop "last" equal true', () => {
    const testItem = createRandomExperienceItem()
    Object.defineProperty(testItem, 'last', { value: true })

    renderExperienceItem(testItem)
      .then(() => {
        expect(Cypress.vue.isLastJob, 'should compute "isLastJob" correctly').to.be.true
      
        cy.get(itemSelector)
          .find('h3')
          .should('have.class', 'experience__last')
          .and('have.css', 'text-shadow')
      })

  })

  it.only('should render default placeholder item if prop "experienceItem" not given', () => {
    renderExperienceItem()
      .then((wrapper) => {
        cy.wrap(Object.assign({}, wrapper.props().experienceItem), { log: false })
          .as('defaultItem')
      })
      .then(function() {
        const { 
          name, 
          dateFrom, 
          dateTo, 
          position, 
          description 
        } = this.defaultItem

        cy.get(itemSelector).within(() => {
          cy.get('h3').should('have.text', `${name} | ${dateFrom} - ${dateTo}`)
        })
        cy.get('.experience__position').should('have.text', `Должность - ${position}`)
        cy.get('.experience__description').should('have.text', description)
      })

  })

})