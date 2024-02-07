import { IncomeContext } from "../context/IncomeContext";
import { useContext } from "react";


export const useIncomeContext = () => {
    const context = useContext(IncomeContext)

    if (!context) {
        throw Error('UseIncomeContext MUST BE USED INSIDE A CONTEXT PROVIDER')
    }
    else {
        return context
    }


}