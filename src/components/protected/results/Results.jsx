import React, { useContext, useEffect, useState } from 'react'
import { SlRefresh } from 'react-icons/sl'
import FilterEvents from '../../../widgets/FilterEvents'
import FilterYears from '../../../widgets/FilterYears'
import Pagetitle from '../../../widgets/Pagetitle'
import PrivateHeader from '../PrivateHeader'
import Sidebar from '../sidebar/Sidebar'
import { AuthContext } from '../../../context/AuthContex'
import { MdOutlineTask } from 'react-icons/md'
import { result } from '../../../actions/donationsActions'
import Spinner from '../../../widgets/Spinner'
import ResultsRecords from './ResultsRecords'

const Results = () => {

    const { token, logout } = useContext(AuthContext)

    const [event, setEvent] = useState('');
    const [year, setYear] = useState('');
    const [region, setRegion] = useState('');
    const [subgroup, setSubgroup] = useState('');
    const [filtering, setFiltering] = useState(false);
    const [results, setResults] = useState(null);
    const [clear, setClear] = useState(false);
    const [error, setError] = useState(null);

    const getResult = () => {

        const data = {
            event, year, region, subgroup
        }

        if(event === '' && year === ''){
            alert('Event and year must be selected to filter!');
        }
        else{
            result(token, data, setResults, setError, setFiltering);
        }

    }

    useEffect(() => {
        if(clear){
            setResults(null);
        }
    }, [clear])

    return (
        <div>
            <div>
                <PrivateHeader />
                <div className='w-full grid lg:grid-cols-8'>
                    <Sidebar />
                    <div className='w-full col-span-8 lg:col-span-7 px-4 lg:px-10'>
                        <Pagetitle icon={<MdOutlineTask />} />
                        <div className='my-0'>
                            <div className='grid md:flex justify-start md:space-x-0 md:justify-between border-b border-gray-200 dark:border-gray-900 py-4 space-y-0 md:space-y-0'>

                                <div className='grid md:flex justify-start md:space-x-24'>
                                    {/* FILTER SECTION */}
                                    <div className='flex space-x-4'>
                                        
                                        <div className='mr-[220px] md:mr-[250px] mb-12 md:mb-0'>
                                            <FilterEvents setEvent={setEvent} clear={clear} />
                                        </div>
                                        <div className='md:mr-[100px] mb-12 md:mb-0'>    
                                            <FilterYears setYear={setYear} clear={clear} />
                                        </div>
                                    </div>

                                    <div className='flex justify-start space-x-8 my-6 md:my-0'>
                                        <div>
                                            <select 
                                                className='md:ml-[90px] bg-transparent p-2 border border-gray-400 dark:border-slate-700 dark:text-gray-500 text-sm rounded-md'
                                                onChange={(e) => setRegion(e.target.value)}
                                            >
                                                <option value="">select region</option>
                                                <option value="Nigeria">Nigeria</option>
                                                <option value="Oversea">Oversea</option>
                                            </select>
                                        </div>

                                        <div>
                                            <select 
                                                className='bg-transparent p-2 border border-gray-400 dark:border-slate-700 dark:text-gray-500 text-sm rounded-md'
                                                onChange={(e) => setSubgroup(e.target.value)}
                                            >
                                                <option value="">select subgroup</option>
                                                <option value="Business">Business</option>
                                                <option value="Civil servant">Civil servant</option>
                                                <option value="Undergraduate">Undergraduate</option>
                                                <option value="GCE">GCE</option>
                                                <option value="Secondary">Secondary</option>
                                                <option value="Primary">Primary</option>
                                                <option value="Nursery">Nursery</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className='flex justify-start space-x-8 my-6 md:my-0'>
                                        <div>
                                            <button
                                                className='md:ml-[90px] w-[100px] bg-transparent py-2 dark:bg-slate-500 dark:text-white border border-slate-500 text-slate-500 rounded-full text-sm hover:bg-slate-500 hover:text-gray-200 dark:hover:bg-transparent dark:hover:text-slate-500'
                                                onClick={() => getResult()}
                                            >
                                                {filtering ? 'filtering...' : 'Filter'}
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                className='bg-transparent py-2 px-4 dark:bg-green-500 dark:text-white border border-green-500 text-green-500 rounded-full text-sm hover:bg-green-500 hover:text-white hover:dark:bg-transparent hover:dark:text-green-500'
                                                onClick={setClear}
                                            >
                                                <SlRefresh size={19} />
                                            </button>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                        <div className='my-8'>
                                {error !== null && <span className='my-2 text-red-500'>{error}</span>}
                                {
                                    results === null && filtering ? <Spinner w={180} /> :
                                        (results !== null && (error !== null && error === 'Token has expired') ? logout() : (
                                            results !== null && results.length === 0 ? <span className='my-2 text-red-500'>No records found!</span> : 
                                                <ResultsRecords results={results} />
                                        ))
                                }
                        </div>
                    </div>
                </div>  
            </div> 
        </div>
    )
}

export default Results
