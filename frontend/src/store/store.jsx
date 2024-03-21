import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import { expensesApi } from './services/expensesApi';
import { userDataApi } from './services/userDataApi';

import { setupListeners } from "@reduxjs/toolkit/query";
import { mainApi } from './services/mainApi';
import { useAddIncomeMutation, useDeleteIncomeMutation, useGetIncomeQuery } from './services/incomeApi';

export const store = configureStore({
    reducer: {
        user: authReducer,
        [mainApi.reducerPath]: mainApi.reducer

    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(mainApi.middleware)

    }
});

setupListeners(store.dispatch)

export { useGetExpensesQuery, useAddExpenseMutation, useDeleteExpenseMutation } from './services/expensesApi'
export { useGetUserDataQuery, useAddAccountMutation } from './services/userDataApi.jsx'
export { useGetIncomeQuery, useAddIncomeMutation, useDeleteIncomeMutation } from './services/incomeApi'
