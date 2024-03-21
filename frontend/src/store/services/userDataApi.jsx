import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { mainApi } from './mainApi';





export const userDataApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserData: builder.query({
            providesTags: ['userDataTag',],
            query: () => {
                return {
                    url: '/user',
                    method: 'GET'

                }
            },
        }),

        addAccount: builder.mutation({
            invalidatesTags: (result, error) => error ? [] : ['userDataTag'],
            query: (args) => {
                return {
                    url: '/user/accounts',
                    method: 'POST',
                    body: {
                        accountName: args.accountName,
                        initialAmount: args.initialAmount,
                    }

                }
            },
        }),

    }),
})

export const { useGetUserDataQuery, useAddAccountMutation } = userDataApi

