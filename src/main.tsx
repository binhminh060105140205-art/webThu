import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QuizApp } from './components/QuizApp'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuizApp />
  </StrictMode>,
)
