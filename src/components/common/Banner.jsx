import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/LCM_updated.png'
import Typed from 'typed.js';

const Banner = () => {

    const loc = useLocation();

    let url;
    loc.pathname === '/' ? url = '/login' : url = '/';

    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [
                "Thou art worthy O Lord!", 
                "To receive Glory, Honour and Power", 
                "For Thou has created all things", 
                "And for Thy pleasure they are and were created"], // Strings to display
            // Speed settings, try diffrent values untill you get good results
            startDelay: 300,
            typeSpeed: 150,
            backSpeed: 50,
            backDelay: 1000,
            loop: true,
            showCursor: true
          });
      
          // Destropying
          return () => {
            typed.destroy();
          };
    }, [])

    return (
        <div className='w-full md:w-2/4 flex justify-center px-5 my-4'>
            <div className='w-full'>
                <img src={logo} alt='logo' />
                <div className='mt-2'><span className='text-red-600 md:text-xl' ref={el}></span></div>
                <div className='w-full text-4xl md:text-7xl leading-snug md:leading-tight mb-3 md:font-extralight'>Living Christ Mission Financial Records App</div>
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
