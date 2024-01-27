import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ExpensesContextProvider } from '../context/ExpensesContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ExpensesContextProvider>
      <App />
    </ExpensesContextProvider>

  </React.StrictMode>,
)
