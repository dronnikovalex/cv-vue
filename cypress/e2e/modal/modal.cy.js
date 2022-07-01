/// <reference types="cypress" />

import Modal from '../../support/PageObjects/Modal_PO'
import HomePage from '../../support/PageObjects/HomePage_PO'
import { faker } from '@faker-js/faker'

beforeEach(() => {
  HomePage.openPage()
})

describe('Modal tests', () => {
  const requestEndpoint = '/request.json'

  const requestData = {
    name: faker.lorem.word(Cypress._.random(2, 7)),
    position: faker.lorem.word(Cypress._.random(2, 7)),
    contacts: faker.phone.number('+7 9## ### ## ##'),
    description: faker.lorem.word(1),
  }

  it('should open modal by clicking "contact me" button', () => {
    Modal.getModal()
      .should('not.exist')

    Modal.openModal()

    Modal.getModal()
      .should('exist')
      .and('be.visible')
  })

  it('should have possibilty to close modal window by close button', () => {
    Modal.openModal()
    Modal.getModal()
      .should('be.visible')

    Modal.closeModal()

    Modal.getModal()
      .should('not.exist')
  })

  it('should have possibilty to close modal window by Esc key', () => {
    Modal.openModal()
    Modal.getModal()
      .should('be.visible')

    cy.realPress('Escape')

    Modal.getModal()
      .should('not.exist')
  })

  it.only('should have possibilty to close modal window by click on a backdrop', { retries: 5 }, () => {
    Modal.openModal()
    Modal.getModal()
      .should('be.visible')

    Modal.getModalBackdrop().click({ force: true })

    Modal.getModal()
      .should('not.exist')
  })

  it('should have correct title', () => {
    Modal.openModal()
    cy.contains('.modal__title', 'Контактная информация')
      .should('be.visible')
  })

  it('should have empty inputs on start', () => {
    Modal.openModal()

    Modal.getNameInput()
      .should('be.empty')
    Modal.getPositionInput()
      .should('be.empty')
    Modal.getContactsInput()
      .should('be.empty')
    Modal.getDescriptionArea()
      .should('be.empty')
  })

  it('name input should has focus on initialize modal', () => {
    Modal.openModal()

    Modal.getNameInput()
      .should('be.focused')
  })

  it('should call request endpoint on form submission', () => {
    cy.intercept(requestEndpoint).as('submitRequest')

    Modal.openModal()
    Modal.fillForm(requestData)
    Modal.submitForm()

    cy.wait('@submitRequest')
      .should(xhr => {
        expect(xhr.state).to.eql('Complete')
      })
  })

  it('send button should change title to loader on form submission', () => {
    Modal.openModal()
    Modal.fillForm(requestData)

    Modal.getSubmitButton()
      .should('have.text', 'Отправить')
    Modal.submitForm()

    Modal.getSubmitButton()
      .should('not.have.text', 'Отправить')
      .find('[data-testid="loader"]')
      .should('exist')
      .and('be.visible')
  })

  it('send button should be disabled when form is submitting', () => {
    Modal.openModal()
    Modal.fillForm(requestData)

    Modal.submitForm()

    Modal.getSubmitButton()
      .should('be.disabled')
  })

  it('form should close on success', () => {
    cy.intercept(requestEndpoint).as('submitRequest')

    Modal.openModal()
    Modal.fillForm(requestData)

    Modal.submitForm()

    cy.wait('@submitRequest')
      .then(() => {
        Modal.getModal()
          .should('not.exist')
      })
  })

  it('should appear toast on success', () => {
    const toastMessage = '[Успех] Сообщение успешно отправлено'

    Modal.openModal()
    Modal.fillForm(requestData)

    Modal.submitForm()

    HomePage.getToast()
      .should('be.visible')
      .and('have.text', toastMessage)
  })

  it('should appear error toast when not enought permissions', () => {
    const errorToastMessage = '[Ошибка] Доступ запрещен'

    const staticResponse = {
      statusCode: 401,
      body: 'ERR_BAD_REQUEST'
    }

    cy.intercept(requestEndpoint, staticResponse).as('fakeRequest')

    Modal.openModal()
    Modal.fillForm(requestData)
    Modal.submitForm()

    cy.wait('@fakeRequest')
      .then(() => {
        HomePage.getToast()
          .should('be.visible')
          .and('have.text', errorToastMessage)
      })
  })

  it.only('should appear error toast when network connection is offline', () => {
    const networkErrorRequest = '[Ошибка] Проблемы с сетью. Проверьте Ваше подключение'

    cy.intercept(requestEndpoint, { forceNetworkError: true }).as('networkErrorRequest')

    Modal.openModal()
    Modal.fillForm(requestData)
    Modal.submitForm()
    
    cy.wait('@networkErrorRequest')
    .then(() => {
      HomePage.getToast()
        .should('be.visible')
        .and('have.text', networkErrorRequest)
    })
  })
})


