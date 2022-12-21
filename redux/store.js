import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { baseApiSlice } from './baseApiSlice'
import usersReducer, { usersSlice } from "./usersSlice"
import searchReducer, { searchSlice } from './searchSlice'

const makeStore = () => (
  configureStore({
    reducer: {
      api: baseApiSlice.reducer,
      [usersSlice.name]: usersSlice.reducer,
      [searchSlice.name]: searchReducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApiSlice.middleware),
  })
)



export const wrapper = createWrapper(makeStore)
