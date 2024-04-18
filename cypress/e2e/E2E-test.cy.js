const aspectRatios = [
  { width: 375, height: 667 }, // iPhone 6/7/8
  { width: 768, height: 1024 }, // iPad
  { width: 1440, height: 900 }, // Typical laptop/desktop
];

describe('E2E test for .Brief', () => {
  aspectRatios.forEach((ratio) => {
    const { width, height } = ratio;

    context(`Aspect Ratio: ${width}x${height}`, () => {
      beforeEach(() => {
        // Set the viewport to the specified aspect ratio
        cy.visit('/');
        cy.viewport(width, height);
      });

      it('Verify that the Main .Brief Logo/Text is showing as expected', () => {
        cy.get('[data-test="main-header"]').should('be.visible')
          .should('contain.text', '.Brief');
      });

      it('Verify that the search bar is showing as expected and typable', () => {
        cy.get('[data-test="search-input"]').should('be.visible')
          .type('Palestine').should('have.value', 'Palestine');
      });

      it('Verify that the search button is showing as expected and working as expected', () => {
        cy.get('[data-test="search-button"]').should('be.visible')
          .click();
      });

      it('Verify that the user is able to search and see results', () => {
        cy.get('[data-test="search-input"]').type('Java');
        cy.get('[data-test="search-button"]').click();
        cy.get('[data-test="search-results"]').should('be.visible')
          .should('contain.text', '');
      });
      it('Verify that the user is able open the show more button ', () => {
        cy.get('[data-test="search-input"]').type('Java');
        cy.get('[data-test="search-button"]').click();
        cy.get('[data-test="search-results-button"]').should('be.visible')
          .click();
      });
      it('Verify that Error message is showing as expected ', () => {
        cy.get('[data-test="search-input"]').type('Israel');
        cy.get('[data-test="search-button"]').click();
        cy.get('[data-test="error-container"]').should('be.visible')
        cy.get('[data-test="error-text"]').should('be.visible')
          .should('contain.text', 'You mean Palestine?')
      });
    });
  });
});
