describe("edit burger", () => {
  beforeEach(() => {
    cy.login("ADMIN");
  });

  it("should display one more burger", () => {
    cy.getDataCy("edit-burger-btn")
      .first()
      .click()
      .getDataCy("edit-title-burger")
      .type("Burger Oslo")

      .getDataCy("submit-edit-burger")
      .click()
      .get(".ant-modal-footer > .ant-btn-primary")
      .click()
      .getDataCy("title-burger")
      .first()
      .contains("Burger Oslo");
  });
});
