import React from 'react'
import { formatPosition } from '../../../Hooks/functions'

const Result = ({ rslt, position }) => {
    return (
        <tr className="px-1 dark:text-gray-400 even:bg-gray-100 odd:bg-white dark:odd:bg-transparent dark:even:bg-[#0b1425]">
                <td className='py-3 px-3 whitespace-nowrap'>{rslt.fullname}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{rslt.event}, {rslt.year}</td>
                <td className='py-3 px-3 whitespace-nowrap'>&#8358; {rslt.pledged}</td>
                <td className='py-3 px-3 whitespace-nowrap'>&#8358; {rslt.paid}</td>
                <td className='py-3 px-3 whitespace-nowrap flex'><span>{position}</span><span className="text-xs">{formatPosition(position.toString())}</span></td>
            </tr>
    )
}

export default Result
