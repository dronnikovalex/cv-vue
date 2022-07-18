/// <reference types="cypress" />

import Modal from '../../support/PageObjects/Modal_PO'
import HomePage from '../../support/PageObjects/HomePage_PO'
import { faker } from '@faker-js/faker'

beforeEach(() => {
  HomePage.openPage()
  Modal.openModal()
})

describe('Modal tests', () => {
  const requestEndpoint = '/request.json'
  const requeiredFieldErrorMessage = 'Обязательно для заполнения'
  const shortTextErrorMessage = 'Минимум 2 символа'
  const longTextErrorMessage = 'Максимум 35 символов'
  const digitsTextErorrMessage = 'Поле должно содержать только буквы'

  const requestData = {
    name: faker.lorem.word(Cypress._.random(2, 7)),
    position: faker.lorem.word(Cypress._.random(2, 7)),
    contacts: faker.phone.number('+7 9## ### ## ##'),
    description: faker.lorem.word(1),
  }

  it('should open modal by clicking "contact me" button', () => {
    Modal.getModal()
      .should('exist')
      .and('be.visible')
  })

  it('should have possibilty to close modal window by close button', () => {

    Modal.getModal()
      .should('be.visible')

    Modal.closeModal()

    Modal.getModal()
      .should('not.exist')
  })

  it('should have possibilty to close modal window by Esc key', () => {
    Modal.getModal()
      .should('be.visible')

    cy.realPress('Escape')

    Modal.getModal()
      .should('not.exist')
  })

  it('should have possibilty to close modal window by click on a backdrop', () => {
    Modal.getModal()
      .should('be.visible')

    Modal.getModalBackdrop().click({ force: true })

    Modal.getModal()
      .should('not.exist')
  })

  it('should have correct title', () => {
    cy.contains('.modal__title', 'Контактная информация')
      .should('be.visible')
  })

  it('should have empty inputs on start', () => {
    Modal.getNameInput()
      .should('be.empty')
    Modal.getPositionInput()
      .should('be.empty')
    Modal.getContactsInput()
      .should('be.empty')
    Modal.getDescriptionArea()
      .should('be.empty')
  })

  it('should call request endpoint on form submission', () => {
    cy.intercept(requestEndpoint).as('submitRequest')

    Modal.fillForm(requestData)
    Modal.submitForm()

    cy.wait('@submitRequest')
      .should(xhr => {
        expect(xhr.state).to.eql('Complete')
      })
  })

  it('send button should change title to loader on form submission', () => {
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
    Modal.fillForm(requestData)

    Modal.submitForm()

    Modal.getSubmitButton()
      .should('be.disabled')
  })

  it('form should close on success', () => {
    cy.intercept(requestEndpoint).as('submitRequest')

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

    Modal.fillForm(requestData)
    Modal.submitForm()

    cy.wait('@fakeRequest')
      .then(() => {
        HomePage.getToast()
          .should('be.visible')
          .and('have.text', errorToastMessage)
      })
  })

  it('should appear error toast when network connection is offline', () => {
    const networkErrorRequest = '[Ошибка] Проблемы с сетью. Проверьте Ваше подключение'

    cy.intercept(requestEndpoint, { forceNetworkError: true }).as('networkErrorRequest')

    Modal.fillForm(requestData)
    Modal.submitForm()
    
    cy.wait('@networkErrorRequest')
    .then(() => {
      HomePage.getToast()
        .should('be.visible')
        .and('have.text', networkErrorRequest)
    })
  })

  it('should show error on empty required fields', () => {
    Modal.submitForm()

    cy.get('[data-cy="error-message"]')
      .each($error => {
        expect($error.text()).to.eql(requeiredFieldErrorMessage)
      })
  })

  const fields = ['name', 'position', 'contacts']

  fields.forEach(field => {
    it(`should show error when short ${field} given`, () => {
      Modal[`get${Cypress._.startCase(field)}Input`]()
        .type(Cypress._.random(1))
        
      Modal.submitForm()
      
      Modal[`get${Cypress._.startCase(field)}Input`]()
        .siblings('small')
        .should('have.text', shortTextErrorMessage)
    })
  })

  fields.forEach(field => {
    it(`should show error when long ${field} given`, () => {
      Modal[`get${Cypress._.startCase(field)}Input`]()
        .type(faker.lorem.words(35))
        
      Modal.submitForm()
      
      Modal[`get${Cypress._.startCase(field)}Input`]()
        .siblings('small')
        .should('have.text', longTextErrorMessage)
    })
  })

  it('should show error when digits given to position field', () => {
    Modal.getPositionInput()
      .type('1234')

    Modal.submitForm()

    Modal.getPositionInput()
      .siblings('small')
      .and('have.text', digitsTextErorrMessage)
  })

})


