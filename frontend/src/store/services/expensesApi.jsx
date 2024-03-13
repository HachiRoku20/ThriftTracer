import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'




export const expensesApi = createApi({
    reducerPath: 'expenses',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5555',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user.value.token
            console.log(token);
            console.log('PREPARED HEADERS CALL')

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
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
            invalidatesTags: (result, error) => error ? [] : ['ExpensesTag'],
            query: (args) => {
                return {
                    url: '/expenses',
                    method: 'POST',
                    body: {
                        title: args.title,
                        description: args.description,
                        amount: args.amount,
                        category: args.category
                    }

                }
            },
        }),

        deleteExpense: builder.mutation({
            invalidatesTags: (result, error) => error ? [] : ['ExpensesTag'],
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

