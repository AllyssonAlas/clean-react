import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Login } from '@/presentation/pages/Login'

const rootElement = document.getElementById('main')
const root = createRoot(rootElement!)

root.render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
