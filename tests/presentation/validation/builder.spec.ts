import {
  ValidationBuilder as Builder,
  Required,
  RequiredEmail,
  RequiredMinLength,
  RequiredComparison,
} from '@/presentation/validation'

describe('ValidationBuilder', () => {
  it('Should add Required to validators array', () => {
    const sut = Builder.field('anyField').required().build()

    expect(sut).toEqual([new Required('anyField')])
  })

  it('Should add RequiredEmail to validators array', () => {
    const sut = Builder.field('anyField').email().build()

    expect(sut).toEqual([new RequiredEmail('anyField')])
  })

  it('Should add RequiredMinLength to validators array', () => {
    const sut = Builder.field('anyField').min(5).build()

    expect(sut).toEqual([new RequiredMinLength('anyField', 5)])
  })

  it('Should add RequiredComparison to validators array', () => {
    const sut = Builder.field('anyField').sameAs('otherField').build()

    expect(sut).toEqual([new RequiredComparison('anyField', 'otherField')])
  })

  it('Should add multiples validators to validators array', () => {
    const sut = Builder.field('anyField').required().email().min(5).build()

    expect(sut).toEqual([new Required('anyField'), new RequiredEmail('anyField'), new RequiredMinLength('anyField', 5)])
  })
})
