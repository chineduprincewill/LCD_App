import React from 'react'
import PublicHeader from './PublicHeader'
import homeBanner from '../assets/home-banner.png';
import Banner from './common/Banner';
import Footer from './common/Footer'

const AboutUs = () => {


    return (
        <div className='h-screen'>
            <PublicHeader />
            <div className='md:flex md:justify-center my-6 z-50'>
                <Banner />
                <div className='w-full md:w-1/4 flex justify-center lg:mt-6'>
                    <img src={homeBanner} alt="home-banner" className='w-[200px] md:w-[300px] animate-pulse' />
                </div>
            </div>
            <Footer />
            
        </div>
        
    )
}

export default AboutUs
