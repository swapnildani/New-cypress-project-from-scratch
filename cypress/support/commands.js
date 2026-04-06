// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('clickStartButton', () => {
  cy.get('#start button')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('uploadFile', ({ fileInput, submitButton, fileName, url = '/upload', statusCode = 200 }) => {
    cy.intercept('POST', url).as('fileUpload')
    cy.get(fileInput)
      .selectFile(`cypress/fixtures/${fileName}`, {
        force: true
      })
    cy.get(submitButton).click()
    cy.wait('@fileUpload').its('response.statusCode').should('eq', statusCode)

  }
)