/// <reference types="cypress" />

import TheMainExperience from './TheMainExperience.vue'
import { createRandomExperienceItem } from '../../../cypress/utils'

describe('Test TheMainExperience component', () => {

  const experienceItems = [
    createRandomExperienceItem()
  ]

  function renderExperienceSection(experienceItems) {
    if (experienceItems.length) {
      return cy.mount(TheMainExperience, {
        props: {
          experience: experienceItems
        }
      })
    }
  }

  it('should render component', () => {
    // renderExperienceSection()

    console.log(experienceItems)
  })

  it.skip('should not render experience section if prop "experience" not given', () => {

  })

  it.skip('sholud throw console.warn error if prop "experience" not given', () => {
    cy.stub(window.console, 'warn').as('missedProp')

    cy.mount()

    cy.get('@missedProp')
      .should('have.been.called')
      .and('be.calledWithMatch', 'Missing required prop: "isShortTitle"')
      .and('be.calledWithMatch', 'Missing required prop: "stack"')       
  })

})