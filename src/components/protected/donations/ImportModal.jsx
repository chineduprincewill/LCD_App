import React, { useContext, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaFileImport } from 'react-icons/fa';
import { importDonations } from '../../../actions/donationsActions';
import { AuthContext } from '../../../context/AuthContex';
import { useNavigate } from 'react-router-dom';

const ImportModal = ({ setImportModal }) => {

    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [doc, setDoc] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [importing, setImporting] = useState(false);
    
    const closeModal = () => {
        setImportModal(false);
    }

    const handleImport = (e) => {
        setDoc(e.target.files[0]);
    }


    const importDoc = () => {
        if(doc === null){
            alert('No file was selected!');
        }
        else{
            let formData = new FormData();
            formData.append('donations_file',doc);
    
            importDonations(token, formData, setSuccess, setError, setImporting)
        }
    }

    if(success !== null){
        alert(success);
        setSuccess(null);
        setImportModal(false);
        navigate('/donations');
    }


    return (
        <div>
            <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity'></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex mt-16 md:mt-0 md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className='w-full md:w-[500px] bg-gray-100 border border-gray-400 dark:text-gray-700 rounded-xl px-4 py-1'>
                        <div className='flex justify-between items-center border-b border-gray-200 py-2 text-red-500'>
                            <div className='text-lg flex justify-start text-slate-500'>Import Donations</div>
                            <div
                                className='cursor-pointer'
                                onClick={(e) => closeModal()}
                            >    
                                <AiOutlineCloseCircle />
                            </div>
                        </div>
                        <div className='p-4'>
                            {error !== null && <span className='text-red-500 py-2'>{error}</span>}
                            <div className='w-full flex justify-start mb-2 text-gray-600'><span>Browse and select file excel file to import</span></div>
                            <div className="my-4">
                                <input 
                                    type="file" 
                                    id='formFile'
                                    className='block w-full text-gray-600 file:mr-4 file:py-3 file:px-4 file:rounded-full file:border-0  file:bg-gray-200 file:text-sm file:text-[#141e31] hover:file:bg-gray-300'
                                    onChange={handleImport}
                                />
                            </div>
                            <div className='my-6'>
                                <div 
                                    className='flex max-w-fit justify-start items-center space-x-2 rounded-full bg-[#253450] hover:bg-[#141e31] px-6 py-3 text-white cursor-pointer'
                                    onClick={(e) => importDoc()}
                                >
                                    <FaFileImport size={12} />
                                    <span>{importing ? 'Importing...' : 'Import'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImportModal
