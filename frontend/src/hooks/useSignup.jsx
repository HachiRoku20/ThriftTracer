import { useState } from "react";

export const useSignup = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)


    const signup = async (email, username, password) => {
        setIsLoading(true)
        setError(null)

        console.log(JSON.stringify({ email, username, password }))

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
            dispatch({ type: 'LOGIN', payload: json })
        }


    }


    return { signup, isLoading, error }
}