/// <reference types="cypress" />

import TheMainExperience from './TheMainExperience.vue'
import { createRandomExperienceItem } from '../../../cypress/utils'

describe('Test TheMainExperience component', () => {
  const titleSelector = '[data-cy="card-title"]'
  const experienceSection = '[data-cy="experience-container"]'
  
  const experienceItems = [
    createRandomExperienceItem()
  ]

  function renderExperienceSection(experienceItems) {
    if (experienceItems && experienceItems.length) {
      return cy.mount(TheMainExperience, {
        props: {
          experience: experienceItems
        }
      })
    }

    return cy.mount(TheMainExperience)
  }

  it('should render component', () => {
    renderExperienceSection(experienceItems)

    cy.get(titleSelector)
      .should('be.visible')
    cy.get(experienceSection)
      .should('be.visible')
      .and('not.be.empty')
  })

  it('should not render experience section if prop "experience" not given', () => {
    renderExperienceSection()

    cy.get('#experience')
      .should('not.exist')
  })

  it('sholud throw console.warn error if prop "experience" not given', () => {
    cy.stub(window.console, 'warn').as('missedProp')

    renderExperienceSection()

    cy.get('@missedProp')
      .should('have.been.called')
      .and('be.calledWithMatch', 'Missing required prop: "experience"')
  })

})