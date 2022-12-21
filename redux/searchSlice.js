import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: "",
  },
  reducers: {
    changeSearchQuery: (state, action) => {
      state.value = action.payload
    },
    clearSearchQuery: (state) => {
      state.value = ""
    }
  }
})

export default searchSlice.reducer

export const {
  changeSearchQuery,
  clearSearchQuery
} = searchSlice.actions