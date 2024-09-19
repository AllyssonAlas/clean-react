const apiUrl = /surveys/

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      localStorage.setItem('account', JSON.stringify(account))
    })
  })

  it('Should present error on UnexpectedError', () => {
    cy.mockResServerError({ url: apiUrl })

    cy.visit('')

    cy.getByTestId('error').should('contain.text', 'Algo de inesperado aconteceu')
  })

  it('Should logout on AccessDeniedError', () => {
    cy.mockResForbidden({ url: apiUrl })

    cy.visit('')

    cy.testUrl('login')
  })

  it('Should present correct account name', () => {
    cy.mockResOk({ url: apiUrl, body: [] })

    cy.visit('')

    cy.getByTestId('username').should('contain.text', 'Jhonny Doe')
  })

  it('Should logout on logout button click', () => {
    cy.mockResOk({ url: apiUrl, body: [] })

    cy.visit('')
    cy.getByTestId('logout').click()

    cy.testUrl('login')
  })
})
