import React, { useRef, useState, useEffect } from 'react'
import { createPoll } from '../api'

const CreatePollPage = () => {
    const [options, setOptions] = useState([{'title': ''}])
    const [formData, setFormData] = useState({title: '', description: '', date: '', time: ''})

    useEffect(() => {
        if (optionRef.current) {
            optionRef.current.scrollTop = optionRef.current.scrollHeight;
        }
    }, [options]);

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = { ...updatedOptions[index], title: value };
        setOptions(updatedOptions);
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async () => {
        const finished_at = new Date(`${formData.date}T${formData.time}`).toISOString();
        
        try {
            createPoll(formData.title, formData.description, finished_at, options)
        } catch (error) {
            console.error("Failed create poll action");
        }

        setFormData({title: '', description: '', date: '', time: ''})
        setOptions([{'title': ''}])
        
    }

    const optionRef = useRef(null)

  return (
    <>
      <div className='px-5 py-3 lg:ml-4 md:pr-3.5 xl:pr-6 '>
        <div className='flex flex-col items-center justify-center h-[75vh]'>
            <div className='w-[95%] p-3 border-2 border-gray-400 rounded-md text-sm flex flex-col items-center gap-3 mt-2 sm:w-[75%] md:w-[60%] xl:w-[40%] md:text-base md:p-4'>
                <h1 className='w-full text-2xl xl:text-4xl font-bold'>Create Poll</h1>
                <div className='w-full'>
                    <input onChange={handleChange} className='w-full border-2 outline-none rounded-md border-gray-400 text-gray-600 py-1 px-2' name='title' value={formData.title} type="text" placeholder='Title' />
                </div>
                <div className='w-full'>
                    <textarea onChange={handleChange} className='w-full border-2 outline-none rounded-md border-gray-400 text-gray-600 py-1 px-2' name='description' value={formData.description} rows='4' placeholder='Poll Description'></textarea>
                </div>
                <div className='w-full p-2 border-2 border-gray-400 rounded-md flex flex-col gap-1 md:p-4'>
                    <h3>Options</h3>
                    <div ref={optionRef} className='max-h-40 overflow-auto container'>
                        {options.map((option, index) => (
                            <div key={index} className='mt-1'>
                                <input value={option.title} onChange={(e) => handleOptionChange(index, e.target.value)} className='w-full border-2 outline-none rounded-md border-gray-400 text-gray-600 py-1 px-2' type='text' placeholder={`Option ${index+1}`} />
                            </div>
                        ))}
                    </div>
                    
                    <button onClick={() => {setOptions([...options, {'title':''}])}}className='cursor-pointer w-full p-2 text-white bg-black text-center rounded-md mt-2'>Add Option</button>
                </div>

                <div className='flex w-full gap-2 text-xs md:text-base'>
                    <div className='w-full'>
                        <input onChange={handleChange} className='w-full border-2 outline-none rounded-md border-gray-400 text-gray-600 py-1 px-2' name='date' value={formData.date} type="date" />
                    </div>

                    <div className='w-full'>
                        <input onChange={handleChange} className='w-full border-2 outline-none rounded-md border-gray-400 text-gray-600 py-1 px-2' name='time' value={formData.time} type="time" />
                    </div>
                </div>

                <button onClick={handleSubmit} className='cursor-pointer w-full text-white bg-black text-center rounded-md p-2'>Create Poll</button>

            </div>
        </div>
      </div>
    </>
  )
}

export default CreatePollPage