import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphQlEndPoint } from "../Api/graphQl";
import { getAllLists } from "../graphQl";


/*
 * @desc:  to check if business exists or not 
 * @params: businessId
 */
export const findAllLists = createAsyncThunk("data/findAllLists", async () => {
    const graphQl = getAllLists();
    const response = await graphQlEndPoint(graphQl);
    return response.data.getLists.list;
  });

export const slice = createSlice({
    name: "list",
    initialState: {
      loading: false,
      lists: [],
    },
    reducers: {

    },
    extraReducers: {
      [findAllLists.pending]: (state) => {
        if (!state.loading) {
          state.loading = true;
        }
      },
      [findAllLists.fulfilled]: (state, action) => {
        if (state.loading) {
          state.loading = false;
          if(action.payload) {
              state.lists = action.payload;
          }
        }
      },
      [findAllLists.rejected]: (state, action) => {
        if (state.loading) {
          state.loading = false;
          state.error = action.payload;
        }
      },
    },
  });
  
  export default slice.reducer;
  