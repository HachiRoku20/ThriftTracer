import { useState } from "react"
import { useIncomeContext } from "../hooks/useIncomeContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../hooks/userAuthContext"



const IncomeForm = () => {

    const { user } = useAuthContext()

    const { dispatch } = useIncomeContext()

    const [title, setTitle] = useState('')
    const [description, setDesc] = useState('')
    const [amount, setamount] = useState('')
    const [type, setType] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [confirmMessage, setConfirmMessage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()



        const income = { title, description, amount, type }

        console.log(amount)
        console.log(JSON.stringify(income))

        const response = await fetch('http://localhost:5555/income', {
            method: 'POST',
            body: JSON.stringify(income),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        console.log(json.error)
        console.log(json.emptyFields)

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)

        } else
            if (response.ok) {
                setTitle('')
                setDesc('')
                setamount('')
                setType('')
                setError(null)
                setEmptyFields([])
                setConfirmMessage(amount)
                console.log('Income recorded', json)
                dispatch({ type: 'CREATE_INCOME', payload: json })
            }

    }










    return (

        <div className="max-w-screen-xl mx-auto px-4">
            <form className="flex flex-col text-slate-50" onSubmit={handleSubmit}>
                <h3 className="mx-auto font-bold text-emerald-400 md:text-4xl">ADD INCOME</h3>

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
                    <i className="ml-2 mt-[8px] sm:text-xl absolute font-bold">₱</i>
                    <input

                        type="number"
                        onChange={(test) => setamount(parseInt(test.target.value, 10))}
                        value={amount}
                        className={"outline-none sm:text-xl font-bold bg-gray-800 px-6 py-2 rounded-md w-full " + (emptyFields.includes('amount') ? "outline-red-700" : "")}
                    />
                </div>


                <label className="p-4"> Category </label>


                <input
                    type="text"
                    onChange={(test) => setType(test.target.value)}
                    value={type}
                    className={"outline-none text-xl sm:text-3l font-bold bg-gray-800 p-2 rounded-md " + (emptyFields.includes('category') ? "outline-red-700" : "")}
                />



                <div className="flex flex-col space-bet justify-between">
                    <button className="rounded-md bg-emerald-400 p-2 m-6 w-fit justify-self-end	self-center font-bold">ADD INCOME</button>
                    {error && <div className="p-4 my-2 mx-4 flex flex-col rounded-md bg-red-700 font-bold">{error}</div>}
                </div>
                <div className="flex flex-col space-bet justify-between">
                    {confirmMessage && <div className="p-4 my-2 mx-4 flex flex-col rounded-md bg-emerald-400 font-bold">₱{confirmMessage} added to {user.username}'s account</div>}
                </div>

            </form >
        </div >

    )

}

export default IncomeForm;