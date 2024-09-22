import { Router } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { AccountContext } from '@/presentation/contexts'
import { SurveyResult } from '@/presentation/pages'

import { mockAccountModel } from '@/tests/domain/mocks'

type SutTypes = {
  loadSurveyResult: jest.Mock
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const loadSurveyResult = jest.fn()
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
})
