import React, { useEffect, useState } from 'react'
import { RiTimerLine, RiListRadio, RiRadioButtonLine, RiGroupLine } from '@remixicon/react'
import {pollData} from '../api'

import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

const PollPage = () => {
  const [navActive, setNavActive] = useState(null)
  const [polls, setPolls] = useState([])

  useEffect(() => {
    const getPoll = async ()=> {
      const data = await pollData();
      setPolls(data)
    }
    getPoll()
  }, [])

  const formatTime = (isoString) => {
    if (!isoString) return '00:00:00';
    
    const date = new Date(isoString);
    
    // Extract hours, minutes, and seconds
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };


  return (
    <>
      <div className='flex'>
        <Sidebar navActive={navActive} setNavActive={setNavActive} />
        <div className='w-full lg:max-w-[1600px] mx-auto bg-[#F6F8F8]'>
          <Topbar navActive={navActive} setNavActive={setNavActive} />
          <div className='px-5 py-3 lg:ml-4'>
            <h1 className='text-4xl font-bold'>Polls</h1>
            <div className='w-full container flex flex-col  mt-3 gap-4 p-2 h-[75vh] overflow-auto lg:gap-6 [@media(min-height:900px)]:h-[81vh]'>

              <div className=' hidden w-full h-12 rounded-md items-center text-sm p-4 justify-between md:text-base lg:text-lg md:p-6 md:flex lg:px-12 lg:pr-20'>
                  <span className='hidden xl:block px-1 text-base  rounded-full font-bold'>#</span>
                  <h2 className='font-bold w-45'>Poll Topic</h2>
                  <span className='flex gap-2 items-center font-bold'>Timer</span>
                  <span className='flex gap-2 items-center font-bold'>Votes</span>
                  <span className='flex gap-2 items-center font-bold'>Options</span>
                </div>
                
              {polls.map((poll, index) => (
                <div key={index} className='bg-[#FFFFFF] hover:bg-gray-100 cursor-pointer w-full h-12 shadow-md rounded-md flex items-center text-sm p-4 justify-between text-start md:text-base lg:text-lg md:p-6 lg:p-8 lg:px-12 lg:pr-20'>
                  <span className='hidden xl:block px-1 text-base  rounded-full'>{index+1}</span>
                  <h2 className='font-bold'>{poll.title.length > 15 ? `${poll.title.slice(0, 15)}...` : poll.title}</h2>
                  <span className='flex gap-2 items-center'><span className='hidden lg:block'><RiTimerLine /></span>{formatTime(poll.finished_at)}</span>
                  <span className='flex gap-2 items-center'><span className='hidden lg:block'><RiGroupLine size={20} /></span>{`12${poll.votes.length}`}</span>
                  <span className='flex gap-2 items-center'><span className='hidden lg:block'><RiListRadio /></span>{poll.options.length}</span>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PollPage