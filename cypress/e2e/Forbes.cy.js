describe('Banking Test case', () => {
  it('verify opening of landing page', () => {
    cy.visit('https://parabank.parasoft.com/parabank/index.htm')
    cy.title().should('eq', 'ParaBank | Welcome | Online Banking')
    cy.get('input[name="username"]').should('be.visible')  
    cy.get('input[name="username"]').should('be.enabled')
  })

  it('verify customer login ', () => {
    cy.visit('https://parabank.parasoft.com/parabank/index.htm')
    cy.title().should('eq', 'ParaBank | Welcome | Online Banking')
    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[name="username"]').should('be.enabled')
    cy.get('input[name="username"]').type('username')
    cy.get('input[name="password"]').type('password')
    cy.get('input[name="username"]').should('have.value', 'username')
    cy.get('input[name="password"]').should('have.value', 'password')
    cy.get(':nth-child(5) > .button').should('be.enabled')
   
    

  })
    it('should display username, password fields and log in button', () => {
      cy.visit('https://parabank.parasoft.com/parabank/index.htm')
      cy.get('input[name="username"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('input[type="submit"]').should('have.value', 'Log In');

    });

    it('should navigate to the lookup page when the "Forgot login info?" link is clicked', () => {
      cy.visit('https://parabank.parasoft.com/parabank/index.htm')
      cy.get('a').contains('Forgot login info?').click();
      cy.url().should('include', 'lookup.htm');
    });
  
  
})