import { Link } from "react-router-dom"
import { FiAlignJustify } from "react-icons/fi";
import React, { useState } from "react";
import { useLogout } from "../hooks/useLogout";


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


        <header className="flex justify-between items-center h-24 mx-auto px-4 max-w-screen-xl">

            {/* NAVBAR PC */}

            <div className="w-full text-3xl font-bold text-emerald-400">
                <Link to="/">
                    <h1>Thrift Tracer</h1>
                </Link>
            </div>



            <ul className="flex justify-between items-center h-24 mx-auto text-slate-50 font-semibold hidden md:flex">
                <li className="px-3.5 hover:text-emerald-400">
                    <Link to="/">
                        <h1>HOME</h1>
                    </Link>
                </li>

                <li className="px-3.5 hover:text-emerald-400">
                    <Link to="/expenses">
                        <h1>EXPENSES</h1>
                    </Link>
                </li>

                <button onClick={handleLogout}>LOG OUT</button>
            </ul>

            {/* NAVBAR MOBILE ICON */}
            <div onClick={handleNavSwitch} className="block md:hidden">
                <FiAlignJustify size={25} color="mediumspringgreen" />
            </div>

            {/* NAVBAR MOBILE */}
            <div className={navSwitch ? 'fixed left-0 top-0 w-[50%] h-full border-r border-r-gray-700 bg-[#060711] ease-in-out duration-500' : 'fixed left-[-100%]'} >


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
            </div>

        </header>

    )
}

export default Navbar;