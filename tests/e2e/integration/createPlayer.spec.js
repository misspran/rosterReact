describe('Add player page', () => {
  beforeEach(() => {
    cy.login();
    cy.server();
    // Cypress routes are one time use
    cy.route('POST', 'https://players-api.developer.alchemy.codes/api/players', 'fixture:createPlayer.json');
    cy.route('GET', 'https://players-api.developer.alchemy.codes/api/players', 'fixture:getPlayers.json');
  });

  it('Contains player field labels', () => {
    cy
      .get('button[type="open"]')
      .last()
      .click();
    cy.contains('First Name');
    cy.contains('Last Name');
    cy.contains('Rating');
    cy.contains('Handedness');
  });

  it('Accepts valid first name last name rating and handedness', () => {
    cy
      .get('button[type="open"]')
      .last()
      .click();
    cy.get('input[name="first_name"]').type('Tom');
    cy.get('input[name="last_name"]').type('Riddle');
    cy.get('input[name="rating"]').type('10');
    cy.get('options[name="handedness"]').select('Right');
    cy.get('#create').click();
    cy.url().should('eq', 'http://localhost:3000/roster');
    cy.contains('Tom');
  });
});
