import { createRoot } from 'react-dom/client'

import { App } from '@renderer/App'
import './styles/global.css'
import { StrictMode } from 'react'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
