describe("delete burger", () => {
  beforeEach(() => {
    cy.login("ADMIN");
  });

  it("should display one less burger", () => {
    cy.getDataCy("delete-burger-btn")
      .first()
      .click()
      .get(".ant-modal-footer > .ant-btn-primary")
      .click()
      .getDataCy("title-burger")
      .should("have.length", 1);
  });
});
