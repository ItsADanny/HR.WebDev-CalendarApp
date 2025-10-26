import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './stylesheets/index.css'
// import App from './App.tsx'
import Login from './Login.tsx'
import Calendar from './Calendar.tsx'
import MenuBar from './MenuBar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MenuBar />
  </StrictMode>,
)
