import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT } from '../store/features/auth/authSlice'

export const useLogout = () => {

    const dispatch = useDispatch()

    const logout = () => {



        localStorage.removeItem('user')
        // document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; HttpOnly;';


        dispatch(LOGOUT());

    }

    return { logout }

}