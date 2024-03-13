import { useEffect, useState } from "react";
import IncomeComponent from "./IncomeComponent.jsx";
import IncomeForm from './IncomeForm.jsx'
import { useIncomeContext } from "../hooks/useIncomeContext.jsx";
import PaginationButtons from "./utils/PaginationButtons.jsx";
import MonthlyFilterButtons from "./utils/MonthlyFilterButtons.jsx";


const IncomePage = () => {

    // const [expenses, setExpenses] = useState(null)

    const { income, dispatch } = useIncomeContext()
    const [page, setPage] = useState(1)
    const date = new Date();

    const [monthQuery, setMonthQuery] = useState(date.getMonth() + 1)
    const [yearQuery, setYearQuery] = useState(date.getFullYear())





    // Sets INITIAL STATE for Income using CONTEXT

    useEffect(() => {
        const fetchIncome = async () => {

            //*Fetches Expenses Log
            const response = await fetch(`http://localhost:5555/income?page=${page}&month=${monthQuery}&year=${yearQuery}`, {
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

    }, [page, monthQuery, yearQuery])



    console.log(income);

    // *Previous Page Setter
    const handlePrevPage = () => {
        setPage((p) => {
            if (p === 1) {
                return p
            }
            return p - 1
        })
    }

    // *Next Page Setter
    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1)
    }

    // * Previous Month & Year Setter
    const handlePreviousMonth = () => {
        if (monthQuery === 1) {
            setMonthQuery(12)
            setYearQuery(prevYear => prevYear - 1)
        } else {
            setMonthQuery(prevMonth => prevMonth - 1)
        }


        console.log(monthQuery, yearQuery)
    }


    // * Next Month & Year Setter
    const handleNextMonth = () => {
        if (monthQuery === 12) {
            setMonthQuery(1)
            setYearQuery(prevYear => prevYear + 1)
        } else {
            setMonthQuery(prevMonth => prevMonth + 1)
        }


        console.log(monthQuery, yearQuery)
    }


    return (
        <div className="container mx-auto text-slate-100 max-w-screen-xl">

            <div className="flex justify-between">
                <MonthlyFilterButtons monthQuery={monthQuery} yearQuery={yearQuery} onPreviousMonth={handlePreviousMonth} onNextMonth={handleNextMonth} />
                <PaginationButtons page={page} onPrevPage={handlePrevPage} onNextPage={handleNextPage} />
            </div>
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