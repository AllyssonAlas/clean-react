const apiUrl = /surveys/

describe('SurveyList', () => {
  beforeEach(() => {
    localStorage.setItem('account', JSON.stringify({ accessToken: 'any_token', name: 'any_name' }))
  })

  it('Should present error on UnexpectedError', () => {
    cy.mockResServerError({ url: apiUrl })

    cy.visit('')

    cy.getByTestId('error').should('contain.text', 'Algo de inesperado aconteceu')
  })
})
