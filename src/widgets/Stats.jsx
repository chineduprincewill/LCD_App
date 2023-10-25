import React from 'react'

const Stats = ({ icon, title, num }) => {
    return (
        <div className='w-full md:w-[49%] lg:w-[32%] py-3 px-8 border border-gray-700 rounded-md dark:text-gray-400 mb-8'>
            <div className='flex justify-between'>
                <div>
                    {icon}
                    <div className='text-md my-2'>
                        {title}
                    </div>
                </div>
                <div className='text-3xl flex justify-center items-center'>
                    {num}
                </div>
            </div>
        </div>
    )
}

export default Stats
