import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../components/Home.jsx'
import Navbar from '../components/Navbar.jsx'
import ExpensesForm from '../components/ExpensesForm.jsx'
import ExpensesPage from '../components/ExpensesPage.jsx'


function App() {


  return (
    <div>

      <BrowserRouter>
        <div>


          <Navbar />

          <Routes>
          // *HOME PAGE
            <Route path="/" element={<Home />} />
            <Route path="/expenses" element={<ExpensesPage />} />

          </Routes>

        </div>


      </BrowserRouter>

    </div>
  )
}

export default App
