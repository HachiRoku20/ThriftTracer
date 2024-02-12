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
        <div className="p-4 my-2 mx-4 flex flex-col bg-gray-800 rounded-md  md:basis-[calc(50%-2rem)]">
            <div className="flex space-bet justify-between">
                <h2 className="px-1 font-bold">{expense.title}</h2>
                <button className="rounded-xl bg-red-700 w-fit px-1 " onClick={handleClick}><MdDelete size={15} /></button>
            </div>

            {expense.description && <p className="bg-gray-700 rounded-md my-2 px-1 w-fit">{expense.description}</p>}
            <p className="text-orange-600 font-bold px-1">-₱{expense.amount}</p>
            <p className="px-1">CATEGORY: {expense.category}</p>
            <p className="px-1">{format(new Date(expense.createdAt), 'MMM d, y | p')}</p>

        </div>

    )
}

export default ExpensesComponent;