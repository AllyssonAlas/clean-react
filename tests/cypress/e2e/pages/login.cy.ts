const validFormData = [
  { field: 'email', value: 'valid_email@mail.com' },
  { field: 'password', value: '12345' },
]

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.testInputState('email', 'Campo obrigatório')
    cy.testInputState('password', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type('invalid_email')
    cy.testInputState('email', 'Campo requer um email')
    cy.getByTestId('password').type('1234')
    cy.testInputState('password', 'Campo requer pelo menos 5 caracteres')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type('valid_email@mail.com')
    cy.testInputState('email')
    cy.getByTestId('password').type('12345')
    cy.testInputState('password')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present UnexpectedError message on 400', () => {
    cy.intercept('POST', 'http://localhost:8000/api/login', {
      statusCode: 400,
      delay: 100,
    })
    cy.getByTestId('email').type('valid_email@mail.com')
    cy.getByTestId('password').type('12345')
    cy.getByTestId('password').type('{enter}')
    cy.testErrorMessage('Algo de inesperado aconteceu')
    cy.testUrl('login')
  })

  it('Should present InvalidCredentialsError message on 401', () => {
    cy.intercept('POST', 'http://localhost:8000/api/login', {
      statusCode: 401,
      delay: 100,
    })
    cy.submitForm(validFormData)
    cy.testErrorMessage('Credenciais inválidas')
    cy.testUrl('login')
  })

  it('Should present UnexpectedError message if accessToken is falsy', () => {
    cy.intercept('POST', 'http://localhost:8000/api/login', {
      statusCode: 200,
      delay: 100,
      body: { accessToken: undefined },
    })
    cy.submitForm(validFormData)
    cy.testErrorMessage('Algo de inesperado aconteceu')
    cy.testUrl('login')
  })

  it('Should save accessToken on 200', () => {
    cy.intercept('POST', 'http://localhost:8000/api/login', {
      statusCode: 200,
      delay: 100,
      body: { accessToken: 'any_token' },
    })
    cy.submitForm(validFormData)
    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
    cy.testUrl('')
    cy.window().then(({ localStorage }) => assert.isOk(localStorage.getItem('accessToken') === 'any_token'))
  })

  it('Should prevent multiple submits', () => {
    cy.intercept('POST', 'http://localhost:8000/api/login', {
      statusCode: 200,
      delay: 100,
    }).as('request')
    cy.submitForm(validFormData)
    cy.getByTestId('form').submit()
    cy.get('@request.all').its('length').should('equal', 1)
    cy.testUrl('login')
  })

  it('Should not call submit if form is invalid', () => {
    cy.intercept('POST', 'http://localhost:8000/api/login', {
      statusCode: 200,
      delay: 100,
    }).as('request')
    cy.getByTestId('email').type('valid_email@mail.com')
    cy.getByTestId('email').type('{enter}')
    cy.get('@request.all').its('length').should('equal', 0)
    cy.testUrl('login')
  })
})
