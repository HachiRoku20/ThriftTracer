import { useState, useEffect, memo } from "react"
import { useAddExpenseMutation } from "../store/store"


import formatDistanceToNow from 'date-fns/formatDistanceToNow'



const ExpensesForm = memo(() => {

    //INITIALIZATIONS

    const [title, setTitle] = useState('')
    const [description, setDesc] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [confirmMessage, setConfirmMessage] = useState(null)

    const [addExpense, results] = useAddExpenseMutation()

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
            setCategory('');
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


        const expense = { title, description, amount, category }

        await addExpense(expense);

        console.log(results);

    }










    return (

        <div className="max-w-screen-xl px-4">
            <form className="flex flex-col text-slate-50" onSubmit={handleSubmit}>


                <label className="p-4"> Title </label>
                <input
                    type="text"
                    onChange={(test) => setTitle(test.target.value)}
                    value={title}
                    className={"outline-none sm:text-xl font-bold bg-gray-800 p-2 rounded-md " + (emptyFields.includes('title') ? "outline-red-700" : "")}
                />

                <label className="p-4"> Description </label>
                <input
                    type="text"
                    onChange={(test) => setDesc(test.target.value)}
                    value={description}
                    className={"outline-none sm:text-xl font-bold bg-gray-800 p-2 rounded-md " + (emptyFields.includes('description') ? "outline-red-700" : "")}
                />



                <label className="p-4"> Amount </label>

                <div>

                    <input

                        type="number"
                        onChange={(test) => setAmount(parseInt(test.target.value, 10))}
                        value={amount}
                        className={"outline-none sm:text-xl font-bold bg-gray-800 px-6 py-2 rounded-md w-full " + (emptyFields.includes('amount') ? "outline-red-700" : "")}
                    />
                </div>


                <label className="p-4"> Category </label>


                <input
                    type="text"
                    onChange={(test) => setCategory(test.target.value)}
                    value={category}
                    className={"outline-none text-xl sm:text-3l font-bold bg-gray-800 p-2 rounded-md " + (emptyFields.includes('category') ? "outline-red-700" : "")}
                />



                <div className="flex flex-col space-bet justify-between">
                    <button className="rounded-md bg-orange-600 p-2 m-6 w-fit justify-self-end	self-center font-bold">ADD EXPENSE</button>
                    {error && <div className="p-4 my-2 mx-4 flex flex-col rounded-md bg-red-700 font-bold">{error}</div>}
                </div>
                <div className="flex flex-col space-bet justify-between">
                    {confirmMessage && <div className="p-4 my-2 mx-4 flex flex-col rounded-md bg-orange-600 first-line:font-bold"><b>-₱{confirmMessage}</b>removed from user's account</div>}
                </div>

            </form >
        </div >

    )

})

export default ExpensesForm;