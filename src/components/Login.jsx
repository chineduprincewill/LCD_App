import React, { useEffect, useState } from 'react'
import Banner from './common/Banner'
import PublicHeader from './PublicHeader'
import Footer from './common/Footer'
import { useNavigate } from 'react-router-dom'
import Spinner from '../widgets/Spinner'
import { loginUser } from '../actions/authActions'
import ButtonLoader from './common/ButtonLoader'

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logginIn, setLogginIn] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleLogin = async () => {

        if(email === '' || password === ''){
            alert('You must enter email and password')
        }
        else{ 

            const data = {
                email, password
            }
            
            loginUser(data, setSuccess, setError, setLogginIn);
            
        }

    }

    if(success !== null){
        localStorage.setItem("login", JSON.stringify({
            userLogin: true,
            token: success?.token,
            role: success?.role,
            user: success?.user
        }));

        location.reload();
        navigate('/dashboard');
    }


    useEffect(() => {
        if(localStorage.getItem('login') !== null){
            navigate('/dashboard');
        }
    }, [navigate])

    return (
        <div className='h-screen'>
            <PublicHeader />
            <div className='md:flex md:justify-center my-6 z-50'>
                <Banner />
                <div className='w-full border-t pt-12 md:pt-0 md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 md:w-2/4 lg:w-1/4 flex justify-center items-center '>
                    <div className="col-span-2 w-full px-8  lg:pl-8">
                        <div className='text-4xl font-extralight py-3'>
                            Login
                        </div>
                        {error && <span className='text-red-500'>{error}</span>}
                        <input 
                            type="email" 
                            placeholder="email"
                            className="w-full bg-transparent p-3 border-b border-slate-500 mt-12 mb-6"
                            onChange={(e) => setEmail(e.target.value)}
                        />
            
                        <input 
                            type="password" 
                            placeholder="password"
                            className="w-full bg-transparent p-3 border-b border-slate-500 my-6"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {logginIn ? 
                            <button className='w-full flex justify-center p-4 my-12 rounded-full bg-red-700 hover:bg-red-900 text-white'>
                                <ButtonLoader />
                            </button>
                            : 
                            <button 
                                className="w-full bg-red-700 hover:bg-red-900 text-white p-4 rounded-full my-12"
                                onClick={handleLogin}
                            >
                                Sign in
                            </button>
                        }
                    </div>
                </div>
            </div>
            <Footer />
            
        </div>
    )
}

export default Login
