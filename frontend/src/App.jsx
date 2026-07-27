import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import PollListPage from './pages/PollsListPage'
import PollPage from './pages/PollPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/poll' element={<PollListPage />} />
        <Route path='/poll/:id' element={<PollPage />} />
      </Routes>
    </>
  )
}

export default App
