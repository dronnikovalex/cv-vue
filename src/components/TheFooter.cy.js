/// <reference types="cypress" />

import TheFooter from './TheFooter'
import { createRandomContactLinkObj } from '../../cypress/utils'

describe('Test TheFooter component', () => {
  const links = [ createRandomContactLinkObj(), createRandomContactLinkObj() ]

  function renderFooter(options) {
    if (options && Object.keys(options).length) {
      return cy.mount(TheFooter, options)
    }

    return cy.mount(TheFooter)
  }

  it('should rendner component', () => {
    const options =  {
      props: {
        links
      }
    }

    renderFooter(options)
  }) 

  it('should emit "open-modal" when click on request button', () => {
    const onOpenModalSpy = cy.spy().as('onOpenModalSpy')
    const options =  {
      props: {
        links,
        onOpenModal: onOpenModalSpy
      }
    }
    
    cy.mount(TheFooter, options)
    cy.get('.contacts__request').click()
    
    cy.get('@onOpenModalSpy').should('have.been.calledOnce')
  }) 
  
  it('should not render links list if prop "links" is empty', () => {
    renderFooter()
    
    cy.get('.footer__links')
      .should('not.exist')
  })

  it('sholud throw console.warn error if prop "study" not given', () => {
    cy.stub(console, 'warn').as('missedProp')

    renderFooter()

    cy.get('@missedProp')
      .should('have.been.calledWithMatch', 'Missing required prop: "links"')
  })
})