import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphQlEndPoint } from "../Api/graphQl";
import { homeSearch } from "../graphQl";

/*
 * @desc:  home search
 * @params: search data
 */
export const HomeSearch = createAsyncThunk("data/HomeSearch", async (obj) => {
  const graphQl = homeSearch(obj);
  const response = await graphQlEndPoint(graphQl);
  return response.data.homeSearch;
});

export const slice = createSlice({
  name: "search",
  initialState: {
    loading: false,
    searchedPlace: [],
    totalPlaces: 0,
    searchData: "",
  },
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = action.payload;
      // state.searchedPlace = [];
    },
  },
  extraReducers: {
    [HomeSearch.pending]: (state) => {
      if (!state.loading) {
        state.loading = true;
      }
    },
    [HomeSearch.fulfilled]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        if (action.payload) {
          state.searchedPlace = []
          state.searchedPlace = state.searchedPlace.concat(action.payload.data);
          state.totalPlaces = action.payload.totalPlaces;
        }
      }
    },
    [HomeSearch.rejected]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        state.error = action.payload;
      }
    },
  },
});

export const { setSearchData } = slice.actions;
export default slice.reducer;
