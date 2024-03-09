import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../components/Home.jsx'
import Navbar from '../components/Navbar.jsx'
import ExpensesForm from '../components/ExpensesForm.jsx'
import ExpensesPage from '../components/ExpensesPage.jsx'
import IncomePage from '../components/IncomePage.jsx'
import Login from '../components/Login.jsx'
import Signup from '../components/Signup.jsx'
import { useAuthContext } from '../hooks/userAuthContext.jsx'
import { useEffect } from 'react'
import { useState } from 'react'



function App() {

  const { user } = useAuthContext()



  return (
    <div>

      <BrowserRouter>
        <div>


          {user && <Navbar />}



          <Routes>
          // *HOME PAGE

            <Route path="/" element={user ? <Home /> : <Login />} />
            <Route path="/expenses" element={user ? <ExpensesPage /> : <Login />} />
            <Route path="/income" element={user ? <IncomePage /> : <Login />} />
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup />} />
          </Routes>



        </div>


      </BrowserRouter>

    </div>
  )
}

export default App
