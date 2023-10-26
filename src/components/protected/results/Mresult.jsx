import React, { Fragment, useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { formatPosition } from '../../../Hooks/functions';

const Mresult = ({ rslt, position }) => {

    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    }

    return (
        <Fragment>
            <div className="border border-gray-300 dark:border-gray-800 rounded-md my-3">
                <div className='grid grid-cols-10 px-2 bg-transparent text-gray-500'>
                    <div 
                        className='col-span-1 cursor-pointer'
                        onClick={handleNav}
                    >
                        {nav ? 
                            <HiMinus 
                                size={20}
                                className="my-3"
                            />
                            :
                            <HiPlus 
                                size={20} 
                                className="my-3" 
                            />
                        }
                        
                    </div>
                    <div className='col-span-9 flex justify-between'>
                        <span className='text-slate-500 my-2.5'>{rslt.fullname}</span>
                        <span className='text-slate-500 my-2.5'>&#8358; {rslt.paid}</span>
                    </div>
                </div>
                <div className={`grid grid-cols-10 my-1 px-2 ${nav ? 'block ease-in-out duration-500' : 'hidden'}`}>
                    <div className='col-span-1'></div>
                    <div className='col-span-9 text-xs space-y-2 text-gray-500 border-t border-gray-300 dark:border-gray-900 py-3'>
                        <div className='flex justify-start space-x-5'>
                            <span>
                                Event - {rslt.event}, {rslt.year}
                            </span>
                            <span>
                                Pledge - &#8358; {rslt.pledged}
                            </span>
                        </div>
                        <div className='flex justify-start space-x-5'>
                            <span>
                                Position - {position}{formatPosition(position.toString())}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Mresult
