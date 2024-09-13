import { render, screen } from '@testing-library/react'

import { SurveyList } from '@/presentation/pages'

type SutTypes = {
  loadSurveyList: jest.Mock
}

const makeSut = (): SutTypes => {
  const loadSurveyList = jest.fn()
  render(<SurveyList loadSurveyList={loadSurveyList} />)
  return { loadSurveyList }
}

describe('SurveyList Page', () => {
  it('Should present 4 empty items on start', () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')

    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })

  it('Should call LoadSurveyList', () => {
    const { loadSurveyList } = makeSut()

    expect(loadSurveyList).toHaveBeenCalledTimes(1)
  })
})
