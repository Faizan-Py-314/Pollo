import { useState } from 'react'
import './App.css'
import PollListPage from './pages/PollsListPage'
import PollPage from './pages/PollPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <PollListPage /> */}
      <PollPage/>
    </>
  )
}

export default App
