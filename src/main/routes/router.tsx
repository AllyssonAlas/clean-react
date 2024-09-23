import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AccountContext } from '@/presentation/contexts'
import { PrivateRoute } from '@/presentation/components'
import { MakeLogin, MakeSignup, MakeSurveyList, MakeSurveyResult } from '@/main/factories/presentation/pages'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters'

import '@/presentation/styles/globals.scss'

export const Router: React.FC = () => {
  return (
    <AccountContext.Provider
      value={{ setCurrentAccount: setCurrentAccountAdapter, getCurrentAccount: getCurrentAccountAdapter }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<MakeLogin />} />
          <Route path='/signup' element={<MakeSignup />} />
          <Route path='/' element={<PrivateRoute component={<MakeSurveyList />} />} />
          <Route path='/surveys/:id' element={<PrivateRoute component={<MakeSurveyResult />} />} />
        </Routes>
      </BrowserRouter>
    </AccountContext.Provider>
  )
}
