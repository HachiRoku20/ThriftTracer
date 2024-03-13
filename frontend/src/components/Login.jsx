import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";




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

        <div className="flex min-h-full flex-col px-6 py-12 lg:px-8 text-slate-200">
            <div className=" text-4xl font-bold text-emerald-400 pt-20 text-center tracking-tight">

                <h1>Thrift Tracer</h1>

            </div>
            <h2 className="my-10 text-center text-2xl font-bold tracking-tight text-slate-200">Log in to your account</h2>

            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium leading -6">Email address</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="block w-full rounded-md border-0 p-1.5 bg-gray-800 focus:ring-inset sm:text-sm sm:leading-6"

                    />


                    <label className="block text-sm font-medium leading-6">Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="block w-full rounded-md border-0 p-1.5 bg-gray-800 focus:ring-inset sm:text-sm sm:leading-6"

                    />

                    <button className="flex w-full mt-6 justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">LOGIN</button>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don't have an account?
                        <Link to="/signup" className="font-semibold leading-6 text-emerald-600 hover:text-emerald-700"> Sign up here</Link>
                    </p>
                    {error && <div className="p-4 my-2 w-full flex flex-col rounded-md bg-red-700 font-bold text-center">{error}</div>}
                </form>
            </div>
        </div >


    )

}

export default Login;