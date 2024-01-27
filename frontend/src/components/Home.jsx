import { useEffect, useState } from "react";
import ExpensesComponent from "./ExpensesComponent.jsx";
import ExpensesForm from '../components/ExpensesForm.jsx'
import { useExpensesContext } from "../hooks/useExpensesContext.jsx";


const Home = () => {


    return (
        <div className="container mx-auto text-slate-100 max-w-screen-xl">

            <h1 className="text-4xl text-emerald-400 font-bold mx-auto w-fit">HOME</h1>

        </div>



    )
}

export default Home;