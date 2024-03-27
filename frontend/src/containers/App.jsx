import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../components/Home.jsx'
import Navbar from '../components/Navbar.jsx'
import ExpensesForm from '../components/ExpensesForm.jsx'
import ExpensesPage from '../components/ExpensesPage.jsx'
import IncomePage from '../components/IncomePage.jsx'
import Login from '../components/Login.jsx'
import Signup from '../components/Signup.jsx'
import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { LOGIN } from '../store/features/auth/authSlice'



function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("INITIAL USE EFFECT RUN START")

    const user = JSON.parse(localStorage.getItem('user'))

    // const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    //   const [key, value] = cookie.trim().split('=');
    //   acc[key] = decodeURIComponent(value);
    //   return acc;
    // }, {});

    // const user = cookies.user ? JSON.parse(cookies.user) : null;

    if (user) {
      console.log("USER EXISTS")
    }

    console.log("INITIAL USE EFFECT RUN END")

    if (user) {
      dispatch(LOGIN(user))
    }
  }, [])


  const user = useSelector((state) => state.user.value)



  return (


    <BrowserRouter>
      <>

        <div className='flex flex-col md:flex-row'>
          {user && <Navbar />}


          <main className='w-full h-screen md:overflow-y-scroll pt-6'>
            <Routes>
          // *HOME PAGE

              <Route path="/" element={user ? <Home /> : <Login />} />
              <Route path="/expenses" element={user ? <ExpensesPage /> : <Login />} />
              <Route path="/income" element={user ? <IncomePage /> : <Login />} />


              <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
              <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

        </div>
      </>


    </BrowserRouter>

  )
}

export default App
