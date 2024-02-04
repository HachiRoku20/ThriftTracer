import { useExpensesContext } from "../hooks/useExpensesContext";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns";
import { useAuthContext } from "../hooks/userAuthContext";


const ExpensesComponent = ({ expense }) => {

    const { dispatch } = useExpensesContext()
    const { user } = useAuthContext()


    const handleClick = async () => {

        const response = await fetch('http://localhost:5555/expenses/' + expense._id,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_EXPENSES', payload: json })
        }

    }

    return (
        <div className="p-4 my-2 mx-4 flex flex-col bg-gray-800 rounded-md">
            <div className="flex space-bet justify-between">
                <h2>USER: {expense.title}</h2>
                <button className="rounded-xl bg-red-700 w-fit p-1 " onClick={handleClick}><MdDelete size={15} /></button>
            </div>

            <p>{expense.description}</p>
            <p className="text-red-700 font-bold">₱{expense.amount}</p>
            <p>CATEGORY: {expense.category}</p>
            <p>{format(new Date(expense.createdAt), 'MMM d, y | p')}</p>

        </div>

    )
}

export default ExpensesComponent;