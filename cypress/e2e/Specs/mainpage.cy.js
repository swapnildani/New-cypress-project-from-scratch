import eventFunc from '../Test-Functions/functions'
const pageobj = require('../Page-Objects/Pageobjects.page')
const testdata = require('../../fixtures/testdata.json')

describe('the-internet.herokuapp test ', () => {
    /* beforeEach(() => {

    cy.visit('/')

  })*/

    it('TestCase1: Test home page base url', () => {
        cy.visit('/')
    })

    it('TestCase2: Test all page functionality', () => {
        cy.visit('/')
        cy.get(pageobj.ABtesting.abtesting).click()
        cy.get(pageobj.ABtesting.heading).should('contain.text', 'A/B Test');
        cy.get(pageobj.ABtesting.para).should('contain.text', testdata.ABtest.paratext);
        eventFunc.AddDeletefunc()
        cy.go('back');
    })

    it('TestCase3: Login using Basic Authentication Method1:', () => {
        cy.visit('/basic_auth', {
            auth: { username: 'admin', password: 'admin' }
        })
        cy.contains('Congratulations').should('be.visible')
    })

    it('TestCase4: Login using Basic Authentication Method2:', () => {
            cy.visit('/basic_auth', {
            auth: {
            username: Cypress.env('username'),// for this we have added credentials in cypress.config.js file
            password: Cypress.env('password'),
             }
        })
            cy.contains('Congratulations').should('be.visible')

    })

    it('TestCase5 :Test count of broken images', () => {
        cy.visit('/')
        cy.get(':nth-child(4) > a').click()
        eventFunc.BrokeImages()
    })

    it('TestCase6: Test checkboxes',()=>{
        cy.visit('/checkboxes')
        cy.get('#checkboxes').should('be.visible')
        cy.get('#checkboxes > :nth-child(1)').uncheck()
        cy.get('#checkboxes > :nth-child(1)').should('not.be.checked')
        cy.get('#checkboxes > :nth-child(3)').check()
        cy.get('#checkboxes > :nth-child(3)').should('be.checked')
        cy.get('#checkboxes > :nth-child(1)').check()
        cy.get('#checkboxes > :nth-child(1)').should('be.checked')
    })

    it.only('TestCase7: Context menu pop up message', () => {
        cy.visit('/context_menu').wait(2000)
        eventFunc.Contextpopup_Alert();  

    })


})

describe.skip('Challenging DOM Full Test', () => {

  beforeEach(() => {

    cy.visit('/challenging_dom')

  })

  it('Perform actions on page', () => {

    // Click buttons
    cy.contains('qux').click()
    cy.contains('bar').click()
    cy.contains('foo').click()

    // Verify table rows
    cy.get('table tbody tr')
      .should('have.length', 10)

    // Click edit on specific row
    cy.contains('td', 'Iuvaret3')
      .parent('tr')
      .find('a[href="#edit"]')
      .click()

    // Verify canvas
    cy.get('#canvas')
      .should('exist')

  })

})