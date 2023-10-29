import React, { Fragment, useContext, useEffect, useState } from 'react'
import { AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';
import { MdManageSearch } from 'react-icons/md'
import { FaDonate } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import FilterEvents from '../../../widgets/FilterEvents';
import FilterMembers from '../../../widgets/FilterMembers';
import FilterYears from '../../../widgets/FilterYears';
import Pagetitle from '../../../widgets/Pagetitle';
import PrivateHeader from '../PrivateHeader';
import Sidebar from '../sidebar/Sidebar';
import NeweventForm from '../events/NeweventForm'
import NewmemberForm from '../members/NewmemberForm'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { createDonation } from '../../../actions/donationsActions';
import { AuthContext } from '../../../context/AuthContex';
import NextSearch from './NextSearch';
import MemberDetail from '../members/MemberDetail';
import DonationsLog from './DonationsLog';

export const NewDonation = () => {

    const navigate = useNavigate();

    const { token } = useContext(AuthContext);

    const [member, setMember] = useState('');
    const [event, setEvent] = useState('');
    const [year, setYear] = useState('');
    const [donation, setDonation] = useState('');
    const [redeemed, setRedeemed] = useState(0);
    const [completepay, setCompletepay] = useState('');
    const [recorder, setRecorder] = useState('self');
    const [memberName, setMemberName] = useState('');
    const [stayOnPage, setStayOnPage] = useState(true);
    const [isSuccessful, setIsSuccessful] = useState(false);

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const [submitting, setSubmitting] = useState(false);
    const [search, setSearch] = useState('event');

    const [newevent, setNewevent] = useState(false);
    const [newmember, setNewmember] = useState(false);

    const [isCreated, setIsCreated] = useState(null);
    const [irecorded, setIrecorded] = useState(true);
    const [showdetail, setShowdetail] = useState(false);
    const [memberid, setMemberid] = useState();

    const [currpayload, setCurrpayload] = useState({});
    const [payloadsArr, setPayloadsArr] = useState([]);

    const restart = () => {
        setSearch('event');
        setEvent('');
        setYear('');
        setMember('');
        setMemberName('');
    }


    const handleShowdetail = (id) => {
        setShowdetail(true);
        setMemberid(id);
    }


    let stage;

    const updatIrecorded = () => {
        setIrecorded(!irecorded);
    }


    const updateSearch = (val) => {
        //alert(val);
        if(val === 'event'){
            setEvent('');
        }
        if(val === 'year'){
            setYear('');
        }
        setSearch(val);
    }

    const clearSelection = (val) => {
        if(val === 'event'){
            setEvent('')
        }
        if(val === 'year'){
            setYear('')
        }
        if(val === 'member'){
            setMember('')
        }
        setSearch(val);
    }

    if(search !== null){
        if(search === 'event'){
            stage = <div className='flex'>
                <FilterEvents setEvent={setEvent} /> 
                <NextSearch search={search} updateSearch={updateSearch} val={'event'} btnText={'back'} />
                <AiOutlinePlus size={20} className="mt-2 text-green-500 cursor-pointer" onClick={setNewevent} title="create new event" /></div>;
            if(event !== ''){
                setSearch('year');
            }
        }
        else if(search === 'year'){
            stage = <div className='flex'>
                <FilterYears setYear={setYear} />
                <NextSearch search={search} updateSearch={updateSearch} val={'event'} btnText={'back'} />
            </div>
            if(year !== ''){
                setSearch('member');
            }
        }
        else if(search === 'member'){
            stage = <div className='flex'>
                <FilterMembers setMember={setMember} setMemberName={setMemberName} isSuccessful={isSuccessful} setIsSuccessful={setIsSuccessful} />
                <NextSearch search={search} updateSearch={updateSearch} val={'year'} btnText={'back'} />
                <AiOutlinePlus size={20} className="mt-2 text-green-500 cursor-pointer" onClick={setNewmember} title="create new member" />
            </div>
        }
    }
    

    const handleSubmit = (arg) => {
        if(donation === '' || completepay === '' || recorder === ''){
            alert('All form fields must be filled!');
        }
        else{
            arg === 'notOnPage' && setStayOnPage(false);
            const data = {
                member,
                memberName,
                event,
                year,
                donation,
                redeemed,
                completepay,
                recorder
            }
            if(window.confirm('Are you sure you have confirmed your entries? You will not be able to edit once you have submitted.')){
                setCurrpayload(data);
                createDonation(token, data, setSuccess, setError, setSubmitting);
            }
        }
    }


    const toggleImportModal = () => {
        setImportModal(true);
    }

    if(success !== null){
        alert(success);
        setSuccess(null);
        setMember('');
        setMemberName('');
        setCompletepay('');
        setRedeemed(0);

        if(stayOnPage){
            setSearch('member');
            setIsSuccessful(true);  
            
            setPayloadsArr(payloadsArr => [
                currpayload,
                ...payloadsArr,
            ])
        }
        else{
            navigate('/donations')
        }
    }

    useEffect(() => {
        irecorded ? setRecorder('self') : setRecorder('');
    }, [irecorded])


    return (
        <div>
            <PrivateHeader />
            <div className='w-full grid lg:grid-cols-8'>
                <Sidebar />
                <div className='w-full col-span-8 lg:col-span-7 px-4 lg:px-10'>
                    <Pagetitle icon={<FaDonate />} />
                    {/** DONATIONS LIST SECTION */}
                    <div className='w-full my-4'>
                        <div className='flex justify-end border-b border-gray-200 dark:border-gray-800 pb-4'>
                            <Link
                                to='/donations'
                                className='w-[120px] bg-red-700 hover:bg-red-900 text-white p-3 rounded-full flex justify-center items-center space-x-1'
                            >
                                <span>Donations</span>
                            </Link>
                        </div>
                    </div>

                    {/** NOTIFICATIONS AND SELECTION FIELDS SECTION */}
                    <div className='py-0.5'>
                        <p className='rounded-md text-sm bg-gray-100 text-slate-500 dark:bg-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-800 p-3 mb-5 font-bold'>If you cannot find what you searched for in the dropdown that appears when you type, please click on the green plus icon to add it. <span className='text-yellow-600'>Note that selection fields change after each selection</span></p>
                        <div className='md:flex md:justify-between md:items-center space-y-6 md:space-y-0'>
                            {stage} 
                            <div className='flex items-center space-x-3'>
                                <button 
                                    className='px-6 py-1.5 bg-green-700 hover:bg-green-900 text-white rounded-full'
                                    onClick={(e) => navigate('/import-donations')}
                                >
                                    Import from Excel
                                </button>
                                <button 
                                    className='w-[80px] p-1.5 bg-red-700 hover:bg-red-900 text-white rounded-full'
                                    onClick={(e) => restart()}
                                >
                                    Cancel
                                </button>
                            </div>
                            
                        </div>    
                    </div>

                    {error && <span className='py-3 text-red-500'>{error}</span>}

                    {/** DONATION FORM SECTION */}
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 my-12 py-4 border-t border-gray-200 dark:border-gray-900 '>
                        {/** SELECTIONS DISPLAY SECTION */}
                        <div className='col-span-1 space-y-8 mt-3 md:border-r border-gray-300 dark:border-gray-900'>
                            {event !== '' && 
                                <div className='grid grid-cols-5'>
                                    <div className='col-span-1 text-slate-500'>
                                        Event
                                    </div>
                                    <div className='col-span-3'>    
                                        {event}
                                    </div>
                                    <div className='col-span-1 flex justify-center'>    
                                        <AiOutlineCloseCircle 
                                            size={15} 
                                            className="text-red-500 mt-1.5 cursor-pointer" 
                                            onClick={(e) => clearSelection('event')}
                                        />
                                    </div>
                                </div>
                            }
                            {year !== '' && 
                                <div className='grid grid-cols-5'>
                                    <div className='col-span-1 text-slate-500'>
                                        Year
                                    </div>
                                    <div className='col-span-3'>    
                                        {year}
                                    </div>
                                    <div className='col-span-1 flex justify-center'>    
                                        <AiOutlineCloseCircle 
                                            size={15} 
                                            className="text-red-500 mt-1.5 cursor-pointer" 
                                            onClick={(e) => clearSelection('year')}
                                        />
                                    </div>
                                </div>
                            }
                            {member !== '' &&
                                <div className='grid grid-cols-5'>
                                    <div className='col-span-1 text-slate-500'>
                                        Member
                                    </div>
                                    <div className='col-span-3 flex space-x-3 items-center'>    
                                        <span>{memberName}</span>
                                        <MdManageSearch 
                                            size={25} 
                                            className='text-green-500 cursor-pointer' 
                                            title='detail'
                                            onClick={(e) => handleShowdetail(member) }
                                        />
                                    </div>
                                    <div className='col-span-1 flex justify-center'>    
                                        <AiOutlineCloseCircle 
                                            size={15} 
                                            className="text-red-500 mt-1.5 cursor-pointer" 
                                            onClick={(e) => clearSelection('member')}
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                        {/** MAIN DONATION FORM SECTION */}
                        <div className='col-span-1 space-y-4 mt-6 md:mt-0 md:px-6'>
                            {(event !== '' && year !== '' && member !== '') && 
                                <Fragment>
                                    <div>
                                        <input
                                            type="number"
                                            className="w-full md:w-[450px] bg-transparent p-2 border-b border-gray-400 dark:border-slate-600 dark:text-gray-500"
                                            placeholder="Enter donation"
                                            onChange={(e) => setDonation(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <select
                                            className="w-full md:w-[450px] bg-transparent p-2 border-b border-gray-400 dark:border-slate-600 dark:text-gray-500"
                                            onChange={(e) => setCompletepay(e.target.value)}
                                            required
                                        >
                                            <option value="">Payment completed?</option>
                                            <option value="yes">yes</option>
                                            <option value="no">no</option>
                                        </select>
                                    </div>
                                    {
                                        completepay === 'no' && 
                                            <div className='grid'>
                                                <input
                                                    type="number"
                                                    className="w-full md:w-[450px] bg-transparent p-2 border-b border-gray-400 dark:border-slate-600 dark:text-gray-500"
                                                    placeholder="How much was paid?"
                                                    onChange={(e) => setRedeemed(e.target.value)}
                                                />
                                                <small className='my-1 text-gray-500'>Leave blank if nothing was paid</small>
                                            </div>
                                    }
                                    <div className='flex justify-start space-x-8 p-2'>
                                        <span>Are you the recorder? <span className='text-sm text-gray-500 ml-2'>{irecorded ? 'Yes' : 'No'}</span></span>
                                        <span 
                                            className='cursor-pointer'
                                            onClick={updatIrecorded}
                                        >  
                                            {
                                                irecorded ? <BsToggleOn size={20} className="text-green-500 mt-1" /> : <BsToggleOff size={20} className="text-gray-500 mt-1" />                                          
                                            }

                                        </span>
                                    </div>
                                    {
                                        !irecorded &&  
                                            <div>
                                                <input
                                                    type="text"
                                                    className="w-full md:w-[450px] bg-transparent p-2 border-b border-gray-400 dark:border-slate-600 dark:text-gray-500"
                                                    placeholder="Enter recorder"
                                                    onChange={(e) => setRecorder(e.target.value)}
                                                />
                                            </div>
                                    }

                                    <div className='w-full md:w-[450px] md:flex md:justify-between md:items-center space-y-4 md:space-y-0'>
                                        <div 
                                            className='flex justify-center px-6 py-2 bg-red-700 text-white rounded-full cursor-pointer hover:bg-red-900'
                                            onClick={(e) => handleSubmit('onPage')}
                                        >
                                            {submitting && stayOnPage ? 'Submitting...' : 'Submit and stay on page'}
                                        </div>
                                        <div 
                                            className='flex justify-center px-6 py-2 bg-slate-500 text-white rounded-full cursor-pointer hover:bg-slate-700'
                                            onClick={(e) => handleSubmit('notOnPage')}
                                        >
                                            {submitting && !stayOnPage ? 'Submitting...' : 'Submit and exit page'}
                                        </div>
                                    </div>
                                    
                                </Fragment>
                            }
                        </div>
                    </div>

                    {/** LIST OF CURRENTLY SUBMITTED DONATION */}
                    <DonationsLog payloadsArr={payloadsArr} />
                </div>
            </div>

            {newevent && <NeweventForm setForm={setNewevent} setIsCreated={setIsCreated} />}
            {newmember && <NewmemberForm setForm={setNewmember} setIsCreated={setIsCreated} />}
            {showdetail && <MemberDetail setShowdetail={setShowdetail} id={memberid} />}
            
        </div>
    )
}

export default NewDonation
