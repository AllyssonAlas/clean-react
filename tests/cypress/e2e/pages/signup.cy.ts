describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    cy.testInputState('name', 'Campo obrigatório')
    cy.testInputState('email', 'Campo obrigatório')
    cy.testInputState('password', 'Campo obrigatório')
    cy.testInputState('passwordConfirmation', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
})
