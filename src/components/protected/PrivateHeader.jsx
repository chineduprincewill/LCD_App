import React, { Fragment, useContext, useState } from 'react'
import { HiUserCircle } from 'react-icons/hi'
import { RiArrowDropUpLine, RiArrowDropDownLine} from 'react-icons/ri'
import Switcher from '../../Switcher'
import HeaderDropdown from '../../widgets/HeaderDropdown'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { AuthContext } from '../../context/AuthContex'

const PrivateHeader = () => {

    const { shownav, updateShownav } = useContext(AuthContext);

    const [drop, setDrop] = useState(false);

    const showDropdown = () => {
        setDrop(!drop);
    }

    return (
        <Fragment>
            <div className="w-full bg-red-800 z-40 flex sticky top-0 justify-between items-center px-5 py-4">
                <div className='text-white font-bold text-sm md:text-lg'><span className='md:ml-[90px] lg:ml-[230px]'>Records Management Solution</span></div>
                <div className='flex items-center space-x-3'>
                    <span className='text-white text-sm md:text-lg'>Results</span>
                    <span className='flex text-gray-200 p-1'>
                        <HiUserCircle size={25} />   
                        {drop ? <RiArrowDropUpLine size={25} onClick={showDropdown} className="cursor-pointer" /> : <RiArrowDropDownLine size={25} onClick={showDropdown}  className="cursor-pointer" />} 
                    </span> 
                    <Switcher />
                    <div className="md:hidden z-50">
                        {shownav ? (
                            <AiOutlineClose
                                size={20}
                                className="text-gray-300 cursor-pointer"
                                onClick={() => updateShownav()}
                            />
                            ) : (
                            <AiOutlineMenu
                                size={20}
                                className="text-gray-300 cursor-pointer"
                                onClick={() => updateShownav()}
                            />
                        )}
                    </div>
                </div>
                
            </div>
            {drop && <HeaderDropdown />}
        </Fragment>
    )
}

export default PrivateHeader
