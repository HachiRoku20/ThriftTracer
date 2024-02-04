import { useExpensesContext } from "./useExpensesContext"
import { useAuthContext } from "./userAuthContext"


export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: expensesDispatch } = useExpensesContext()




    const logout = () => {

        localStorage.removeItem('user')

        dispatch({ type: 'LOGOUT' })
        expensesDispatch({ type: 'SET_EXPENSES', payload: null })

    }

    return { logout }

}