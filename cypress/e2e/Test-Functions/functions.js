const pageobj = require('../Page-Objects/Pageobjects.page');
const testdata = require('../../fixtures/testdata.json');

class Eventfunc {
    
    AddDeletefunc() {
        cy.visit('/');
        cy.get(pageobj.AddRemove.url).click()
        cy.get(pageobj.AddRemove.Addbtn).click()
        cy.get(pageobj.AddRemove.Addbtn).should('be.visible').should('be.enabled');
        cy.get(pageobj.AddRemove.Addbtn).click()
        cy.get(pageobj.AddRemove.Addbtn).click()
        cy.get(pageobj.AddRemove.Addbtn).click()
        cy.get(pageobj.AddRemove.Delete1).click()
        cy.get(pageobj.AddRemove.Delete2).click()
        cy.get(pageobj.AddRemove.Delete3).click()
        cy.get(pageobj.AddRemove.Delete4).click()
    }
    BrokeImages() {
        let brokenCount = 0
        cy.get('#content img').each(($img) => {

            const imgSrc = $img.prop('src')

            cy.request({
                url: imgSrc,
                failOnStatusCode: false
            }).then((response) => {

                if (response.status === 404) {
                    brokenCount++
                }

            })

        }).then(() => {

            expect(brokenCount).to.be.greaterThan(0)

        })
    }
    Contextpopup_Alert() {
        cy.window().then((win) => {
            cy.stub(win, 'alert').as('alertStub');
        });
        cy.get('#hot-spot').rightclick() // Button that triggers alert
        cy.get('@alertStub').should('have.been.calledWith', 'You selected a context menu');
    }

}
const eventFunc = new Eventfunc();
export default eventFunc;