describe('User Can Edit Existing Data', () => {
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
  it('User can edit existing data', () => {
    cy.get('.table td').contains('user').parent().find('a').contains('Edit').click();
    cy.get('#name').clear('user ');
    cy.get('#name').type('user edited');
    cy.get('.btn-primary').contains('Submit').click();
    cy.get('.table td').contains('user').should('have.text', 'user edited');
    cy.get('.alert').should('be.visible')
      .and('have.class', 'alert-success')
      .and('contain', 'User Berhasil Diupdate');
  });

  //challenge
  it('User can edit data user baru', () => {
    cy.get('.table td').contains('user baru').parent().find('a').contains('Edit').click();
    cy.get('#name').clear('user baru');
    cy.get('#name').type('user baru banget');
    cy.get('.btn-primary').contains('Submit').click();
    cy.get('.table td').contains('user baru').should('have.text', 'user baru banget');
    cy.get('.alert').should('be.visible')
      .and('have.class', 'alert-success')
      .and('contain', 'User Berhasil Diupdate');
  });


  //negative test case
  it('User cannot edit data with blank username', () => {
   
  });
})