import React from 'react'
import { BsTelephonePlus } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import Switcher from '../Switcher'

const PublicHeader = () => {
    return (
        <div className='md:px-6'>
            <div className="w-full flex justify-between md:justify-end px-5 py-3 items-center space-x-8 border-b border-gray-200 dark:border-gray-700">
                <div className='md:flex md:space-x-4 space-y-1 md:space-y-0'>
                    <div className='flex items-center space-x-2'>
                        <BsTelephonePlus size={13} />
                        <span className='text-xs'>+234 80 6371 2294</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <AiOutlineMail size={15} />
                        <span className='text-sm'>info@livingchristmission.org</span>
                    </div>
                </div>
                <Switcher />
            </div>
        </div>
    )
}

export default PublicHeader
