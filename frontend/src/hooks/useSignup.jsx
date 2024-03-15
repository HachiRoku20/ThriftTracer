import { useState } from "react";
import { LOGIN } from "../store/features/auth/authSlice";
import { useDispatch } from "react-redux";

export const useSignup = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const dispatch = useDispatch()


    const signup = async (email, username, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('http://localhost:5555/user/signup', {
                method: 'POST',
                body: JSON.stringify({ email, username, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false)
                setError(json)
            }

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json))

                console.log(json)
                dispatch(LOGIN(json))
            }

        } catch (error) {
            setIsLoading(false);
            setError("Network error occurred. Please try again later.");
            console.error("Network error:", error);
        }


    }


    return { signup, isLoading, error }
}