import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { MakeLogin, MakeSignup } from '@/main/factories/presentation/pages'

import '@/presentation/styles/globals.scss'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<MakeLogin />} />
        <Route path='/signup' element={<MakeSignup />} />
      </Routes>
    </BrowserRouter>
  )
}
