import React, { useState } from 'react'

const Search = ({ onSearch }) => {

    const [search, setSearch] = useState('');

    const onInputChange = (value) => {
        setSearch(value);
        onSearch(value);
    }

    return (
        <div>
            <input 
                type="text" 
                className="bg-transparent border border-slate-400 dark:border-slate-700 p-3 text-md rounded-md"
                placeholder='search'
                value={search}
                onChange={(e) => onInputChange( e.target.value )}
            />
        </div>
    )
}

export default Search