import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphQlEndPoint } from "../Api/graphQl";
import { addFavoriteBusiness, getUser, removeFavoriteBusiness } from "../graphQl";

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

/*
 * @desc:  to add a business to favorites
 * @params: businessId, userId
 */
export const AddBusinessFavorite = createAsyncThunk(
  "data/AddBusinessFavorite",
  async (obj) => {
    const graphQl = addFavoriteBusiness(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.addFavoriteBusiness.user;
  }
);

/*
 * @desc:  to remove a business to favorites
 * @params: businessId, userId
 */
export const RemoveBusinessFavorite = createAsyncThunk(
  "data/RemoveBusinessFavorite",
  async (obj) => {
    const graphQl = removeFavoriteBusiness(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.removeFavoriteBusiness.user;
  }
);

export const slice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    loadingAddFavorite: false,
    loadingRemoveFavorite: false,
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
    [AddBusinessFavorite.pending]: (state) => {
      if (!state.loadingRemoveFavorite) {
        state.loadingRemoveFavorite = true;
      }
    },
    [AddBusinessFavorite.fulfilled]: (state, action) => {
      if (state.loadingRemoveFavorite) {
        state.loadingRemoveFavorite = false;
        if (action.payload) {
          let favorites = [...state.user.favorites,action.payload.businessId]
          state.user = {...state.user, favorites: favorites}
        }
      }
    },
    [AddBusinessFavorite.rejected]: (state, action) => {
      if (state.loadingRemoveFavorite) {
        state.loadingRemoveFavorite = false;
        state.error = action.payload;
      }
    },
    [RemoveBusinessFavorite.pending]: (state) => {
      if (!state.loadingAddFavorite) {
        state.loadingAddFavorite = true;
      }
    },
    [RemoveBusinessFavorite.fulfilled]: (state, action) => {
      if (state.loadingAddFavorite) {
        state.loadingAddFavorite = false;
        if (action.payload) {
          let favorites = state.user.favorites.filter(i=>i!==action.payload.businessId)
          state.user = {...state.user, favorites: favorites}
        }
      }
    },
    [RemoveBusinessFavorite.rejected]: (state, action) => {
      if (state.loadingAddFavorite) {
        state.loadingAddFavorite = false;
        state.error = action.payload;
      }
    },
  },
});

export const { setWs } = slice.actions
export default slice.reducer;
