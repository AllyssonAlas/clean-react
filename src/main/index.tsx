import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById('main')
const root = createRoot(rootElement!)

root.render(
  <StrictMode>
    <h1>React App</h1>
  </StrictMode>,
)
