describe("deconnexion", () => {
  beforeEach(() => {
    cy.login("ADMIN");
  });

  it("should deconnect user and redirect to homepage", () => {
    cy.getDataCy("deconnexion")
      .click()
      .url()
      .should("eq", "http://localhost:3000/");
  });
});
