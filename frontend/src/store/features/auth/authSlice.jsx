import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null
}

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        LOGIN: (state, action) => {
            state.value = action.payload
        },
        LOGOUT: (state) => {
            state.value = null
        }
    },
})

export const { LOGIN, LOGOUT } = authSlice.actions

export default authSlice.reducer