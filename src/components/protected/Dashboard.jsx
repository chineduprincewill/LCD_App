import React, { useContext } from 'react'
//import { AuthContext } from '../../context/AuthContex'
import Sidebar from './sidebar/Sidebar'
import Pagetitle from '../../widgets/Pagetitle'
import SuperAdmin from './dashboard/SuperAdmin'
import PrivateHeader from './PrivateHeader'
import { AiOutlineDashboard } from 'react-icons/ai'

const Dashboard = () => {

    //const { user } = useContext(AuthContext)
    return (
        <div>
            <PrivateHeader />
            <div className='w-full grid lg:grid-cols-8'>
                <Sidebar />
                <div className='w-full lg:col-span-7 lg:px-10'>
                    <Pagetitle icon={<AiOutlineDashboard />} />
                    <SuperAdmin />
                </div>
            </div>  
        </div>
    )
}

export default Dashboard
