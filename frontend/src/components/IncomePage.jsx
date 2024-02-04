import { useEffect, useState } from "react";
import IncomeComponent from "./IncomeComponent.jsx";
import IncomeForm from './IncomeForm.jsx'
import { useIncomeContext } from "../hooks/useIncomeContext.jsx";

import { useAuthContext } from "../hooks/userAuthContext.jsx";


const IncomePage = () => {

    // const [expenses, setExpenses] = useState(null)

    const { income, dispatch } = useIncomeContext()
    const { user } = useAuthContext()





    // Sets INITIAL STATE for EXPENSES using CONTEXT

    useEffect(() => {
        const fetchIncome = async () => {

            //*Fetches Expenses Log
            const response = await fetch('http://localhost:5555/income', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            //*Converts to JSON Format
            const json = await response.json();

            //*State Setter for (expenses)
            if (response.ok) {
                dispatch({ type: 'SET_INCOME', payload: json })

            }
        }

        if (user) {
            fetchIncome();
        }

    }, [])



    console.log(income);



    return (
        <div className="container mx-auto text-slate-100 max-w-screen-xl">

            <div className="flex flex-col" >
                {income && income.map((income) => (
                    <IncomeComponent key={income._id} income={income} />
                ))}
            </div>


            <IncomeForm />

        </div>



    )
}

export default IncomePage;