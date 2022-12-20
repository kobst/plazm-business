import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphQlEndPoint } from "../Api/graphQl";
import {
  addFavoriteBusinessGraphql,
  getUserGraphql,
  getUserFavoritesGraphql,
  getUserProfileDataGraphql,
  removeFavoriteBusinessGraphql,
} from "../graphQl";

/*
 * @desc:  get User Profile of the signIn consumer
 * @params: userSub
 */
export const fetchUserDetails = createAsyncThunk(
  "data/fetchUserDetails",
  async (userSub) => {
    const graphQl = getUserGraphql(userSub, 0, 15);
    const response = graphQlEndPoint(graphQl);
    return response;
  }
);

/*
 * @desc:  fetchUserProfileData
 * @params: userId
 */
export const fetchUserProfileData = createAsyncThunk(
  "data/fetchUserProfileData",
  async (id) => {
    const graphQl = getUserProfileDataGraphql(id);
    const response = graphQlEndPoint(graphQl);
    return response;
  }
);

/*
 * @desc:  to add a business to favorites
 * @params: businessId, userId
 */
export const addBusinessFavorite = createAsyncThunk(
  "data/AddBusinessFavorite",
  async (obj) => {
    const graphQl = addFavoriteBusinessGraphql(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.addFavoriteBusiness.user;
  }
);

/*
 * @desc:  to remove a business to favorites
 * @params: businessId, userId
 */
export const removeBusinessFavorite = createAsyncThunk(
  "data/RemoveBusinessFavorite",
  async (obj) => {
    const graphQl = removeFavoriteBusinessGraphql(obj);
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
  async ({ id, value, filters, latitude, longitude }) => {
    const graphQl = getUserFavoritesGraphql({
      id: id,
      value: value,
      filters: filters,
      latitude: latitude,
      longitude: longitude,
    });
    const response = await graphQlEndPoint(graphQl);
    return {
      data: response.data.getFavorites.data,
      totalFavorites: response.data.getFavorites.totalPlaces,
    };
  }
);

/*
 * @desc:  to remove a business to favorites
 * @params: businessId, userId
 */
export const removeUserBusinessFavorite = createAsyncThunk(
  "data/RemoveUserBusinessFavorite",
  async (obj) => {
    const graphQl = removeFavoriteBusinessGraphql(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.removeFavoriteBusiness.user;
  }
);
export const slice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    loadingProfile: false,
    selectedUser: {},
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
    addSubscribedList: (state, action) => {
      state.user = {
        ...state.user,
        listFollowed: [...state.user.listFollowed, action.payload],
      };
    },
    clearUserFavorites: (state, action) => {
      state.favoriteBusiness = [];
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
    [addBusinessFavorite.pending]: (state) => {
      if (!state.loadingRemoveFavorite) {
        state.loadingRemoveFavorite = true;
      }
    },
    [addBusinessFavorite.fulfilled]: (state, action) => {
      if (state.loadingRemoveFavorite) {
        state.loadingRemoveFavorite = false;
        if (action.payload) {
          const favorites = [
            ...state.user.favorites,
            action.payload.businessId,
          ];
          state.user = { ...state.user, favorites: favorites };
        }
      }
    },
    [addBusinessFavorite.rejected]: (state, action) => {
      if (state.loadingRemoveFavorite) {
        state.loadingRemoveFavorite = false;
        state.error = action.payload;
      }
    },
    [removeBusinessFavorite.pending]: (state) => {
      if (!state.loadingAddFavorite) {
        state.loadingAddFavorite = true;
      }
    },
    [removeBusinessFavorite.fulfilled]: (state, action) => {
      if (state.loadingAddFavorite) {
        state.loadingAddFavorite = false;
        if (action.payload) {
          const favorites = state.user.favorites.filter(
            (i) => i !== action.payload.businessId
          );
          state.user = { ...state.user, favorites: favorites };
        }
      }
    },
    [removeBusinessFavorite.rejected]: (state, action) => {
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
        }
      }
    },
    [fetchUserFavoritesBusiness.rejected]: (state, action) => {
      if (state.loadingFavoriteBusiness) {
        state.loadingFavoriteBusiness = false;
        state.error = action.payload;
      }
    },
    [removeUserBusinessFavorite.fulfilled]: (state, action) => {
      if (action.payload) {
        state.favoriteBusiness = state.favoriteBusiness.filter(
          (i) => i.favorites._id !== action.payload.businessId
        );
        state.user = {
          ...state.user,
          favorites: state.user.favorites.filter(
            (i) => i !== action.payload.businessId
          ),
        };
      }
    },
    [fetchUserProfileData.pending]: (state) => {
      if (!state.loadingProfile) {
        state.loadingProfile = true;
      }
    },
    [fetchUserProfileData.fulfilled]: (state, action) => {
      if (state.loadingProfile) {
        state.loadingProfile = false;
        if (action.payload) {
          state.selectedUser = {
            ...action.payload.data.getUserProfileData.user,
            totalPosts:
              action.payload.data.getUserProfileData.findTotalPostByUser,
            totalLists:
              action.payload.data.getUserProfileData.listCreatedByUser,
          };
        }
      }
    },
    [fetchUserProfileData.rejected]: (state, action) => {
      if (state.loadingProfile) {
        state.loadingProfile = false;
        state.error = action.payload;
      }
    },
  },
});

export const {
  setWs,
  clearUserFavorites,
  removeSubscribedList,
  addSubscribedList,
} = slice.actions;
export default slice.reducer;
