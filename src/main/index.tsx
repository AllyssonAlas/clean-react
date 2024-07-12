import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Login } from '@/presentation/pages'

const rootElement = document.getElementById('main')
const root = createRoot(rootElement!)

root.render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
