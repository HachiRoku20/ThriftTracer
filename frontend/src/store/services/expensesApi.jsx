import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { mainApi } from './mainApi';





export const expensesApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getExpenses: builder.query({
            providesTags: ['ExpensesTag'],
            query: (args) => {
                return {
                    url: '/expenses',
                    params: {
                        page: args.page,
                        month: args.monthQuery,
                        year: args.yearQuery
                    },
                    method: 'GET'

                }
            },
        }),

        addExpense: builder.mutation({
            invalidatesTags: (result, error) => error ? [] : ['ExpensesTag', 'userDataTag'],
            query: (args) => {
                return {
                    url: '/expenses',
                    method: 'POST',
                    body: {
                        title: args.title,
                        description: args.description,
                        amount: args.amount,
                        category: args.category,
                        account: args.account
                    }

                }
            },
        }),

        deleteExpense: builder.mutation({
            invalidatesTags: (result, error) => error ? [] : ['ExpensesTag', 'userDataTag'],
            query: (args) => {
                return {
                    url: `/expenses/${args._id}`,
                    method: 'DELETE'


                }
            },
        })


    }),
})

export const { useGetExpensesQuery, useAddExpenseMutation, useDeleteExpenseMutation } = expensesApi;

