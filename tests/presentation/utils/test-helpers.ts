import { screen, fireEvent } from '@testing-library/react'

export const testChildCount = async (field: string, count: number): Promise<void> => {
  const el = await screen.findByTestId(field)
  expect(el.childElementCount).toBe(count)
}
export const testButtonIsDisabled = (field: string, isDisabled: boolean): void => {
  const button = screen.getByTestId(field) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}
export const testStatusForField = (field: string, validationError?: string): void => {
  const fieldStatus = screen.getByTestId(`${field}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const populateInput = (field: string): void => {
  const input = screen.getByTestId(field)
  fireEvent.input(input, { target: { value: `any_${field}` } })
}

export const testElementExists = (field: string): void => {
  const el = screen.getByTestId(field)
  expect(el).toBeTruthy()
}

export const testElementText = (field: string, text: string): void => {
  const el = screen.getByTestId(field)
  expect(el.textContent).toBe(text)
}
