/// <reference types="Cypress" />

import * as commons from '../support/functions/commons.functions'
import { PizzaOrderPageData } from '../support/pages_data/pizza_order/pizza-order.pd'

const pd = new PizzaOrderPageData()

context('Pizza Creator', () => {
  beforeEach(() => {
    cy.visit(pd.url)
  })

  it('orders custom pizza', () => {
    cy.server()
    const createPizzaOrderApi = commons.findStubbedApiByName('create_pizza_order', pd)
    commons.routeStubbedApi({api: createPizzaOrderApi})
    // enter delivery information
    cy.get(pd.userName).type('Joe')
    cy.get(pd.userEmail).type('foo@bar.com')
    cy.get(pd.userEmailConfirm).type('foo@bar.com')

    // without complete delivery information,
    // we should not be able to place the order
    cy.get(pd.submitOrderButtom).should('be.disabled')

    cy.get(pd.address).type('1 Pizza st')
    cy.get(pd.postcode).type('12345')
    cy.get(pd.phone).type('1234567890')

    // still cannot order pizza - need to pick toppings
    cy.get(pd.submitOrderButtom).should('be.disabled')

    // add a few toppings
    cy.contains(pd.toppingsLabel, pd.pepperoni).click()
    cy.contains(pd.toppingsLabel, pd.onion).click()
    cy.contains(pd.toppingsLabel, pd.mozzarella).click()
    cy.contains(pd.toppingsLabel, pd.basil).click()

    // check the price and order pizza
    cy.contains(pd.totalPrice, 'Total: $12.75')

    // let us confirm we can place our order,
    // but first, prepare for "window.alert" call
    cy.on('window:alert', cy.stub().as('alert'))

    // now the button should be enabled
    cy.get(pd.submitOrderButtom)
      .should('be.enabled')
      .click()
    commons.waitForStubbedApi({api: createPizzaOrderApi})
    cy.get('@alert').should('have.been.be.called')

    // scroll pizza view back into view
    cy.get('form')
      .scrollIntoView({})
      .should('be.visible')
  })
})
