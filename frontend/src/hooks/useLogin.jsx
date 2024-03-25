import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { LOGIN } from '../store/features/auth/authSlice'



export const useLogin = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const dispatch = useDispatch()


    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        try {
            console.log(JSON.stringify({ email, password }))

            const response = await fetch('https://localhost:5555/user/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
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
                // document.cookie = `user=${JSON.stringify(json)}; path=/; secure; HttpOnly; `;

                console.log(json)
                try {
                    dispatch(LOGIN(json))
                } catch (error) {
                    console.log("IT DIDNT WORK")
                }
            }
        } catch (error) {
            setIsLoading(false);
            setError("Network error occurred. Please try again later.");
            console.error("Network error:", error);
        }


    }


    return { login, isLoading, error }
}