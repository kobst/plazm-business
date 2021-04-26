import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphQlEndPoint } from "../Api/graphQl";
import { GetMyFeedData } from "../graphQl";

/*
 * @desc:  to fetch my feed data
 * @params: userId, value
 */
export const fetchMyFeedData = createAsyncThunk(
  "data/fetchMyFeedData",
  async (obj) => {
    const graphQl = GetMyFeedData(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.getMyFeedData;
  }
);

export const slice = createSlice({
  name: "myFeed",
  initialState: {
    loading: false,
    myFeed: [],
    totalData: 0,
  },
  reducers: {},
  extraReducers: {
    [fetchMyFeedData.pending]: (state) => {
      if (!state.loading) {
        state.loading = true;
      }
    },
    [fetchMyFeedData.fulfilled]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        if (action.payload && action.payload.success === true) {
          state.totalData = action.payload.totalPlaces;
          state.myFeed = state.myFeed.concat(action.payload.data);
        }
      }
    },
    [fetchMyFeedData.rejected]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        state.error = action.payload;
      }
    },
  },
});

export default slice.reducer;
