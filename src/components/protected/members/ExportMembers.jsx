import React, { useContext, useEffect, useState } from 'react'
import PrivateHeader from '../PrivateHeader'
import Sidebar from '../sidebar/Sidebar'
import Pagetitle from '../../../widgets/Pagetitle'
import { AiOutlineCloseCircle, AiOutlineFileExcel } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import FilterMembers from '../../../widgets/FilterMembers'
import { exportMembersToCSV } from '../../../actions/membersActions'
import { AuthContext } from '../../../context/AuthContex'

const ExportMembers = () => {

    const { token } = useContext(AuthContext);

    const [member, setMember] = useState('');
    const [memberName, setMemberName] = useState('');

    const [selected_members, setSelected_members] = useState([]);
    const [memberObj, setMemberObj] = useState([]);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(false);

    const clearSelection = () => {
        setSelected_members([]);
        setMemberObj([]);
    }

    const removeMember = (e, memid) => {
        let filteredArray = selected_members.filter(item => item !== memid);
        setSelected_members(filteredArray);

        let memobjArray = memberObj.filter(item => item?.member !== memid);
        setMemberObj(memobjArray);
    }

    const exportToCSV = () => {

        const data = {
            selected_members
        }

        exportMembersToCSV(token, data, setSuccess, setError)
    }

    useEffect(() => {
        if(!selected_members.includes(member)){
            setSelected_members(selected_members => [
                ...selected_members,
                member
            ])
    
            setMemberObj(memberObj => [
                ...memberObj,
                {
                    member,
                    memberName
                }
            ])
        }
        
        setIsSuccessful(true)
    }, [member])

    return (
        <div>
            <div>
                <PrivateHeader />
                <div className='w-full grid lg:grid-cols-8'>
                    <Sidebar />
                    <div className='w-full col-span-8 lg:col-span-7 px-4 lg:px-10'>
                        <Pagetitle icon={<AiOutlineFileExcel />} />
                        <div className='w-full flex justify-end md:px-2 lg:px-4 my-6'>
                            <Link
                                to='/members'
                                className='w-[120px] bg-red-700 hover:bg-red-900 text-white p-3 rounded-full flex justify-center items-center space-x-1 drop-shadow-xl'
                            >
                                Members
                            </Link>  
                        </div>
                        <div className='w-full md:px-2 lg:px-4 my-6'>
                             <FilterMembers setMember={setMember} setMemberName={setMemberName} isSuccessful={isSuccessful} setIsSuccessful={setIsSuccessful} />
                        </div>
                        <div className='w-full flex md:justify-end space-x-4 mt-24 mb-4 md:px-2 lg:px-4'>
                            <button 
                                className='w-[120px] p-3 rounded-full bg-red-600 hover:bg-red-700 text-white'
                                onClick={(e) => clearSelection()}
                            >
                                Clear
                            </button>
                            <button 
                                className='w-[120px] p-3 rounded-full bg-green-600 hover:bg-green-700 text-white'
                                onClick={(e) => exportToCSV()}
                            >
                                Export
                            </button>
                        </div>
                        <div className='w-full md:flex md:flex-wrap  border-t dark:border-gray-800 py-4'>
                        {
                            memberObj.length > 0 && memberObj.map((mobj, index) => {
                                return mobj?.member !== "" &&
                                <div key={index} className='w-full md:w-[48%] lg:w-[31%] flex space-x-6 items-center py-3'>
                                    <AiOutlineCloseCircle 
                                        size={15} 
                                        className='text-red-600 cursor-pointer'
                                        onClick={(e) => removeMember(e, mobj?.member)}
                                    />
                                    <span>{mobj?.memberName}</span>
                                </div>
                            })
                        }
                        </div>
                        <div className='w-full'>
                            <p>{success !== null && success}</p>
                            <p>{error !== null && error}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExportMembers
