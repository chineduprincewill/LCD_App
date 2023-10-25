import React, { Fragment, useContext } from 'react'
import Logo from '../../../assets/LCM_updated.png'
import NavDB from './NavDB'
import { AuthContext } from '../../../context/AuthContex';

const Sidebar = () => {

    const { shownav, updateShownav } = useContext(AuthContext);
      
    return (
        <Fragment>
            <div
                className={
                shownav
                    ? "fixed inset-0 z-20 mt-0 bg-black bg-opacity-50 transition-opacity md:hidden"
                    : ""
                }
                onClick={() => updateShownav() }
            ></div>
            <div
                className={`${
                shownav ? "block w-[200px] border-r border-gray-500" : "hidden"
                } md:block md:w-[80px] lg:w-[200px] col-span-1 z-40 fixed top-0 h-screen bg-[#0b1425] border-r-2 border-gray-800`}
            >
                <div className="w-full flex justify-center items-center mt-16">
                    <img
                        src={Logo}
                        alt="logo"
                        width="80px"
                        className={`${shownav ? "block" : "hidden"} lg:block`}
                    />
                    <img
                        src={Logo}
                        alt="logo"
                        width="80px"
                        className={`${shownav ? "hidden" : "block"} lg:hidden`}
                    />
                </div>

                <div className="my-12 flex justify-center border-t border-[#253352] pt-2">
                    <NavDB />
                </div>
            </div>
        </Fragment>
    )
}


export default Sidebar