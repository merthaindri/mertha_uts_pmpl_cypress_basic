describe('template spec', () => {
  //after each
  afterEach(() => {
    cy.exec(
      'cd ../demo-app-cypress-automation-master && php artisan migrate:fresh --seed'
    );
  });

  //before each test case
  beforeEach(() => {
    //reset database by calling php artisan
    cy.exec(
      'cd ../demo-app-cypress-automation-master && php artisan migrate:fresh --seed'
      );
    //arrange
    cy.visit('http://localhost:8000/');
    //act
    cy.get(':nth-child(2) > .form-control').type('superadmin@gmail.com');
    cy.get(':nth-child(3) > .form-control').type('password');
    cy.get('.btn').click();
    cy.visit('http://localhost:8000/user-management/user');
    //cy.get('.card-header-action > .btn-icon').click();
  });

  //positive test case
  it('User can delete data', () => {
  //  cy.get('.table td').contains('user').next().next().next().contains('Delete').click();
  //  cy.get('.table td').contains('user').nextAll().contains('Delete').click();
  //  cy.get('.table td').contains('user').parent().contains('Delete').click();
  cy.get('.table td').contains('user').parent().find('button').contains('Delete').click(); //paling aman menggunakan ini karena spesifik terdapat (button)
  //make sure sweet alert visible
  cy.get('.swal-button-container').find('button').contains('OK').click();
  //  cy.get(':nth-child(3) > .text-right > .d-flex > .ml-2 > .btn').click();
  //  cy.get(':nth-child(2) > .swal-button').click();
  //  cy.get('p').should('be.visible');
    cy.get('.alert')
      .should('be.visible')
      .and('have.class', 'alert-success')
      .contains('User Deleted Successfully');
    cy.get('.table').should('not.contain', 'user');
  });

  //positive test case
  it('User can cancel delete data', () => {
    //arrange
    //act
    cy.get('.table td').contains('user').parent().find('button').contains('Delete').click();
    //make sure sweet alert visible
    cy.get('.swal-button-container').find('button').contains('Cancel').click();
    //assert
    cy.get('.table td').contains('user').should('be.visible');
  });

  //negative test case
  it('dummy test', () => {
    //arrange
    //act
    //assert
  });

});