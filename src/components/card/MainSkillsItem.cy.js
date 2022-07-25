/// <reference types="cypress" />

import MainSkillsItem from './MainSkillsItem.vue'

const silent = { log: false }

describe('Test MainSkillsItem component', () => {
  const itemSelector = '[data-cy="skills-item"]'
  const testItem = {
    name: 'test name',
    description: 'test description'
  }

  function renderSkillsItem(item) {
    if (item) {
      return cy.mount(MainSkillsItem, {
        props: {
          technology: item
        }
      })
    }

    return cy.mount(MainSkillsItem)
  }

  function validateItemField(expectedTitle, expectedDescription) {
    if (expectedTitle) {
      cy.get(itemSelector, silent)
      .find('h3', silent)
      .should('have.text', expectedTitle)
    }

    if (expectedDescription) {
      cy.get(itemSelector, silent)
      .find('p', silent)
      .should('have.text', expectedDescription)
    }
  }

  it('should render component', () => {
    const { name: title, description } = testItem

    renderSkillsItem(testItem)

    validateItemField(title, description)
  })

  it('should redner component with placeholder data if prop "technology" not given', () => {
    renderSkillsItem()
      .then(wrapper => {
        const title = wrapper.props().technology.name
        const description = wrapper.props().technology.description

        validateItemField(title, description)
      })
  })

  it('sholud throw console.warn error if prop "technology" not given', () => {
    cy.stub(window.console, 'warn').as('missedProp')

    renderSkillsItem()

    cy.get('@missedProp')
      .should('have.been.called')
      .and('be.calledWithMatch', 'Missing required prop: "technology"')
  })

  it('should render correct technology name if given name equals "HTML', () => {
    const expectedTitle = 'HTML, CSS'
    testItem.name = 'HTML'

    renderSkillsItem(testItem)

    cy.vue()
      .then(wrapper => {
        expect(wrapper.vm.technologyName, 'computed property should return expected title').to.eql(expectedTitle)
      })

    validateItemField(expectedTitle)
  })

})