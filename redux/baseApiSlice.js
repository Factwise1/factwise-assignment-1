import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import store from "./store"
import { addManyUser } from './usersSlice'

export const baseApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/api/users',
      transformResponse: (response) => {
        return response
      }
    })
  })
})


export default baseApiSlice.reducer

export const { useGetUsersQuery } = baseApiSlice