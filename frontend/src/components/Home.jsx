import { useEffect, useState } from "react";
import ExpensesComponent from "./ExpensesComponent.jsx";
import ExpensesForm from '../components/ExpensesForm.jsx'
import { useExpensesContext } from "../hooks/useExpensesContext.jsx";
import ExpensesPage from "./ExpensesPage.jsx";
import { useAuthContext } from "../hooks/userAuthContext.jsx";


const Home = () => {

    const { user } = useAuthContext()
    const [userMoney, setUserMoney] = useState()

    useEffect(() => {
        const fetchUserMoney = async () => {

            const response = await fetch(`http://localhost:5555/user/`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const json = await response.json()
            setUserMoney(json)
        }

        fetchUserMoney()
        console.log("FETCH RUN")


    }, [])


    return (
        <div className="container mx-auto text-slate-100 max-w-screen-xl">

            <h1 className="text-4xl text-emerald-400 font-bold mx-auto w-fit">HOME</h1>
            <h1 className="text-4xl text-emerald-400 font-bold mx-auto w-fit">Total Money: ₱{userMoney}</h1>




        </div>





    )
}

export default Home;