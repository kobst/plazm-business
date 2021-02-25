import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphQlEndPoint } from "../Api/graphQl";
import { createPost, getPlace } from "../graphQl";


/*
 * @desc:  to check if business exists or not 
 * @params: businessId
 */
export const checkBusiness = createAsyncThunk("data/checkBusiness", async (businessId) => {
    const graphQl = getPlace(businessId);
    const response = await graphQlEndPoint(graphQl);
    return response.data.searchPlacesByUserId;
  });

/*
 * @desc:  to add a post to a business
 * @params: obj
 */
export const addPostToBusiness = createAsyncThunk("data/addPostToBusiness", async (obj) => {
  const graphQl = createPost(obj);
  const response = await graphQlEndPoint(graphQl);
  return response.data.createPost;
});

export const slice = createSlice({
    name: "business",
    initialState: {
      loading: false,
      loadingAddPosts: false,
      business: [],
      posts: [],
    },
    reducers: {

    },
    extraReducers: {
      [checkBusiness.pending]: (state) => {
        if (!state.loading) {
          state.loading = true;
        }
      },
      [checkBusiness.fulfilled]: (state, action) => {
        if (state.loading) {
          state.loading = false;
          if(action.payload) {
              state.business = action.payload.place;
              state.posts = action.payload.posts;
          }
        }
      },
      [checkBusiness.rejected]: (state, action) => {
        if (state.loading) {
          state.loading = false;
          state.error = action.payload;
        }
      },
    },
  });
  
  export default slice.reducer;
  