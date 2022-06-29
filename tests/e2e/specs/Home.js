// https://docs.cypress.io/api/table-of-contents

describe('Home.vue', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', "FIND HERE WHAT'S THE BEST IN THE CUISINE!");
  });
});
