import { render, screen } from '@testing-library/react'

import { SurveyModel } from '@/domain/models'
import { SurveyItem } from '@/presentation/pages/SurveyList/components'

import { mockLoadSurveyListOutput } from '@/tests/domain/mocks'

const makeSut = (survey: SurveyModel) => {
  render(<SurveyItem survey={survey} />)
}

describe('SurveyItem Component', () => {
  let survey: SurveyModel

  beforeEach(() => {
    survey = mockLoadSurveyListOutput()[0]
  })

  it('Should render with correct values', () => {
    Object.assign(survey, {
      didAnswer: true,
    })

    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAEgAAAAA9nQVdAAAA0klEQVQ4EWNgIAH8//+/AYhLSNCCWynUMCD1/zcQG+BWSYQMkmEgA0Egjght2JUANYO8iQ4MsasmIAo0BZthP4DirAS0YkrjMAzk0tOYqgmIADUVgnTiADPxakfStAWmECj2DkmcWOYjoEJPRpBqmEGMQABiI4vB5IikH1PbQAYmIm0mVtlLahu4nJpe/gf0hho1XbgVGKd3qWngRFBA4/LyX6AcKZZdBbpOB2QgLk1nQJIkgElwtaBEDAXIOUULKHYSiP/CJHHQX4Hic4CYBWYgADx8PyqFiuhJAAAAAElFTkSuQmCC',
    )
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  it('Should render with correct values', () => {
    Object.assign(survey, {
      didAnswer: false,
    })

    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAEgAAAAA9nQVdAAAA70lEQVQ4Ea2RPQoCQQyFZ/w5g72lYOEVPIiV2IkIHmCvIZ5D77BgZWtrYWe1ICiuL8tEwjIZZmYNZCf7knyTzRrjrK7rAfwAr+AheyNZwiei98gNrBkISxYjz5KbZb0V4gXxlN8jzo+1tk91BOT6nhPmOFNg1Nb0UiCNxY0Uu8QW044BuMIZHs3DJzcra3/yOgem3UoT3pEcaQUh3TchAX9/KNTsy/mAtLebrzhXI+AqE/oQl55ErIfYxp5WothW71QyAJ0VWKG06DJAQ/jTA0yH0TUAzf4Gc8BFC5g3GcHI3IQvBy0asesDsB08CfYFB/44kX6+Hj8AAAAASUVORK5CYII=',
    )
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})
