import { createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (user) => user.id,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.id > b.id,
})




export const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {
    addManyUser: usersAdapter.addMany,
    removeUser: usersAdapter.removeOne,
    updateUser: (state, action) => {
      usersAdapter.updateOne(state, { id: action.payload.id, changes: action.payload })
    }
  }
})



export const { selectAll: selectAllUsers, selectIds: selectUserIds, selectById: selectUserById } = usersAdapter.getSelectors();


export default usersSlice.reducer;



export const selectUserIdsFilteredByName = createSelector(selectAllUsers, (users, q) => q, (users, q) => users.filter(user => `${user.first} ${user.last}`.includes(q)).map(user => user.id));

export const { addManyUser, removeUser, updateUser } = usersSlice.actions;