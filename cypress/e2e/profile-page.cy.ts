// @ts-ignore
describe('Profile Page', () => {
  it('checks if Profile Page is loaded with valid superhero id', () => {
    cy.visit('http://localhost:3000/profile/489');

    cy.get('h1').contains('#489');
    cy.get('h4').contains('Power Stats');
    cy.get('img').should('be.visible');
  })

  it('check for invalid superhero id', () => {
    cy.visit('http://localhost:3000/profile/12345');

    cy.url().should('be.equal', 'http://localhost:3000/');
  });
})