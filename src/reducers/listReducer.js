import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphQlEndPoint } from "../Api/graphQl";
import { CreateList, getAllLists, getUserLists } from "../graphQl";


/*
 * @desc:  to check if business exists or not 
 * @params: businessId
 */
export const findAllLists = createAsyncThunk("data/findAllLists", async () => {
    const graphQl = getAllLists();
    const response = await graphQlEndPoint(graphQl);
    return response.data.getLists.list;
  });

/*
 * @desc:  to create a list
 * @params: businessId
 */
export const createList = createAsyncThunk("data/createList", async (obj) => {
  const graphQl = CreateList(obj);
  const response = await graphQlEndPoint(graphQl);
  return response.data.createList.list;
});

/*
 * @desc:  to get user lists
 * @params: ownerId
 */
export const fetchUserLists = createAsyncThunk("data/fetchUserLists", async (obj) => {
  const graphQl = getUserLists(obj);
  const response = await graphQlEndPoint(graphQl);
  return response.data.getUserLists.list;
});
export const slice = createSlice({
    name: "list",
    initialState: {
      loading: false,
      lists: [],
      loadingUserLists: false,
      userLists: []
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
      [fetchUserLists.pending]: (state) => {
        if (!state.loadingUserLists) {
          state.loadingUserLists = true;
        }
      },
      [fetchUserLists.fulfilled]: (state, action) => {
        if (state.loadingUserLists) {
          state.loadingUserLists = false;
          if(action.payload) {
              state.userLists = action.payload;
          }
        }
      },
      [fetchUserLists.rejected]: (state, action) => {
        if (state.loadingUserLists) {
          state.loadingUserLists = false;
          state.error = action.payload;
        }
      },
    },
  });
  
  export default slice.reducer;
  