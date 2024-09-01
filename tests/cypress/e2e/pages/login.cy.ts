const baseUrl = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('email-label').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('password-label').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type('invalid_email')
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email').should('have.attr', 'title', 'Campo requer um email')
    cy.getByTestId('email-label').should('have.attr', 'title', 'Campo requer um email')
    cy.getByTestId('password').type('1234')
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password').should('have.attr', 'title', 'Campo requer pelo menos 5 caracteres')
    cy.getByTestId('password-label').should('have.attr', 'title', 'Campo requer pelo menos 5 caracteres')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type('valid_email@mail.com')
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('email').should('not.have.attr', 'title')
    cy.getByTestId('email-label').should('not.have.attr', 'title')
    cy.getByTestId('password').type('12345')
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('password').should('not.have.attr', 'title')
    cy.getByTestId('password-label').should('not.have.attr', 'title')
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
    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('contain.text', 'Algo de inesperado aconteceu')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present InvalidCredentialsError message on 401', () => {
    cy.intercept('POST', 'http://localhost:8000/api/login', {
      statusCode: 401,
      delay: 100,
    })
    cy.getByTestId('email').type('valid_email@mail.com')
    cy.getByTestId('password').type('12345')
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('contain.text', 'Credenciais inválidas')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present UnexpectedError message if accessToken is falsy', () => {
    cy.intercept('POST', 'http://localhost:8000/api/login', {
      statusCode: 200,
      delay: 100,
      body: { accessToken: undefined },
    })
    cy.getByTestId('email').type('valid_email@mail.com')
    cy.getByTestId('password').type('12345')
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('contain.text', 'Algo de inesperado aconteceu')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should save accessToken on 200', () => {
    cy.intercept('POST', 'http://localhost:8000/api/login', {
      statusCode: 200,
      delay: 100,
      body: { accessToken: 'any_token' },
    })
    cy.getByTestId('email').type('valid_email@mail.com')
    cy.getByTestId('password').type('12345')
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(({ localStorage }) => assert.isOk(localStorage.getItem('accessToken') === 'any_token'))
  })

  it('Should prevent multiple submits', () => {
    cy.intercept('POST', 'http://localhost:8000/api/login', {
      statusCode: 200,
      delay: 100,
    }).as('request')
    cy.getByTestId('email').type('valid_email@mail.com')
    cy.getByTestId('password').type('12345')
    cy.getByTestId('form').submit()
    cy.getByTestId('form').submit()
    cy.get('@request.all').its('length').should('equal', 1)
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should not call submit if form is invalid', () => {
    cy.intercept('POST', 'http://localhost:8000/api/login', {
      statusCode: 200,
      delay: 100,
    }).as('request')
    cy.getByTestId('email').type('valid_email@mail.com')
    cy.getByTestId('email').type('{enter}')
    cy.get('@request.all').its('length').should('equal', 0)
    cy.url().should('eq', `${baseUrl}/login`)
  })
})
