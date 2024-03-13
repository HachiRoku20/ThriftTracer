import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'

import { setupListeners } from "@reduxjs/toolkit/query";
import { expensesApi } from "../store/services/expensesApi.jsx";

export const store = configureStore({
    reducer: {
        user: authReducer,
        [expensesApi.reducerPath]: expensesApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(expensesApi.middleware)
    }
});

setupListeners(store.dispatch)

export { useGetExpensesQuery, useAddExpenseMutation, useDeleteExpenseMutation } from './services/expensesApi' 