// https://on.cypress.io/api

describe('Dashboard Test', () => {
  it('Visits the dashboard and see resume cards', () => {
    cy.visit('/dashboard')

    cy.get('#dashboard-resume-organization > p')
      .should('be.visible')
      .and('have.text', 'Organizações')

    cy.get('#dashboard-resume-servers > p')
      .should('be.visible')
      .and('have.text', 'Servidores')

    cy.get('#dashboard-resume-apis > p')
      .should('be.visible')
      .and('have.text', 'APIs')

    cy.get('#dashboard-resume-endpoints > p')
      .should('be.visible')
      .and('have.text', 'Endpoints')
  })

  it('Visits the dashboard and see tags chart', () => {
    cy.visit('/dashboard')

    cy.get('#dashboard-tags-chart > canvas')
      .should('be.visible')
  })

  it('Visits the dashboard and see organization cities chart', () => {
    cy.visit('/dashboard')

    cy.get('#dashboard-cities-chart > canvas')
      .should('be.visible')
  })

  it('Visits the dashboard and see organization Apis chart', () => {
    cy.visit('/dashboard')

    cy.get('#dashboard-api-chart > canvas')
      .should('be.visible')
  })
})
