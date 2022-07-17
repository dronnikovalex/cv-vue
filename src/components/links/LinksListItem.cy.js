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

}) 