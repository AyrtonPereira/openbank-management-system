describe('Organizations List', () => {
  it('Test filters', () => {
    cy.visit('/organizations')
    cy.get('#organization-filter-name-input')
    .should('be.visible')

    cy.get('#organization-filter-state-select')
    .should('be.visible')

    cy.get('#organization-filter-tags-select')
    .should('be.visible')

    cy.get('#organization-filter-reset-button')
    .should('be.visible')

  })

  it('Test filter by name Itau', () => {
    cy.visit('/organizations')
    cy.get('#organization-filter-name-input')
      .should('be.visible')
      .type('Itau')
    
      cy.get('tbody > :nth-child(1) > :nth-child(1)')
      .should('be.visible')
      .and('have.text', 'ITAU CV S.A.')
  })

  it('Test input filters and clean', () => {
    cy.visit('/organizations')
    cy.get('#organization-filter-name-input').type('Qualquer texto');
    cy.get('#organization-filter-state-select').select('SP');
    cy.get('#organization-filter-tags-select').select([1]);
    
    cy.get('#organization-filter-state-select').should('have.value', 'SP');
    cy.get('#organization-filter-tags-select').should('not.be.null');

    cy.get('#organization-filter-reset-button').click();
    cy.get('#organization-filter-name-input').invoke('val').should('be.empty');
    cy.get('#organization-filter-state-select').should('have.value', 'Selecione o Estado');
    cy.get('#organization-filter-tags-select').should('have.value', 'Selecione a Tag');
  })

  it('Get the first organization', () => {
    cy.visit('/organizations')
    cy.get('.organization-list-button').should('be.visible')
    cy.get('.organization-list-button').eq(0).click();
    cy.url().should('eq', 'http://localhost:4173/organizations/18543a69-338d-5e5b-8aa3-dc640ef5f4a2')
  })
})
