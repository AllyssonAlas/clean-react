import { render, screen } from '@testing-library/react'

import { SurveyList } from '@/presentation/pages'

const makeSut = () => {
  render(<SurveyList />)
}

describe('SurveyList Page', () => {
  it('Should present 4 empty items on start', () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')

    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })
})
