import React, { useState } from 'react'
import { RiTimerLine, RiListRadio, RiRadioButtonLine, RiGroupLine } from '@remixicon/react'

import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

const PollPage = () => {
  const [navActive, setNavActive] = useState(null)

  const text = "Poll for new event"

  const pollsData = [
    {
      'title': 'New Event Decision',
      'Timer': '02:53:23',
      'votes': 12,
      'options': 4
    },
    {
      'title': 'Q3 Marketing Strategy',
      'Timer': '14:20:00',
      'votes': 45,
      'options': 3
    },
    {
      'title': 'Team Offsite Location',
      'Timer': '00:45:12',
      'votes': 28,
      'options': 5
    },
    {
      'title': 'Product Feature Prioritization',
      'Timer': '05:10:44',
      'votes': 89,
      'options': 4
    },
    {
      'title': 'Preferred Working Hours',
      'Timer': '18:30:15',
      'votes': 64,
      'options': 3
    },
    {
      'title': 'Logo Redesign Concept',
      'Timer': '01:15:50',
      'votes': 112,
      'options': 6
    },
    {
      'title': 'Monthly Book Club Selection',
      'Timer': '08:00:00',
      'votes': 19,
      'options': 4
    },
    {
      'title': 'Office Snack Preferences',
      'Timer': '11:42:05',
      'votes': 37,
      'options': 5
    },
    {
      'title': 'Tech Stack Upgrade Choice',
      'Timer': '03:25:30',
      'votes': 53,
      'options': 3
    },
    {
      'title': 'Holiday Party Theme',
      'Timer': '22:10:00',
      'votes': 71,
      'options': 4
    }
  ];

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
                
              {pollsData.map((poll, index) => (
                <div key={index} className='bg-[#FFFFFF] hover:bg-gray-100 cursor-pointer w-full h-12 shadow-md rounded-md flex items-center text-sm p-4 justify-between text-start md:text-base lg:text-lg md:p-6 lg:p-8 lg:px-12 lg:pr-20'>
                  <span className='hidden xl:block px-1 text-base  rounded-full'>{index+1}</span>
                  <h2 className='font-bold'>{poll.title.length > 15 ? `${poll.title.slice(0, 15)}...` : poll.title}</h2>
                  <span className='flex gap-2 items-center'><span className='hidden lg:block'><RiTimerLine /></span> {poll.Timer}</span>
                  <span className='flex gap-2 items-center'><span className='hidden lg:block'><RiGroupLine size={20} /></span>{poll.votes}</span>
                  <span className='flex gap-2 items-center'><span className='hidden lg:block'><RiListRadio /></span>{poll.options}</span>
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