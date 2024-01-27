import { useEffect, useState } from "react";
import ExpensesComponent from "./ExpensesComponent.jsx";
import ExpensesForm from '../components/ExpensesForm.jsx'
import { useExpensesContext } from "../hooks/useExpensesContext.jsx";


const ExpensesPage = () => {

    // const [expenses, setExpenses] = useState(null)

    const { expenses, dispatch } = useExpensesContext()





    // Sets INITIAL STATE for EXPENSES using CONTEXT
    useEffect(() => {
        const fetchExpenses = async () => {

            //*Fetches Expenses Log
            const response = await fetch('http://localhost:5555/expenses');
            //*Converts to JSON Format
            const json = await response.json();

            //*State Setter for (expenses)
            if (response.ok) {
                dispatch({ type: 'SET_EXPENSES', payload: json })

            }
        }


        fetchExpenses();

    }, [])


    console.log(expenses);



    return (
        <div className="container mx-auto text-slate-100 max-w-screen-xl">

            <div className="flex flex-col" >
                {expenses && expenses.map((expense) => (
                    <ExpensesComponent key={expense._id} expense={expense} />
                ))}
            </div>


            <ExpensesForm />

        </div>



    )
}

export default ExpensesPage;