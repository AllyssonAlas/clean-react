import { SaveAccessToken, setupSaveAccessToken } from '@/domain/usecases'
import { makeLocalStorageAdapter } from '@/main/factories/infra/gateways'

export const makeSaveAccessToken = (): SaveAccessToken => {
  return setupSaveAccessToken(makeLocalStorageAdapter())
}
