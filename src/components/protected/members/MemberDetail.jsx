import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { getMember } from '../../../actions/membersActions';
import { AuthContext } from '../../../context/AuthContex';
import ModalLoader from '../../common/ModalLoader';
import { formatDateWithFullMonthName } from '../../../Hooks/functions';

const MemberDetail = ({ setShowdetail, id }) => {

    const { token } = useContext(AuthContext)

    const closeForm = () => {
        setShowdetail(false);
    }

    const [member, setMember] = useState(null);
    const data = {
        id
    }

    const omitKeys = [
        'id', 'branchid', 'firstname', 'lastname', 'othernames', 'fullname', 'status', 'created_at', 'updated_at'
    ]
    
    useEffect(() => {
        getMember(token, data, setMember)
    }, [])

    return (
        <div>
            <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className='w-full md:w-[900px] bg-gray-100 border border-gray-400 dark:text-gray-700 rounded-xl px-4 py-1'>
                        <div className='flex justify-between border-b border-gray-200 px-2 md:px-6 py-2 text-red-500'>
                            <div className='text-xl text-slate-700 font-semibold'>{member?.fullname}</div>
                            <div
                                className='cursor-pointer'
                                onClick={(e) => closeForm()}
                            >    
                                <AiOutlineCloseCircle size={20} />
                            </div>
                        </div>
                        <div className='px-6'>
                            <div className='grid md:flex md:justify-between md:flex-wrap my-2'>
                            {
                                member !== null ? (
                                    Object.keys(member).map((key, i) => (
                                        !omitKeys.includes(key) && 
                                            <div key={i} className="w-full md:w-[48%] text-left grid grid-cols-3 py-2 md:py-3 border-b border-gray-200 text-gray-500">
                                                <div className='col-span-1 capitalize'>{key.replace('_', ' ')}</div>
                                                <div className='col-span-2 text-gray-700 break-all font-semibold'>
                                                    {
                                                        key === 'created_at' || key === 'updated_at' ? 
                                                        formatDateWithFullMonthName(member[key]) :
                                                        member[key]
                                                    }
                                                </div>
                                            </div>
                                    ))
                                ): <ModalLoader />
                            }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberDetail
