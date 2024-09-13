import { render, screen, waitFor } from '@testing-library/react'

import { SurveyList } from '@/presentation/pages'

import { mockLoadSurveyListOutput } from '@/tests/domain/mocks'

type SutTypes = {
  loadSurveyList: jest.Mock
}

const makeSut = (): SutTypes => {
  const loadSurveyList = jest.fn().mockResolvedValue(mockLoadSurveyListOutput())
  render(<SurveyList loadSurveyList={loadSurveyList} />)
  return { loadSurveyList }
}

describe('SurveyList Page', () => {
  it('Should present 4 empty items on start', async () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')

    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    await waitFor(() => surveyList)
  })

  it('Should call LoadSurveyList', async () => {
    const { loadSurveyList } = makeSut()

    expect(loadSurveyList).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  it('Should render SurveyItems on success', async () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')

    await waitFor(() => surveyList)
    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(4)
  })
})
