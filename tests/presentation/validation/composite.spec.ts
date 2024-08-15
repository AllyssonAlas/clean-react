import { mock, MockProxy } from 'jest-mock-extended'

import { ValidationComposite } from '@/presentation/validation'
import { FieldValidation } from '@/presentation/protocols'

describe('ValidationComposite', () => {
  let validators: MockProxy<FieldValidation>[]
  let sut: ValidationComposite

  beforeEach(() => {
    const fieldValidation1 = mock<FieldValidation>()
    const fieldValidation2 = mock<FieldValidation>()
    validators = [fieldValidation1, fieldValidation2].map((mock) => {
      mock.field = 'any_field'
      mock.validate.mockReturnValue(undefined)
      return mock
    })
    sut = new ValidationComposite(validators)
  })

  it('Should return error if any validation fails', () => {
    validators.forEach((validator, index) => {
      validator.validate.mockReturnValueOnce(new Error(`message_error_${index}`).message)
    })

    const error = sut.validate('any_field', 'any_value')

    expect(error).toBe('message_error_0')
  })

  it('Should return undefined if all validation succeed', () => {
    const error = sut.validate('any_field', 'any_value')

    expect(error).toBeUndefined()
  })
})
