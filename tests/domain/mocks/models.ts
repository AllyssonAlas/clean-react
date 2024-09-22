import { AccountModel, SurveyModel } from '@/domain/models'

export const mockAccountModel = (): AccountModel => ({ accessToken: 'any_access_token', name: 'any_name' })

export const mockSurveyModel = (): SurveyModel => ({
  id: (Math.random() + 1).toString(36).substring(7),
  question: 'any_question',
  answers: [
    { answer: 'any_answer_1', image: 'any_image', count: 45, percent: 45, isCurrentAccountAnswer: true },
    { answer: 'any_answer_2', count: 55, percent: 55, isCurrentAccountAnswer: false },
  ],
  date: new Date('09/07/2022'),
  didAnswer: true,
})
