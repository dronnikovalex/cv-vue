import AppIcon from '@/components/ui/AppIcon'
import icons from '../../../cypress/fixtures/icons.json'

describe('Test AppIcon component', () => {
  const iconSelector = '[data-testid="icon"]'

  it('should render missedIcon if no props given', () => {
    cy.mount(AppIcon)
      .get(iconSelector)
      .should('be.visible')
      .and('have.attr', 'data-icon', 'circle-question')
  })

  it('should render missedIcon if not existed icon type props given', () => {
    cy.mount(AppIcon, {
      props: {
        type: 'NotExistedIcon'
      }
    })
      .get(iconSelector)
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
        .get(iconSelector)
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

  const resources = [
    {
      type: 'cypress',
      expectation: true
    },
    {
      type: 'telegram',
      expectation: false
    }
  ]

  resources.forEach(({ type, expectation }) => {
    it('isImage computed should return correct type', () => {
      const resourceType = { type }
  
      expect(AppIcon.computed.isImage.call(resourceType), `${type} should has ${ expectation ? 'image' : 'icon'}`).to.eql(expectation)
    })
  })

  it('iconData computed property should return correct data for icons', () => {
    const resource = { type: 'github' }
    const expectedData = [ 'fab', 'github' ]

    expect(AppIcon.computed.iconData.call(resource), `${resource} should has expected data`).to.deep.eql(expectedData)
  })

})