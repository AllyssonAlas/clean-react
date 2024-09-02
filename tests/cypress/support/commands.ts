/// <reference types="cypress" />

Cypress.Commands.add('getByTestId', (id) => cy.get(`[data-testid="${id}"]`))
Cypress.Commands.add('submitForm', (inputs) => {
  for (const { field, value } of inputs) {
    cy.getByTestId(field).type(value)
  }
  cy.getByTestId('form').submit()
})
Cypress.Commands.add('testInputState', (field, error?) => {
  cy.getByTestId(`${field}-wrap`).should('have.attr', 'data-status', error ? 'invalid' : 'valid')
  const attr = `${error ? '' : 'not.'}have.attr`
  cy.getByTestId(`${field}`).should(attr, 'title', error)
  cy.getByTestId(`${field}-label`).should(attr, 'title', error)
})
Cypress.Commands.add('testErrorMessage', (error) => {
  cy.getByTestId('error-wrap')
    .getByTestId('spinner')
    .should('exist')
    .getByTestId('main-error')
    .should('not.exist')
    .getByTestId('spinner')
    .should('not.exist')
    .getByTestId('main-error')
    .should('contain.text', error)
})
Cypress.Commands.add('testUrl', (suffix) => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/${suffix}`)
})
