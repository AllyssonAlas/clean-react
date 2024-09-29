const apiUrl = /api\/surveys/

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

  it('Should reload on button click', () => {
    cy.intercept(apiUrl, { statusCode: 500 }).as('request')

    cy.visit('')
    cy.wait('@request')
    cy.mockResOk({ url: apiUrl, fixture: 'survey-list' })
    cy.getByTestId('reload').click()

    cy.get('li:not(:empty)').should('have.length', 2)
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

  it('Should present survey items', () => {
    cy.mockResOk({ url: apiUrl, fixture: 'survey-list' })

    cy.visit('')

    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then((li) => {
      assert.equal(li.find('[data-testid="day"]').text(), '03')
      assert.equal(li.find('[data-testid="month"]').text(), 'fev')
      assert.equal(li.find('[data-testid="year"]').text(), '2018')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 1')
      cy.fixture('icons').then((icon) => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp)
      })
    })
    cy.get('li:nth-child(2)').then((li) => {
      assert.equal(li.find('[data-testid="day"]').text(), '20')
      assert.equal(li.find('[data-testid="month"]').text(), 'out')
      assert.equal(li.find('[data-testid="year"]').text(), '2020')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 2')
      cy.fixture('icons').then((icon) => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbDown)
      })
    })
  })
})
