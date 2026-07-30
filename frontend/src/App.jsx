import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import PollListPage from './pages/PollsListPage'
import PollPage from './pages/PollPage'
import ResultPage from './pages/ResultPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'


function App() {
  const [navActive, setNavActive] = useState(null)

  return (
    <>
      <AuthProvider>
        <div className='flex'>
          <Sidebar navActive={navActive} setNavActive={setNavActive} />
          <div className='w-full bg-[#F6F8F8]'>
            <Topbar navActive={navActive} setNavActive={setNavActive} />
            <Routes>
              <Route path='/poll' element={<PollListPage />} />
              <Route path='/poll/:id' element={<PollPage />} />
              <Route path='/result' element={<ResultPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<LoginPage />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </>
  )
}

export default App
