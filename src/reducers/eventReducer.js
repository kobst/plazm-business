import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import moment from "moment";
import {
  addLikeToEvents,
  createEvent,
  fetchEvent,
  fetchEventForAWeek,
  findCommentReplies,
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

/*
 * @desc:  to fetch post replies
 * @params: postId
 */
export const fetchCommentReplies = createAsyncThunk(
  "data/fetchEventCommentReplies",
  async (businessId) => {
    const graphQl = findCommentReplies(businessId);
    const response = await graphQlEndPoint(graphQl);
    return response.data.getReplies;
  }
);

/*
 * @desc:  to add an event by user on a business
 * @params: obj
 */
export const addEvent = createAsyncThunk(
  "data/addEvent",
  async ({ obj, user }) => {
    const graphQl = createEvent(obj);
    const response = await graphQlEndPoint(graphQl);
    return { data: response.data.addEvent, user: user };
  }
);

/*
 * @desc:  to fetch events of a complete week for a particular business
 * @params: businessId,date
 */
export const fetchInitialWeekEvents = createAsyncThunk(
  "data/fetchInitialWeekEvents",
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
 * @desc:  to add an event via socket
 * @params: obj
 */
export const addEventViaSocket = createAsyncThunk(
  "data/addEventViaSocket",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to delete an event via socket
 * @params: eventId
 */
export const deleteEventViaSocket = createAsyncThunk(
  "data/deleteEventViaSocket",
  async (id) => {
    return id;
  }
);

/*
 * @desc:  to edit an event via socket
 * @params: obj
 */
export const editEventViaSocket = createAsyncThunk(
  "data/editEventViaSocket",
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
    selectedDate: new Date(),
    events: [],
    loadingReplies: false,
    initialWeekEvents: [],
    loadingForInitialWeek: false,
  },
  reducers: {
    nextWeekDate: (state) => {
      const currentDate = new Date(state.date);
      currentDate.setDate(currentDate.getDate() + 7);
      state.date = currentDate;
      state.initialWeekEvents = [];

      const firstDateOfTheWeek = currentDate.getDate() - currentDate.getDay();
      const firstDay = new Date();
      firstDay.setDate(firstDateOfTheWeek);
      firstDay.setMonth(currentDate.getMonth());
      firstDay.setUTCHours(0, 0, 0, 0);
      state.selectedDate = firstDay;
    },
    previousWeekDate: (state) => {
      const currentDate = new Date(state.date);
      const currentDate1 = new Date(state.date);
      currentDate.setDate(currentDate.getDate() - 7);
      state.date = currentDate;
      state.initialWeekEvents = [];

      const endOfWeek = moment(currentDate1).startOf("week").toDate();
      endOfWeek.setUTCHours(0, 0, 0, 0);
      state.selectedDate = endOfWeek;
    },
    setCurrentDate: (state) => {
      state.date = new Date();
    },
    setSelectedDate: (state, action) => {
      const currentDate = new Date(state.date);
      const arr = [
        { day: "sun", val: 0 },
        { day: "mon", val: 1 },
        { day: "tue", val: 2 },
        { day: "wed", val: 3 },
        { day: "thurs", val: 4 },
        { day: "fri", val: 5 },
        { day: "sat", val: 6 },
      ];
      const x = arr.filter((i) => i.day === action.payload);
      const startOfWeek = moment(currentDate)
        .startOf("week")
        .add(x[0].val + 1, "d")
        .toDate();
      startOfWeek.setUTCHours(0, 0, 0, 0);
      state.selectedDate = startOfWeek;
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
          let arr = action.payload.map((obj) => ({
            ...obj,
            comments: [],
          }));
          state.events = arr.sort((a, b) => {
            return (
              new Date(b.eventSchedule.start_time) -
              new Date(a.eventSchedule.start_time)
            );
          });
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
        state.initialWeekEvents = [];
      }
    },
    [fetchEventsForTheWeek.fulfilled]: (state, action) => {
      if (state.loadingForAWeek) {
        state.loadingForAWeek = false;
        if (action.payload) {
          let arr = action.payload.map((obj) => ({
            ...obj,
            comments: [],
          }));
          state.events = arr.sort((a, b) => {
            return (
              new Date(b.eventSchedule.start_time) -
              new Date(a.eventSchedule.start_time)
            );
          });
          state.initialWeekEvents = arr.sort((a, b) => {
            return (
              new Date(b.eventSchedule.start_time) -
              new Date(a.eventSchedule.start_time)
            );
          });
        }
      }
    },
    [fetchEventsForTheWeek.rejected]: (state, action) => {
      if (state.loadingForAWeek) {
        state.loadingForAWeek = false;
        state.error = action.payload;
      }
    },

    [fetchInitialWeekEvents.pending]: (state) => {
      if (!state.loadingForInitialWeek) {
        state.loadingForInitialWeek = true;
        // state.events = [];
      }
    },
    [fetchInitialWeekEvents.fulfilled]: (state, action) => {
      if (state.loadingForInitialWeek) {
        state.loadingForInitialWeek = false;
        if (action.payload) {
          let arr = action.payload.map((obj) => ({
            ...obj,
            comments: [],
          }));
          state.initialWeekEvents = arr.sort((a, b) => {
            return (
              new Date(b.eventSchedule.start_time) -
              new Date(a.eventSchedule.start_time)
            );
          });
        }
      }
    },
    [fetchInitialWeekEvents.rejected]: (state, action) => {
      if (state.loadingForInitialWeek) {
        state.loadingForInitialWeek = false;
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
          let arr = action.payload.data.post.map((obj) => ({
            ...obj.comment,
            totalReplies: obj.totalReplies,
            replies: [],
          }));
          eventsArr.push({ ...findEvent, comments: arr });
          eventsArr = eventsArr.concat(findOtherEvents);
          state.events = eventsArr.sort((a, b) => {
            return (
              new Date(b.eventSchedule.start_time) -
              new Date(a.eventSchedule.start_time)
            );
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
    [fetchCommentReplies.pending]: (state) => {
      if (!state.loadingReplies) {
        state.loadingReplies = true;
      }
    },
    [fetchCommentReplies.fulfilled]: (state, action) => {
      if (state.loadingReplies) {
        state.loadingReplies = false;
        if (action.payload) {
          let posts = current(state.events).filter(
            (i) => i._id !== action.payload.postId
          );
          let posts1 = current(state.events).filter(
            (i) => i._id === action.payload.postId
          )[0];
          let dummy1 = [];
          if (posts1.comments.length > 0) {
            let findComment = posts1.comments.filter(
              (i) => i._id === action.payload.commentId
            );
            let findComment1 = posts1.comments.filter(
              (i) => i._id !== action.payload.commentId
            );
            let newArr = [];
            newArr = newArr.concat({
              ...findComment[0],
              replies: action.payload.replies,
            });
            newArr = newArr.concat(findComment1);
            newArr = newArr.sort((a, b) => {
              return new Date(a.createdAt) - new Date(b.createdAt);
            });
            dummy1.push({
              ...posts1,
              comments: newArr,
              totalComments: posts1.totalComments,
            });
            dummy1 = dummy1.concat(posts);
            state.events = dummy1.sort((a, b) => {
              return (
                new Date(b.eventSchedule.start_time) -
                new Date(a.eventSchedule.start_time)
              );
            });
          }
        }
      }
    },
    [fetchCommentReplies.rejected]: (state, action) => {
      if (state.loadingReplies) {
        state.loadingReplies = false;
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
          findEvent[0].comments.length >= 0
        ) {
          const eventComments = findEvent[0].comments.concat({
            ...action.payload.commentInfo,
            ownerId: action.payload.userInfo,
            userId: action.payload.userDetails,
            totalReplies: 0,
            likes: [],
          });
          let eventsArr = [];
          eventsArr.push({
            ...findEvent[0],
            comments: eventComments,
            totalComments: findEvent[0].totalComments + 1,
          });
          eventsArr = eventsArr.concat(findOtherEvents);
          state.events = eventsArr.sort((a, b) => {
            return (
              new Date(b.eventSchedule.start_time) -
              new Date(a.eventSchedule.start_time)
            );
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
            .concat({
              ...findComment,
              replies: replies,
              totalReplies: findComment.totalReplies + 1,
            })
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
            return (
              new Date(b.eventSchedule.start_time) -
              new Date(a.eventSchedule.start_time)
            );
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
            return (
              new Date(b.eventSchedule.start_time) -
              new Date(a.eventSchedule.start_time)
            );
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
                return (
                  new Date(b.eventSchedule.start_time) -
                  new Date(a.eventSchedule.start_time)
                );
              });
            }
          }
        }
      }
    },
    [addEvent.fulfilled]: (state, action) => {
      if (action.payload) {
        if (
          moment(state.selectedDate).format("DD MMM YYYY") ===
          moment(action.payload.data.event.eventSchedule.start_time).format(
            "DD MMM YYYY"
          )
        ) {
          const arr = state.events.concat({
            ...action.payload.data.event,
            user: action.payload.user,
            likes: [],
            totalComments: 0,
            createdAt: new Date(Date.now()),
          });
          state.events = arr.sort((a, b) => {
            return (
              new Date(b.eventSchedule.start_time) -
              new Date(a.eventSchedule.start_time)
            );
          });

          const initialWeekEvents = state.initialWeekEvents.concat({
            ...action.payload.data.event,
            user: action.payload.user,
            likes: [],
            totalComments: 0,
            createdAt: new Date(Date.now()),
          });
          state.initialWeekEvents = initialWeekEvents.sort((a, b) => {
            return (
              new Date(b.eventSchedule.start_time) -
              new Date(a.eventSchedule.start_time)
            );
          });
        }
      }
    },
    [addEventViaSocket.fulfilled]: (state, action) => {
      const arr = state.events.concat(action.payload.event);
      state.events = arr.sort((a, b) => {
        return (
          new Date(b.eventSchedule.start_time) -
          new Date(a.eventSchedule.start_time)
        );
      });

      const initialWeekEvents = state.initialWeekEvents.concat(
        action.payload.event
      );
      state.initialWeekEvents = initialWeekEvents.sort((a, b) => {
        return (
          new Date(b.eventSchedule.start_time) -
          new Date(a.eventSchedule.start_time)
        );
      });
    },
    [deleteEventViaSocket.fulfilled]: (state, action) => {
      const arr = state.events.filter((i) => i._id !== action.payload);
      state.events = arr.sort((a, b) => {
        return (
          new Date(b.eventSchedule.start_time) -
          new Date(a.eventSchedule.start_time)
        );
      });

      const deleteInitialWeekEvents = state.initialWeekEvents.filter(
        (i) => i._id !== action.payload
      );
      state.initialWeekEvents = deleteInitialWeekEvents.sort((a, b) => {
        return (
          new Date(b.eventSchedule.start_time) -
          new Date(a.eventSchedule.start_time)
        );
      });
    },
    [editEventViaSocket.fulfilled]: (state, action) => {
      const findEvent = state.events.filter(
        (i) => i._id === action.payload._id
      );
      if (findEvent && findEvent.length > 0) {
        let arr = state.events.filter((i) => i._id !== action.payload._id);
        arr = arr.concat(action.payload);
        state.events = arr.sort((a, b) => {
          return (
            new Date(b.eventSchedule.start_time) -
            new Date(a.eventSchedule.start_time)
          );
        });
      }
      const findInitialEvent = state.initialWeekEvents.filter(
        (i) => i._id === action.payload._id
      );
      if (findInitialEvent) {
        let deleteInitialWeekEvents = state.initialWeekEvents.filter(
          (i) => i._id !== action.payload._id
        );
        deleteInitialWeekEvents = deleteInitialWeekEvents.concat(
          action.payload
        );
        state.initialWeekEvents = deleteInitialWeekEvents.sort((a, b) => {
          return (
            new Date(b.eventSchedule.start_time) -
            new Date(a.eventSchedule.start_time)
          );
        });
      }
    },
  },
});

export const {
  nextWeekDate,
  previousWeekDate,
  setCurrentDate,
  setSelectedDate,
} = slice.actions;
export default slice.reducer;
