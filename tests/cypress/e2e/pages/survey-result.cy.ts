const apiUrl = /api\/surveys/

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      localStorage.setItem('account', JSON.stringify(account))
    })
  })

  describe('load', () => {
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

    it('Should present survey result', () => {
      cy.mockResOk({ url: apiUrl, fixture: 'survey' })
      cy.visit('/surveys/any_id')
      cy.getByTestId('question').should('have.text', 'Question')
      cy.getByTestId('day').should('have.text', '03')
      cy.getByTestId('month').should('have.text', 'fev')
      cy.getByTestId('year').should('have.text', '2018')
      cy.get('li:nth-child(1)').then((li) => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer')
        assert.equal(li.find('[data-testid="percent"]').text(), '70%')
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image')
      })
      cy.get('li:nth-child(2)').then((li) => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer_2')
        assert.equal(li.find('[data-testid="percent"]').text(), '30%')
        assert.notExists(li.find('[data-testid="image"]'))
      })
    })

    it('Should go backSurveyList on back button click', () => {
      cy.mockResOk({ url: apiUrl, fixture: 'survey' })
      cy.visit('')
      cy.visit('/surveys/any_id')
      cy.getByTestId('back-button').click()
      cy.testUrl('')
    })
  })

  describe('save', () => {
    beforeEach(() => {
      cy.intercept(apiUrl, { statusCode: 200, fixture: 'survey' }).as('request')
      cy.visit('/surveys/any_id')
      cy.wait('@request')
    })

    it('Should present error on UnexpectedError', () => {
      cy.mockResServerError({ url: apiUrl })
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('error').should('contain.text', 'Algo de inesperado aconteceu')
    })

    it('Should logout on AccessDeniedError', () => {
      cy.mockResForbidden({ url: apiUrl })
      cy.visit('/surveys/any_id')
      cy.testUrl('login')
    })
  })
})
