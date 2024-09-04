export const mockAuthenticationInput = () => ({
  email: 'any_email@mail.com',
  password: 'any_password',
})

export const mockAddAccountInput = () => ({
  email: 'any_email@mail.com',
  name: 'any_name',
  password: 'any_password',
  passwordConfirmation: 'any_password',
})

export const mockLoadSurveyListOutput = () => [
  {
    id: 'any_id',
    question: 'any_question',
    answers: [{ answer: 'any_answer_1' }, { answer: 'any_answer_2' }],
    date: new Date('09/07/2022'),
    didAnswer: true,
  },
]
