/// <reference types="cypress" />

import LinksListItem from './LinksListItem'

const silent = { log: false }

describe('Test LinksListItem component', () => {
  const listItemSelector = '[data-cy="link-item"]'
  const iconStub = 'icon'
  const link = {
    link: 'testLink',
    name: 'testName',
    type: 'testType',
    value: 'testvalue',
  }

  beforeEach(() => {
    cy.stub(LinksListItem.components.AppIcon, 'render').returns(iconStub).as('AppIcon')
  })

  it('should render if prop "link" given', () => {
    cy.mount(LinksListItem, {
      props: {
        link
      }
    })

    cy.get(listItemSelector, silent).within(silent, () => {
      const { name, value } = link

      cy.contains(name).should('exist')
      cy.contains(iconStub).should('exist')
      cy.contains(value).should('exist')
    })
  })

  it('should not render if no props given', () => {
    cy.mount(LinksListItem)

    cy.get(listItemSelector, silent)
      .should('not.exist')
  })

  it('sholud throw console.warn error if prop "link" not given', () => {
    cy.stub(window.console, 'warn').as('missedProp')

    cy.mount(LinksListItem)

    cy.get('@missedProp')
      .should('have.been.called')
      .and('be.calledWithMatch', 'Missing required prop: "link"')
  })

}) 