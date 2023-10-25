import React from 'react'

const NextSearch = ({ search, updateSearch, val, btnText }) => {
  return (
    <button 
        className='w-[80px] p-1.5 bg-transparent text-red-700 hover:text-red-900 ml-64 mr-2 md:mr-4'
        onClick={(e) => updateSearch(val)}
    >
        {search !== 'event' && btnText}
    </button>
  )
}

export default NextSearch
