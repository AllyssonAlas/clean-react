import { SurveyModel } from '@/domain/models'

export type SurveyApiModel = Omit<SurveyModel, 'date'> & { date: string }

export type SurveyListApiModel = SurveyApiModel[]
