const baseUrl = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email-status').should('have.attr', 'title', 'Campo obrigatório').should('contain.text', '🔴')
    cy.getByTestId('password-status').should('have.attr', 'title', 'Campo obrigatório').should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type('invalid_email')
    cy.getByTestId('email-status').should('have.attr', 'title', 'Campo requer um email').should('contain.text', '🔴')
    cy.getByTestId('password').type('1234')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo requer pelo menos 5 caracteres')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type('valid_email@mail.com')
    cy.getByTestId('email-status').should('have.attr', 'title', 'Tudo certo!').should('contain.text', '🟢')
    cy.getByTestId('password').type('12345')
    cy.getByTestId('password-status').should('have.attr', 'title', 'Tudo certo!').should('contain.text', '🟢')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error if invalid credentials are provided', () => {
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
})
