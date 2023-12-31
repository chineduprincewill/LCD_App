import React, { Fragment, useContext, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { updateMember } from '../../../actions/membersActions';
import { AuthContext } from '../../../context/AuthContex';
import { DataContext } from '../../../context/DataContext';
import FormButton from '../../common/FormButton';
import BranchesList from '../../../widgets/BranchesList';

const EditMemberForm = ({ membr, setEditMember }) => {

    const { token } = useContext(AuthContext);
    const { refreshRecord } = useContext(DataContext);

    const id = membr.id;
    const branch = membr.branch;
    const [category, setCategory] = useState(membr.category);
    const [lastname, setLastname] = useState(membr.lastname);
    const [firstname, setFirstname] = useState(membr.firstname);
    const [othernames, setOthernames] = useState(membr.othernames);
    const [mobile, setMobile] = useState(membr.mobile)
    const [email, setEmail] = useState(membr.email);
    const [gender, setGender] = useState(membr.gender);
    const [branchid, setBranchid] = useState(membr.branchid);
    const [wing, setWing] = useState(membr.wing);
    const [region, setRegion] = useState(membr.region);
    const [subgroup, setSubgroup] = useState(membr.subgroup);

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const closeForm = () => {
        setEditMember(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            id, category, lastname, firstname, othernames, gender, branchid, wing, region, subgroup, mobile, email
        }

        updateMember(token, data, setSuccess, setError, setSubmitting);
    }

    if(success !== null){
        refreshRecord(Date.now());
        alert(success);
        closeForm();
    }

    return (
        <div>
            <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className='w-full md:w-[900px] bg-gray-100 border border-gray-400 dark:text-gray-700 rounded-xl px-4 py-1'>
                        <div className='flex justify-end border-b border-gray-200 py-2 text-red-500'>
                            <span
                                className='cursor-pointer'
                                onClick={(e) => closeForm()}
                            >    
                                <AiOutlineCloseCircle />
                            </span>
                        </div>
                        <div className='px-6'>
                            <div className='text-lg my-2 flex justify-start text-slate-500'>Update Member</div>
                            {error !== null && <span className='text-red-500 py-2'>{error}</span>}
                            <form onSubmit={handleSubmit}>
                                <div className='flex justify-between'>
                                    <select
                                        className="w-full bg-transparent m-3 p-2 border-b border-slate-500"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    >
                                        <option value="">select category</option>
                                        <option value="Individual">Individual</option>
                                        <option value="Group">Group</option>
                                    </select>
                                    
                                </div>
                                <div className='flex justify-between'>
                                    <input 
                                        input type="text"
                                        className="w-full bg-transparent m-3 p-2 border-b border-slate-500"
                                        placeholder={category === 'Group' ? 'Branch/Group name' : 'Last name'}
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        required
                                    />
                                    <input 
                                        input type="text"
                                        className={`w-full bg-transparent m-3 p-2 border-b border-slate-500 ${category === 'Group' && 'hidden'}`}
                                        value={firstname}
                                        placeholder='First name'
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
                                    
                                </div>
                                <div className='flex justify-between'>
                                    <input 
                                        input type="text"
                                        className={`w-full bg-transparent m-3 p-2 border-b border-slate-500 ${category === 'Group' && 'hidden'}`}
                                        value={othernames}
                                        placeholder='Other names'
                                        onChange={(e) => setOthernames(e.target.value)}
                                    />
                                    <input 
                                        input type="text"
                                        className="w-full bg-transparent m-3 p-2 border-b border-slate-500"
                                        placeholder='Mobile'
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        required
                                    />
                                    
                                </div>
                                <div className='flex justify-between'>
                                    <input 
                                        input type="text"
                                        className="w-full bg-transparent m-3 p-2 border-b border-slate-500"
                                        value={email}
                                        placeholder='Email'
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <select
                                        className="w-full bg-transparent m-3 p-2 border-b border-slate-500"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        required
                                    >
                                        <option value="">select gender</option>
                                        {category === 'Individual' ? 
                                            <Fragment>
                                                <option value="male">male</option>
                                                <option value="female">female</option>
                                            </Fragment> :
                                            <option value="group">group</option>   
                                        }
                                    </select>
                                    
                                </div>
                                <div className='flex justify-between'>
                                    <select
                                        className="w-full bg-transparent m-3 p-2 border-b border-slate-500"
                                        onChange={(e) => setBranchid(e.target.value)}
                                        required
                                    >
                                        <option value={branchid}>{branch}</option>
                                        <BranchesList />
                                    </select>
                                    <select
                                        className="w-full bg-transparent m-3 p-2 border-b border-slate-500"
                                        value={wing}
                                        onChange={(e) => setWing(e.target.value)}
                                        required
                                    >
                                        <option value="">select wing</option>
                                        {category === 'Individual' ? 
                                            <Fragment>
                                                <option value="Fathers">Fathers</option>
                                                <option value="Mothers">Mothers</option>
                                                <option value="Youths">Youths</option>
                                                <option value="Children">Children</option>
                                            </Fragment> :
                                            <option value="Group">Group</option>
                                        }
                                    </select>
                                </div>
                            { category === 'Individual' && 
                                <div className='flex justify-between'>
                                    <select
                                        className="w-full bg-transparent m-3 p-2 border-b border-slate-500"
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
                                        required
                                    >
                                        <option value="">select region</option>
                                        <option value="Nigeria">Nigeria</option>
                                        <option value="Oversea">Oversea</option>
                                    </select>
                                    <select
                                        className="w-full bg-transparent m-3 p-2 border-b border-slate-500"
                                        value={subgroup}
                                        onChange={(e) => setSubgroup(e.target.value)}
                                        required
                                    >
                                        <option value="">select subgroup</option>
                                        <option value="Business">Business</option>
                                        <option value="Civil servant">Civil servant</option>
                                        <option value="Undergraduate">Undergraduate</option>
                                        <option value="GCE">GCE</option>
                                        <option value="Secondary">Secondary</option>
                                        <option value="Primary">Primary</option>
                                        <option value="Nursery">Nursery</option>
                                    </select>
                                </div>
                            }
                                <div className='flex justify-end'>
                                    <div className='w-[50%]'>
                                        {submitting ? <FormButton /> :
                                            <button
                                                className='w-full bg-[#141e31] hover:bg-[#0b1425] my-8 p-2 text-white rounded-full'
                                                type='submit'
                                            >
                                                Update
                                            </button>
                                        }
                                    </div>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditMemberForm


