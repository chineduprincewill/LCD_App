import React, { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../../../context/AuthContex';
import { DataContext } from '../../../context/DataContext';
import { getBranches } from '../../../actions/branchesActions';
import PrivateHeader from '../PrivateHeader';
import Sidebar from '../sidebar/Sidebar';
import Pagetitle from '../../../widgets/Pagetitle';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BsPlusLg } from 'react-icons/bs';
import Search from '../../../widgets/Search';
import NumRows from '../../../widgets/NumRows';
import TableHeader from '../../../widgets/TableHeader';
import NewbranchForm from './NewbranchForm';
import MBranchesList from './MBranchesList';
import BranchesList from './BranchesList';
import Spinner from '../../../widgets/Spinner';
import Pagination from '../../../widgets/Pagination';

const columns = [
    {
        name:'Category',
        field: 'category',
        sortable: true
    }, 
    {
        name:'Name',
        field:'title',
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
        name:'Date',
        field:'created_at',
        sortable:true
    }, 
    {
        name:'...',
        field:'',
        sortable:false
    }
]

const Branches = () => {

    const { token, logout, user, role } = useContext(AuthContext);
    const { record } = useContext(DataContext);

    const [branches, setBranches] = useState(null);
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

    const branchesData = useMemo(() => {

        if(branches !== null && branches !== undefined){

            let computedBranches = branches;

            if(search) {
                computedBranches = computedBranches.filter(
                    branch => branch.category.toLowerCase().includes(search.toLowerCase()) ||
                            branch.title.toLowerCase().includes(search.toLowerCase()) ||
                            branch.mobile.includes(search)
                )
            }

            setTotalItems(computedBranches.length);

            //Sorting
            if( sorting.field ){
                const reversed = sorting.order === "asc" ? 1 : -1;
                computedBranches = computedBranches.sort(
                    (a, b) =>
                        reversed * a[sorting.field].localeCompare(b[sorting.field])
                );
            }

            if(itemsPerPage === '0'){
                return computedBranches;
            }
            else{
                return computedBranches.slice(
                    (currentPage - 1) * ITEMS_PER_PAGE,
                    (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
                );
            }
        }

    }, [branches, currentPage, search, sorting, ITEMS_PER_PAGE, itemsPerPage])


    useEffect(() => {

        getBranches(token, setBranches, setError);
    }, [token, isCreated, record])

    return (
        <div>
            <PrivateHeader />
            <div className='w-full grid grid-cols-8'>
                <Sidebar />
                <div className='w-full col-span-8 lg:col-span-7 px-4 lg:px-10'>
                    <Pagetitle icon={<HiOutlineOfficeBuilding />} />
                    <div className='w-full md:px-2 lg:px-0 my-2'>

                        {/* Display an add button if user has enough privilege*/}
                        {(user && user.groupid === 0 && role === 'admin') &&
                            <div className='md:flex md:justify-end my-2 space-x-0 md:space-x-6 md:items-center space-y-3 md:space-y-0'>
                                {/* SEARCH COMPONENT */}
                                {(branches !== null && branches !== undefined && branches.length > 0) && 
                                    <div className='w-full flex md:justify-end my-4'>
                                        <Search onSearch={ (value) => {
                                            setSearch(value);
                                    }} />
                                    </div>
                                }
                                <button
                                    className='w-[120px] bg-red-700 hover:bg-red-900 text-white p-3 rounded-full flex justify-center items-center space-x-1'
                                    onClick={showForm}
                                >
                                    <BsPlusLg size={15} /><span>Branch</span>
                                </button>
                            </div>
                        }
                    
                    </div>
                    
                    {/* NUM ROWS AND PAGINATION COMPONENTS */}
                    <div className='w-full flex justify-between mt-8 mb-4'>
                        {(branches !== null && branches !== undefined && branches.length > 0) && 
                            <NumRows 
                                data={branches} 
                                setItemsPerPage={setItemsPerPage}
                            />
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
                    {branches === null && error !== 'Token has expired' ? <Spinner w='250' /> : 
                        branches === undefined || (error !== null && error === 'Token has expired') ? 
                            logout() :
                            <Fragment>
                                {/* LARGE SCREEN */}
                                <div className='w-full overflow-auto hidden md:block'> 
                                    <table className='w-full'>
                                        <TableHeader 
                                            columns={columns} 
                                            onSorting={(field, order) => 
                                                setSorting({ field, order })
                                            } 
                                        />
                                        <BranchesList brnchs={branchesData} />
                                    </table>       
                                </div> 

                                {/* SMALL SCREEN */}
                                <div className='w-full py-3 md:hidden'>
                                    <MBranchesList brnchs={branchesData} />
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

            {form && <NewbranchForm setForm={setForm} setIsCreated={setIsCreated} />}
        </div>  
    )
}

export default Branches
