import { ExpensesContext } from "../context/ExpensesContext";
import { useContext } from "react";


export const useExpensesContext = () => {
    const context = useContext(ExpensesContext)

    if (!context) {
        throw Error('UseExpensesContext MUST BE USED INSIDE A CONTEXT PROVIDER')
    }
    else {
        return context
    }


}