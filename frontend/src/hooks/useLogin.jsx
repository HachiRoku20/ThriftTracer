import { useState } from "react";
import { useAuthContext } from "./userAuthContext";

export const useLogin = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()


    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        console.log(JSON.stringify({ email, password }))

        const response = await fetch('http://localhost:5555/user/login', {
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

            console.log(json)
            dispatch({ type: 'LOGIN', payload: json })
        }


    }


    return { login, isLoading, error }
}