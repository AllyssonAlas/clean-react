import { mock } from 'jest-mock-extended'

import { ValidationComposite } from '@/presentation/validation'
import { FieldValidation } from '@/presentation/protocols'

describe('ValidationComposite', () => {
  it('Should return error if any validation fails', () => {
    const fieldValidationSpy = mock<FieldValidation>()
    fieldValidationSpy.field = 'any_field'
    const fieldValidationSpy2 = mock<FieldValidation>()
    fieldValidationSpy2.field = 'any_field'
    fieldValidationSpy2.validate.mockReturnValue(new Error('any_error_message').message)
    const sut = new ValidationComposite([fieldValidationSpy, fieldValidationSpy2])
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('any_error_message')
  })
})
