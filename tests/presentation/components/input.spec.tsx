import { render, fireEvent, screen } from '@testing-library/react'

import { Input } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'

describe('Input Component', () => {
  it('Should focus input on label click', () => {
    render(
      <FormContext.Provider value={{ state: {} }}>
        <Input name={'field'} />
      </FormContext.Provider>,
    )

    const input = screen.getByTestId('field')
    const label = screen.getByTestId(`field-label`)

    fireEvent.click(label)

    expect(document.activeElement).toBe(input)
  })
})
