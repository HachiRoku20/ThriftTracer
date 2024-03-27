import { useEffect, useState } from "react";
import ExpensesComponent from "./ExpensesComponent.jsx";
import ExpensesForm from '../components/ExpensesForm.jsx'
import PaginationButtons from "./utils/PaginationButtons.jsx";
import MonthlyFilterButtons from "./utils/MonthlyFilterButtons.jsx";
import { useLogout } from "../hooks/useLogout.jsx";
import { FaArrowUp } from "react-icons/fa";

import { useGetExpensesQuery } from "../store/store.jsx";
import { useDeleteExpenseMutation } from "../store/store.jsx";



const ExpensesPage = () => {

    // *DELETE Query
    const [deleteExpense, results] = useDeleteExpenseMutation()

    const [page, setPage] = useState(1)

    const date = new Date();

    const [monthQuery, setMonthQuery] = useState(date.getMonth() + 1)
    const [yearQuery, setYearQuery] = useState(date.getFullYear())


    // *GET Query
    const { data, error, isloading } = useGetExpensesQuery({ page, monthQuery, yearQuery });
    console.log(data, error, isloading);


    //*MODAL LOGIC
    const [openModal, setOpenModal] = useState(false);

    const modalHandler = () => {
        setOpenModal(prevState => !prevState)
    }

    useEffect(() => {
        console.log(openModal)

    }, [openModal])





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

            <h3 className="mx-auto w-fit font-bold text-slate-100 text-4xl">EXPENSES</h3>

            <div className="flex flex-col justify-around md:flex-row md:flex-wrap">
                <div className="flex w-full justify-between">
                    <MonthlyFilterButtons monthQuery={monthQuery} yearQuery={yearQuery} onPreviousMonth={handlePreviousMonth} onNextMonth={handleNextMonth} />
                    <PaginationButtons page={page} onPrevPage={handlePrevPage} onNextPage={handleNextPage} />
                </div>
                <div className="w-full md:grid grid-cols-2 grid-flow-row " >
                    {data && data.map((expense) => (
                        <ExpensesComponent key={expense._id} transaction={expense} onClickHandler={deleteExpense} />
                    ))}
                </div>
                <div className="flex justify-center p-2 "><button className="'bg-gray-800  px-2 py-1 rounded-full mx-2 shadow-sm shadow-black bg-gray-800 active:bg-gray-900 md:hidden" onClick={scrollToTop}><FaArrowUp />
                </button></div>

            </div>

        </div>



    )
}

export default ExpensesPage;