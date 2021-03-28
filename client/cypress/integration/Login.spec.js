describe('login works', () => {
  it('redirects to protected route', () => {
    cy.visit('/');
    cy.get('#basic_username').type('test');
    cy.get('#basic_password').type('test');

    cy.get('.ant-btn-round').click();

    cy.contains(/burgers/);
  });
});
