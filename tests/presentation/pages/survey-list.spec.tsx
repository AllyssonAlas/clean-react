import { Router } from 'react-router-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import { UnexpectedError } from '@/domain/errors'
import { AccountContext } from '@/presentation/contexts'
import { SurveyList } from '@/presentation/pages'

import { mockAccountModel, mockLoadSurveyListOutput } from '@/tests/domain/mocks'

type SutTypes = {
  loadSurveyList: jest.Mock
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (loadSurveyList = jest.fn().mockResolvedValue(mockLoadSurveyListOutput())): SutTypes => {
  render(
    <AccountContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
      <Router location={history.location} navigator={history}>
        <SurveyList loadSurveyList={loadSurveyList} />
      </Router>
    </AccountContext.Provider>,
  )
  return { loadSurveyList }
}

describe('SurveyList Page', () => {
  it('Should present 4 empty items on start', async () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')

    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
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
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  it('Should render error on failure', async () => {
    const error = new UnexpectedError()
    const loadSurveyList = jest.fn().mockRejectedValue(error)
    makeSut(loadSurveyList)

    const errorElement = await screen.findByTestId('error')

    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(errorElement).toHaveTextContent(error.message)
  })

  it('Should call LoadSurveyList on reload', async () => {
    const error = new UnexpectedError()
    const loadSurveyList = jest.fn().mockRejectedValue(error)
    makeSut(loadSurveyList)

    await screen.findByTestId('error')
    await waitFor(() => screen.getByRole('heading'))

    fireEvent.click(screen.getByTestId('reload'))
    expect(loadSurveyList).toHaveBeenCalledTimes(2)
    await waitFor(() => screen.getByRole('heading'))
  })
})
