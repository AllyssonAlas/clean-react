const apiUrl = /api\/surveys/

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      localStorage.setItem('account', JSON.stringify(account))
    })
  })

  it('Should present error on UnexpectedError', () => {
    cy.mockResServerError({ url: apiUrl })

    cy.visit('/surveys/any_id')

    cy.getByTestId('error').should('contain.text', 'Algo de inesperado aconteceu')
  })

  it('Should reload on button click', () => {
    cy.intercept(apiUrl, { statusCode: 500 }).as('request')

    cy.visit('/surveys/any_id')
    cy.wait('@request')
    cy.mockResOk({ url: apiUrl, fixture: 'survey' })
    cy.wait('@request')
    cy.getByTestId('reload').click()

    cy.getByTestId('question').should('exist')
  })

  it('Should logout on AccessDeniedError', () => {
    cy.mockResForbidden({ url: apiUrl })

    cy.visit('/surveys/any_id')

    cy.testUrl('login')
  })
})
