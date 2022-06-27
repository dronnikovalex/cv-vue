import AppIcon from '@/components/ui/AppIcon'
import icons from '../../../cypress/fixtures/icons.json'

describe('Test AppIcon component', () => {
  it('should render missedIcon if no props given', () => {
    cy.mount(AppIcon)
      .get('[data-testid="icon"]')
      .should('be.visible')
      .and('have.attr', 'data-icon', 'circle-question')
  })

  it('should render missedIcon if not existed icon type props given', () => {
    cy.mount(AppIcon, {
      props: {
        type: 'NotExistedIcon'
      }
    })
      .get('[data-testid="icon"]')
      .should('be.visible')
      .and('have.attr', 'data-icon', 'circle-question')
  })

  icons.forEach(({ name, type }) => {
    it(`should render icon ${name} correctly`, () => {
      cy.mount(AppIcon, {
        props: {
          type: name
        }
      })
        .get('[data-testid="icon"]')
        .should('be.visible')
        .and('have.attr', 'data-icon', type)
    })
  })

  it('should render img if corresponding resourse_type given', () => {
    const imageType = 'cypress'

    cy.mount(AppIcon, {
      props: {
        type: imageType
      }
    })
      .get('img')
      .should('have.attr', 'alt', imageType)
  })
})