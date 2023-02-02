// @ts-ignore
describe('Search Page', () => {
  it('checks if page is loaded', () => {
    cy.visit('http://localhost:3000/');

    cy.get('input[type="text"]').should('have.value', '');
    cy.get('button').contains('Search');
    cy.get('p').contains('No Results Found!');
  })

  it('search valid superhero name', () => {
    cy.visit('http://localhost:3000/');
    cy.intercept('/api/search?name=batman').as('searchResults');

    cy.get('input[type="text"]').type('batman');
    cy.get('form').submit();
    cy.wait('@searchResults');

    cy.get('li').should((items) => {
      expect(items).to.have.length(3);
    });
  });

  it('search invalid superhero name', () => {
    cy.visit('http://localhost:3000/');
    cy.intercept('/api/search?name=batmanx').as('searchResults');

    cy.get('input[type="text"]').type('batmanx');
    cy.get('form').submit();
    cy.wait('@searchResults');

    cy.get('p').contains('No Results Found!');
  });
})