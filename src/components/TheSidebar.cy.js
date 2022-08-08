/// <reference types="cypress" />

import TheSidebar from './TheSidebar'
import Sidebar from '../../cypress/support/PageObjects/Sidebar_PO'
import { textAbout, createRandomContactLinks } from '../../cypress/utils'

const _ = undefined

describe('Test TheSidebar component', { viewportWidth: 1250 }, () => {
  const links = createRandomContactLinks(3)
  const contacts = createRandomContactLinks(3)

  function renderSidebar(about, contacts, links)  {
    const options = {
      props: {}
    }

    if (about) options.props.about = about
    if (contacts) options.props.contacts = contacts
    if (links) options.props.links = links

    return cy.mount(TheSidebar, options)
  }

  it('should render component', () => {    
    renderSidebar(textAbout, contacts, links)

     Sidebar.getSidebar().should('be.visible')
     Sidebar.getAvatar().should('be.visible')
     Sidebar.getInfo().should('be.visible')
     Sidebar.getAbout().should('be.visible')
     Sidebar.getContacts().should('be.visible')
     Sidebar.getLinks().should('be.visible')
  }) 

  it('should not render "about" if appropriate prop not given', () => {
    renderSidebar(_, contacts, links)

    Sidebar.getAbout().should('not.exist')
  })

  it('should not render "contacts" if appropriate prop not given', () => {
    renderSidebar(textAbout, _, links)

    Sidebar.getContacts().should('not.exist')
  })

  it('should not render "links" if appropriate prop not given', () => {
    renderSidebar(textAbout, contacts)

    Sidebar.getLinks().should('not.exist')
  })
})