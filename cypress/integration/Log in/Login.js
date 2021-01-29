
describe('Login', () => {
    it('visits the login page', () => {
        cy.visit("https://george.csas.cz/?login_hint=7777777777")
// change language to EN
        
cy.get(".lang-select__link").first().click({force: true})
cy.contains("English")
.click({force: true})

cy.contains("Login")
        .click({force: true})
        
/* login in Czech
        cy.contains("Přihlásit se")
        .click({force: true})
        */

        cy.wait(14000)
        cy.get("#readBtn").click({force: true})
        
    })
  })


  describe('Try the search', () => {
    it('checks if the search works', () => {

       // try the search engine
       cy.get("div[data-cy='main.menu.v2.searchLink-desktop']",).click({force: true})
       cy.get(".form-control.h-100.textSearchInput--3oLN0").type("liftago", {force: true})

       // check backend status

   cy.server()           // enable response stubbing
   cy.route({
   method: 'GET',      // Route all POST requests
   url: 'https://george.csas.cz/api/webapi/v2/gapi/my/transactions?pageSize=50&suggest=true&sum=true&count=true&q=liftago',    // that have a URL that matches '*/api/*/guests'
   }).as('apiCheck')
   cy.get(".btn.g-btn-icon-only.g-btn-icon-secondary.btn-lg.searchButton--3UGdC", { timeout: 14 * 1000 }, { force: true }).click({ force: true })
   
   cy.wait("@apiCheck").then((response) => {
       expect(response.status).to.eq(200)
   }) 
    })
  })



/* prepared version for Cucumber
const urlbase = "https://george.csas.cz/?login_hint=7777777777";

When("I am on the login page and put my credentials in", () => {
    cy.visit("https://george.csas.cz/?login_hint=7777777777")
}); 

And("I click on the Continue button", () => {
    cy.get("#btn//.continue").click()
}); 


Then("I click on the Continue button", () => {
    cy.get("#readBtn").click()

}); 
*/