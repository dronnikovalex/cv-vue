/// <reference types="cypress" />

import spok from 'cy-spok'
import { faker } from '@faker-js/faker'
import requestTemplates from '../../../cypress/fixtures/reuqest_templates.json'
import urlsBlocks from '../../../cypress/fixtures/url_items.json'

describe('Test api methods', () => {
  context('Test fetchProfileInfo method', () => {
    const urlRegexMatcher = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/

    const profileEndpoint = '/profile-data.json'
    const body = {
      random_key: "random_value"
    }
    //TODO: Move to e2e tests.
    it('should be called on page visit', () => {
      cy.intercept(profileEndpoint).as('fetchProfileData')

      cy.visit('/')
      cy.wait('@fetchProfileData')
        .its('state')
        .should('eql', 'Complete')
    })

    it('should return 200 OK', () => {
      cy.request(`${Cypress.env('apiHost')}${profileEndpoint}`)
        .its('status').should('eql', 200)
    })

    it('response should contain base fields', () => {
      cy.request(`${Cypress.env('apiHost')}${profileEndpoint}`)
        .its('body')
        .should(spok({
          about: spok.string,
          contacts: spok.array,
          experience: spok.array,
          links: spok.array,
          stack: spok.array,
          study: spok.array,
        }))
    })

    specify('response should match expected schema', () => {
      cy.request(`${Cypress.env('apiHost')}${profileEndpoint}`)
        .its('body')
        .then(profile => {
          cy.fixture('profile.json').then((schema) => {
            cy.validateSchema(schema, profile);
          })
        })
    })

    it('write data to profile endpoint should return error', () => {
      cy.request({
        url: `${Cypress.env('apiHost')}${profileEndpoint}`,
        method: 'POST',
        body,
        failOnStatusCode: false
      })
        .then(response => {
          expect(response.status).to.eql(401)
          expect(response.body).to.deep.equal({ error: 'Permission denied' })
        })
    })

    it('modify data to profile endpoint should return error', () => {
      cy.request({
        url: `${Cypress.env('apiHost')}${profileEndpoint}`,
        method: 'PUT',
        body,
        failOnStatusCode: false
      })
        .then(response => {
          expect(response.status).to.eql(401)
          expect(response.body).to.deep.equal({ error: 'Permission denied' })
        })
    })

    it('delete profile data should return error', () => {
      cy.request({
        url: `${Cypress.env('apiHost')}${profileEndpoint}`,
        method: 'DELETE',
        body,
        failOnStatusCode: false
      })
        .should(response => {
          expect(response.status).to.eql(401)
          expect(response.body).to.deep.equal({ error: 'Permission denied' })
        })
    })

    urlsBlocks.forEach(({ description, block, blockKey }) => {
      it(`${description} should contains website-like links`, () => {
        cy.request(`${Cypress.env('apiHost')}${profileEndpoint}`)
        .its(`body.${block}`)
        .each(item => {
          expect(item[blockKey], 'link matches regex').match(urlRegexMatcher)
        })
      })
    })
  })

  context('Test sendRequest method', () => {
    const requestEndpoint = '/request.json'

    const prepareRequestData = ({
      name = faker.lorem.word(Cypress._.random(2, 7)),
      position = faker.lorem.word(Cypress._.random(2, 7)),
      description = faker.lorem.text(),
      contacts = faker.phone.number('+7 9## ### ## ##'),
    }) => {
      return {
        name,
        position,
        description,
        contacts,
        date: (new Date).toString(),
        id: Date.now(),
      }
    }

    requestTemplates.forEach(({ status, description, message, formData, expectedStatus, expectedMessage }) => {
      it(`should return ${status} and ${message} on ${description}`, () => {
        cy.request({
          url: `${Cypress.env('apiHost')}${requestEndpoint}`,
          method: 'POST',
          body: prepareRequestData(formData),
          failOnStatusCode: false
        })
          .should(response => {
            expect(response.status).to.eql(expectedStatus)
            switch (response.status) {
              case '401':
                expect(response.body.error).to.eql(expectedMessage)
                break
              case '200':
                expect(response.body.name).to.be.a(expectedMessage)
                break
            }
          })
      })
    })

    it('should not be able to read data', () => {
      cy.request({
        url: `${Cypress.env('apiHost')}${requestEndpoint}`,
        failOnStatusCode: false
      })
        .then(response => {
          expect(response.status, 'Should have correct status').to.eql(401)
          expect(response.body, 'Should have error with correct message').to.deep.eql({ error: 'Permission denied' })
        })
    })
  })
})