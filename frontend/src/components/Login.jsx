import { useState } from "react";
import { useLogin } from "../hooks/useLogin";


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
        console.log(email, password)
    }








    return (

        <form className="flex flex-col text-slate-50" onSubmit={handleSubmit}>

            <h3>LOGIN</h3>
            <label>Email</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="outline-none sm:text-xl font-bold bg-gray-800 p-2 rounded-md"

            />


            <label>Password</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="outline-none sm:text-xl font-bold bg-gray-800 p-2 rounded-md"

            />

            <button className="bg-emerald-400">LOGIN</button>

            <div className="flex flex-col space-bet justify-between">
                {error && <div className="p-4 my-2 mx-4 flex flex-col rounded-md bg-red-700 font-bold">{error}</div>}
            </div>




        </form>


    )

}

export default Login;