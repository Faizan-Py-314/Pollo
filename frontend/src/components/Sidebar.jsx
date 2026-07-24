import React, { useState } from 'react'
import { RiBarChartHorizontalLine, RiDashboardHorizontalFill, RiArticleLine, RiLightbulbLine, RiPaletteLine, RiSunLine, RiMoonLine, RiCloseLine, RiSettings4Line} from '@remixicon/react'

const Sidebar = () => {
    const [active, setActive] = useState('dashboard')
    const [theme, setTheme] = useState(localStorage.getItem('theme')? localStorage.getItem('theme'): 'light')
    const [navActive, setNavActive] = useState('active')

    const toggleTheme = () => {
        const newTheme = theme == 'light'? 'dark':'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

  return (
    <>
        <div className={`h-svh w-full p-7 bg-[#E5E4E2] relative text-[#555555] ${navActive == 'active'? '':'hidden'} lg:w-1/5 lg:px-3 xl:w-1/6 2xl:px-7`}>
            <div className="logo flex items-center">
                <div className=' text-white bg-black rounded-[5px] inline-block py-1.5 px-3'>< RiBarChartHorizontalLine style={{ stroke: 'white', strokeWidth: '1.5px' }}/></div>
                <span className='text-4xl text-black font-bold ml-3'>Pollo</span>
                <span onClick={()=> setNavActive(null)} className='absolute right-8 lg:hidden'><RiCloseLine size={27}/></span>
            </div>

            <ul className='mt-10 flex flex-col gap-2 relative h-[88%] [@media(min-height:800px)]:h-[90%]'>
                <li className={` ${active == 'dashboard'? 'active':''} py-2 px-3 rounded-xl hover:bg-gray-50`} onClick={()=> setActive('dashboard')}>
                    <a href="#">
                        <div className='flex gap-3 text-lg items-center'>
                            <RiDashboardHorizontalFill />Dashboard
                        </div>
                    </a>
                </li>
                <li className={` ${active == 'polls'? 'active': ''} py-2 px-3 rounded-xl hover:bg-gray-50`} onClick={()=> setActive('polls')}>
                    <a className='flex items-center justify-between' href="#">
                        <div className='flex gap-3 text-lg items-center'>
                            < RiBarChartHorizontalLine />Poll's
                        </div>
                        <span>0</span>
                    </a>
                </li>
                <li className={` ${active == 'result'? 'active':''} py-2 px-3 rounded-xl hover:bg-gray-50`} onClick={()=> setActive('result')}>
                    <a className='flex items-center justify-between' href="#">
                        <div className='flex gap-3 text-lg items-center'>
                            <RiArticleLine />Results
                        </div>
                        <span>0</span>
                    </a>
                </li>
                <li className={` ${active == 'idea'? 'active':''} py-2 px-3 rounded-xl hover:bg-red-50`} onClick={()=> setActive('idea')}>
                    <a className='flex items-center justify-between' href="#">
                        <div className='flex gap-3 text-lg items-center'>
                            <RiLightbulbLine />Ideas
                        </div>
                        <span>0</span>
                    </a>
                </li>
                <li className='py-2 px-3 rounded-xl hover:bg-red-50 lg:hidden' onClick={toggleTheme}>
                    <a className='flex items-center justify-between' href="#">
                        <div className='flex gap-3 text-lg items-center'>
                            <RiPaletteLine />Theme
                        </div>
                        <div className=' absolute right-1.5'>
                            {theme == 'light'? <RiSunLine />: <RiMoonLine />}
                        </div>
                        
                        
                    </a>
                </li>
                <li className='py-3 px-3 rounded-xl hover:bg-red-50 absolute bg-gray-100 w-full bottom-0 '>
                    <a className='flex justify-between' href="#">
                        <div className='flex gap-3 text-lg items-center'>
                            <RiSettings4Line />Settings
                        </div>
                    </a>
                </li>
            </ul>

        </div>
    </>
  )
}

export default Sidebar