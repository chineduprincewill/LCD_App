import React from 'react'
import ButtonLoader from './ButtonLoader'

const FormButton = () => {
    return (
        <button className='w-full flex justify-center p-2 my-8 rounded-full bg-[#141e31] hover:bg-[#0b1425] text-white'>
            <ButtonLoader />
        </button>
    )
}

export default FormButton
