describe('User Can Open Login Page', () => {
  it('User can open login page', () => {
    cy.visit('http://localhost:8000/');
    cy.get('h4').should('have.text', 'Login');
  });
});