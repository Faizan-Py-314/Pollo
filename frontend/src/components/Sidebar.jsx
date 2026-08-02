import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RiBarChartHorizontalLine, RiDashboardHorizontalFill, RiArticleLine, RiFunctionAddFill, RiPaletteLine, RiSunLine, RiMoonLine, RiCloseLine, RiSettings4Line} from '@remixicon/react'

const Sidebar = ({ navActive, setNavActive }) => {
    const [active, setActive] = useState('polls')
    const [theme, setTheme] = useState(localStorage.getItem('theme')? localStorage.getItem('theme'): 'light')

    const toggleTheme = () => {
        const newTheme = theme == 'light'? 'dark':'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

  return (
    <>
         <div className={`h-svh shadow-lg w-screen p-7 bg-white text-[#555555] ${navActive == 'active'? 'block':'hidden'} fixed inset-0 z-50 lg:relative lg:w-1/4 lg:px-3 lg:block xl:w-1/6 2xl:px-6`}>
            <div className="logo flex items-center">
                <div className=' text-white bg-black rounded-[5px] inline-block py-1.5 px-3'>< RiBarChartHorizontalLine style={{ stroke: 'white', strokeWidth: '1.5px' }}/></div>
                <span className='text-4xl text-black font-bold ml-3'>Pollo</span>
                <span onClick={()=> setNavActive(null)} className='absolute right-8 lg:hidden'><RiCloseLine size={27}/></span>
            </div>

            <ul className='mt-10 flex flex-col gap-2 relative h-[88%] [@media(min-height:800px)]:h-[90%]'>
                <li className={` ${active == 'polls'? 'active': ''} py-2 px-3 rounded-xl hover:bg-[#F6F8F8]`} onClick={()=> setActive('polls')}>
                    <Link onClick={()=> setNavActive(null)} className='flex items-center justify-between' to="/poll">
                        <div className='flex gap-3 text-lg items-center'>
                            < RiBarChartHorizontalLine />Poll's
                        </div>
                        <span>0</span>
                    </Link>
                </li>
                <li className={` ${active == 'result'? 'active':''} py-2 px-3 rounded-xl hover:bg-[#F6F8F8]`} onClick={()=> setActive('result')}>
                    <Link onClick={()=> setNavActive(null)} className='flex items-center justify-between' to="/result">
                        <div className='flex gap-3 text-lg items-center'>
                            <RiArticleLine />Results
                        </div>
                        <span>0</span>
                    </Link>
                </li>
                <li className={` ${active == 'idea'? 'active':''} py-2 px-3 rounded-xl hover:bg-[#F6F8F8]`} onClick={()=> setActive('idea')}>
                    <Link onClick={()=> setNavActive(null)} className='flex items-center justify-between' to="/createpoll">
                        <div className='flex gap-3 text-lg items-center'>
                            <RiFunctionAddFill />Create Poll
                        </div>
                    </Link>
                </li>
                <li className='py-2 px-3 rounded-xl hover:bg-[#F6F8F8] lg:hidden' onClick={toggleTheme}>
                    <a className='flex items-center justify-between' href="#">
                        <div className='flex gap-3 text-lg items-center'>
                            <RiPaletteLine />Theme
                        </div>
                        <div className=' absolute right-1.5'>
                            {theme == 'light'? <RiSunLine />: <RiMoonLine />}
                        </div>
                        
                        
                    </a>
                </li>
                <li className='py-3 px-3 rounded-xl hover:bg-[#F6F8F8] absolute w-full bottom-0 '>
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