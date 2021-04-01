describe("add burger", () => {
  beforeEach(() => {
    cy.login("ADMIN");
  });

  it("should display one more burger", () => {
    cy.getDataCy("add-burger-btn")
      .click()
      .getDataCy("add-title-burger")
      .type("Burger London")
      .getDataCy("add-desc-burger")
      .type(
        "Pain bio, carotte, salade, cornichons, steak végétal maison aux haricots noirs, sauce tartare, galette de pommes de terre."
      )
      .getDataCy("add-price-burger")
      .type("12.5");

    const fixtureFile = "burger.jpeg";
    cy.getDataCy("add-img-burger").attachFile(fixtureFile);

    cy.getDataCy("submit-add-burger")
      .click()
      .get(".ant-modal-footer > .ant-btn-primary")
      .click()
      .getDataCy("title-burger")
      .last()
      .contains("Burger London");
  });
});
