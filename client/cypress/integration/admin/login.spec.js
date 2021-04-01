describe("login works", () => {
  beforeEach(() => {
    cy.visit("/")
      .getDataCy("username-input")
      .clear("")
      .getDataCy("password-input")
      .clear("");
  });

  it("should not login if credentials are wrong", () => {
    cy.getDataCy("username-input")
      .type("fake")
      .getDataCy("password-input")
      .type("fake")

      .getDataCy("submit-login")
      .click()
      .url()
      .should("eq", "http://localhost:3000/");
  });

  it("should login as admin if credentials are good", () => {
    cy.getDataCy("username-input")
      .type("admin")
      .getDataCy("password-input")
      .type("password")

      .getDataCy("submit-login")
      .click()
      .url()
      .should("include", "/burgers");
  });
});
