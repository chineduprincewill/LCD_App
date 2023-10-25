import React, { useContext, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { createBranch } from '../../../actions/branchesActions'
import { AuthContext } from '../../../context/AuthContex'
import FormButton from '../../common/FormButton'

const NewbranchForm = ({ setForm, setIsCreated }) => {

    const { token } = useContext(AuthContext);

    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('');

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const closeForm = () => {
        setForm(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            category, title, mobile, email
        }

        createBranch(token, data, setSuccess, setError, setSubmitting);
    }

    if(success !== null){
        setIsCreated(Date.now());
        alert(success);
        closeForm();
    }

    return (
        <div>
            <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className='w-full md:w-[500px] bg-gray-100 border border-gray-400 dark:text-gray-700 rounded-xl px-4 py-1'>
                        <div className='flex justify-end border-b border-gray-200 py-2 text-red-500'>
                            <span
                                className='cursor-pointer'
                                onClick={(e) => closeForm()}
                            >    
                                <AiOutlineCloseCircle />
                            </span>
                        </div>
                        <div className='px-6'>
                            <div className='text-lg my-2 flex justify-start text-slate-500'>New Branch or Group</div>
                            {error !== null && <span className='text-red-500 py-2'>{error}</span>}
                            <form onSubmit={handleSubmit}>
                                <select
                                    className="w-full bg-transparent my-3 p-2 border-b border-slate-500"
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="">select category</option>
                                    <option value="Branch">Branch</option>
                                    <option value="Group">Group</option>
                                </select>
                                <input 
                                    input type="text"
                                    className="w-full bg-transparent my-3 p-2 border-b border-slate-500"
                                    placeholder='Title'
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <input 
                                    input type="text"
                                    className="w-full bg-transparent my-3 p-2 border-b border-slate-500"
                                    placeholder='Mobile'
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                                <input 
                                    input type="text"
                                    className="w-full bg-transparent my-3 p-2 border-b border-slate-500"
                                    placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {submitting ? 
                                    <FormButton /> :
                                    <button
                                        className='w-full bg-[#141e31] hover:bg-[#0b1425] text-white my-8 p-2 rounded-full'
                                        type='submit'
                                    >
                                        Create
                                    </button>
                                }
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewbranchForm
