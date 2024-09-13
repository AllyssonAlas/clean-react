import { screen, fireEvent } from '@testing-library/react'

export const testStatusForField = (field: string, validationError: string = ''): void => {
  const wrap = screen.getByTestId(`${field}-wrap`)
  const input = screen.getByTestId(field)
  const label = screen.getByTestId(`${field}-label`)
  expect(wrap).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
  expect(input).toHaveProperty('title', validationError)
  expect(label).toHaveProperty('title', validationError)
}

export const populateInput = (field: string): void => {
  const input = screen.getByTestId(field)
  fireEvent.input(input, { target: { value: `any_${field}` } })
}
