import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter } from 'react-router'
import AppRoutes from './Routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
      <Analytics /> 
    </BrowserRouter>
  </StrictMode>,
)
