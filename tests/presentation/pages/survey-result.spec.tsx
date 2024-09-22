import { Router } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { AccountContext } from '@/presentation/contexts'
import { SurveyResult } from '@/presentation/pages'

import { mockAccountModel, mockSurveyModel } from '@/tests/domain/mocks'

type SutTypes = {
  loadSurveyResult: jest.Mock
}

const makeSut = (loadSurveyResult = jest.fn().mockResolvedValue(mockSurveyModel())): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <AccountContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
      <Router location={history.location} navigator={history}>
        <SurveyResult loadSurveyResult={loadSurveyResult} />
      </Router>
    </AccountContext.Provider>,
  )
  return { loadSurveyResult }
}

describe('SurveyResult Page', () => {
  it('Should present correct initial state', async () => {
    makeSut()

    const surveyResult = screen.getByTestId('survey-result')

    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => surveyResult)
  })

  it('Should call LoadSurveyResult', async () => {
    const { loadSurveyResult } = makeSut()

    await waitFor(() => screen.getByTestId('survey-result'))

    expect(loadSurveyResult).toHaveBeenCalledTimes(1)
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  it('Should present survey on success', async () => {
    const survey = Object.assign({}, mockSurveyModel(), {
      date: new Date('2020-01-10T00:00:00'),
    })
    const loadSurveyResult = jest.fn().mockResolvedValue(survey)

    makeSut(loadSurveyResult)
    await waitFor(() => screen.getByTestId('survey-result'))

    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('answers').childElementCount).toBe(2)
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    expect(answersWrap[0]).toHaveClass('active')
    expect(answersWrap[1]).not.toHaveClass('active')
    const images = screen.queryAllByTestId('image')
    expect(images[0]).toHaveAttribute('src', survey.answers[0].image)
    expect(images[0]).toHaveAttribute('alt', survey.answers[0].answer)
    expect(images[1]).toBeFalsy()
    const answers = screen.queryAllByTestId('answer')
    expect(answers[0]).toHaveTextContent(survey.answers[0].answer)
    expect(answers[1]).toHaveTextContent(survey.answers[1].answer)
    const percents = screen.queryAllByTestId('percent')
    expect(percents[0]).toHaveTextContent(`${survey.answers[0].percent}%`)
    expect(percents[1]).toHaveTextContent(`${survey.answers[1].percent}%`)
  })
})
