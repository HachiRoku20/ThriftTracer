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

    }),
})

export const { useGetUserDataQuery } = userDataApi

