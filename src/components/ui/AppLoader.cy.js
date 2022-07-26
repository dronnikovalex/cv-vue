/// <reference types="cypress" />

import AppLoader from './AppLoader.vue'

describe('Test AppLoader component', () => {
  const smallLoaderSelector = 'lds-ring-sm'
  const bigLoaderSelector = 'lds-ring-bg'
  const appLoaderSelector = '[data-testid=loader]'

  it('should render big loader by default when no props given', () => {
    cy.mount(AppLoader)
      
    cy.get(appLoaderSelector)
      .should('exist')
      .and('have.class', bigLoaderSelector)
  })

  it('should render small loader', () => {
    cy.mount(AppLoader, {
      props: {
        type: 'sm'
      }
    })
  
    cy.get(appLoaderSelector)
      .should('exist')
      .and('have.class', smallLoaderSelector)
  })

  it('should render big loader', () => {
    cy.mount(AppLoader, {
      props: {
        type: 'bg'
      }
    })

    cy.get(appLoaderSelector)
      .should('exist')
      .and('have.class', bigLoaderSelector)
  })
  
  const colors = ['black', 'white']
  colors.forEach(color => {
    it(`should render ${color} spinner by given props`, () => {
      cy.mount(AppLoader, {
        props: {
          color
        }
      })
  
      cy.get(appLoaderSelector)
        .should('exist')
        .and('have.class', color)
    })
  })

  it('should render white spinner when no props given', () => {
    cy.mount(AppLoader)
    
    cy.get(appLoaderSelector)
      .should('exist')
      .and('have.class', 'white')
  })
})