import { h } from 'vue'
import AppHeading from './AppHeading'

describe('Test AppHeading', () => {
  const titleSelector = '[data-cy="card-title"]'

  it('should render default slot content if explicit slot not given', () => {
    cy.mount(AppHeading)
    
    cy.get(titleSelector)
      .contains('---')
  })

  it('should render given slot content', () => {
    const slotContent = 'Заголовок'

    const slots = {
      default: () => h('span', {}, slotContent) 
    }
    
    cy.mount(AppHeading, { slots })
    
    cy.get(titleSelector)
      .children()
      .should('have.text', slotContent)
  })

})