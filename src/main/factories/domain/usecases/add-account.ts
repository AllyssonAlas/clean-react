import { AddAccount, setupAddAccount } from '@/domain/usecases'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/infra/gateways'

export const makeAddAccount = (): AddAccount => {
  return setupAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
