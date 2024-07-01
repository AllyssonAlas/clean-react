import { mock } from 'jest-mock-extended'

import { setupAuthentication } from '@/domain/usecases'
import { HttpPostClient } from '@/domain/contracts/gateways'

describe('Authentication', () => {
  it('Should call HttpPostClient with correct URL', async () => {
    const url = 'any_url'
    const httpPostClient = mock<HttpPostClient>()
    const sut = setupAuthentication(url, httpPostClient)
    await sut()
    expect(httpPostClient.post).toHaveBeenCalledWith({ url })
  })
})
