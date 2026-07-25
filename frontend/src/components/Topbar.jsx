import React, { useState } from 'react'
import { RiMenuLine, RiSearchLine, RiSunLine, RiMoonLine } from '@remixicon/react'


const Topbar = ({ navActive, setNavActive }) => {
    const [searchActive, setSearchActive] = useState(null)
    const [theme, setTheme] = useState(localStorage.getItem('theme')? localStorage.getItem('theme'): 'light')

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
                    <button className='border p-2 text-xs rounded-md md:text-sm md:px-4'>Login</button>
                    <button className='border p-2 text-xs rounded-md md:text-sm md:px-4'>Sign up</button>
                    <span onClick={toggleTheme} className='hidden items-center justify-center py-2 px-3 border rounded-md cursor-pointer lg:flex'>{theme == 'light'? <RiSunLine />: <RiMoonLine />}</span>
                </div>
            </div>
            <div className={` ${ searchActive == 'active'? '':'hidden' } absolute flex items-center w-[90%] -ml-3.25 border mt-15 bg-gray-50 rounded-md md:ml-2 md:mt-18 lg:flex lg:w-70 lg:mt-6 left-8 xl:w-[35%]`}>
                <span className='w-10 p-2 rounded-md'><RiSearchLine size={20}/></span>
                <input className='py-2 outline-none [&::-webkit-search-cancel-button]:hidden' type="search" placeholder='Search' />
            </div>
        </div>
    </>
  )
}

export default Topbar