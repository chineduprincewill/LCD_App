import React from 'react'

const DonationsLog = ({ payloadsArr }) => {
    return (
        <div className='w-full my-6 py-4 border-t border-gray-200 dark:border-gray-800'>
            {
                (payloadsArr.length > 0 || Array.isArray(payloadsArr)) && payloadsArr.map((pld, index) => {
                    return <div key={index} className='grid md:grid-cols-4 py-3 border-b border-gray-200 dark:border-gray-800'>
                        <div>
                            {pld?.memberName}
                        </div>
                        <div>
                            {pld?.event}, {pld?.year}
                        </div>
                        <div>
                            <span>&#8358; {pld?.donation}</span>
                        </div>
                        <div className='flex space-x-2 items-baseline'>
                            <span>&#8358; {pld?.completepay === 'yes' ? pld?.donation : pld?.redeemed}</span>
                            <span className='text-xs text-gray-400 dark:text-gray-600'>Paid</span>
                        </div>
                    </div>
                })     
            }
        </div>
    )
}

export default DonationsLog
