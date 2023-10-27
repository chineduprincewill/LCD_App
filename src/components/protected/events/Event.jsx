import React, { Fragment, useContext, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { HiOutlineTrash } from 'react-icons/hi'
import { deleteEvent } from '../../../actions/eventsActions'
import { AuthContext } from '../../../context/AuthContex'
import { DataContext } from '../../../context/DataContext'
import EditEventForm from './EditEventForm'
import { formatDateWithFullMonthName } from '../../../Hooks/functions'

const Event = ({ evnt }) => {

    const { token, user } = useContext(AuthContext);
    const { refreshRecord } = useContext(DataContext);

    const [editEvent, setEditEvent] = useState(false);
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null);

    const showEdit = () => {
        setEditEvent(true)
    }

    const deleteEvnt = () => {

        if(window.confirm(`Are you sure you want to delete ${evnt.title} `)){

            deleteEvent(token, evnt.id, setSuccess, setError);
        }
    }

    if(success !== null){
        alert(success);
        refreshRecord(Date.now());
        setSuccess(null)
    }

    if(error !== null){
        alert(error);
        setError(null);
    }

    return (
        <Fragment>
            <tr className="px-1 even:bg-gray-100 odd:bg-white dark:odd:bg-transparent dark:even:bg-[#0b1425]">
                <td className='py-3 px-3 whitespace-nowrap'>{evnt.title}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{formatDateWithFullMonthName(evnt.created_at)}</td>
                <td className='py-3 px-3 whitespace-nowrap flex'>
                    {(user && user.role === 'admin') &&
                        <Fragment>
                            <span 
                                className='px-2 pt-2 text-[#00df9a] cursor-pointer'
                                onClick={showEdit}
                            >
                                <AiOutlineEdit size={15} />
                            </span>
                            <span 
                                className='px-2 pt-2 text-[red] cursor-pointer'
                                onClick={deleteEvnt}
                            >
                                <HiOutlineTrash size={15} />
                            </span>
                        </Fragment>
                    }
                </td>
            </tr>

            {editEvent && <EditEventForm evnt={evnt} setEditEvent={setEditEvent} />}
        </Fragment>
    )
}

export default Event
