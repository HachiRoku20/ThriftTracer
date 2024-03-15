import { mainApi } from './mainApi';





export const incomeApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getIncome: builder.query({
            providesTags: ['IncomeTag'],
            query: (args) => {
                return {
                    url: '/income',
                    params: {
                        page: args.page,
                        month: args.monthQuery,
                        year: args.yearQuery
                    },
                    method: 'GET'

                }
            },
        }),

        addIncome: builder.mutation({
            invalidatesTags: (result, error) => error ? [] : ['IncomeTag', 'userDataTag'],
            query: (args) => {
                return {
                    url: '/income',
                    method: 'POST',
                    body: {
                        title: args.title,
                        description: args.description,
                        amount: args.amount,
                        account: args.account
                    }

                }
            },
        }),

        deleteIncome: builder.mutation({
            invalidatesTags: (result, error) => error ? [] : ['IncomeTag', 'userDataTag'],
            query: (args) => {
                return {
                    url: `/income/${args._id}`,
                    method: 'DELETE'
                }
            },
        })


    }),
})

export const { useGetIncomeQuery, useAddIncomeMutation, useDeleteIncomeMutation } = incomeApi;