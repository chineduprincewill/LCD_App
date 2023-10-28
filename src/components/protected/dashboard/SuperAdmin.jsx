import React from 'react'
import { AiOutlineUser, AiOutlineWindows } from 'react-icons/ai'
import { HiOutlineOfficeBuilding, HiOutlineUserGroup } from 'react-icons/hi'
import Stats from '../../../widgets/Stats'

const SuperAdmin = () => {

    return (
        <div className='w-full px-4 my-8 grid md:flex md:flex-wrap md:justify-between'>
            <Stats icon={<AiOutlineWindows size={40} className="text-slate-500" />} title='Events' num={17} url="/events" />
            <Stats icon={<AiOutlineUser size={40} className="text-slate-500" />} title='Members' num={54273} url="/members" />
            <Stats icon={<HiOutlineOfficeBuilding size={40} className="text-slate-500" />} title='Branches' num={30} url="/branches" />
            <Stats icon={<HiOutlineUserGroup size={40} className="text-slate-500" />} title='Users' num={32} url="/users" />            
        </div>
    )
}

export default SuperAdmin
