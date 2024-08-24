import { Required, RequiredComparison, RequiredEmail, RequiredMinLength } from '@/presentation/validation'
import {
  RequiredFieldError,
  RequiredEmailError,
  RequiredMinLengthError,
  RequiredComparisonError,
} from '@/presentation/errors'

describe('Required', () => {
  let sut: Required

  beforeEach(() => {
    sut = new Required('field')
  })

  it('Should return error if input does not contain field', () => {
    const error = sut.validate({})

    expect(error).toEqual(new RequiredFieldError().message)
  })

  it('Should return error if field is empty', () => {
    const error = sut.validate({ field: '' })

    expect(error).toEqual(new RequiredFieldError().message)
  })

  it('Should return error if field is undefined', () => {
    const error = sut.validate({ field: undefined })

    expect(error).toEqual(new RequiredFieldError().message)
  })

  it('Should return error if field is null', () => {
    const error = sut.validate({ field: null })

    expect(error).toEqual(new RequiredFieldError().message)
  })

  it('Should return undefined is validation succeeds', () => {
    const error = sut.validate({ field: 'any_value' })

    expect(error).toBeUndefined()
  })
})

describe('RequiredEmail', () => {
  let sut: RequiredEmail

  beforeEach(() => {
    sut = new RequiredEmail('field')
  })

  it('Should return error if input does not contain an email', () => {
    const error = sut.validate({ field: '' })

    expect(error).toEqual(new RequiredEmailError().message)
  })

  it('Should return error if input does not contain an email', () => {
    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new RequiredEmailError().message)
  })

  it('Should undefined error if validation succeeds', () => {
    const error = sut.validate({ field: 'any_email@mail.com' })

    expect(error).toBeUndefined()
  })
})

describe('RequiredMinLength', () => {
  let sut: RequiredMinLength

  beforeEach(() => {
    sut = new RequiredMinLength('field', 5)
  })

  it('Should return error if input does not contain min length', () => {
    const error = sut.validate({ field: '' })

    expect(error).toEqual(new RequiredMinLengthError(5).message)
  })

  it('Should return error if input does not contain min length', () => {
    const error = sut.validate({ field: '123' })

    expect(error).toEqual(new RequiredMinLengthError(5).message)
  })

  it('Should return undefined if validation succeeds', () => {
    const error = sut.validate({ field: '12345' })

    expect(error).toBeUndefined()
  })
})

describe('RequiredComparison', () => {
  let sut: RequiredComparison

  beforeEach(() => {
    sut = new RequiredComparison('field', 'anotherField')
  })

  it('Should return error if input comparison is invalid', () => {
    const error = sut.validate({
      field: 'any_value',
    })

    expect(error).toEqual(new RequiredComparisonError('field').message)
  })

  it('Should return undefined comparison is valid', () => {
    const error = sut.validate({
      field: 'any_value',
      anotherField: 'any_value',
    })

    expect(error).toBeUndefined()
  })
})
