import { useReducer } from 'react'
import { createContext } from 'react'
import { useEffect } from 'react'


export const IncomeContext = createContext()


export const incomeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_INCOME':
            return {
                income: action.payload
            }

        case 'CREATE_INCOME':
            return {
                income: [action.payload, ...state.income]
            }

        case 'DELETE_INCOME':
            return {
                income: state.income.filter((w) => w._id !== action.payload._id)
            }

        default:
            return state
    }


}


export const IncomeContextProvider = ({ children }) => {

    // useEffect(() => {
    //     const fetchExpenses = async () => {

    //         //*Fetches Expenses Log
    //         const response = await fetch('http://localhost:5555/expenses');
    //         //*Converts to JSON Format
    //         const json = await response.json();

    //         //*State Setter for (expenses)
    //         if (response.ok) {
    //             dispatch({ type: 'SET_EXPENSES', payload: json })

    //         }
    //     }


    //     fetchExpenses();

    // }, [])

    const [state, dispatch] = useReducer(incomeReducer, {
        income: null
    })


    return (

        <IncomeContext.Provider value={{ ...state, dispatch }} >

            {children}

        </IncomeContext.Provider >


    )
}