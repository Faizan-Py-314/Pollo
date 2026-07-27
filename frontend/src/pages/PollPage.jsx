import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { RiSendInsLine } from '@remixicon/react'


const PollPage = () => {
    const [navActive, setNavActive] = useState(null)

    return (
        <>
            <div className='flex'>
                <Sidebar navActive={navActive} setNavActive={setNavActive} />
                <div className='w-full bg-[#F6F8F8]'>
                    <Topbar navActive={navActive} setNavActive={setNavActive} />
                    <div className='px-5 py-3 lg:ml-4 md:pr-3.5 xl:pr-6'>

                        
                        <div className='md:flex md:gap-3 xl:gap-10'>
                            <div className='md:w-[60%] xl:w-[65%] xl:ml-5'>
                                <h1 className='text-2xl xl:text-4xl font-bold'>This is Heading</h1>
                                <p className='text-sm xl:text-base xl:mt-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia sequi obcaecati nisi quidem</p>
                                <div className=' shadow-lg p-4 flex flex-col rounded-md gap-3 mt-2 xl:mt-5 xl:p-6 xl:gap-4 bg-white'>
                                    <span className='text-sm font-bold -my-2 xl:text-base xl:-mb-1'>Options</span>
                                    <div className='w-full bg-amber-100 rounded-md p-2 flex gap-2 items-center xl:p-3 xl:px-4 xl:gap-3'>
                                        <div className='w-4 h-4 border border-amber-300 rounded-full flex items-center justify-center xl:w-5 xl:h-5 xl:border-2'>
                                            <div className='w-2.5 h-2.5 rounded-full bg-amber-300 xl:w-3 xl:h-3'></div>
                                        </div>
                                        <p className='text-sm xl:text-base'>Option no 1</p>
                                    </div>
                                    <div className='w-full bg-cyan-100 rounded-md p-2 flex gap-2 items-center xl:p-3 xl:px-4 xl:gap-3'>
                                        <div className='w-4 h-4 border border-cyan-300 rounded-full flex items-center justify-center xl:w-5 xl:h-5 xl:border-2'>
                                            <div className='w-2.5 h-2.5 rounded-full bg-cyan-300 xl:w-3 xl:h-3'></div>
                                        </div>
                                        <p className='text-sm xl:text-base'>Option no 1</p>
                                    </div>
                                    <div className='w-full bg-emerald-100 rounded-md p-2 flex gap-2 items-center xl:p-3 xl:px-4 xl:gap-3'>
                                        <div className='w-4 h-4 border border-emerald-300 rounded-full flex items-center justify-center xl:w-5 xl:h-5 xl:border-2'>
                                            <div className='w-2.5 h-2.5 rounded-full bg-emerald-300 xl:w-3 xl:h-3'></div>
                                        </div>
                                        <p className='text-sm xl:text-base'>Option no 1</p>
                                    </div>
                                    
                                </div>
                                <div className='shadow-lg rounded-md p-2 flex flex-col gap-3 mt-3 xl:mt-7 xl:p-4 bg-white'>
                                    <div className='flex text-xs justify-between px-2 mt-1 xl:text-base xl:mb-2'>
                                        <span>Options: 3</span>
                                        <span>Timer: 00:00:00</span>
                                    </div>
                                    <div className='ml-2 flex flex-col gap-3 xl:gap-5'>
                                        <div className='poll flex items-center gap-2'>
                                            <div className='w-3 h-3 border border-amber-300 rounded-full flex items-center justify-center xl:w-4 xl:h-4'>
                                                <div className='w-2 h-2 rounded-full bg-amber-300 xl:w-2.5 xl:h-2.5'></div>
                                            </div>
                                            <div className='w-[82%] h-3 bg-amber-100 rounded-2xl sm:w-[90%] xl:h-4'>
                                                <div className='bg-amber-300 h-full w-[50%] rounded-2xl'></div>
                                            </div>
                                            <span className='text-xs w-1/15'>33</span>
                                        </div>
                                        <div className='poll flex items-center gap-2'>
                                            <div className='w-3 h-3 border border-cyan-300 rounded-full flex items-center justify-center xl:w-4 xl:h-4'>
                                                <div className='w-2 h-2 rounded-full bg-cyan-300 xl:w-2.5 xl:h-2.5'></div>
                                            </div>
                                            <div className='w-[82%] h-3 bg-cyan-100 rounded-2xl sm:w-[90%] xl:h-4'>
                                                <div className='bg-cyan-300 h-full w-[50%] rounded-2xl'></div>
                                            </div>
                                            <span className='text-xs w-1/15'>33</span>
                                        </div>
                                        <div className='poll flex items-center gap-2'>
                                            <div className='w-3 h-3 border border-emerald-300 rounded-full flex items-center justify-center xl:w-4 xl:h-4'>
                                                <div className='w-2 h-2 rounded-full bg-emerald-300 xl:w-2.5 xl:h-2.5'></div>
                                            </div>
                                            <div className='w-[82%] h-3 bg-emerald-100 rounded-2xl sm:w-[90%] xl:h-4'>
                                                <div className='bg-emerald-300 h-full w-[50%] rounded-2xl'></div>
                                            </div>
                                            <span className='text-xs w-1/15'>33</span>
                                        </div>
                                        
                                    </div>
                                    <div className='flex text-xs justify-between px-2 mb-1 xl:text-base xl:mt-2'>
                                        <span>Total votes: 3</span>
                                    </div>
                                </div>
                            </div>
                            <div className='shadow-lg w-full h-[90vh] mb-3 p-4 mt-3 rounded-md flex flex-col relative bg-white md:w-[40%] md:mt-0 md:h-[85vh] xl:w-[30%]'>
                                <div className='flex items-center justify-between text-sm  2xl:text-base 2xl:px-3'>
                                    <span>Comments</span>
                                    <span>32</span>
                                </div>
                                <div className='p-2 flex flex-col gap-3 h-[90%] overflow-auto xl:mt-2 2xl:gap-4.5 2xl:px-4'>
                                    <div className='comment text-sm 2xl:text-base'>
                                        <span className='font-bold'>Rhaul dua</span>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa amet sint illum </p>
                                    </div>
                                    <div className='comment text-sm 2xl:text-base'>
                                        <span className='font-bold'>Rhaul dua</span>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa amet sint illum </p>
                                    </div>
                                    <div className='comment text-sm 2xl:text-base'>
                                        <span className='font-bold'>Rhaul dua</span>
                                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa amet sint illum </p>
                                    </div>
                                    
                                </div>
                                <div className='w-full flex justify-center'>
                                    <div className='absolute bottom-3 text-sm border w-[90%] rounded-lg py-2 px-4 flex justify-between items-center 2xl:bottom-5 2xl:text-base'>
                                        <input className=' outline-none w-[85%]' type="text" placeholder='Comment' />
                                        <RiSendInsLine size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PollPage