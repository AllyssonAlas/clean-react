import { AccountModel, SurveyModel } from '@/domain/models'

export const mockAccountModel = (): AccountModel => ({ accessToken: 'any_access_token', name: 'any_name' })

export const mockSurveyModel = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{ answer: 'any_answer_1' }, { answer: 'any_answer_2' }],
  date: new Date('09/07/2022'),
  didAnswer: true,
})
