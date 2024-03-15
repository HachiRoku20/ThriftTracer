import { MdDelete } from "react-icons/md";
import { format } from "date-fns";
import { useDeleteExpenseMutation } from "../store/store";

const ExpensesComponent = ({ transaction, onClickHandler }) => {



    console.log("EXPENSE COMPONENTS BEING RENDERED")


    const handleClick = async () => {

        onClickHandler(transaction)


    }

    return (
        <div className="p-4 my-2 mx-4 flex flex-col bg-gray-800 rounded-md break-words">
            <div className="flex space-bet justify-between break-words">
                <h2 className="px-1 font-bold break-words">{transaction.title}</h2>
                <button className="rounded-xl bg-red-700 px-1 " onClick={handleClick}><MdDelete size={15} /></button>
            </div>

            {transaction.description && <p className="bg-gray-700 rounded-md my-2 px-1">{transaction.description}</p>}
            <p className="text-orange-600 font-bold px-1">₱{transaction.amount}</p>
            {transaction.category ? <><p className="px-1">Category: {transaction.category}</p>
                <p className="px-1">Account: {transaction.account}</p> </>
                :
                <p className="px-1">Account: {transaction.account}</p>}

            <p className="px-1">{format(new Date(transaction.createdAt), 'MMM d, y | p')}</p>

        </div>

    )
}

export default ExpensesComponent;