describe('PrivateRoutes', () => {
  it('Should logout if survey-list has no token', () => {
    cy.visit('')

    cy.testUrl('login')
  })

  it('Should logout if survey-result has no token', () => {
    cy.visit('/surveys/any_id')

    cy.testUrl('login')
  })
})
