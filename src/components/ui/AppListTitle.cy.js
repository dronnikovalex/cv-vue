/// <reference types="cypress" />

import AppListTitle from './AppListTitle.vue'

describe('Test AppListTitle component', () => {
  const titleSelector = '[data-cy="title"]'

  it('should render when slot given', () => {
    const slotContent = 'Base title'

    cy.mount(AppListTitle, {
      slots: {
        default: () => slotContent
      }
    })
      
    cy.get(titleSelector)
      .should('exist')
      .and('have.text', slotContent)
  })

  it('should not render when no slot given', () => {
    cy.mount(AppListTitle)
      
    cy.get(titleSelector)
      .should('not.exist')
  })

})