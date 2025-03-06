import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isFetching: false,
  error: null,
};


const userSlice = createSlice({
  name: "user",
  initialState, // The initial state of the slice
  reducers: {
    // The reducer that handles actions with type `user/fetchUser`
    fetchUser: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    // The reducer that handles actions with type `user/fetchUserSuccess`
    fetchUserSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
    },
    // The reducer that handles actions with type `user/fetchUserFailure`
    fetchUserFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const { fetchUser, fetchUserSuccess, fetchUserFailure } = userSlice.actions;
export default userSlice.reducer;