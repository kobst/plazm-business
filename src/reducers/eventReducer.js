import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  addLikeToEvents,
  fetchEvent,
  fetchEventForAWeek,
  findPostComments,
} from "../graphQl";
import { graphQlEndPoint } from "../Api/graphQl";

/*
 * @desc:  to fetch events of current day for a particular business
 * @params: businessId,date,day
 */
export const fetchEventsForTheDay = createAsyncThunk(
  "data/fetchEventsForTheDay",
  async ({ businessId, day, date }) => {
    const obj = {
      day: day,
      date: date,
      id: businessId,
    };
    const graphQl = fetchEvent(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.getEventsForTheDay.event;
  }
);

/*
 * @desc:  to fetch events of a complete week for a particular business
 * @params: businessId,date
 */
export const fetchEventsForTheWeek = createAsyncThunk(
  "data/fetchEventsForTheWeek",
  async ({ businessId, date }) => {
    const obj = {
      date: date,
      id: businessId,
    };
    const graphQl = fetchEventForAWeek(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.getEventsForTheWeek.event;
  }
);

/*
 * @desc:  to fetch event comments
 * @params: eventId
 */
export const fetchEventComments = createAsyncThunk(
  "data/fetchEventComments",
  async (eventId) => {
    const graphQl = findPostComments(eventId);
    const response = await graphQlEndPoint(graphQl);
    return { data: response.data.getComment, eventId: eventId };
  }
);

/*
 * @desc:  to add comment via sockets
 * @params: comments
 */
export const addCommentViaSocket = createAsyncThunk(
  "data/addEventCommentViaSocket",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to add reply via sockets
 * @params: comments
 */
export const addReplyViaSocket = createAsyncThunk(
  "data/addEventReplyViaSocket",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to add like to event
 * @params: comments
 */
export const AddLikeToEvent = createAsyncThunk(
  "data/AddLikeToEvent",
  async (obj) => {
    const graphQl = addLikeToEvents(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.addLikeToEvents;
  }
);

/*
 * @desc:  to add like via socket
 * @params: like
 */
export const addLikeViaSocket = createAsyncThunk(
  "data/addEventLikeViaSocket",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to add like to comment via socket
 * @params: like
 */
export const addLikeToCommentViaSocket = createAsyncThunk(
  "data/addLikeToEventCommentViaSocket",
  async (obj) => {
    return obj;
  }
);

export const slice = createSlice({
  name: "event",
  initialState: {
    loading: false,
    loadingForAWeek: false,
    loadingEventComments: false,
    date: new Date(),
    events: [],
  },
  reducers: {
    nextWeekDate: (state) => {
      const currentDate = new Date(state.date);
      currentDate.setDate(currentDate.getDate() + 7);
      state.date = currentDate;
    },
    previousWeekDate: (state) => {
      const currentDate = new Date(state.date);
      currentDate.setDate(currentDate.getDate() - 7);
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
        if (action.payload) {
          state.events = action.payload.map((obj) => ({
            ...obj,
            comments: [],
          }));
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
        if (action.payload) {
          state.events = action.payload.map((obj) => ({
            ...obj,
            comments: [],
          }));
        }
      }
    },
    [fetchEventsForTheWeek.rejected]: (state, action) => {
      if (state.loadingForAWeek) {
        state.loadingForAWeek = false;
        state.error = action.payload;
      }
    },
    [fetchEventComments.pending]: (state) => {
      if (!state.loadingEventComments) {
        state.loadingEventComments = true;
      }
    },
    [fetchEventComments.fulfilled]: (state, action) => {
      if (state.loadingEventComments) {
        state.loadingEventComments = false;
        if (action.payload) {
          const findEvent = current(state.events).filter(
            (i) => i._id === action.payload.eventId
          )[0];
          const findOtherEvents = current(state.events).filter(
            (i) => i._id !== action.payload.eventId
          );
          let eventsArr = [];
          eventsArr.push({ ...findEvent, comments: action.payload.data.post });
          eventsArr.concat(findOtherEvents);
          state.events = eventsArr.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        }
      }
    },
    [fetchEventComments.rejected]: (state, action) => {
      if (state.loadingEventComments) {
        state.loadingEventComments = false;
        state.error = action.payload;
      }
    },
    [addCommentViaSocket.fulfilled]: (state, action) => {
      if (action.payload) {
        const findEvent = current(state.events).filter(
          (i) => i._id === action.payload.commentInfo.itemId
        );
        const findOtherEvents = current(state.events).filter(
          (i) => i._id !== action.payload.commentInfo.itemId
        );
        if (
          findEvent &&
          findEvent.length > 0 &&
          findEvent[0].comments.length > 0
        ) {
          const eventComments = findEvent[0].comments.concat({
            ...action.payload.commentInfo,
            ownerId: action.payload.userInfo,
            userId: action.payload.userDetails,
            likes: [],
          });
          let eventsArr = [];
          eventsArr.push({ ...findEvent[0], comments: eventComments });
          eventsArr.concat(findOtherEvents);
          state.events = eventsArr.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        }
      }
    },
    [addReplyViaSocket.fulfilled]: (state, action) => {
      if (action.payload) {
        let events = current(state.events).filter(
          (i) => i._id !== action.payload.postId
        );
        let events1 = current(state.events).filter(
          (i) => i._id === action.payload.postId
        )[0];
        if (events1.comments.length > 0) {
          let findComment = events1.comments.filter(
            (i) => i._id === action.payload.commentId
          )[0];
          let findComment1 = events1.comments.filter(
            (i) => i._id !== action.payload.commentId
          );
          let replies = findComment.replies.concat({
            ...action.payload.reply,
            userId: {
              _id: action.payload.userId,
              name: action.payload.userName,
              photo: action.payload.photo,
            },
          });
          let commentsSort = findComment1
            .concat({ ...findComment, replies: replies })
            .sort((a, b) => {
              return new Date(a.createdAt) - new Date(b.createdAt);
            });
          let dummy1 = [];
          dummy1.push({
            ...events1,
            comments: commentsSort,
          });
          dummy1 = dummy1.concat(events);
          state.events = dummy1.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        }
      }
    },
    [addLikeViaSocket.fulfilled]: (state, action) => {
      if (action.payload) {
        let findPost = current(state.events).filter(
          (i) => i._id !== action.payload.postId
        );
        let findPost1 = current(state.events).filter(
          (i) => i._id === action.payload.postId
        );
        if (findPost1 && findPost1.length > 0) {
          let likes = findPost1[0].likes.concat(action.payload.like);
          let dummy1 = [];
          dummy1.push({
            ...findPost1[0],
            likes: likes,
          });
          dummy1 = dummy1.concat(findPost);
          state.events = dummy1.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        }
      }
    },
    [addLikeToCommentViaSocket.fulfilled]: (state, action) => {
      if (action.payload) {
        let findPost = current(state.events).filter(
          (i) => i._id !== action.payload.postId
        );
        let findPost1 = current(state.events).filter(
          (i) => i._id === action.payload.postId
        );
        if (findPost1 && findPost1.length > 0) {
          if (findPost1[0].comments.length > 0) {
            let findComment = findPost1[0].comments.filter(
              (i) => i._id === action.payload.commentId
            );
            let findComment1 = findPost1[0].comments.filter(
              (i) => i._id !== action.payload.commentId
            );

            if (findComment && findComment.length > 0) {
              let likes = findComment[0].likes.concat(action.payload.like);
              let commentsSort = findComment1
                .concat({ ...findComment[0], likes: likes })
                .sort((a, b) => {
                  return new Date(a.createdAt) - new Date(b.createdAt);
                });
              let dummy1 = [];
              dummy1.push({
                ...findPost1[0],
                comments: commentsSort,
              });
              dummy1 = dummy1.concat(findPost);
              state.events = dummy1.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
              });
            }
          }
        }
      }
    },
  },
});

export const { nextWeekDate, previousWeekDate } = slice.actions;
export default slice.reducer;
