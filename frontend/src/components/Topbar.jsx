import React, { useContext, useState } from 'react'
import { RiMenuLine, RiSearchLine, RiSunLine, RiMoonLine } from '@remixicon/react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


const Topbar = ({ navActive, setNavActive }) => {
    const [searchActive, setSearchActive] = useState(null)
    const [theme, setTheme] = useState(localStorage.getItem('theme')? localStorage.getItem('theme'): 'light')
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const toggleTheme = () => {
        const newTheme = theme == 'light'? 'dark':'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

  return (
    <>
        <div className='w-full flex flex-col items-center relative'>
            <div className='flex p-4 justify-between w-full md:p-6'>
                <div className='flex gap-2'>
                    <span onClick={()=> setNavActive('active')} className='border p-2 rounded-md lg:hidden'><RiMenuLine size={20}/></span>
                    <span onClick={()=> {searchActive? setSearchActive(null): setSearchActive('active')}} className='border p-2 rounded-md lg:hidden'><RiSearchLine size={20}/></span>
                </div>
                <div className='flex gap-2 md:gap-4'>
                    <button onClick={()=> navigate('/login')} className={` ${ user? 'hidden':'' } border-2 border-gray-400 text-gray-700 p-2 text-xs rounded-md cursor-pointer hover:bg-black hover:text-white md:text-sm md:px-4`}>Login</button>
                    <button onClick={()=> navigate('/register')} className={` ${user? 'hidden': ''} p-2 text-xs rounded-md bg-black text-white cursor-pointer hover:bg-white hover:text-black hover:border md:text-sm md:px-4`}>Sign up</button>
                    <button className={` ${ user? '':'hidden' } border-2 border-gray-400 text-gray-700 p-2 text-xs rounded-md cursor-pointer hover:bg-black hover:text-white md:text-sm md:px-4`}>{user? user.username: user}</button>

                    <span onClick={toggleTheme} className='hidden items-center justify-center py-2 px-3 border-2 border-gray-400 text-gray-500 rounded-md cursor-pointer hover:bg-black hover:text-white lg:flex'>{theme == 'light'? <RiSunLine size={20} />: <RiMoonLine size={20}/>}</span>
                </div>
            </div>
            <div className={` ${ searchActive == 'active'? '':'hidden' } absolute flex items-center w-[90%] -ml-3.25 border-2 border-gray-400 mt-15 bg-gray-50 rounded-md md:ml-2 md:mt-18 lg:flex lg:w-70 lg:mt-6 left-8 xl:w-[35%]`}>
                <span className='w-10 p-2 rounded-md text-gray-500 lg:ml-3'><RiSearchLine size={20}/></span>
                <input className='py-2 outline-none w-full [&::-webkit-search-cancel-button]:hidden' type="search" placeholder='Search' />
            </div>
        </div>
    </>
  )
}

export default Topbar