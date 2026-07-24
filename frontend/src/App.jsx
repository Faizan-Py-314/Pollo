import { useState } from 'react'
import './App.css'
import PollPage from './pages/PollPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PollPage />
    </>
  )
}

export default App
