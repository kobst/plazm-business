import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphQlEndPoint } from "../Api/graphQl";
import { getUser } from "../graphQl";

/*
 * @desc:  get User Profile of the signIn consumer
 * @params: userSub
 */
export const fetchUserDetails = createAsyncThunk(
  "data/fetchUserDetails",
  async (userSub) => {
    const graphQl = getUser(userSub);
    const response = graphQlEndPoint(graphQl);
    return response;
  }
);

export const slice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    ws: {}
  },
  reducers: {
    setWs: (state,action) => {
      state.ws = action.payload
    },
  },
  extraReducers: {
    [fetchUserDetails.pending]: (state) => {
      if (!state.loading) {
        state.loading = true;
      }
    },
    [fetchUserDetails.fulfilled]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload.data.getUser.user;
        }
      }
    },
    [fetchUserDetails.rejected]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        state.error = action.payload;
      }
    },
  },
});

export const { setWs } = slice.actions
export default slice.reducer;
