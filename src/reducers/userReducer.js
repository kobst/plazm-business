import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphQlEndPoint } from "../Api/graphQl";
import {
  addFavoriteBusiness,
  getUser,
  getUserFavorites,
  removeFavoriteBusiness,
} from "../graphQl";

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

/*
 * @desc:  to fetch user favorites business
 * @params:  userId
 */
export const fetchUserFavoritesBusiness = createAsyncThunk(
  "data/fetchUserFavoritesBusiness",
  async ({ id, value }) => {
    const graphQl = getUserFavorites({ id: id, value: value });
    const response = await graphQlEndPoint(graphQl);
    return {
      data: response.data.getUserFavoritesBusiness.data,
      totalFavorites: response.data.getUserFavoritesBusiness.totalFavorites,
    };
  }
);

/*
 * @desc:  to remove a business to favorites
 * @params: businessId, userId
 */
export const RemoveUserBusinessFavorite = createAsyncThunk(
  "data/RemoveUserBusinessFavorite",
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
    loadingFavoriteBusiness: false,
    favoriteBusiness: [],
    totalFavorites: 0,
    user: {},
    ws: {},
  },
  reducers: {
    setWs: (state, action) => {
      state.ws = action.payload;
    },
    removeSubscribedList: (state, action) => {
      state.user = {
        ...state.user,
        listFollowed: state.user.listFollowed.filter(
          (i) => i !== action.payload
        ),
      };
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
          let favorites = [...state.user.favorites, action.payload.businessId];
          state.user = { ...state.user, favorites: favorites };
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
          let favorites = state.user.favorites.filter(
            (i) => i !== action.payload.businessId
          );
          state.user = { ...state.user, favorites: favorites };
        }
      }
    },
    [RemoveBusinessFavorite.rejected]: (state, action) => {
      if (state.loadingAddFavorite) {
        state.loadingAddFavorite = false;
        state.error = action.payload;
      }
    },
    [fetchUserFavoritesBusiness.pending]: (state) => {
      if (!state.loadingFavoriteBusiness) {
        state.loadingFavoriteBusiness = true;
      }
    },
    [fetchUserFavoritesBusiness.fulfilled]: (state, action) => {
      if (state.loadingFavoriteBusiness) {
        state.loadingFavoriteBusiness = false;
        if (action.payload) {
          state.favoriteBusiness = state.favoriteBusiness.concat(
            action.payload.data
          );
          state.totalFavorites = action.payload.totalFavorites;
          // state.favoriteBusiness = action.payload.sort(function (a, b) {
          //   return a.favorites.company_name
          //     .toLowerCase()
          //     .localeCompare(b.favorites.company_name.toLowerCase());
          // });
        }
      }
    },
    [fetchUserFavoritesBusiness.rejected]: (state, action) => {
      if (state.loadingFavoriteBusiness) {
        state.loadingFavoriteBusiness = false;
        state.error = action.payload;
      }
    },
    [RemoveUserBusinessFavorite.fulfilled]: (state, action) => {
      if (action.payload) {
        state.favoriteBusiness = state.favoriteBusiness.filter(
          (i) => i.favorites._id !== action.payload.businessId
        );
      }
    },
  },
});

export const { setWs, removeSubscribedList } = slice.actions;
export default slice.reducer;
