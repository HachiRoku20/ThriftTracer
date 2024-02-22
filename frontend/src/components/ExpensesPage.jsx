import { useEffect, useState } from "react";
import ExpensesComponent from "./ExpensesComponent.jsx";
import ExpensesForm from '../components/ExpensesForm.jsx'
import { useExpensesContext } from "../hooks/useExpensesContext.jsx";
import { useAuthContext } from "../hooks/userAuthContext.jsx";
import PaginationButtons from "./PaginationButtons.jsx";
import MonthlyFilterButtons from "./MonthlyFilterButtons.jsx";
import { useLogout } from "../hooks/useLogout.jsx";
import { FaArrowUp } from "react-icons/fa";

const ExpensesPage = () => {

    const { logout } = useLogout();

    // const [expenses, setExpenses] = useState(null)

    const { expenses, dispatch } = useExpensesContext()
    const { user } = useAuthContext()
    const [page, setPage] = useState(1)

    const date = new Date();

    const [monthQuery, setMonthQuery] = useState(date.getMonth() + 1)
    const [yearQuery, setYearQuery] = useState(date.getFullYear())







    // Sets INITIAL STATE for EXPENSES using CONTEXT

    useEffect(() => {
        const fetchExpenses = async () => {

            //*Fetches Expenses Log
            const response = await fetch(`http://localhost:5555/expenses?page=${page}&month=${monthQuery}&year=${yearQuery}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            //*Converts to JSON Format
            const json = await response.json();

            //*State Setter for (expenses)
            if (response.ok) {
                dispatch({ type: 'SET_EXPENSES', payload: json })

            }

            if (response.status === 401) {
                logout();
            }
        }

        if (user) {
            fetchExpenses();
        }

    }, [page, monthQuery, yearQuery])




    console.log(expenses);
    console.log(page)

    // *Scroll To Top Function
    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

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

            <h3 className="mx-auto w-fit font-bold text-orange-600 text-4xl">EXPENSES</h3>

            <ExpensesForm />
            <div className="flex flex-col justify-around md:flex-row md:flex-wrap">
                <div className="flex w-full justify-between">
                    <MonthlyFilterButtons monthQuery={monthQuery} yearQuery={yearQuery} onPreviousMonth={handlePreviousMonth} onNextMonth={handleNextMonth} />
                    <PaginationButtons page={page} onPrevPage={handlePrevPage} onNextPage={handleNextPage} />
                </div>
                <div className="flex flex-col w-full md:flex-row md:flex-wrap" >
                    {expenses && expenses.map((expense) => (
                        <ExpensesComponent key={expense._id} expense={expense} />
                    ))}
                </div>
                <div className="flex justify-center p-2"><button className="'shadow-black  bg-gray-800 shadow-md px-2 py-1 rounded-full mx-2 active:bg-gray-900" onClick={scrollToTop}><FaArrowUp />
                </button></div>





            </div>

        </div>



    )
}

export default ExpensesPage;