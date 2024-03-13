import { useEffect, useState } from "react";
import ExpensesComponent from "./ExpensesComponent.jsx";
import ExpensesForm from '../components/ExpensesForm.jsx'
import ExpensesPage from "./ExpensesPage.jsx";
import { useGetExpensesQuery } from "../store/store.jsx";

const Home = () => {


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

    // const { data, error, isloading } = useGetExpensesQuery();

    // console.log(data, error, isloading);

    return (
        <div className="container mx-auto text-slate-100 max-w-screen-xl">

            <h1 className="text-4xl text-emerald-400 font-bold mx-auto w-fit">HOME</h1>
            <h1 className="text-4xl text-emerald-400 font-bold mx-auto w-fit">Total Money: ₱{userMoney}</h1>




        </div>





    )
}

export default Home;