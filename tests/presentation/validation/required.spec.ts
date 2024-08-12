import { Required } from '@/presentation/validation'
import { RequiredFieldError } from '@/presentation/errors'

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
