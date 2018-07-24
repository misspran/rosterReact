describe('Register Page', () => {
  beforeEach(() => {
    cy.server();
    cy.route('POST', 'https://players-api.developer.alchemy.codes/api/user', 'fixture:createUser.json');
  });

  it('Contains email and password labels', () => {
    cy.visit('/register');
    cy.contains('First Name');
    cy.contains('Last Name');
    cy.contains('Email');
    cy.contains('Password');
    cy.contains('Confirm Password');
    cy.contains('Register');
  });

  it('Accepts valid email and password', () => {
    cy.visit('/register');
    cy.get('input[name="first_name"]').type('Billy');
    cy.get('input[name="last_name"]').type('Bob');
    cy.get('input[name="email"]').type('billybob@example.com');
    cy.get('input[name="password"]').type('billybob@example.com');
    cy.get('input[name="confirm_password"]').type('billybob@example.com');
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:3000/roster');
    // cy.contains('Roster');
  });
});
