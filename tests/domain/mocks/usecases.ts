import { mockSurveyModel } from '@/tests/domain/mocks'

export const mockAuthenticationInput = () => ({
  email: 'any_email@mail.com',
  password: 'any_password',
})

export const mockAddAccountInput = () => ({
  email: 'any_email@mail.com',
  name: 'any_name',
  password: 'any_password',
  passwordConfirmation: 'any_password',
})

export const mockLoadSurveyListOutput = () => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
]
