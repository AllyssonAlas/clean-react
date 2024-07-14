import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Router } from '@/presentation/components'

const rootElement = document.getElementById('main')
const root = createRoot(rootElement!)

root.render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
