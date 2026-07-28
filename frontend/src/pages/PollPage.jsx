import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { RiSendInsLine } from '@remixicon/react'
import { FetchPoll } from '../api'


const PollPage = () => {
    const [selectedPoll, setSetselectedPoll] = useState(null)
    const [poll, setPoll] = useState(null)

    const { id } = useParams();

    useEffect(() => {
        const pollData = async () => {
            const data = await FetchPoll(id)
            setPoll(data)
        }
        pollData()
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


    if (!poll) {
        return (
            <div className='flex justify-center items-center h-screen bg-[#F6F8F8]'>
                <p className='text-lg font-semibold text-gray-600'>Loading poll...</p>
            </div>
        );
    }
    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes.length, 0);
    return (
        <>
            <div className='px-5 py-3 lg:ml-4 md:pr-3.5 xl:pr-6'>
                <div className='md:flex md:gap-3 xl:gap-10'>
                    <div className='md:w-[60%] xl:w-[65%] xl:ml-5'>
                        <h1 className='text-2xl xl:text-4xl font-bold'>{poll.title}</h1>
                        <p className='text-sm xl:text-base xl:mt-2'>{poll.description}</p>
                        <div className=' shadow-lg p-4 flex flex-col rounded-md gap-3 mt-2 xl:mt-5 xl:p-6 xl:gap-4 bg-white'>
                            <span className='text-sm font-bold -my-2 xl:text-base xl:-mb-1'>Options</span>
                            {poll.options.map((option, index) => (
                                <div key={index} onClick={() => { if (selectedPoll == index) { setSetselectedPoll(null) } else { setSetselectedPoll(index) } }} className={`w-full cursor-pointer bg-${option.color}-100 rounded-md p-2 flex gap-2 items-center xl:p-3 xl:px-4 xl:gap-3`}>
                                    <div className={`w-4 h-4 border border-${option.color}-300 rounded-full flex items-center justify-center xl:w-5 xl:h-5 xl:border-2`}>
                                        <div className={` ${selectedPoll == index ? 'flex' : 'hidden'} w-2.5 h-2.5 rounded-full bg-${option.color}-300 xl:w-3 xl:h-3`}></div>
                                    </div>
                                    <p className='text-sm xl:text-base'>{option.title}</p>
                                </div>
                            ))}



                        </div>
                        <div className='shadow-lg rounded-md p-2 flex flex-col gap-3 mt-3 xl:mt-7 xl:p-4 bg-white'>
                            <div className='flex text-xs justify-between px-2 mt-1 xl:text-base xl:mb-2'>
                                <span>Options: {poll.options.length}</span>
                                <span>Timer: {formatTime(poll.finished_at)}</span>
                            </div>

                            <div className='ml-2 flex flex-col gap-3 xl:gap-5'>
                                {poll.options.map((option, index) => (
                                    <div key={index} className='poll flex items-center gap-2'>
                                        <div className={`w-3 h-3 border border-${option.color}-300 rounded-full flex items-center justify-center xl:w-4 xl:h-4`}>
                                            <div className={` ${selectedPoll == index ? 'block' : 'hidden'} w-2 h-2 rounded-full bg-${option.color}-300 xl:w-2.5 xl:h-2.5`}></div>
                                        </div>
                                        <div className={`w-[82%] h-3 bg-${option.color}-100 rounded-2xl sm:w-[90%] xl:h-4`}>
                                            <div style={{ width: `${(option.votes.length / totalVotes) * 100}%` }} className={`bg-${option.color}-300 h-full rounded-2xl`}></div>
                                        </div>
                                        <span className='text-xs w-1/15'>{option.votes.length}</span>
                                    </div>
                                ))}
                            </div>

                            <div className='flex text-xs justify-between px-2 mb-1 xl:text-base xl:mt-2'>
                                <span>Total votes: {totalVotes}</span>
                            </div>
                        </div>
                    </div>
                    <div className='shadow-lg w-full h-[90vh] mb-3 p-4 mt-3 rounded-md flex flex-col relative bg-white md:w-[40%] md:mt-0 md:h-[85vh] xl:w-[30%]'>
                        <div className='flex items-center justify-between text-sm  2xl:text-base 2xl:px-3'>
                            <span>Comments</span>
                            <span>{poll.comments.length}</span>
                        </div>
                        <div className='p-2 flex flex-col gap-3 h-[90%] overflow-auto xl:mt-2 2xl:gap-4.5 2xl:px-4'>
                            {poll.comments.map((comment, index) => (
                                <div key={index} className='comment text-sm 2xl:text-base'>
                                    <span className='font-bold'>{comment.user}</span>
                                    <p>{comment.comment}</p>
                                </div>
                            ))}



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
        </>
    )
}

export default PollPage