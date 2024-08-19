import { ValidationBuilder as Builder, Required } from '@/presentation/validation'

describe('ValidationBuilder', () => {
  it('Should add Required to validators array', () => {
    const sut = Builder.field('anyField').required().build()

    expect(sut).toEqual([new Required('anyField')])
  })
})
