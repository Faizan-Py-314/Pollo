import React, { useContext, useState } from 'react'
import { RiMailLine, RiDoorLockLine } from '@remixicon/react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'


const LoginPage = () => {
  const [formData, setFormData] = useState({username: '', password: ''})

  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login( formData.username, formData.password )
  }

  return (
    <>
      <div className='flex items-center justify-center w-full h-[85vh] '>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 border p-4 text-sm rounded-lg w-[85%] sm:w-[65%] md:w-[50%] lg:w-[35%] lg:text-base lg:p-6'>
            <h1 className='text-2xl font-bold mb-1'>Login</h1>
            <div className='flex flex-col gap-3'>
                <div className='border px-2 py-1.5 rounded-md flex items-center gap-2'>
                    <RiMailLine size={15}/>
                    <input onChange={handleChange} value={formData.username} className=' outline-none w-[95%]' type="email" name='username' placeholder='user@example.com' />
                </div>
                <div className='border px-2 py-1.5 rounded-md flex items-center gap-2'>
                    <RiDoorLockLine size={15}/>
                    <input onChange={handleChange} value={formData.password} className=' outline-none w-[95%]' type="password" name='password' placeholder='************' />
                </div>
                
            </div>
            <div className='text-xs flex justify-between py-1 lg:text-sm'>
                <Link className='cursor-pointer hover:underline' to='/register'>Don't have an account?</Link>
            </div>
            <div>
                <button type='submit' className='w-full bg-black text-white py-3 text-center rounded-md cursor-pointer'>Login</button>
            </div>
        </form>
      </div>
    </>
  )
}

export default LoginPage