import { Link, NavLink } from "react-router-dom"
import { FiAlignJustify } from "react-icons/fi";
import React, { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { IoHome } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { ImExit } from "react-icons/im";




const Navbar = () => {

    const [navSwitch, setNavSwitch] = useState(false);
    const { logout } = useLogout();

    const handleNavSwitch = () => {
        navSwitch ? setNavSwitch(false) : setNavSwitch(true);
    }

    const handleLogout = () => {
        logout();
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

                    </ul>

                </div>

                <div className="px-4 py-6 ">
                    <button className="flex flex-row justify-center rounded-lg px-4 py-2 text-sm font-medium text-slate-200 hover:bg-red-600 hover:shadow-md hover:shadow-black" onClick={handleLogout}>Log Out<ImExit className="ml-2 self-center" size={15} /></button>
                </div>
            </div>


            {/* NAVBAR MOBILE */}
            <div>
                <ul className="flex justify-between items-center h-24 text-slate-50 font-semibold md:hidden">
                    <li className="px-3.5 mx-1 hover:text-emerald-400">
                        <Link to="/">
                            <IoHome size={25} />

                        </Link>
                    </li>

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


            {/* NAVBAR MOBILE ICON */}
            {/* <div onClick={handleNavSwitch} className="block md:hidden">
                <FiAlignJustify size={25} color="mediumspringgreen" />
            </div> */}

            {/* NAVBAR MOBILE */}
            {/* <div className={navSwitch ? 'fixed left-0 top-0 w-[50%] h-full border-r border-r-gray-700 bg-[#060711] ease-in-out duration-500' : 'fixed left-[-100%]'} >


                <h1 className="w-full text-3xl font-bold text-emerald-400 p-4">Thrift Tracer</h1>

                <ul className="pt-24  text-slate-50">
                    <li className="p-3.5 hover:text-emerald-400">
                        <Link to="/">
                            <h1>HOME</h1>
                        </Link>
                    </li>

                    <li className="p-3.5 hover:text-emerald-400">
                        <Link to="/expenses">
                            <h1>EXPENSES</h1>
                        </Link>
                    </li>
                </ul>
            </div> */}

        </>
    )
}

export default Navbar;