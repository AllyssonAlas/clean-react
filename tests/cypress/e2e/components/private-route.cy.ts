describe('PrivateRoutes', () => {
  it('Should logout if survey-list has no token', () => {
    cy.visit('')

    cy.testUrl('login')
  })
})
