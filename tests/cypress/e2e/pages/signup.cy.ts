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

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').type('1234')
    cy.testInputState('name', 'Campo requer pelo menos 5 caracteres')
    cy.getByTestId('email').type('invalid_email')
    cy.testInputState('email', 'Campo requer um email')
    cy.getByTestId('password').type('1234')
    cy.testInputState('password', 'Campo requer pelo menos 5 caracteres')
    cy.getByTestId('passwordConfirmation').type('123')
    cy.testInputState('passwordConfirmation', 'Campo precisa ser igual a password')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('name').type('any_name')
    cy.testInputState('name')
    cy.getByTestId('email').type('valid_email@mail.com')
    cy.testInputState('email')
    cy.getByTestId('password').type('12345')
    cy.testInputState('password')
    cy.getByTestId('passwordConfirmation').type('12345')
    cy.testInputState('passwordConfirmation')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
})
