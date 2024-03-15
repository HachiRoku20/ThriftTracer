import { useState, useEffect, memo } from "react"
import { useAddExpenseMutation } from "../store/store"
import { Listbox } from '@headlessui/react'
import { useGetUserDataQuery, useAddIncomeMutation } from "../store/store.jsx";
import { FaChevronDown } from "react-icons/fa6";

import formatDistanceToNow from 'date-fns/formatDistanceToNow'



const IncomeForm = memo(() => {

    const { data } = useGetUserDataQuery()
    const [addIncome, results] = useAddIncomeMutation();

    //INITIALIZATIONS

    const [title, setTitle] = useState('')
    const [description, setDesc] = useState('')
    const [amount, setAmount] = useState('')
    const [account, setAccount] = useState('Loading...')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [confirmMessage, setConfirmMessage] = useState(null)

    useEffect(() => {
        if (data) {
            setAccount(data.accounts[0].title);
        }
    }, [data]);

    console.log("FORM BEING RERENDERED")

    //FUNCTIONS


    const timerFunc = (callback) => {
        setTimeout(() => {
            callback();
        }, 6000);

    }

    // *Expense Form Validation
    useEffect(() => {
        if (results.isSuccess) {
            setTitle('');
            setDesc('');
            setAmount('');
            setError(null);
            setEmptyFields([]);
            setConfirmMessage(amount);
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


        const income = { title, description, amount, account }

        await addIncome(income);

        console.log(results);

    }










    return (

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm px-2">
            <form className="flex flex-col text-slate-50" onSubmit={handleSubmit}>


                <label className="p-4"> Title </label>
                <input
                    type="text"
                    maxLength="20"
                    onChange={(test) => setTitle(test.target.value)}
                    value={title}
                    className={"block w-full rounded-md border-0 p-1.5 bg-gray-800 focus:ring-inset sm:text-sm sm:leading-6 " + (emptyFields.includes('title') ? "outline-red-700" : "")}
                />

                <label className="p-4"> Description </label>
                <input
                    type="text"
                    maxLength="50"
                    onChange={(test) => setDesc(test.target.value)}
                    value={description}
                    className={"block w-full rounded-md border-0 p-1.5 bg-gray-800 focus:ring-inset sm:text-sm sm:leading-6 " + (emptyFields.includes('description') ? "outline-red-700" : "")}
                />



                <label className="p-4"> Amount </label>

                <div>

                    <input

                        type="number"
                        onChange={(test) => setAmount(parseInt(test.target.value, 10))}
                        value={amount}
                        className={"block w-full rounded-md border-0 p-1.5 bg-gray-800 focus:ring-inset sm:text-sm sm:leading-6 appearance-none [&::-webkit-inner-spin-button]:appearance-none" + (emptyFields.includes('amount') ? "outline-red-700" : "")}
                    />
                </div>


                <label className="p-4"> Account</label>


                <Listbox value={account} onChange={setAccount}>
                    <div className="relative">
                        <Listbox.Button className="inline-flex justify-between w-full rounded-md border-0 p-1.5 bg-gray-800 ui-active:ring-inset sm:text-sm sm:leading-6 text-left">{account} <FaChevronDown className="my-auto text-white " size={15} />
                        </Listbox.Button>
                        <Listbox.Options className="block w-full rounded-md border-0 p-1.5 max-h-52 overflow-auto bg-gray-800 focus:ring-inset sm:text-sm sm:leading-6 text-left absolute right-0 z-10 mt-2 shadow-md shadow-black ring-1 ring-black ring-opacity-5">
                            {data?.accounts.map((account, index) => (
                                <Listbox.Option
                                    className={'rounded-md block px-4 py-2 hover:bg-gray-600 '}
                                    key={index}
                                    value={account.title}
                                >
                                    {account.title}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                </Listbox>





                <div className="flex flex-col space-bet justify-between">
                    <button className="shadow-sm     shadow-black rounded-md bg-gray-800 p-2 m-6 w-fit justify-self-end	self-center font-bold">ADD EXPENSE</button>
                    {error && <div className="p-4 my-2 mx-4 flex flex-col rounded-md bg-red-700 font-bold">{error} {emptyFields}</div>}
                </div>
                <div className="flex flex-col space-bet justify-between">
                    {confirmMessage && <div className="p-4 my-2 mx-4 flex flex-col rounded-md bg-orange-600 first-line:font-bold"><b>-₱{confirmMessage}</b>removed from user's account</div>}
                </div>

            </form >


        </div >

    )

})

export default IncomeForm;