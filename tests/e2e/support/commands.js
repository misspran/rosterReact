// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
Cypress.Commands.add('login', () => {
  cy.server();
  cy.route(
    'POST',
    'https://players-api.developer.alchemy.codes/api/login',
    'fixture:login.json',
  );
  cy.route(
    'GET',
    'https://players-api.developer.alchemy.codes/api/players',
    'fixture:getPlayers.json',
  );
  cy.visit('/login');
  cy.get('input[name="email"]').type('billybob@example.com');
  cy.get('input[name="password"]').type('abc123');
  cy.get('button[type="submit"]').click();
});
