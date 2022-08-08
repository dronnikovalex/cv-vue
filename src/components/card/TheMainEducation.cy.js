/// <reference types="cypress" />

import TheMainEducation from './TheMainEducation'
import Card from '../../../cypress/support/PageObjects/Card_PO'
import { createRandomStudyItems } from '../../../cypress/utils'

describe('Test TheMainEducation component', () => {
  function renderStudyComponent(studyItems) {
    if (studyItems) {
      return cy.mount(TheMainEducation, {
        props: {
          study: studyItems
        }
      })
    }

    return cy.mount(TheMainEducation)
  }

  it('should render component', () => {
    const testStudyItems = createRandomStudyItems()

    renderStudyComponent(testStudyItems)

    cy.get('[data-cy="card-title"]')
      .should('be.visible')

    Card.getStudyItems(0)
      .should('exist')
      .and('be.visible')

    Card.getSTudyDetails()
      .should('be.visible')
      .and('have.text', 'Развернуть▼')

    Card.getStudyItems(1)
      .should('not.exist')   
  })

  it('should be able to open details', () => {
    const testStudyItems = createRandomStudyItems()

    renderStudyComponent(testStudyItems)

    Card.getStudyItems()
      .should('have.length', 1)

    Card.getSTudyDetails().should('be.visible').and('have.text', 'Развернуть▼')
    Card.toggleStudyDetails()
    Card.getSTudyDetails().should('be.visible').and('have.text', 'Свернуть▲')

    
    Card.getStudyItems()
      .should('have.length', 2)
  })

  it('should not render if prop "study" not given', () => {
    renderStudyComponent()

    Card.getStudy()
      .should('not.exist')
  })

  it('should not render details section if study.length <= 1', () => {
    const testStudyItems = createRandomStudyItems(1)

    renderStudyComponent(testStudyItems)

    Card.getSTudyDetails()
      .should('not.exist')
  })

  it('sholud throw console.warn error if prop "study" not given', () => {
    cy.stub(console, 'warn').as('missedProp')

    renderStudyComponent()

    cy.get('@missedProp')
      .should('have.been.calledWithMatch', 'Missing required prop: "study"')
  })

  it('should call toggleDeatils when click summary button', () => {
    const testStudyItems = createRandomStudyItems()
    cy.spy(TheMainEducation.methods, 'toggleDetails').as('toggleDetailsSpy')

    renderStudyComponent(testStudyItems)
    Card.toggleStudyDetails()

    cy.get('@toggleDetailsSpy')
      .should('have.been.calledOnce')
    
    Card.toggleStudyDetails()

    cy.get('@toggleDetailsSpy')
      .should('have.been.calledTwice')
  })

  it('should prepare initial data when component mounted', () => {
    const testStudyItems = createRandomStudyItems()

    renderStudyComponent(testStudyItems)
      .then(wrapper => {
        const studyInstances = [wrapper.vm.school, wrapper.vm.university]

        studyInstances.forEach(studyInstance => {
          expect(studyInstance).to.have.all.keys(
            'dateFrom',
            'dateTo',
            'description',
            'title',
            'type',
          )
        })
      })
  })

})