import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './stylesheets/index.css'
// import App from './App.tsx'
import Login from './pages/Login.tsx'
import Calendar from './pages/Calendar.tsx'
import MenuBar from './MenuBar.tsx'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
