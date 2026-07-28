import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { pollsList } from '../api'

const useColumnCount = () => {
  const [cols, setCols] = useState(1);

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth >= 1280) {
        setCols(3);
      } else if (window.innerWidth >= 640) {
        setCols(2);
      } else {
        setCols(1);
      }
    };

    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  return cols;
};

const ResultPage = () => {
  const [navActive, setNavActive] = useState(null)
  const [polls, setPolls] = useState(null)
  const [clickOnResult, setClickOnResult] = useState(null)
  
  const numCols = useColumnCount();

  useEffect(() => {
    const pollData = async () => {
      const data = await pollsList()
      setPolls(data)
    }
    pollData()
  }, [])


  if (!polls) {
    return (
      <div className='flex justify-center items-center h-screen bg-[#F6F8F8]'>
        <p className='text-lg font-semibold text-gray-600'>Loading poll...</p>
      </div>
    );
  }

  const columns = Array.from({ length: numCols }, () => []);
  polls.forEach((poll, idx) => {
    columns[idx % numCols].push({ ...poll, originalIndex: idx });
  });

  return (
    <>
      <div className='px-4 py-2 lg:px-5 lg:py-3 lg:ml-4'>
        <h1 className='text-2xl font-bold lg:text-3xl mb-3'>Result</h1>

        <div className='flex gap-3 container h-[82vh] overflow-y-auto overflow-x-hidden items-start'>
          {columns.map((columnPolls, colIndex) => (
     
            <div key={colIndex} className='flex flex-col gap-3 xl:gap-5 flex-1 w-full'>
              {columnPolls.map((poll) => {
                const count = poll.originalIndex;
                const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes.length, 0);

                return (
                  <div 
                    key={poll.id} 
                    onClick={() => clickOnResult === count ? setClickOnResult(null) : setClickOnResult(count)} 
                    className='shadow-lg rounded-md p-2 flex flex-col gap-3 cursor-pointer w-full bg-white lg:px-4 lg:pb-3'
                  >
                    <div className='px-3 mr-2 lg:text-base lg:mt-2'>
                      <h1 className='font-bold lg:text-2xl'>{poll.title}</h1>
                      <p className='text-xs lg:text-base'>{poll.description}</p>
                    </div>

                    <div className='ml-2 flex flex-col gap-3 lg:gap-5'>
                      {poll.options.map((option, index) => {
                        const optionVotes = option.votes.length;
                        const percentage = totalVotes > 0 ? (optionVotes / totalVotes) * 100 : 0;

                        return (
                          <div key={index} className='poll flex items-center gap-2'>
                            <div className={`w-3 h-3 border border-${option.color}-300 rounded-full flex items-center justify-center lg:w-4 lg:h-4`}>
                              <div className={`w-2 h-2 rounded-full bg-${option.color}-300 lg:w-2.5 lg:h-2.5`}></div>
                            </div>
                            <div className={`w-[82%] h-3 bg-${option.color}-100 rounded-2xl sm:w-[90%] lg:h-4 ${clickOnResult === count ? 'relative p-3 flex items-center' : ''}`}>
                              <span className={`${clickOnResult === count ? '' : 'hidden'} text-xs absolute left-2 z-10 font-medium`}>
                                {option.title}
                              </span>
                              <div 
                                style={{ width: `${percentage}%` }}
                                className={`bg-${option.color}-300 h-full rounded-2xl transition-all duration-300`}
                              ></div>
                            </div>
                            <span className='text-xs w-1/15'>{optionVotes}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className='flex text-xs justify-between px-3 mb-1 mr-2 lg:text-base lg:mt-2'>
                      <span>Options: {poll.options.length}</span>
                      <span>Total votes: {totalVotes}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ResultPage