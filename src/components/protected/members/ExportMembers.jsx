import React, { useContext, useEffect, useState } from 'react'
import PrivateHeader from '../PrivateHeader'
import Sidebar from '../sidebar/Sidebar'
import Pagetitle from '../../../widgets/Pagetitle'
import { AiOutlineCloseCircle, AiOutlineFileExcel } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import FilterMembers from '../../../widgets/FilterMembers'
import { exportMembersToCSV } from '../../../actions/membersActions'
import { AuthContext } from '../../../context/AuthContex'
import ImportModal from '../donations/ImportModal'

const ExportMembers = () => {

    const { token } = useContext(AuthContext);

    const [member, setMember] = useState('');
    const [memberName, setMemberName] = useState('');

    const [selected_members, setSelected_members] = useState([]);
    const [memberObj, setMemberObj] = useState([]);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [generating, setGenerating] = useState(false);

    const [importModal, setImportModal] = useState(false);

    const clearSelection = () => {
        setSelected_members([]);
        setMemberObj([]);
    }

    console.log(selected_members, memberObj);

    const removeMember = (e, memid) => {
        let filteredArray = selected_members.filter(item => item !== memid);
        setSelected_members(filteredArray);

        let memobjArray = memberObj.filter(item => item?.member !== memid);
        setMemberObj(memobjArray);
    }

    const exportToCSV = () => {

        if(selected_members.length < 2){
            alert('No member has been selected!')
        }
        else{
            const data = {
                selected_members
            }
    
            exportMembersToCSV(token, data, setSuccess, setError, setGenerating)
        }
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
                        <div className='w-full md:flex md:justify-end md:px-2 lg:px-4 my-6 space-y-4 md:space-y-0'>
                            <Link
                                to='/new-donation'
                                className='max-w-fit px-6 bg-red-700 hover:bg-red-900 py-3 rounded-full flex justify-center items-center space-x-1 drop-shadow-xl text-white'
                            >
                                Back to Donation
                            </Link>  
                        </div>
                        <div className='md:px-4'>
                            <div className='w-full border border-orange-700 text-orange-700 dark:border-orange-300 dark:text-orange-300 rounded-md p-2 text-sm'>
                                <p>Generate excel for the members you want to import their donations by typing and selecting the members from the text field below and clicking on the <b>Generate Excel</b> button after you must have selected all the members you want to import their donations. Update the generated Excel with the required information across each member name, <b>delete the first row of in the excel which contains the headings</b>, and then upload back by clicking the Import Donations button below. </p>
                            </div>
                        </div>
                        <div className='w-full md:px-2 lg:px-4 my-6'>
                             <FilterMembers setMember={setMember} setMemberName={setMemberName} isSuccessful={isSuccessful} setIsSuccessful={setIsSuccessful} />
                        </div>
                        <div className='w-full md:flex md:justify-between space-y-4 md:space-y-0 mt-24 mb-4 md:px-2 lg:px-4'>
                            <button 
                                className='px-6 py-3 rounded-full bg-green-600 text-white hover:bg-green-800'
                                onClick={(e) => setImportModal(true)}
                            >
                                <div className='flex items-center space-x-1'>
                                    <AiOutlineFileExcel size={15} />
                                    <span>Import Members</span>
                                </div>
                            </button>

                            <div className='space-x-4'>
                                {selected_members.length > 1 && <button 
                                    className='w-[120px] p-3 rounded-full bg-red-600 hover:bg-red-700 text-white'
                                    onClick={(e) => clearSelection()}
                                >
                                    Clear
                                </button>
                                }
                                
                                <button 
                                    className='max-w-fit px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white'
                                    onClick={(e) => exportToCSV()}
                                >
                                    {generating ? 'Generating...' : 'Generate Excel'}
                                </button>
                            </div>
                        </div>
                        <div className='w-full md:flex md:flex-wrap border-t dark:border-gray-800 py-4'>
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
            {importModal && <ImportModal setImportModal={setImportModal} />}
        </div>
    )
}

export default ExportMembers
