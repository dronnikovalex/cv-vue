/// <reference types="cypress" />
import AppInput from './AppInput'
import { faker } from '@faker-js/faker'

describe('Test AppInput component', () => {
  const labelText = faker.lorem.word()
  const name = 'test'

  it('should render input with correct attrs', () => {
    cy.mount(AppInput, {
      props: {
        type: 'text',
        name,
        labelText
      }
    })
      .get(`#${name}`)
      .should('have.attr', 'id', name)
      .and('have.attr', 'name', name)
      .and('have.attr', 'type', 'text')
  })

  it('should render input with default text type', () => {
    cy.mount(AppInput, {
      props: {
        name,
        labelText
      }
    })
      .get(`#${name}`)
      .should('have.attr', 'type', 'text')
  })

  it('should have default label text if corresponding props not given', () => {
    cy.mount(AppInput, {
      props: {
        name,
      }
    })
      .get(`#${name}`)
      .siblings('.label')
      .should('have.text', 'Введите текст')
  })

  //Какой то костыль для проверки появления err text у инпута. Как замокать erroMesage из setup ?
  it('should show error if testError props given', () => {
    cy.mount(AppInput, {
      props: {
        type: 'text',
        name,
        labelText,
        testError: true
      }
    })
      .get('[data-cy="error-message"]')
      .should('have.text', 'Error')
  })

})