import { useIncomeContext } from "../hooks/useIncomeContext";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns";
import { useAuthContext } from "../hooks/userAuthContext";


const IncomeComponent = ({ income }) => {

    const { dispatch } = useIncomeContext()
    const { user } = useAuthContext()


    const handleClick = async () => {

        const response = await fetch('http://localhost:5555/income' + income._id,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_INCOME', payload: json })
        }

    }

    return (
        <div className="p-4 my-2 mx-4 flex flex-col bg-gray-800 rounded-md">
            <div className="flex space-bet justify-between">
                <h2>{income.title}</h2>
                <button className="rounded-xl bg-red-700 w-fit p-1 " onClick={handleClick}><MdDelete size={15} /></button>
            </div>

            <p>{income.description}</p>
            <p className="text-emerald-400 font-bold">₱{income.amount}</p>
            <p>TYPE: {income.type}</p>
            <p>{format(new Date(income.createdAt), 'MMM d, y | p')}</p>

        </div>

    )
}

export default IncomeComponent;