describe('Wizard Flow E2E', () => {
  it('should render the first step of the wizard', () => {
    // Visit the home page
    cy.visit('http://localhost:3000');
    
    // Assert the main wizard heading is present
    cy.contains('h2', 'Create Your Funnel').should('be.visible');
    
    // Assert the first step (Product) is active
    cy.contains('1. Select Product Type').should('be.visible');
    
    // Check for product type cards
    cy.contains('Physical').should('be.visible');
    cy.contains('Digital').should('be.visible');
  });
});
