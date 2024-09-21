import { SurveyListApiModel, SurveyApiModel } from '@/domain/models/externals'

export const mockSurveyApiModel = (): SurveyApiModel => ({
  id: (Math.random() + 1).toString(36).substring(7),
  question: 'any_question',
  answers: [
    { answer: 'any_answer_1', image: 'any_image_url', count: 45, percent: 45 },
    { answer: 'any_answer_2', count: 55, percent: 55 },
  ],
  date: new Date('09/07/2022').toISOString(),
  didAnswer: true,
})

export const mockSurveyListApi = (): SurveyListApiModel => [
  mockSurveyApiModel(),
  mockSurveyApiModel(),
  mockSurveyApiModel(),
  mockSurveyApiModel(),
]
