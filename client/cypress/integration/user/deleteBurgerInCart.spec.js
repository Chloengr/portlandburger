describe("delete burger in cart", () => {
  beforeEach(() => {
    cy.login("USER");
  });

  it("should delete one burger in user cart", () => {
    cy.visit("/cart")
      .getDataCy("delete-burger-in-cart")
      .first()
      .click()
      .visit("/cart")
      .getDataCy("cart-table")
      .should("not.exist");
  });
});
