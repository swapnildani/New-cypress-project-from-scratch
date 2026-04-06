import eventFunc from '../Test-Functions/functions'
const pageobj = require('../Page-Objects/Pageobjects.page')
const testdata = require('../../fixtures/testdata.json')

describe('the-internet.herokuapp test ', () => {
  /* beforeEach(() => {
      
  //cy.visit('/')

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

  it('TestCase6: Test checkboxes', () => {
    cy.visit('/checkboxes')
    cy.get('#checkboxes').should('be.visible')
    cy.get('#checkboxes > :nth-child(1)').uncheck()
    cy.get('#checkboxes > :nth-child(1)').should('not.be.checked')
    cy.get('#checkboxes > :nth-child(3)').check()
    cy.get('#checkboxes > :nth-child(3)').should('be.checked')
    cy.get('#checkboxes > :nth-child(1)').check()
    cy.get('#checkboxes > :nth-child(1)').should('be.checked')
  })

  it('TestCase7: Context menu pop up message', () => {
    cy.visit('/context_menu').wait(2000)
    eventFunc.Contextpopup_Alert();
  })

  it('TestCase8: Dropdownselection', () => {
    cy.visit('/dropdown')
    cy.get(pageobj.Dropdown.option).select('Option 1').should('be.visible').should('have.value', '1')
    cy.get(pageobj.Dropdown.option).select('Option 2').should('be.visible').should('have.value', '2')

  })

  it('TestCase9: Validate dynamic content structure', () => {
    eventFunc.visit();
    eventFunc.getContentRows().should('have.length', 3);
    eventFunc.getImages().should('be.visible');
  });

  it('TestCase10: Verify Dynamic Controls', () => {
    cy.visit('/dynamic_controls')
    cy.clearAllCookies()
    cy.get(pageobj.DynamicControls.Heading).should('have.text', 'Dynamic Controls')
    cy.get(pageobj.DynamicControls.Removebtn).should('be.visible')
    cy.get(pageobj.DynamicControls.Checkboxinpt).click();
    cy.get(pageobj.DynamicControls.Removebtn).click();
    cy.get(pageobj.DynamicControls.Loading).should('be.visible')
    cy.get(pageobj.DynamicControls.Loadingimg).should('be.visible')
    cy.get(pageobj.DynamicControls.Messgae).contains("It's gone!")
    cy.get(pageobj.DynamicControls.Addbtn).click();
    cy.get(pageobj.DynamicControls.Loading).contains('Wait for it...')
    cy.get(pageobj.DynamicControls.Messgae).contains("It's back!")
    cy.get(pageobj.DynamicControls.Textfield).should('be.disabled')
    cy.get(pageobj.DynamicControls.Enablebtn).should('be.visible').click()
    cy.get(pageobj.DynamicControls.Loading).contains('Wait for it...')
    cy.get(pageobj.DynamicControls.Messgae).contains("It's enabled!")
    cy.get(pageobj.DynamicControls.Textfield).type('Swapnil test automation')
    cy.get(pageobj.DynamicControls.Disablebtn).should('be.visible').click().wait(3000)
    cy.get(pageobj.DynamicControls.Textfield).should('be.disabled')
    cy.get(pageobj.DynamicControls.Messgae).contains("It's disabled!")
  })

  it('TestCase11: Validate Dynamic loading', () => {
    cy.visit('/dynamic_loading')
    cy.get('[href="/dynamic_loading/1"]').click()
    cy.get('button').click()
    cy.get('#loading').should('be.visible')
    cy.get('#finish > h4').contains('Hello World!')
    cy.go('back').wait(2000)
    cy.get('[href="/dynamic_loading/2"]').click()
    cy.get('button').click()
    cy.get('#loading').should('be.visible')
    cy.get('#finish > h4').contains('Hello World!')
    cy.go('back').wait(2000)
    //Using custom commands
    cy.visit('/dynamic_loading/1')
    cy.clickStartButton()
    cy.get('#finish').should('be.visible').and('contain', 'Hello World!')
  });

  it.skip('TestCase12: Verify exit intent', () => {
    cy.visit('/exit_intent')
    cy.get('body').trigger('mouseover')
    cy.get('body')
      .trigger('mousemove', { clientX: 4000, clientY: 10 })
      .trigger('mouseout', {
        clientX: 4000,
        clientY: -1
      })

    cy.get('#ouibounce-modal')
      .should('be.visible')


  })

  it('TestCase13: Verify File Download', () => {
    cy.visit('/download')
    cy.get(pageobj.Filedownloader.heading).should('contain.text', 'File Downloader')
    cy.get(pageobj.Filedownloader.Downloadfile1).click()
    cy.get(pageobj.Filedownloader.Downloadfile2).click()
  })

  it('should upload file using input field', () => {
    cy.visit('/upload')
    // file should be inside cypress/fixtures
    eventFunc.Fileupload()
    cy.go('back')
    eventFunc.FileupladDropZone()

  })

  it('TestCase14: Verify backend endpoint API response', () => {
    cy.visit('/upload')
    cy.intercept('POST', '/upload').as('fileUpload')
    cy.get(pageobj.Fileupload.File_upload).selectFile('cypress/fixtures/invoice.txt', { force: true })
    cy.get(pageobj.Fileupload.File_submit).click()
    cy.wait('@fileUpload').its('response.statusCode').should('eq', 200)
  })

  it('TestCase15: Verify Fileupload using custom commands', () => {
  cy.visit('/upload')
  cy.uploadFile({
  fileInput: pageobj.Fileupload.File_upload,
  submitButton: pageobj.Fileupload.File_submit,
  fileName: 'invoice.txt'
})
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