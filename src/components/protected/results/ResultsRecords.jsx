import React, { useState } from 'react'
import TableHeader from '../../../widgets/TableHeader'
import ResultsList from './ResultsList';

const columns = [
    {
        name:'Name',
        field: 'fullname',
        sortable: true
    }, 
    {
        name:'Event',
        field:'event',
        sortable:true
    },  
    {
        name:'Pledge',
        field:'pledged',
        sortable:false
    },
    {
        name:'Paid',
        field:'paid',
        sortable:false
    },
    {
        name:'Position',
    }
]

const ResultsRecords = ({ results }) => {

    
    const [sorting, setSorting] = useState({ field: "", order: "" });

    return (
        <div>
            {/* LARGE SCREEN */}
            <div className='w-full overflow-auto hidden lg:block'> 
                <table className='w-full'>
                    {
                        results !== null &&
                        <TableHeader 
                            columns={columns} 
                            onSorting={(field, order) => 
                                setSorting({ field, order })
                            } 
                        />
                    }
                    {<ResultsList rslts={results} view="web" />}
                </table>       
            </div>

            {/* SMALL SCREEN */}
            <div className='w-full py-3 lg:hidden'>
                <ResultsList rslts={results} view="mobile" />
            </div>
        </div>
    )
}

export default ResultsRecords
