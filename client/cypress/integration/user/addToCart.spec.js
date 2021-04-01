describe("add to cart", () => {
  beforeEach(() => {
    cy.login("USER");
  });

  it("should add burger to cart", () => {
    cy.getDataCy("add-to-cart-btn")
      .first()
      .click()
      .visit("/cart")
      .getDataCy("cart-table")
      .contains("td", "Burger Oslo")
      .should("be.visible");
  });
});
