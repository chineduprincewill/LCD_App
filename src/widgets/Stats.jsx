import React from 'react'
import { Link } from 'react-router-dom'

const Stats = ({ icon, title, num, url }) => {
    return (
        <div className='w-full md:w-[49%] lg:w-[32%] py-3 px-8 border border-gray-700 rounded-md dark:text-gray-400 mb-8'>
            <Link to={url}>
                <div className='flex justify-between'>
                    <div>
                        {icon}
                        <div className='text-md my-2'>
                            {title}
                        </div>
                    </div>
                    <div className='text-3xl flex justify-center items-center'>
                        ...
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Stats
