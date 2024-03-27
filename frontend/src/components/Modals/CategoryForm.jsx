import React from 'react'
import { useState, useEffect, memo } from 'react'
import { useAddAccountMutation } from '../../store/store'
import { createPortal } from 'react-dom'
import BackdropBlur from '../utils/BackdropBlur'
import { IoIosCloseCircleOutline } from "react-icons/io";



const AccountForm = memo(({ isOpen, onClose }) => {

    console.log("ACCOUNT FORM RENDERS")

    const [categoryName, setAccountName] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState()
    const [confirmMessage, setConfirmMessage] = useState()

    const [addAccount, results] = useAddAccountMutation()

    useEffect(() => {
        console.log(results)
        console.log(results.error?.data?.error)
        console.log(results.error?.data?.emptyFields)
        if (results.isSuccess) {
            setAccountName('');
            setInitialAmount('');
            setEmptyFields([]);
            setConfirmMessage(true);
            setTimeout(() => {
                setConfirmMessage(null);
            }, 8000);
        } else if (results.isError) {
            setError(results.error?.data?.error);
            setEmptyFields(results.error?.data?.emptyFields || []);
            setTimeout(() => {
                setError(null);
                setEmptyFields([]);
            }, 6000);
        }
    }, [results]);



    const handleSubmit = async (e) => {
        e.preventDefault()

        const newAccount = {
            accountName,
            initialAmount
        }

        console.log(newAccount)
        await addAccount(newAccount)



    }

    if (!isOpen) return null;
    return createPortal(

        <>
            <div className=" fixed top-0 right-0 left-0 z-50 justify-center items-center inset-0 h-fit bg-[#121212] mx-10 my-auto md:mx-auto p-4 py md:max-w-md rounded-md border border-gray-500 text-slate-50">
                <div className='w-full flex justify-end'><button onClick={onClose}><IoIosCloseCircleOutline size={25} />
                </button></div>
                <h2 className=' font-bold text-center'> ADD NEW ACCOUNT</h2>
                <form className="flex flex-col text-slate-50" onSubmit={handleSubmit}>

                    <label className="p-4"> Account Name </label>
                    <input
                        type="text"
                        maxLength="20"
                        onChange={(test) => setAccountName(test.target.value)}
                        value={accountName}
                        className={"block w-full rounded-md border-1 p-1.5 bg-gray-800 sm:text-sm sm:leading-6 " + (emptyFields.includes('accountName') ? "border-red-700" : "")}
                    />

                    <label className="p-4"> Initial Amount </label>
                    <input
                        type="text"
                        maxLength="20"
                        onChange={(test) => setInitialAmount(test.target.value)}
                        value={initialAmount}
                        className={"block w-full rounded-md border-1 p-1.5 bg-gray-800 sm:text-sm sm:leading-6 " + (emptyFields.includes('initialAmount') ? "border-red-700" : "")}
                    />



                    <div className="flex flex-col space-bet justify-between">
                        <button className="shadow-sm     shadow-black rounded-md bg-gray-800 p-2 m-6 w-fit justify-self-end	self-center font-bold">ADD ACCOUNT</button>
                        {error && <div className="p-4 my-2 mx-4 flex flex-col rounded-md bg-red-700 font-bold">{error}</div>}
                    </div>
                    <div className="flex flex-col space-bet justify-between">
                        {confirmMessage && <div className="p-4 my-2 mx-4 flex flex-col rounded-md bg-orange-600 first-line:font-bold">Added to user's account</div>}
                    </div>

                </form >
            </div >

            <BackdropBlur />
        </>
        ,
        document.getElementById('modal')
    )
})

export default AccountForm