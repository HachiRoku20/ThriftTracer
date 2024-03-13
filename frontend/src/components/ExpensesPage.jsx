import { useEffect, useState } from "react";
import ExpensesComponent from "./ExpensesComponent.jsx";
import ExpensesForm from '../components/ExpensesForm.jsx'
import PaginationButtons from "./utils/PaginationButtons.jsx";
import MonthlyFilterButtons from "./utils/MonthlyFilterButtons.jsx";
import { useLogout } from "../hooks/useLogout.jsx";
import { FaArrowUp } from "react-icons/fa";

import { useGetExpensesQuery } from "../store/store.jsx";



const ExpensesPage = () => {





    const { logout } = useLogout();


    const [page, setPage] = useState(1)

    const date = new Date();

    const [monthQuery, setMonthQuery] = useState(date.getMonth() + 1)
    const [yearQuery, setYearQuery] = useState(date.getFullYear())
    console.log(monthQuery);
    console.log(yearQuery);

    const { data, error, isloading } = useGetExpensesQuery({ page, monthQuery, yearQuery });
    console.log(data, error, isloading);



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


    }


    // * Next Month & Year Setter
    const handleNextMonth = () => {
        if (monthQuery === 12) {
            setMonthQuery(1)
            setYearQuery(prevYear => prevYear + 1)
        } else {
            setMonthQuery(prevMonth => prevMonth + 1)
        }



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
                    {data && data.map((expense) => (
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