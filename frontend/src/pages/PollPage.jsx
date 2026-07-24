import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

const PollPage = () => {
    const [navActive, setNavActive] = useState(null)

  return (
    <>
        <div className='flex relative'>
            <Sidebar navActive={navActive} setNavActive={setNavActive}/>
            <Topbar navActive={navActive} setNavActive={setNavActive}/>
            
        </div>
    </>
  )
}

export default PollPage