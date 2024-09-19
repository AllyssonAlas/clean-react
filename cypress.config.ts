import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    supportFile: './tests/cypress/support/e2e.ts',
    specPattern: ['tests/cypress/e2e/**/*.cy.{ts,tsx}'],
  },
  fixturesFolder: './tests/cypress/fixtures',
})
