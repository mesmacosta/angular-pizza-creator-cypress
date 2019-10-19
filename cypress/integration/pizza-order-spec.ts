/// <reference types="Cypress" />

import {PizzaOrderPageData} from '../support/pages_data/pizza_order/pizza-order.pd'

const pd = new PizzaOrderPageData()

context('Pizza Creator', () => {
  beforeEach(() => {
    // uses base url setting from cypress.json
    // which right now points at "localhost:3000"
    cy.visit(pd.url)
  })

  it('orders custom pizza', function () {
    // enter delivery information
    cy.get(pd.user_name).type('Joe')
    cy.get(pd.user_email).type('foo@bar.com')
    cy.get(pd.user_email_confirm).type('foo@bar.com')

    // without complete delivery information,
    // we should not be able to place the order
    cy.get(pd.submit_order_buttom).should('be.disabled')

    cy.get(pd.address).type('1 Pizza st')
    cy.get(pd.postcode).type('12345')
    cy.get(pd.phone).type('1234567890')

    // still cannot order pizza - need to pick toppings
    cy.get(pd.submit_order_buttom).should('be.disabled')

    // add a few toppings
    cy.contains(pd.toppings_label, pd.pepperoni).click()
    cy.contains(pd.toppings_label, pd.onion).click()
    cy.contains(pd.toppings_label, pd.mozzarella).click()
    cy.contains(pd.toppings_label, pd.basil).click()

    // check the price and order pizza
    cy.contains(pd.total_price, 'Total: $12.75')

    // let us confirm we can place our order,
    // but first, prepare for "window.alert" call
    cy.on('window:alert', cy.stub().as('alert'))

    // now the button should be enabled
    cy.get(pd.submit_order_buttom)
      .should('be.enabled')
      .click()
    cy.get('@alert').should('have.been.be.called')

    // scroll pizza view back into view
    cy.get('form')
      .scrollIntoView({})
      .should('be.visible')
  })
})
