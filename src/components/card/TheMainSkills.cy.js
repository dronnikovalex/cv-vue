/// <reference types="cypress" />

import TheMainSkills from './TheMainSkills.vue'
import mockedStack from '../../../cypress/fixtures/stack_template.json'

describe('Test TheMainSkills component', () => {
  const titleSelector = '[data-cy="card-title"]'
  const bannerSelector = '[data-cy="skills-banner"]'
  const bannerItemSelector = '[data-cy="banner-item"]'
  const skillsSelector = '[data-cy="skills-description"]'

  const _ = undefined
  const silent = { log: false }

  function renderTheMainSkills(stack = [], isShortTitle) {
    const options = {
      props: {
        stack,
        isShortTitle
      }
    }

    return cy.mount(TheMainSkills, options)
  }

  context('Large and wider devices', () => {
    beforeEach(() => {
      cy.viewport('macbook-13', silent)
    })

    it('should render component', () => {
      renderTheMainSkills(mockedStack)
      
      cy.get(titleSelector).should('be.visible')
      cy.get(bannerSelector).should('be.visible')
      cy.get(bannerItemSelector).should('be.visible')
      cy.get(skillsSelector).should('be.visible')
    })

    it('should render correct title when prop isShortTitle equals false', () => {
      renderTheMainSkills(_, false) 
      
      cy.contains(titleSelector, 'Профессиональные навыки').should('be.visible')
    }) 

    it('sholud throw console.warn error if prop "isShortTitle" and/or "stack" not given', () => {
      cy.stub(window.console, 'warn').as('missedProp')
  
      cy.mount(TheMainSkills)
  
      cy.get('@missedProp')
        .should('have.been.called')
        .and('be.calledWithMatch', 'Missing required prop: "isShortTitle"')
        .and('be.calledWithMatch', 'Missing required prop: "stack"')       
    })

    it('should render small title when "isShortTitle" prop given', () => {
      cy.viewport('iphone-7', silent)

      renderTheMainSkills(_, true)

      cy.get(titleSelector)
        .find('.sm-size-title', silent)
        .should('have.text', 'Навыки')
    })

    it('should not render skills if props "stack" is empty', () => {
      renderTheMainSkills()

      cy.get(skillsSelector)
        .should('not.exist')
    })

    it('should build "bannerClasses" array when prop "stack" given', () => {
      renderTheMainSkills(mockedStack)
        .then(wrapper => {
          function makeBannerItem(item) {
            return {
              name: item.name.toLowerCase(),
              url: item.url
            }
          }

          const expectedArray = Cypress._.map(mockedStack, makeBannerItem)

          expect(expectedArray, 'expected array should equal to created in mounted hook').to.deep.equal(wrapper.vm.bannerClasses)
        })
    })

  })
  
})
