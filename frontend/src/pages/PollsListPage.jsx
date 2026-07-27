import React, { useEffect, useState } from 'react'
import { RiTimerLine, RiListRadio, RiRadioButtonLine, RiGroupLine, RiChat1Line } from '@remixicon/react'
import { pollsList } from '../api'
import { useMediaQuery } from 'react-responsive';

import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

const PollsListPage = () => {
  const [navActive, setNavActive] = useState(null)
  const [polls, setPolls] = useState([])
  const [DeviceType, setDeviceType] = useState('')

  const isScreenGreaterThan600 = useMediaQuery({ query: '(min-width: 600px)' })
  const isScreenGreaterThan1600 = useMediaQuery({ query: '(min-width: 1600px)' })

  useEffect(() => {
    if (isScreenGreaterThan1600) {
      setDeviceType('desktop');
    } else if (isScreenGreaterThan600) {
      setDeviceType('tablet');
    } else {
      setDeviceType('');
    }
  }, [isScreenGreaterThan600, isScreenGreaterThan1600])

  useEffect(() => {
    const getPoll = async () => {
      const data = await pollsList();
      setPolls(data)
    }
    getPoll()
  }, [])

  const titleSize = (text) => {
    if (DeviceType == 'tablet') { return text.length > 30 ? `${text.slice(0, 28)}...` : text }
    else if (DeviceType == 'desktop') { return text.length > 40 ? `${text.slice(0, 40)}...` : text }
    else { return text.length > 15 ? `${text.slice(0, 15)}...` : text }
  }

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
                <div className='flex-1 w-0  justify-center items-center hidden xl:flex'>
                  <span className='px-1 text-base font-bold'>#</span>
                </div>
                <div className='flex-3 w-0 flex justify-start items-center'>
                  <h2 className='font-bold'>Poll Topic</h2>
                </div>
                <div className='flex-2 w-0 flex justify-center items-center'>
                  <span className='flex gap-2 items-center font-bold'>Timer</span>
                </div>
                <div className='flex-1 w-0 flex justify-center items-center'>
                  <span className='flex gap-2 items-center font-bold '>Votes</span>
                </div>
                <div className='flex-1 w-0 flex justify-center items-center'>
                  <span className='flex gap-2 items-center font-bold '>Options</span>
                </div>
                <div className='flex-1 w-0 justify-center items-center hidden xl:flex'>
                  <span className='flex gap-2 items-center font-bold'>Comments</span>
                </div>
              </div>

              {polls.map((poll, index) => (
                <div key={poll.id} className='bg-[#FFFFFF] hover:bg-gray-100 cursor-pointer w-full h-12 shadow-md rounded-md flex items-center text-sm p-4 justify-between text-start md:text-base lg:text-lg md:p-6 lg:p-8 lg:px-12 lg:pr-20'>
                  <div className='flex-1 w-0 justify-center items-center hidden xl:flex'>
                    <span className='px-1 text-base  rounded-full'>{index + 1}</span>
                  </div>
                  <div className='flex-3 w-0 flex justify-start items-center'>
                    <h2 className='font-bold'>{titleSize(poll.title)}</h2>
                  </div>
                  <div className='flex-2 w-0 flex justify-center items-center'>
                    <span className='flex gap-2 items-center'>
                      <span className='hidden lg:block'><RiTimerLine /></span>
                      {formatTime(poll.finished_at)}
                    </span>
                  </div>
                  <div className='flex-1 w-0 flex justify-center items-center'>
                    <span className='flex gap-1 items-center lg:text-sm bg-green-200 text-xs p-1 lg:p-1.5 rounded-sm lg:rounded-md'>
                      <span className='hidden lg:block'><RiGroupLine size={15} /></span>
                      {`${poll.options.reduce((sum, option) => sum + option.votes.length, 0)}`}
                    </span>
                  </div>
                  <div className='flex-1 w-0 flex justify-center items-center'>
                    <span className='flex gap-1 items-center lg:text-sm bg-amber-200 text-xs p-1 px-2 lg:p-1.5 rounded-sm lg:rounded-md'>
                      <span className='hidden lg:block'><RiListRadio size={15} /></span>
                      {poll.options.length}
                    </span>
                  </div>
                  <div className='flex-1 w-0  justify-center items-center hidden xl:flex'>
                    <span className='gap-2 items-center lg:rounded-md hidden md:flex'><span>
                      <RiChat1Line />
                    </span>{poll.comments.length}</span>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PollsListPage