import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "event",
  initialState: {
    loading: false,
    date: new Date(),
  },
  reducers: {
    nextWeekDate: (state) => {
      const currentDate = new Date(state.date)
      currentDate.setDate(currentDate.getDate()+7);
      state.date = currentDate;
    },
    previousWeekDate: (state) => {
      const currentDate = new Date(state.date);
      currentDate.setDate(currentDate.getDate()-7);
      state.date = currentDate;
    },
  },
});

export const { nextWeekDate, previousWeekDate } = slice.actions
export default slice.reducer;
