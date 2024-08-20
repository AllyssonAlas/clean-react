import { Authentication, setupAuthentication } from '@/domain/usecases'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/infra/gateways'

export const makeAuthentication = (): Authentication => {
  return setupAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
}
