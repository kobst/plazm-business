import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphQlEndPoint } from "../Api/graphQl";
import { getAllUsers } from "../graphQl";


/*
 * @desc:  to check if business exists or not 
 * @params: businessId
 */
export const findAllUsers = createAsyncThunk("data/findAllUsers", async () => {
    const graphQl = getAllUsers();
    const response = await graphQlEndPoint(graphQl);
    return response.data.getAllUser.user;
  });

export const slice = createSlice({
    name: "business",
    initialState: {
      loading: false,
      users: [],
    },
    reducers: {

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
          if(action.payload) {
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
  
  export default slice.reducer;
  