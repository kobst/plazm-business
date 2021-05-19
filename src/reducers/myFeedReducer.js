import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { graphQlEndPoint } from "../Api/graphQl";
import {
  GetMyFeedData,
  findPostComments,
  findCommentReplies,
  homeSearch,
  GetListDetails,
} from "../graphQl";

/*
 * @desc:  to fetch my feed data
 * @params: userId, value
 */
export const fetchMyFeedData = createAsyncThunk(
  "data/fetchMyFeedData",
  async (obj) => {
    const graphQl = GetMyFeedData(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.getMyFeedData;
  }
);

/*
 * @desc:  to fetch post comments
 * @params: postId
 */
export const fetchSearchPostComments = createAsyncThunk(
  "data/fetchFeedPostComments",
  async ({ postId, businessId }) => {
    const graphQl = findPostComments(postId);
    const response = await graphQlEndPoint(graphQl);
    return { data: response.data.getComment, businessId: businessId };
  }
);

/*
 * @desc:  to fetch post replies
 * @params: postId
 */
export const fetchSearchCommentReplies = createAsyncThunk(
  "data/fetchFeedCommentReplies",
  async ({ businessId, commentId }) => {
    const graphQl = findCommentReplies(commentId);
    const response = await graphQlEndPoint(graphQl);
    return { data: response.data.getReplies, businessId: businessId };
  }
);

/*
 * @desc:  to comment to post
 * @params: obj
 */
export const addCommentToPost = createAsyncThunk(
  "data/addFeedCommentToPost",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to add reply to comment
 * @params: obj
 */
export const addReplyToComment = createAsyncThunk(
  "data/addFeedReplyToComment",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to add like to comment via sockets
 * @params: obj
 */
export const addLikeToCommentViaSocket = createAsyncThunk(
  "data/addFeedLikeToCommentViaSocket",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to add like to post via sockets
 * @params: obj
 */
export const addLikeViaSocket = createAsyncThunk(
  "data/addFeedLikeViaSocket",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to fetch event comments
 * @params: eventId
 */
export const fetchEventComments = createAsyncThunk(
  "data/fetchFeedEventComments",
  async ({ eventId, businessId }) => {
    const graphQl = findPostComments(eventId);
    const response = await graphQlEndPoint(graphQl);
    return {
      data: response.data.getComment,
      eventId: eventId,
      businessId: businessId,
    };
  }
);

/*
 * @desc:  to fetch post replies
 * @params: postId
 */
export const fetchEventCommentReplies = createAsyncThunk(
  "data/fetchFeedEventCommentReplies",
  async ({ businessId, commentId }) => {
    const graphQl = findCommentReplies(commentId);
    const response = await graphQlEndPoint(graphQl);
    return { data: response.data.getReplies, businessId: businessId };
  }
);

/*
 * @desc:  to add post
 * @params: obj
 */
export const addPostViaSocket = createAsyncThunk(
  "data/addUserPostViaSocket",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to fetch selected list details
 * @params: listId, value
 */
export const fetchSelectedListDetails = createAsyncThunk(
  "data/fetchSelectedListDetails",
  async (obj) => {
    const graphQl = GetListDetails(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.getListDetails;
  }
);

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
  name: "myFeed",
  initialState: {
    loading: false,
    myFeed: [],
    totalData: 0,
    loadingPostComments: false,
    loadingReplies: false,
    loadingEventComments: false,
    loadingEventReplies: false,
    searchData: "",
    filterByUpdatedAt: false,
    filterByClosest: false,
    selectedListDetails: null,
    loadingSelectedList: false,
    enterClicked:false,
    selectedPostIdForComments:null,
    selectedEventIdForComments: null
  },
  reducers: {
    clearMyFeedData: (state) => {
      state.myFeed = [];
    },
    setPostId: (state,action) => {
      state.selectedPostIdForComments = action.payload;
    },
    setEventId: (state,action) => {
      state.selectedEventIdForComments = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
      state.enterClicked = false;
    },
    setEnterClicked: (state, action) => {
      state.enterClicked = action.payload;
    },
    setSideFiltersByUpdatedAt: (state) => {
      state.myFeed = [];
      state.filterByUpdatedAt = true;
      state.filterByClosest = false;
    },
    setSideFiltersByClosest: (state) => {
      state.myFeed = [];
      state.filterByClosest = true;
      state.filterByUpdatedAt = false;
    },
    setSideFiltersHomeSearch: (state) => {
      state.myFeed = [];
      state.filterByUpdatedAt = false;
      state.filterByClosest = false;
    },
    clearSearchedData: (state) => {
      state.myFeed = [];
    },
  },
  extraReducers: {
    [fetchMyFeedData.pending]: (state) => {
      if (!state.loading) {
        state.loading = true;
      }
    },
    [fetchMyFeedData.fulfilled]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        if (action.payload && action.payload.success === true) {
          state.totalData = action.payload.totalPlaces;
          const data = action.payload.data.map((obj) => ({
            ...obj,
            comments: [],
          }));
          state.myFeed = state.myFeed.concat(data);
        }
      }
    },
    [fetchMyFeedData.rejected]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        state.error = action.payload;
      }
    },
    [fetchSearchPostComments.pending]: (state) => {
      if (!state.loadingPostComments) {
        state.loadingPostComments = true;
      }
    },
    [fetchSearchPostComments.fulfilled]: (state, action) => {
      if (state.loadingPostComments) {
        state.loadingPostComments = false;
        if (action.payload) {
          if (action.payload.data.post.length > 0) {
            let posts = current(state.myFeed).filter(
              (i) => i._id !== action.payload.data.post[0].comment.itemId
            );

            let posts1 = current(state.myFeed).filter(
              (i) => i._id === action.payload.data.post[0].comment.itemId
            )[0];

            let arr = action.payload.data.post.map((obj) => ({
              ...obj.comment,
              totalReplies: obj.totalReplies,
              replies: [],
            }));

            const filterPost1 = posts.concat({
              ...posts1,
              comments: arr,
            });

            state.myFeed = filterPost1.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
          }
        }
      }
    },
    [fetchSearchPostComments.rejected]: (state, action) => {
      if (state.loadingPostComments) {
        state.loadingPostComments = false;
        state.error = action.payload;
      }
    },
    [fetchSearchCommentReplies.pending]: (state) => {
      if (!state.loadingReplies) {
        state.loadingReplies = true;
      }
    },
    [fetchSearchCommentReplies.fulfilled]: (state, action) => {
      if (state.loadingReplies) {
        state.loadingReplies = false;
        if (action.payload) {
          let posts = current(state.myFeed).filter(
            (i) => i._id !== action.payload.data.postId
          );

          let posts1 = current(state.myFeed).filter(
            (i) => i._id === action.payload.data.postId
          )[0];

          if (posts1.comments.length > 0) {
            let findComment = posts1.comments.filter(
              (i) => i._id === action.payload.data.commentId
            );
            let findComment1 = posts1.comments.filter(
              (i) => i._id !== action.payload.data.commentId
            );
            let newArr = [];
            newArr = newArr.concat({
              ...findComment[0],
              replies: action.payload.data.replies,
            });
            newArr = newArr.concat(findComment1);
            newArr = newArr.sort((a, b) => {
              return new Date(a.createdAt) - new Date(b.createdAt);
            });

            posts = posts.concat({
              ...posts1,
              comments: newArr,
            });

            state.myFeed = posts.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
          }
        }
      }
    },
    [fetchSearchCommentReplies.rejected]: (state, action) => {
      if (state.loadingReplies) {
        state.loadingReplies = false;
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
          let posts = current(state.myFeed).filter(
            (i) => i._id !== action.payload.eventId
          );

          let posts1 = current(state.myFeed).filter(
            (i) => i._id === action.payload.eventId
          )[0];

          let arr = action.payload.data.post.map((obj) => ({
            ...obj.comment,
            totalReplies: obj.totalReplies,
            replies: [],
          }));

          const filterPost1 = posts.concat({
            ...posts1,
            comments: arr,
          });

          state.myFeed = filterPost1.sort((a, b) => {
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
    [fetchEventCommentReplies.pending]: (state) => {
      if (!state.loadingEventReplies) {
        state.loadingEventReplies = true;
      }
    },
    [fetchEventCommentReplies.fulfilled]: (state, action) => {
      if (state.loadingEventReplies) {
        state.loadingEventReplies = false;
        if (action.payload) {
          let posts = current(state.myFeed).filter(
            (i) => i._id !== action.payload.data.postId
          );

          let posts1 = current(state.myFeed).filter(
            (i) => i._id === action.payload.data.postId
          )[0];

          if (posts1.comments.length > 0) {
            let findComment = posts1.comments.filter(
              (i) => i._id === action.payload.data.commentId
            );
            let findComment1 = posts1.comments.filter(
              (i) => i._id !== action.payload.data.commentId
            );
            let newArr = [];
            newArr = newArr.concat({
              ...findComment[0],
              replies: action.payload.data.replies,
            });
            newArr = newArr.concat(findComment1);
            newArr = newArr.sort((a, b) => {
              return new Date(a.createdAt) - new Date(b.createdAt);
            });

            posts = posts.concat({
              ...posts1,
              comments: newArr,
            });

            state.myFeed = posts.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
          }
        }
      }
    },
    [fetchEventCommentReplies.rejected]: (state, action) => {
      if (state.loadingEventReplies) {
        state.loadingEventReplies = false;
        state.error = action.payload;
      }
    },
    [addLikeViaSocket.fulfilled]: (state, action) => {
      if (action.payload) {
        let findBusinessPost1 = current(state.myFeed).filter(
          (i) => i._id !== action.payload.postId
        );

        let findBusinessPost = current(state.myFeed).filter(
          (i) => i._id === action.payload.postId
        );
        if (findBusinessPost && findBusinessPost.length > 0) {
          let likes = findBusinessPost[0].likes.concat(action.payload.like._id);
          findBusinessPost1 = findBusinessPost1.concat({
            ...findBusinessPost[0],
            likes: likes,
          });
          state.myFeed = findBusinessPost1.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        }
      }
    },
    [addLikeToCommentViaSocket.fulfilled]: (state, action) => {
      if (action.payload) {
        let findBusinessPost1 = current(state.myFeed).filter(
          (i) => i._id !== action.payload.postId
        );

        let findBusinessPost = current(state.myFeed).filter(
          (i) => i._id === action.payload.postId
        );
        if (
          findBusinessPost &&
          findBusinessPost.length > 0 &&
          findBusinessPost[0].comments.length > 0
        ) {
          let findComment = findBusinessPost[0].comments.filter(
            (i) => i._id === action.payload.commentId
          );
          let findComment1 = findBusinessPost[0].comments.filter(
            (i) => i._id !== action.payload.commentId
          );
          if (findComment && findComment.length > 0) {
            let likes = findComment[0].likes.concat(action.payload.like);

            let commentsSort = findComment1
              .concat({ ...findComment[0], likes: likes })
              .sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt);
              });

            findBusinessPost1 = findBusinessPost1.concat({
              ...findBusinessPost[0],
              comments: commentsSort,
            });

            state.myFeed = findBusinessPost1.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
          }
        }
      }
    },
    [addCommentToPost.fulfilled]: (state, action) => {
      if (action.payload) {
        let findBusinessPost1 = current(state.myFeed).filter(
          (i) => i._id !== action.payload.commentInfo.itemId
        );

        let findBusinessPost = current(state.myFeed).filter(
          (i) => i._id === action.payload.commentInfo.itemId
        );

        if (findBusinessPost && findBusinessPost.length > 0) {
          let comments = findBusinessPost[0].comments.concat({
            ...action.payload.commentInfo,
            totalReplies: 0,
            userId: action.payload.userDetails,
            likes: [],
          });

          findBusinessPost1 = findBusinessPost1.concat({
            ...findBusinessPost[0],
            comments: comments,
            totalComments: [
              {
                totalCount:
                  findBusinessPost[0].totalComments.length > 0
                    ? findBusinessPost[0].totalComments[0].totalCount + 1
                    : 1,
              },
            ],
          });
          state.myFeed = findBusinessPost1.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        }
      }
    },
    [addReplyToComment.fulfilled]: (state, action) => {
      if (action.payload) {
        let findBusinessPost1 = current(state.myFeed).filter(
          (i) => i._id !== action.payload.postId
        );

        let findBusinessPost = current(state.myFeed).filter(
          (i) => i._id === action.payload.postId
        );

        if (
          findBusinessPost &&
          findBusinessPost.length > 0 &&
          findBusinessPost[0].comments.length > 0
        ) {
          let findComment = findBusinessPost[0].comments.filter(
            (i) => i._id === action.payload.commentId
          );
          let findComment1 = findBusinessPost[0].comments.filter(
            (i) => i._id !== action.payload.commentId
          );
          if (findComment && findComment.length > 0) {
            let replies = findComment[0].replies.concat({
              ...action.payload.reply,
              userId: {
                _id: action.payload.userId,
                name: action.payload.userName,
                photo: action.payload.photo,
              },
            });
            let commentsSort = findComment1
              .concat({
                ...findComment[0],
                replies: replies,
                totalReplies: findComment[0].totalReplies + 1,
              })
              .sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt);
              });

            findBusinessPost1 = findBusinessPost1.concat({
              ...findBusinessPost[0],
              comments: commentsSort,
            });

            state.myFeed = findBusinessPost1.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
          }
        }
      }
    },
    [addPostViaSocket.fulfilled]: (state, action) => {
      const obj = {
        ...action.payload.post.postDetails,
        business: [action.payload.post.postDetails.businessDetails],
        ownerId: [action.payload.post.postDetails.ownerId],
        listId:
          action.payload.post.postDetails.listId !== null
            ? [action.payload.post.postDetails.listId]
            : [],
        comments: [],
        totalComments: [],
        totalPosts: action.payload.post.postDetails.totalPosts,
        eventSchedule: null,
      };

      state.myFeed = state.myFeed.concat(obj).sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    },
    [HomeSearch.pending]: (state) => {
      if (!state.loading) {
        state.loading = true;
      }
    },
    [HomeSearch.fulfilled]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        if (action.payload) {
          const data = action.payload.data.map((obj) => ({
            ...obj,
            comments: [],
          }));
          state.myFeed = state.myFeed.concat(data);
          state.totalData = action.payload.totalPlaces;
        }
      }
    },
    [HomeSearch.rejected]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        state.error = action.payload;
      }
    },
    [fetchSelectedListDetails.pending]: (state) => {
      if (!state.loadingSelectedList) {
        state.loadingSelectedList = true;
      }
    },
    [fetchSelectedListDetails.fulfilled]: (state, action) => {
      if (state.loadingSelectedList) {
        state.loadingSelectedList = false;
        if (action.payload) {
          state.myFeed = action.payload.data;
          state.totalData = action.payload.totalLists;
          state.selectedListDetails = action.payload.listDetails;
        }
      }
    },
    [fetchSelectedListDetails.rejected]: (state, action) => {
      if (state.loadingSelectedList) {
        state.loadingSelectedList = false;
        state.error = action.payload;
      }
    },
  },
});

export const { clearMyFeedData } = slice.actions;

export const {
  setSearchData,
  setSideFiltersByClosest,
  setSideFiltersByUpdatedAt,
  setSideFiltersHomeSearch,
  clearSearchedData,
  setEnterClicked,
  setPostId,
  setEventId
} = slice.actions;
export default slice.reducer;