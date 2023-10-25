import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/LCM_updated.png'

const Banner = () => {

    const loc = useLocation();

    let url;

    loc.pathname === '/' ? url = '/login' : url = '/';

    return (
        <div className='w-full md:w-2/4 flex justify-center px-5 my-4'>
            <div className='w-full'>
                <img src={logo} alt='logo' />
                <div className='w-full text-5xl md:text-7xl leading-snug md:leading-tight my-3 font-extralight'>Living Christ Mission Financial Records App</div>
                <div className='w-full text-lg md:text-2xl mt-3 font-light'>Reliable and seamless real-time collation of financial records with ease of information retrieval and data processing for proper documentation and financial information auditing</div>
                <Link to={url}>
                    <button 
                        className="w-[200px] bg-red-700 hover:bg-red-900 text-white p-3 md:p-4 rounded-full my-8 text-lg shadow-xl animate-bounce"
                    >
                        {url === '/' ? 'Home' : 'Get Started'}
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Banner
