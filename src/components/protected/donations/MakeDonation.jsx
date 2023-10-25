import React, { useState } from 'react'
import PrivateHeader from '../PrivateHeader'
import Sidebar from '../sidebar/Sidebar'
import Pagetitle from '../../../widgets/Pagetitle'
import { FaDonate } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import FilterEvents from '../../../widgets/FilterEvents'
import FilterYears from '../../../widgets/FilterYears'
import NeweventForm from '../events/NeweventForm'
import { AiOutlinePlus } from 'react-icons/ai'
import FilterMembers from '../../../widgets/FilterMembers'

const MakeDonation = () => {

    const [event, setEvent] = useState('');
    const [year, setYear] = useState('');

    const [member, setMember] = useState('');
    const [memberName, setMemberName] = useState();

    const [newevent, setNewevent] = useState(false);
    const [isCreated, setIsCreated] = useState(null);

    return (
        <div>
            <PrivateHeader />
            <div className='w-full grid lg:grid-cols-8'>
                <Sidebar />
                <div className='w-full col-span-8 lg:col-span-7 px-4 lg:px-10'>
                    <Pagetitle icon={<FaDonate />} />
                    <div className='w-full my-4'>
                        <div className='flex justify-end border-b border-gray-200 dark:border-gray-800 pb-4'>
                            <Link
                                to='/donations'
                                className='w-[120px] bg-transparent dark:bg-slate-500 dark:text-white p-2 border border-slate-500 text-slate-500 text-sm rounded-full flex justify-center space-x-1 hover:bg-slate-500 hover:text-white hover:dark:bg-transparent hover:dark:text-slate-500'
                            >
                                <span>Donations</span>
                            </Link>
                        </div>
                    </div>

                    <div className='w-full md:flex items-center my-6 space-x-0 md:space-x-4 md:space-y-0 space-y-4 py-4 border-b border-gray-200 dark:border-gray-700'>
                        <div className='mb-[20px] md:mb-0 md:flex items-center'>
                            <div className='mr-[270px]'>
                                <FilterEvents setEvent={setEvent} />
                            </div>
                            <div className='flex items-center pt-10'>
                                <div className='text-sm space-x-1 mt-2 md:mt-0 mr-[30px]'>
                                    <span>Can't find Event?</span>
                                    <span 
                                        className="text-green-500 cursor-pointer"
                                        onClick={setNewevent}
                                    >
                                        Click here
                                    </span>
                                </div> 
                            </div>
                        </div>
                        <div className=''>
                            <FilterYears setYear={setYear} />
                        </div>
                        <div className=''>
                            <div 
                                className='w-[180px] md:ml-[170px] mt-20 md:mt-9 bg-slate-500 dark:bg-slate-500 dark:text-white py-2.5 border border-slate-500 text-sm rounded-md flex justify-center space-x-1 hover:bg-slate-700 text-white hover:dark:bg-transparent hover:dark:text-slate-500 cursor-pointer'
                            >
                                Add Contributors
                            </div>
                        </div>
                    </div>

                    <div className='w-full'>
                        <div className='text-xl'>Contributors</div>
                        <div className='flex items-center mt-12 absolute'>
                            <FilterMembers setMember={setMember} setMemberName={setMemberName} />
                        </div>
                    </div>
                </div>
            </div>
            {newevent && <NeweventForm setForm={setNewevent} setIsCreated={setIsCreated} />}
        </div>
    )
}

export default MakeDonation
