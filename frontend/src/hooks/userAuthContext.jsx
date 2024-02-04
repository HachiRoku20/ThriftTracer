import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('UseAuthContext MUST BE USED INSIDE A CONTEXT PROVIDER')
    }
    else {
        return context
    }


}