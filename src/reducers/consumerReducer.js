import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphQlEndPoint } from "../Api/graphQl";
import { getAllUsers, getSelectedUser } from "../graphQl";

/*
 * @desc:  to check if business exists or not
 * @params: businessId
 */
export const findAllUsers = createAsyncThunk("data/findAllUsers", async () => {
  const graphQl = getAllUsers();
  const response = await graphQlEndPoint(graphQl);
  return response.data.getAllUser.user;
});

/*
 * @desc:  to search users list based on input search
 * @params: search
 */
export const findSelectedUsers = createAsyncThunk(
  "data/findSelectedUsers",
  async (search) => {
    const graphQl = getSelectedUser(search);
    const response = await graphQlEndPoint(graphQl);
    return response.data.getSelectedUser.user;
  }
);

export const slice = createSlice({
  name: "business",
  initialState: {
    loading: false,
    users: [],
    globalLoader: false,
  },
  reducers: {
    setGloablLoader: (state, action) => {
      state.globalLoader = action.payload;
    },
  },
  extraReducers: {
    [findAllUsers.pending]: (state) => {
      if (!state.loading) {
        state.loading = true;
      }
    },
    [findAllUsers.fulfilled]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        if (action.payload) {
          state.users = action.payload;
        }
      }
    },
    [findAllUsers.rejected]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        state.error = action.payload;
      }
    },
  },
});

export const { setGloablLoader } = slice.actions;
export default slice.reducer;
