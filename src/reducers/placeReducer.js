import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { graphQlEndPoint } from '../Api/graphQl';
import { searchAllPlaces } from '../graphQl';

/*
 * @desc:  to check if business exists or not
 * @params: businessId
 */
export const fetchAllPlaces = createAsyncThunk(
  'data/fetchAllPlaces',
  async () => {
    const graphQl = searchAllPlaces();
    const response = await graphQlEndPoint(graphQl);
    return response.data.searchAllPlaces.place;
  }
);

export const slice = createSlice({
  name: 'place',
  initialState: {
    loading: false,
    place: [],
  },
  reducers: {},
  extraReducers: {
    [fetchAllPlaces.pending]: (state) => {
      if (!state.loading) {
        state.loading = true;
      }
    },
    [fetchAllPlaces.fulfilled]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        if (action.payload) {
          state.place = action.payload.sort((a, b) =>
            a.company_name < b.company_name
              ? -1
              : a.company_name > b.company_name
              ? 1
              : 0
          );
        }
      }
    },
    [fetchAllPlaces.rejected]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        state.error = action.payload;
      }
    },
  },
});

export default slice.reducer;
