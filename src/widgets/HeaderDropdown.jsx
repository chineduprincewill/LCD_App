import React, { Fragment, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordUpdate from '../components/protected/PasswordUpdate'
import { AuthContext } from '../context/AuthContex'
import { AiOutlineLogout } from 'react-icons/ai'
import { CiSettings } from 'react-icons/ci'

const HeaderDropdown = () => {

    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const [form, setForm] = useState(false);

    const userLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <Fragment>
            <div className='bg-transparent h-[120px] fixed inset-0 z-10 mt-16 flex justify-end'>
                <div className='w-[200px] h-[120px] bg-red-800 px-3 shadow-xl rounded-b-md text-white text-sm'>
                    <div>
                        <span 
                            className='flex justify-start items-center space-x-2 py-3 border-b border-[#ac4848] cursor-pointer hover:text-slate-300'
                            onClick={setForm}
                        >
                            <CiSettings size={18} />
                            <span>Password update</span>
                        </span>
                        <span 
                            className='flex justify-start items-center space-x-2 py-3 cursor-pointer hover:text-slate-300'
                            onClick={userLogout}
                        >
                            <AiOutlineLogout 
                                size={16}  
                            />
                            <span>Logout</span>
                        </span>
                    </div>
                    
                </div>
            </div>

            {form && <PasswordUpdate setForm={setForm} />}
        </Fragment>   
    )
}

export default HeaderDropdown
