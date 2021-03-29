describe('add burgers works', () => {
    it('redirects to protected route', () => {
      cy.visit('/');
      cy.get('#basic_username').type('test');
      cy.get('#basic_password').type('test');
  
      cy.get('.ant-btn-round').click();
  
      cy.contains(/burgers/);
      cy.get('.ant-btn').click();
      cy.get('#basic_title').type('test');
      cy.get('#basic_description').type('test');
      cy.get('#basic_price').type(15.5);
      cy.get('#basic_image').type('test');
      cy.get('#buttonConfirm').click();
      cy.get('.ant-btn-primary').click();
    });
  });
  