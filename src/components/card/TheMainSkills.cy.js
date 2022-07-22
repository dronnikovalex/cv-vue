/// <reference types="cypress" />

import TheMainSkills from './TheMainSkills.vue'
import mockedStack from '../../../cypress/fixtures/stack_template.json'

describe('Test TheMainSkills component', () => {
  Cypress

  function renderTheMainSkills(stack = {}, isShortTitle = false) {
    const options = {
      props: {
        stack,
        isShortTitle
      }
    }

    cy.mount(TheMainSkills, options)
  }
  
  it('should render component when all props given', () => {
    renderTheMainSkills(mockedStack)
  })
  
})
