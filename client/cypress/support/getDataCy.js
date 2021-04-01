Cypress.Commands.add("getDataCy", (name, options = {}) => {
  return cy.get(`[data-cy=${name}]`, options);
});
