import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ExpensesContextProvider } from '../context/ExpensesContext.jsx'
import { AuthContextProvider } from '../context/AuthContext.jsx'
import { IncomeContextProvider } from '../context/IncomeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <AuthContextProvider>

      <IncomeContextProvider>
        <ExpensesContextProvider>
          <App />
        </ExpensesContextProvider>
      </IncomeContextProvider>

    </AuthContextProvider>


  </React.StrictMode>,
)
