import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AccountContext } from '@/presentation/contexts'
import { MakeLogin, MakeSignup } from '@/main/factories/presentation/pages'
import { SurveyList } from '@/presentation/pages'
import { PrivateRoute } from '@/presentation/components'
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
          <Route path='/' element={<PrivateRoute component={<SurveyList />} />} />
        </Routes>
      </BrowserRouter>
    </AccountContext.Provider>
  )
}
