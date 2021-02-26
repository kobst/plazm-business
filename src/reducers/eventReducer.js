import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEvent,fetchEventForAWeek } from "../graphQl";
import { graphQlEndPoint } from "../Api/graphQl";

/*
 * @desc:  to fetch events of current day for a particular business
 * @params: businessId,date,day
 */
export const fetchEventsForTheDay = createAsyncThunk("data/fetchEventsForTheDay", async ({businessId,day,date}) => {
  const obj ={
    day: day,
    date: date,
    id: businessId
  }
  const graphQl = fetchEvent(obj);
  const response = await graphQlEndPoint(graphQl);
  return response.data.getEventsForTheDay.event;
});

/*
 * @desc:  to fetch events of a complete for a particular business
 * @params: businessId,date
 */
export const fetchEventsForTheWeek = createAsyncThunk("data/fetchEventsForTheWeek", async ({businessId,date}) => {
  const obj ={
    date: date,
    id: businessId
  }
  const graphQl = fetchEventForAWeek(obj);
  const response = await graphQlEndPoint(graphQl);
  return response.data.getEventsForTheWeek.event;
});
export const slice = createSlice({
  name: "event",
  initialState: {
    loading: false,
    loadingForAWeek: false,
    date: new Date(),
    events: [],
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
  extraReducers: {
    [fetchEventsForTheDay.pending]: (state) => {
      if (!state.loading) {
        state.loading = true;
        state.events = [];
      }
    },
    [fetchEventsForTheDay.fulfilled]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        if(action.payload) {
            state.events = action.payload;
        }
      }
    },
    [fetchEventsForTheDay.rejected]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        state.error = action.payload;
      }
    },
    [fetchEventsForTheWeek.pending]: (state) => {
      if (!state.loadingForAWeek) {
        state.loadingForAWeek = true;
        state.events = [];
      }
    },
    [fetchEventsForTheWeek.fulfilled]: (state, action) => {
      if (state.loadingForAWeek) {
        state.loadingForAWeek = false;
        if(action.payload) {
            state.events = action.payload;
        }
      }
    },
    [fetchEventsForTheWeek.rejected]: (state, action) => {
      if (state.loadingForAWeek) {
        state.loadingForAWeek = false;
        state.error = action.payload;
      }
    },
  },
});

export const { nextWeekDate, previousWeekDate } = slice.actions
export default slice.reducer;
