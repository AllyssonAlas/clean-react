import { Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { AccountContext } from '@/presentation/contexts'
import { SurveyResult } from '@/presentation/pages'

import { mockAccountModel } from '@/tests/domain/mocks'

const makeSut = () => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <AccountContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
      <Router location={history.location} navigator={history}>
        <SurveyResult />
      </Router>
    </AccountContext.Provider>,
  )
}

describe('SurveyResult Page', () => {
  it('Should present correct initial state', async () => {
    makeSut()

    const surveyResult = screen.getByTestId('survey-result')

    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })
})
