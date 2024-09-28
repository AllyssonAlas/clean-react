import { fireEvent, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { SurveyList } from '@/presentation/pages'

import { mockLoadSurveyListOutput } from '@/tests/domain/mocks'
import { renderComponent } from '@/tests/presentation/utils'

type SutTypes = {
  loadSurveyList: jest.Mock
  setCurrentAccount: jest.Mock
  history: MemoryHistory
}

const makeSut = (loadSurveyList = jest.fn().mockResolvedValue(mockLoadSurveyListOutput())): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const { setCurrentAccount } = renderComponent({
    history,
    Component: () => <SurveyList loadSurveyList={loadSurveyList} />,
  })

  return { loadSurveyList, setCurrentAccount, history }
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

  it('Should render error on UnexpectedError', async () => {
    const error = new UnexpectedError()
    const loadSurveyList = jest.fn().mockRejectedValue(error)
    makeSut(loadSurveyList)

    const errorElement = await screen.findByTestId('error')

    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(errorElement).toHaveTextContent(error.message)
  })

  it('Should logout on AccessDeniedError', async () => {
    const loadSurveyList = jest.fn().mockRejectedValue(new AccessDeniedError())

    const { setCurrentAccount, history } = makeSut(loadSurveyList)
    await waitFor(() => screen.getByRole('heading'))

    expect(setCurrentAccount).toHaveBeenCalledWith(null)
    expect(setCurrentAccount).toHaveBeenCalledTimes(1)
    expect(history.location.pathname).toBe('/login')
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
