import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mainApi = createApi({
    reducerPath: 'main',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://thrifttracer-backend.onrender.com',
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
    endpoints: () => ({}),
})