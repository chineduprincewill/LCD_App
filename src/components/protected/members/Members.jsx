import React, { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { HiOutlineUser } from 'react-icons/hi'
import { getMembers } from '../../../actions/membersActions'
import { AuthContext } from '../../../context/AuthContex'
import { DataContext } from '../../../context/DataContext'
import NumRows from '../../../widgets/NumRows'
import Pagetitle from '../../../widgets/Pagetitle'
import Pagination from '../../../widgets/Pagination'
import Search from '../../../widgets/Search'
import Spinner from '../../../widgets/Spinner'
import TableHeader from '../../../widgets/TableHeader'
import PrivateHeader from '../PrivateHeader'
import Sidebar from '../sidebar/Sidebar'
import MembersList from './MembersList'
import NewmemberForm from './NewmemberForm'
import { AiOutlineFileExcel } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const columns = [
    {
        name:'Category',
        field: 'category',
        sortable: true
    }, 
    {
        name:'Name',
        field:'fullname',
        sortable:true
    }, 
    {
        name:'Mobile',
        field:'mobile',
        sortable:true
    }, 
    {
        name:'Email',
        field:'email',
        sortable:false
    }, 
    {
        name:'Gender',
        field:'gender',
        sortable:false
    },
    {
        name:'Branch',
        field:'branch',
        sortable:false
    },
    {
        name:'Wing',
        field:'wing',
        sortable:false
    },
    {
        name:'...',
        field:'',
        sortable:false
    }
]

const Members = () => {

    const { token, logout, user, role } = useContext(AuthContext);
    const { record } = useContext(DataContext);

    const navigate = useNavigate();

    const [members, setMembers] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [error, setError] = useState(null);
    let ITEMS_PER_PAGE = itemsPerPage;
    
    const [form, setForm] = useState(false);
    const [isCreated, setIsCreated] = useState();

    const showForm = () => {
        setForm(true);
    }

    const membersData = useMemo(() => {

        if(members !== null && members !== undefined){

            let computedMembers = members;

            if(search) {
                computedMembers = computedMembers.filter(
                    member => member.category.toLowerCase().includes(search.toLowerCase()) ||
                            member.uid.toLowerCase().includes(search.toLowerCase()) ||
                            member.fullname.toLowerCase().includes(search.toLowerCase()) ||
                            member.gender.toLowerCase().includes(search.toLowerCase()) ||
                            member.branch.toLowerCase().includes(search.toLowerCase()) ||
                            member.wing.toLowerCase().includes(search.toLowerCase()) ||
                            member.mobile.includes(search)
                )
            }

            setTotalItems(computedMembers.length);

            //Sorting
            if( sorting.field ){
                const reversed = sorting.order === "asc" ? 1 : -1;
                computedMembers = computedMembers.sort(
                    (a, b) =>
                        reversed * a[sorting.field].localeCompare(b[sorting.field])
                );
            }

            if(itemsPerPage === '0'){
                return computedMembers;
            }
            else{
                return computedMembers.slice(
                    (currentPage - 1) * ITEMS_PER_PAGE,
                    (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
                );
            }
        }

    }, [members, currentPage, search, sorting, ITEMS_PER_PAGE, itemsPerPage])


    useEffect(() => {

        getMembers(token, setMembers, setError);
    }, [token, isCreated, record])

    return (
        <div>
            <div>
                <PrivateHeader />
                <div className='w-full grid lg:grid-cols-8'>
                    <Sidebar />
                    <div className='w-full col-span-8 lg:col-span-7 px-4 lg:px-10'>
                        <Pagetitle icon={<HiOutlineUser />} />
                        <div className='w-full md:flex md:justify-end md:items-center space-x-0 md:space-x-6 space-y-3 md:space-y-0 md:px-2 lg:px-4 my-2'>
                            {/* SEARCH COMPONENT */}
                            {(members !== null && members !== undefined && members.length > 0) && 
                                <div className='w-full flex md:justify-end my-4'>
                                    <Search onSearch={ (value) => {
                                            setSearch(value);
                                        }} 
                                    />
                                </div>
                            }
                            {/* Display an add button if user has enough privilege*/}
                            {(user && role === 'admin') &&
                                <div className='flex md:justify-end my-2'>
                                    <button
                                        className='w-[120px] bg-red-700 hover:bg-red-900 text-white p-3 rounded-full flex justify-center items-center space-x-1 drop-shadow-xl'
                                        onClick={showForm}
                                    >
                                        <BsPlusLg size={15} className="mt-1" /><span>Member</span>
                                    </button>
                                </div>
                            }
                        </div>
                        
                        {/* NUM ROWS AND PAGINATION COMPONENTS */}
                        <div className='w-full md:flex md:justify-between mt-8 mb-4 space-y-4 md:space-y-0'>
                            {(members !== null && members !== undefined && members.length > 0) && 
                                <div className='flex space-x-4 items-center'>
                                    <NumRows 
                                        data={members} 
                                        setItemsPerPage={setItemsPerPage}
                                    />

                                    <button 
                                        className='px-3 py-2.5 rounded-md border border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                                        onClick={() => navigate('/export-members')}
                                    >
                                        <div className='flex items-center space-x-1'>
                                            <AiOutlineFileExcel size={15} />
                                            <span>Export Members</span>
                                        </div>
                                    </button>
                                </div>
                                
                            }

                            <Pagination 
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                        
                        {/* ERROR MESSAGE IF ANY */}
                        {error && <p className='text-sm font-medium text-red-700'>{error}</p>}

                        {/* Diplay data in table or cards depending on the screen size */}
                        {members === null && error !== 'Token has expired' ? <Spinner w='250' /> : 
                            members === undefined || (error !== null && error === 'Token has expired') ? 
                                logout() :
                                <Fragment>
                                    {/* LARGE SCREEN */}
                                    <div className='w-full overflow-auto hidden lg:block'> 
                                        <table className='w-full'>
                                            <TableHeader 
                                                columns={columns} 
                                                onSorting={(field, order) => 
                                                    setSorting({ field, order })
                                                } 
                                            />
                                            <MembersList membrs={membersData} view="web" />
                                        </table>       
                                    </div> 

                                    {/* SMALL SCREEN */}
                                    <div className='w-full py-3 lg:hidden'>
                                        <MembersList membrs={membersData} view="mobile" />
                                    </div>
                                </Fragment>       
                        }

                        {/* PAGINATION COMPONENTS */}
                        <div className='w-full flex justify-end mt-6'>
                            <Pagination 
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                </div>  
            </div> 

            {form && <NewmemberForm setForm={setForm} setIsCreated={setIsCreated} />}
        </div>
    )
}

export default Members
