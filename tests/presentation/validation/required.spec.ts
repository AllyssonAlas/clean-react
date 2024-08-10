import { Required } from '@/presentation/validation'
import { RequiredFieldError } from '@/presentation/errors'

describe('Required', () => {
  it('Should return error if input does not contain field', () => {
    const sut = new Required('field')

    const error = sut.validate({})

    expect(error).toEqual(new RequiredFieldError().message)
  })

  it('Should return error if field is empty', () => {
    const sut = new Required('field')

    const error = sut.validate({ field: '' })

    expect(error).toEqual(new RequiredFieldError().message)
  })

  it('Should return error if field is undefined', () => {
    const sut = new Required('field')

    const error = sut.validate({ field: undefined })

    expect(error).toEqual(new RequiredFieldError().message)
  })
})
