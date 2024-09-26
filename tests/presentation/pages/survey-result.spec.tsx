import { Router } from 'react-router-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { AccountContext } from '@/presentation/contexts'
import { SurveyResult } from '@/presentation/pages'

import { mockAccountModel, mockSurveyModel } from '@/tests/domain/mocks'

type SutParams = {
  saveSurveyResult?: jest.Mock
  loadSurveyResult?: jest.Mock
}

type SutTypes = {
  saveSurveyResult: jest.Mock
  loadSurveyResult: jest.Mock
  setCurrentAccount: jest.Mock
  history: MemoryHistory
}

const makeSut = ({
  saveSurveyResult = jest.fn().mockResolvedValue(mockSurveyModel()),
  loadSurveyResult = jest.fn().mockResolvedValue(mockSurveyModel()),
}: SutParams = {}): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/', '/surveys/any_id'], initialIndex: 1 })
  const setCurrentAccount = jest.fn()
  render(
    <AccountContext.Provider value={{ setCurrentAccount, getCurrentAccount: () => mockAccountModel() }}>
      <Router location={history.location} navigator={history}>
        <SurveyResult loadSurveyResult={loadSurveyResult} saveSurveyResult={saveSurveyResult} />
      </Router>
    </AccountContext.Provider>,
  )
  return { loadSurveyResult, saveSurveyResult, history, setCurrentAccount }
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

    makeSut({ loadSurveyResult })
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

  it('Should render error on UnexpectedError', async () => {
    const error = new UnexpectedError()
    const loadSurveyResult = jest.fn().mockRejectedValue(error)
    makeSut({ loadSurveyResult })

    await waitFor(() => screen.getByTestId('survey-result'))

    expect(screen.queryByTestId('question')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  it('Should logout on AccessDeniedError', async () => {
    const loadSurveyResult = jest.fn().mockRejectedValue(new AccessDeniedError())
    const { setCurrentAccount, history } = makeSut({ loadSurveyResult })

    await waitFor(() => screen.getByTestId('survey-result'))

    expect(setCurrentAccount).toHaveBeenCalledWith(null)
    expect(setCurrentAccount).toHaveBeenCalledTimes(1)
    expect(history.location.pathname).toBe('/login')
  })

  it('Should call LoadSurveyResult on reload', async () => {
    const error = new UnexpectedError()
    const loadSurveyResult = jest.fn().mockRejectedValue(error)
    makeSut({ loadSurveyResult })

    await screen.findByTestId('error')
    await waitFor(() => screen.getByTestId('survey-result'))

    fireEvent.click(screen.getByTestId('reload'))
    expect(loadSurveyResult).toHaveBeenCalledTimes(2)
    await waitFor(() => screen.getByTestId('survey-result'))
  })

  it('Should go back to SurveyList', async () => {
    const { history } = makeSut()

    await waitFor(() => screen.getByTestId('survey-result'))
    fireEvent.click(screen.getByTestId('back-button'))

    expect(history.location.pathname).toBe('/')
  })

  it('Should not present load on active answer click', async () => {
    makeSut()

    await waitFor(() => screen.getByTestId('survey-result'))
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answersWrap[0])

    expect(answersWrap[0]).toHaveClass('active')

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  it('Should not present load on active answer click', async () => {
    makeSut()

    await waitFor(() => screen.getByTestId('survey-result'))
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answersWrap[0])

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  it('Should call SaveSurveyResult on non active answer click', async () => {
    const { saveSurveyResult, loadSurveyResult } = makeSut()

    await waitFor(() => screen.getByTestId('survey-result'))
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    const loadSurveyResultData = await loadSurveyResult()
    fireEvent.click(answersWrap[1])

    expect(screen.queryByTestId('loading')).toBeInTheDocument()
    expect(saveSurveyResult).toHaveBeenCalledWith({
      answer: loadSurveyResultData.answers[1].answer,
    })
    expect(saveSurveyResult).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.getByTestId('survey-result'))
  })

  it('Should render error on UnexpectedError', async () => {
    const error = new UnexpectedError()
    const saveSurveyResult = jest.fn().mockRejectedValue(error)
    makeSut({ saveSurveyResult })

    await waitFor(() => screen.getByTestId('survey-result'))
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answersWrap[1])
    const errorElement = await screen.findByTestId('error')

    expect(screen.queryByTestId('question')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(errorElement).toHaveTextContent(error.message)
  })

  it('Should logout on AccessDeniedError', async () => {
    const saveSurveyResult = jest.fn().mockRejectedValue(new AccessDeniedError())
    const { history, setCurrentAccount } = makeSut({ saveSurveyResult })

    await waitFor(() => screen.getByTestId('survey-result'))
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answersWrap[1])
    await waitFor(() => screen.getByTestId('survey-result'))

    expect(setCurrentAccount).toHaveBeenCalledWith(null)
    expect(setCurrentAccount).toHaveBeenCalledTimes(1)
    expect(history.location.pathname).toBe('/login')
  })

  it('Should present survey on SaveSurveyResult success', async () => {
    const survey = Object.assign({}, mockSurveyModel(), {
      date: new Date('2022-10-23T00:00:00'),
    })
    const saveSurveyResult = jest.fn().mockResolvedValue(survey)
    makeSut({ saveSurveyResult })

    await waitFor(() => screen.getByTestId('survey-result'))
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answersWrap[1])
    await waitFor(() => screen.getByTestId('survey-result'))

    expect(screen.getByTestId('day')).toHaveTextContent('23')
    expect(screen.getByTestId('month')).toHaveTextContent('out')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('answers').childElementCount).toBe(2)
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
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  it('Should prevents multiple answer click', async () => {
    const { saveSurveyResult } = makeSut()

    await waitFor(() => screen.getByTestId('survey-result'))
    const answersWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answersWrap[1])
    fireEvent.click(answersWrap[1])
    await waitFor(() => screen.getByTestId('survey-result'))

    expect(saveSurveyResult).toHaveBeenCalledTimes(1)
  })
})
