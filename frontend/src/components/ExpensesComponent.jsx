import { MdDelete } from "react-icons/md";
import { format } from "date-fns";
import { useDeleteExpenseMutation } from "../store/store";

const ExpensesComponent = ({ expense }) => {

    const [deleteExpense, results] = useDeleteExpenseMutation()

    console.log("EXPENSE COMPONENTS BEING RENDERED")


    const handleClick = async () => {

        deleteExpense(expense)


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