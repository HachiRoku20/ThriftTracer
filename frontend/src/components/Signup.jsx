import { useState } from "react";
import { useSignup } from "../hooks/useSignup.jsx";
import { Link } from "react-router-dom";

const Signup = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, username, password)

    }








    return (

        <div class="flex min-h-full flex-col px-6 py-12 lg:px-8 text-slate-200">
            <div className=" text-4xl font-bold text-emerald-400 pt-20 text-center tracking-tight">

                <h1>Thrift Tracer</h1>

            </div>
            <h2 class="my-10 text-center text-2xl font-bold tracking-tight text-slate-200">Sign Up for an account</h2>

            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium leading -6">Email address</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="block w-full rounded-md border-0 p-1.5 bg-gray-800 focus:ring-inset sm:text-sm sm:leading-6"

                    />

                    <label className="block text-sm font-medium leading-6">Username</label>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        className="block w-full rounded-md border-0 p-1.5 bg-gray-800 focus:ring-inset sm:text-sm sm:leading-6"

                    />


                    <label className="block text-sm font-medium leading-6">Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="block w-full rounded-md border-0 p-1.5 bg-gray-800 focus:ring-inset sm:text-sm sm:leading-6"

                    />

                    <button className="flex w-full mt-6 justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">SIGN UP</button>
                    <p class="mt-10 text-center text-sm text-gray-500">
                        Already have an account?
                        <Link to="/login" className="font-semibold leading-6 text-emerald-600 hover:text-emerald-700"> Log in here</Link>
                    </p>
                    {error && <div className="p-4 my-2 w-full flex flex-col rounded-md bg-red-700 font-bold text-center">{error}</div>}
                </form>
            </div>
        </div>





    )

}

export default Signup;