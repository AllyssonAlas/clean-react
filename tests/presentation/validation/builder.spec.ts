import { ValidationBuilder as Builder, Required, RequiredEmail } from '@/presentation/validation'

describe('ValidationBuilder', () => {
  it('Should add Required to validators array', () => {
    const sut = Builder.field('anyField').required().build()

    expect(sut).toEqual([new Required('anyField')])
  })

  it('Should add RequiredEmail to validators array', () => {
    const sut = Builder.field('anyField').email().build()

    expect(sut).toEqual([new RequiredEmail('anyField')])
  })
})
