import React, { Fragment, useContext, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';
import { deleteUser } from '../../../actions/usersActions';
import { AuthContext } from '../../../context/AuthContex';
import { DataContext } from '../../../context/DataContext';
import EditUserForm from './EditUserForm';
import { formatDateWithFullMonthName } from '../../../Hooks/functions';

const User = ({ usr }) => {

    const { token, user } = useContext(AuthContext);
    const { refreshRecord } = useContext(DataContext);

    const [editUser, setEditUser] = useState(false);
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null);

    const showEdit = () => {
        setEditUser(true)
    }

    const deleteUsr = () => {

        if(window.confirm(`Are you sure you want to delete ${usr.username} `)){

            deleteUser(token, usr.id, setSuccess, setError);
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
                <td className='py-3 px-3 whitespace-nowrap'>{usr.username}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{usr.role}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{usr.mobile}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{usr.email}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{usr.groupname}</td>
                <td className='py-3 px-3 whitespace-nowrap'>{formatDateWithFullMonthName(usr.created_at)}</td>
                <td className='py-3 px-3 whitespace-nowrap flex'>
                    {(user && user.groupid === 0 && user.role === 'admin') &&
                        <Fragment>
                            <span 
                                className='px-2 pt-2 text-[#00df9a] cursor-pointer'
                                onClick={showEdit}
                            >
                                <AiOutlineEdit size={15} />
                            </span>
                            <span 
                                className='px-2 pt-2 text-[red] cursor-pointer'
                                onClick={deleteUsr}
                            >
                                <HiOutlineTrash size={15} />
                            </span>
                        </Fragment>
                    }
                </td>
            </tr>

            {editUser && <EditUserForm usr={usr} setEditUser={setEditUser} />}
        </Fragment>
    )
}

export default User
