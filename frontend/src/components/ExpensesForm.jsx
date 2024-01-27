import { useState } from "react"
import { useExpensesContext } from "../hooks/useExpensesContext"

import formatDistanceToNow from 'date-fns/formatDistanceToNow'



const ExpensesForm = () => {

    const { dispatch } = useExpensesContext()

    const [user, setUser] = useState('')
    const [description, setDesc] = useState('')
    const [amount, setamount] = useState('')
    const [category, setcategory] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()





        const expense = { user_id: user, description, amount, category }

        console.log(JSON.stringify(expense))

        const response = await fetch('http://localhost:5555/expenses', {
            method: 'POST',
            body: JSON.stringify(expense),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)

        } else
            if (response.ok) {
                setUser('')
                setDesc('')
                setamount('')
                setcategory('')
                setError(null)
                setEmptyFields([])
                console.log('expense recorded', json)
                dispatch({ type: 'CREATE_EXPENSES', payload: json })
            }

    }










    return (

        <div className="max-w-screen-xl mx-auto px-4">
            <form className="flex flex-col text-slate-50" onSubmit={handleSubmit}>
                <h3 className="mx-auto font-bold text-red-600 md:text-4xl">ADD EXPENSE</h3>

                <label className="p-4"> User </label>
                <input
                    type="text"
                    onChange={(test) => setUser(test.target.value)}
                    value={user}
                    className={"outline-none sm:text-xl font-bold bg-gray-800 p-2 rounded-md " + (emptyFields.includes('user_id') ? "outline-red-700" : "")}
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
                    <i className="ml-2 mt-[8px] sm:text-xl absolute font-bold">₱</i>
                    <input

                        type="number"
                        onChange={(test) => setamount(test.target.value)}
                        value={amount}
                        className={"outline-none sm:text-xl font-bold bg-gray-800 px-6 py-2 rounded-md w-full " + (emptyFields.includes('amount') ? "outline-red-700" : "")}
                    />
                </div>


                <label className="p-4"> Category </label>


                <input
                    type="text"
                    onChange={(test) => setcategory(test.target.value)}
                    value={category}
                    className={"outline-none text-xl sm:text-3l font-bold bg-gray-800 p-2 rounded-md " + (emptyFields.includes('category') ? "outline-red-700" : "")}
                />



                <div className="flex flex-col space-bet justify-between">
                    <button className="rounded-md bg-emerald-400 p-2 m-6 w-fit justify-self-end	self-center font-bold">ADD EXPENSE</button>
                    {error && <div className="p-4 my-2 mx-4 flex flex-col rounded-md bg-red-700 font-bold">{error}</div>}
                </div>

            </form >
        </div >

    )

}

export default ExpensesForm;