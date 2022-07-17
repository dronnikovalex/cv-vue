/// <reference types="cypress" />
import LinksList from './LinksList'
import Sidebar from '../../../cypress/support/PageObjects/Sidebar_PO'
import { h } from 'vue'

describe('Test LinksList component', () => {
  const sidebarTitleSelector = 'sidebar__title'
  const siebarTitle = 'mockedTitle'
  const linkItemSelector = 'link__item' 
  const linkItem = 'mockedLinkName'

  const mockedListTitle = h('h2', { class: sidebarTitleSelector }, siebarTitle)
  const mockedListITem = h('div',
    { class: linkItemSelector }, [
      h('span', { class: 'link__placeholder' }, linkItem),
      h('span', { class: 'link__value' }, 
        h('a', { target:'_blank', href: "#" }, 'mockedLinkValue')  
      ),
    ])

  beforeEach(() => {
    cy.stub(LinksList.components.AppListTitle, 'render').returns(mockedListTitle).as('AppListTitle')
    cy.stub(LinksList.components.LinksListItem, 'render').returns(mockedListITem).as('AppListitem')
  })

  it('should render list title and list item if props given', () => {
    cy.mount(LinksList, {
      props: {
        source: 'sidebar',
        links: [{}],
      }
    })

    cy.get('@AppListTitle')
      .should('be.called')
    cy.get('@AppListitem')
      .should('be.called')

    Sidebar.getLinks()
      .find(`.${sidebarTitleSelector}`)
      .should('be.visible')
      .and('have.text', siebarTitle)
    
    Sidebar.getLinks()
      .find(`.${linkItemSelector}`)
      .should('be.visible')
        .find('.link__placeholder')
        .should('have.text', linkItem)
  })

  it('should not render title if prop "source === footer"', () => {
    cy.mount(LinksList, {
      props: {
        source: 'footer'
      }
    })

    Sidebar.getLinks()
      .find(`.${sidebarTitleSelector}`)
      .should('not.exist')
  })

  it('should not render title if prop "source" not given', () => {
    cy.mount(LinksList)

    Sidebar.getLinks()
      .find(`.${sidebarTitleSelector}`)
      .should('not.exist')
  })

  it('should not render items if "links" prop not given', () => {
    cy.mount(LinksList, {
      props: {
        source: 'sidebar'
      }
    })

    Sidebar.getLinks()
    .find(`.${linkItemSelector}`)
    .should('not.exist')
  })

  it.only('should throw console.warn if "links" prop not given', () => {
    cy.stub(window.console, 'warn').as('missedProp')

    cy.mount(LinksList)

    cy.get('@missedProp')
      .should('have.been.called')
      .and('be.calledWithMatch', 'Missing required prop: "links"')
  })
})