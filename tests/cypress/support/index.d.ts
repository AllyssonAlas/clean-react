/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getByTestId(id: string): Chainable<JQuery<HTMLElement>>
    mockRes(data: { body?: any; statusCode: number; url: RegExp }): Chainable<null>
    submitForm(inputs: { field: string; value: string }[]): Chainable<void>
    testErrorMessage(error: string): Chainable<void>
    testInputState(field: string, error?: string): Chainable<void>
    testUrl(suffix: string): Chainable<void>
  }
}