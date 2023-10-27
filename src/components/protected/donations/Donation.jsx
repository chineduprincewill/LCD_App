import React, { Fragment, useState } from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import Redemptions from '../redemptions/Redemptions';
import { formatDateWithFullMonthName } from '../../../Hooks/functions';

const Donation = ({ dntn }) => {

    const [form, setForm] = useState(false);



    const showForm = () => {
        setForm(true);
    }

    return (
        <Fragment>
            <tr className="px-1 dark:text-gray-400 even:bg-gray-100 odd:bg-white dark:odd:bg-transparent dark:even:bg-[#0b1425]">
                <td className='py-3 px-3 whitespace-nowrap'>{dntn.fullname}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{dntn.mobile}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{dntn.event}, {dntn.event_year}</td>
                <td className='py-3 px-3 whitespace-nowrap'>&#8358; {dntn.donation}</td>
                <td className='py-3 px-3 whitespace-nowrap'>&#8358; {dntn.redeemed}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{formatDateWithFullMonthName(dntn.created_at)}</td>
                <td className='py-3 px-3 whitespace-nowrap flex'>
                    <Fragment>
                        <span 
                            className='text-[#00df9a] cursor-pointer hover:text-green-800 mt-1.5'
                            title="redemptions"
                            onClick={showForm}
                        >
                            <AiOutlineUnorderedList size={15} />
                        </span>
                    </Fragment>
                </td>
            </tr>

            {form && <Redemptions donation={dntn} setForm={setForm } />}
        </Fragment>
    )
}

export default Donation