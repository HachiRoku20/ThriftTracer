import { useExpensesContext } from "./useExpensesContext"
import { useAuthContext } from "./userAuthContext"


export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: expensesDispatch } = useExpensesContext()




    const logout = () => {

        // localStorage.removeItem('user')
        document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; HttpOnly;';


        dispatch({ type: 'LOGOUT' })
        expensesDispatch({ type: 'SET_EXPENSES', payload: null })

    }

    return { logout }

}