import { useEffect } from 'react'
import { createContext, useReducer } from 'react'


export const AuthContext = createContext()


export const authReducer = (state, action) => {

    console.log(action.payload)

    switch (action.type) {
        case 'LOGIN': return { user: action.payload }
        case 'LOGOUT': return { user: null }
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })


    useEffect(() => {

        // const user = JSON.parse(localStorage.getItem('user'))

        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
        }, {});

        const user = cookies.user ? JSON.parse(cookies.user) : null;


        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, [])



    console.log('AuthContext State:', state)


    return (
        <AuthContext.Provider value={({ ...state, dispatch })}>
            {children}
        </AuthContext.Provider>
    )


}
