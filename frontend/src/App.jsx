import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import PollListPage from './pages/PollsListPage'
import PollPage from './pages/PollPage'
import ResultPage from './pages/ResultPage'


function App() {
    const [navActive, setNavActive] = useState(null)
  
  return (
    <>
      <div className='flex'>
        <Sidebar navActive={navActive} setNavActive={setNavActive} />
        <div className='w-full bg-[#F6F8F8]'>
          <Topbar navActive={navActive} setNavActive={setNavActive} />
          <Routes>
            <Route path='/poll' element={<PollListPage />} />
            <Route path='/poll/:id' element={<PollPage />} />
            <Route path='/result' element={<ResultPage />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
