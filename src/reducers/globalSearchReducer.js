import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'globalSearch',
  initialState: {
    displayBar: false,
  },
  reducers: {
    setDisplayBar: (state, action) => {
      state.displayBar = action.payload;
    },
  },
});

export const { setDisplayBar } = slice.actions;
export default slice.reducer;
