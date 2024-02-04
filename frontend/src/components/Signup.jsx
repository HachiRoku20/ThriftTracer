import { useState } from "react";
import { useSignup } from "../hooks/useSignup.jsx";

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

        <form className="flex flex-col text-slate-50" onSubmit={handleSubmit}>

            <h3>SIGN UP</h3>
            <label>Email</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="outline-none sm:text-xl font-bold bg-gray-800 p-2 rounded-md"

            />

            <label>Username</label>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="outline-none sm:text-xl font-bold bg-gray-800 p-2 rounded-md"

            />

            <label>Password</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="outline-none sm:text-xl font-bold bg-gray-800 p-2 rounded-md"

            />

            <button>SIGN UP</button>

            {error && <div className="text-white">{error} </div>}

        </form>


    )

}

export default Signup;