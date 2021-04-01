import "./getDataCy";
import "./login";
import "cypress-file-upload";

beforeEach(() => {
  cy.clearCookie("jwt");
});

Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
