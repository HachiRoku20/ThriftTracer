import { useReducer } from 'react'
import { createContext } from 'react'
import { useEffect } from 'react'


export const ExpensesContext = createContext()


export const expensesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_EXPENSES':
            return {
                expenses: action.payload
            }

        case 'CREATE_EXPENSES':
            return {
                expenses: [action.payload, ...state.expenses.slice(0, -1)]
            }

        case 'DELETE_EXPENSES':
            return {
                expenses: state.expenses.filter((w) => w._id !== action.payload._id)
            }

        default:
            return state
    }


}


export const ExpensesContextProvider = ({ children }) => {

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

    const [state, dispatch] = useReducer(expensesReducer, {
        expenses: null
    })


    return (

        <ExpensesContext.Provider value={{ ...state, dispatch }} >

            {children}

        </ExpensesContext.Provider >


    )
}