import { Link, NavLink } from "react-router-dom"
import { FiAlignJustify } from "react-icons/fi";
import React, { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { IoHome } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { ImExit } from "react-icons/im";
import { IoAddOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import ExpensesForm from "./ExpensesForm";
import IncomeForm from "./IncomeForm";







const Navbar = () => {

    //*INITIALIZATIONS
    const [expenseOpenModal, setExpenseOpenModal] = useState(false);
    const [incomeOpenModal, setIncomeOpenModal] = useState(false);
    const { logout } = useLogout();



    //*LOGOUT LOGIC
    const handleLogout = () => {
        logout();
    }


    const expenseModalHandler = () => {
        setExpenseOpenModal(prevState => !prevState)
    }

    const incomeModalHandler = () => {
        setIncomeOpenModal(prevState => !prevState)
    }



    return (


        <>

            <div className=" hidden md:flex h-screen flex-col justify-between border-e-2 border-gray-800 rounded-sm shadow-black shadow-sm">
                <div className="px-4 py-6 ">
                    <span className=" text-2xl font-bold text-emerald-400 pt-20 text-center tracking-tight">

                        <h1>Thrift Tracer</h1>

                    </span>

                    <ul className="mt-6 space-y-1 text-slate-200">
                        <li>
                            <NavLink to="/"
                                className="flex rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700 aria-[current=page]:bg-gray-800 aria-[current=page]:shadow-md aria-[current=page]:shadow-black"
                            >
                                <IoHome className="mr-2 self-center" size={15} /> <span>Home</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/expenses"
                                className="flex rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700 aria-[current=page]:bg-gray-800 aria-[current=page]:shadow-md aria-[current=page]:shadow-black"
                            >
                                <GiPayMoney className="mr-2 self-center" size={15} /> <span>Expenses</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/income"
                                className="flex rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700 aria-[current=page]:bg-gray-800 aria-[current=page]:shadow-md aria-[current=page]:shadow-black"
                            >
                                <GiReceiveMoney className="mr-2 self-center" size={15} /> <span>Income</span>
                            </NavLink>
                        </li>

                        <li>
                            <button onClick={expenseModalHandler} className="flex w-full justify-center rounded-lg px-4 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-600">
                                <IoIosAddCircleOutline size={20} />
                            </button>
                        </li>

                        <li>
                            <button onClick={incomeModalHandler} className="flex w-full justify-center rounded-lg px-4 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-600">
                                <IoIosRemoveCircleOutline size={20} />
                            </button>
                        </li>

                    </ul>

                </div>

                <div className="px-4 py-6 ">
                    <button className="flex flex-row justify-center rounded-lg px-4 py-2 text-sm font-medium text-slate-200 hover:bg-red-600 hover:shadow-md hover:shadow-black" onClick={handleLogout}>Log Out<ImExit className="ml-2 self-center" size={15} /></button>
                </div>
            </div>


            {/* NAVBAR MOBILE */}
            <div className="border-b border-gray-600 sticky top-0 bg-[#121212]">
                <ul className="flex justify-between items-center h-24 text-slate-50 font-semibold md:hidden">
                    <NavLink to="/" className="px-3.5 mx-1 hover:text-emerald-400 aria-[current=page]:text-emerald-400 ">
                        <IoHome size={25} />
                    </NavLink>

                    <li className="px-3.5 mx-1 hover:text-red-600">
                        <Link to="/expenses">
                            <GiPayMoney size={25} />

                        </Link>
                    </li>

                    <li className="px-3.5 mx-1 hover:text-emerald-600">
                        <Link to="/income">
                            <GiReceiveMoney size={25} />
                        </Link>
                    </li>

                    <button className="px-3.5 mx-1 hover:text-red-600" onClick={handleLogout}><ImExit size={23} />
                    </button>
                </ul>

            </div>


            <ExpensesForm isOpen={expenseOpenModal} onClose={() => setExpenseOpenModal(false)} />
            <IncomeForm isOpen={incomeOpenModal} onClose={() => setIncomeOpenModal(false)} />

        </>
    )
}

export default Navbar;