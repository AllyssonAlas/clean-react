const apiUrl = /signup/

const validFormData = [
  { field: 'name', value: 'any_name' },
  { field: 'email', value: 'valid_email@mail.com' },
  { field: 'password', value: '12345' },
  { field: 'passwordConfirmation', value: '12345' },
]

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

  it('Should present UnexpectedError message on 400', () => {
    cy.mockResBadRequest({ url: apiUrl })
    cy.submitForm(validFormData)
    cy.testErrorMessage('Algo de inesperado aconteceu')
    cy.testUrl('signup')
  })

  it('Should present EmailInUseError on 403', () => {
    cy.mockResForbidden({ url: apiUrl })
    cy.submitForm(validFormData)
    cy.testErrorMessage('Email já está em uso')
    cy.testUrl('signup')
  })

  it('Should save accessToken on 200', () => {
    cy.mockResOk({ body: { accessToken: 'any_token', name: 'any_name' }, url: apiUrl })
    cy.submitForm(validFormData)
    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
    cy.testUrl('')
    cy.window().then(({ localStorage }) =>
      assert.isOk(localStorage.getItem('account') === JSON.stringify({ accessToken: 'any_token', name: 'any_name' })),
    )
  })

  it('Should prevent multiple submits', () => {
    cy.mockResOk({ url: apiUrl }).as('request')
    cy.submitForm(validFormData)
    cy.getByTestId('form').submit()
    cy.get('@request.all').its('length').should('equal', 1)
    cy.testUrl('signup')
  })

  it('Should not call submit if form is invalid', () => {
    cy.mockResOk({ body: { accessToken: 'any_token' }, url: apiUrl }).as('request')
    cy.getByTestId('name').type('any_name')
    cy.getByTestId('email').type('valid_email@mail.com')
    cy.getByTestId('email').type('{enter}')
    cy.get('@request.all').its('length').should('equal', 0)
    cy.testUrl('signup')
  })
})
