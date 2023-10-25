import React, { useEffect, useMemo, useState } from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

const Pagination = ({ total=0, itemsPerPage=10, currentPage=1, onPageChange }) => {

    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if(total > 0 && itemsPerPage > 0){
            setTotalPages(Math.ceil(total / itemsPerPage))
        }

    }, [total, itemsPerPage])

    const paginationItems = useMemo(() => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++){
            pages.push(<span 
                className={`px-2 py-1 cursor-pointer ${i === currentPage && ' bg-red-700 text-gray-200 font-medium rounded-full'}`} 
                key={i}
                onClick={() => onPageChange(i)}
            >
                {i}
            </span>);
        }

        return pages

    }, [totalPages, currentPage, onPageChange])

    if( totalPages === 0 ) return null;

    return (
        <div>
            <div className='flex items-center space-x-2 px-1 py-1 text-gray-700 dark:text-gray-500'>
                <span 
                    className='py-0 px-2 cursor-pointer bg-transparent text-md font-medium'
                    onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
                >
                    <MdOutlineKeyboardArrowLeft size={20} className='mt-1' />
                </span>
                {paginationItems}
                <span 
                    className='py-0 px-2 cursor-pointer bg-transparent text-md font-medium'
                    onClick={() => currentPage !== totalPages && onPageChange(currentPage + 1)}
                >
                    <MdOutlineKeyboardArrowRight size={20} className='mt-1' />
                </span> 
            </div>
        </div>
    )
}

export default Pagination
