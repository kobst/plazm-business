import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { graphQlEndPoint } from "../Api/graphQl";
import { homeSearch, findPostComments, findCommentReplies } from "../graphQl";

/*
 * @desc:  home search
 * @params: search data
 */
export const HomeSearch = createAsyncThunk("data/HomeSearch", async (obj) => {
  const graphQl = homeSearch(obj);
  const response = await graphQlEndPoint(graphQl);
  return response.data.homeSearch;
});

/*
 * @desc:  to fetch post comments
 * @params: postId
 */
export const fetchSearchPostComments = createAsyncThunk(
  "data/fetchSearchPostComments",
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
  "data/fetchSearchCommentReplies",
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
  "data/addSearchCommentToPost",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to add reply to comment
 * @params: obj
 */
export const addReplyToComment = createAsyncThunk(
  "data/addSearchReplyToComment",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to add like to comment via sockets
 * @params: obj
 */
export const addLikeToCommentViaSocket = createAsyncThunk(
  "data/addSearchLikeToCommentViaSocket",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to add like to post via sockets
 * @params: obj
 */
export const addLikeViaSocket = createAsyncThunk(
  "data/addSearchLikeViaSocket",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to fetch event comments
 * @params: eventId
 */
export const fetchEventComments = createAsyncThunk(
  "data/fetchSearchEventComments",
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
  "data/fetchSearchEventCommentReplies",
  async ({ businessId, commentId }) => {
    const graphQl = findCommentReplies(commentId);
    const response = await graphQlEndPoint(graphQl);
    return { data: response.data.getReplies, businessId: businessId };
  }
);

/*
 * @desc:  to comment to event
 * @params: obj
 */
export const addCommentToEvent = createAsyncThunk(
  "data/addSearchCommentToEvent",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to add reply to comment
 * @params: obj
 */
export const addReplyToEventComment = createAsyncThunk(
  "data/addSearchReplyToEventComment",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to add like to comment via sockets
 * @params: obj
 */
export const addEventLikeToCommentViaSocket = createAsyncThunk(
  "data/addSearchEventLikeToCommentViaSocket",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to add like to event via sockets
 * @params: obj
 */
export const addEventLikeViaSocket = createAsyncThunk(
  "data/addEventSearchLikeViaSocket",
  async (obj) => {
    return obj;
  }
);
export const slice = createSlice({
  name: "search",
  initialState: {
    loading: false,
    searchedPlace: [],
    totalPlaces: 0,
    searchData: "",
    loadingPostComments: false,
    loadingReplies: false,
    loadingEventComments: false,
    loadingEventReplies: false,
  },
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = action.payload;
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
          state.searchedPlace = [];
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
            let posts = current(state.searchedPlace).filter(
              (i) => i.favorites._id !== action.payload.businessId
            );

            let posts1 = current(state.searchedPlace).filter(
              (i) => i.favorites._id === action.payload.businessId
            )[0];

            let dummy1 = [];
            let arr = action.payload.data.post.map((obj) => ({
              ...obj.comment,
              totalReplies: obj.totalReplies,
              replies: [],
            }));

            const filterPost = posts1.posts.filter(
              (i) => i.postId === action.payload.data.post[0].comment.itemId
            )[0];
            let filterPost1 = posts1.posts.filter(
              (i) => i.postId !== action.payload.data.post[0].comment.itemId
            );
            filterPost1 = filterPost1.concat({
              postId: action.payload.data.post[0].comment.itemId,
              postDetails: filterPost.postDetails,
              comments: arr,
              totalComments: action.payload.data.post.length,
              totalLikes: filterPost.totalLikes,
            });

            const sortPosts = filterPost1.sort((a, b) => {
              return (
                new Date(b.postDetails.createdAt) -
                new Date(a.postDetails.createdAt)
              );
            });
            dummy1.push({
              favorites: posts1.favorites,
              posts: sortPosts,
              events: posts1.events,
              totalFollowers: posts1.totalFollowers,
              totalPosts: posts1.totalPosts,
            });
            dummy1 = dummy1.concat(posts);

            state.searchedPlace = dummy1.sort((a, b) => {
              return (
                new Date(b.favorites.updatedAt) -
                new Date(a.favorites.updatedAt)
              );
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
          let findBusiness = current(state.searchedPlace).filter(
            (i) => i.favorites._id !== action.payload.businessId
          );

          let findBusiness1 = current(state.searchedPlace).filter(
            (i) => i.favorites._id === action.payload.businessId
          )[0];

          let posts = findBusiness1.posts.filter(
            (i) => i.postId !== action.payload.data.postId
          );
          let posts1 = findBusiness1.posts.filter(
            (i) => i.postId === action.payload.data.postId
          )[0];
          let dummy1 = [];
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
              postId: action.payload.data.postId,
              postDetails: posts1.postDetails,
              comments: newArr,
              totalComments: posts1.totalComments,
              totalLikes: posts1.totalLikes,
            });

            const sortPosts = posts.sort((a, b) => {
              return (
                new Date(b.postDetails.createdAt) -
                new Date(a.postDetails.createdAt)
              );
            });

            dummy1.push({
              favorites: findBusiness1.favorites,
              posts: sortPosts,
              events: findBusiness1.events,
              totalFollowers: findBusiness1.totalFollowers,
              totalPosts: findBusiness1.totalPosts,
            });
            dummy1 = dummy1.concat(findBusiness);

            state.searchedPlace = dummy1.sort((a, b) => {
              return (
                new Date(b.favorites.updatedAt) -
                new Date(a.favorites.updatedAt)
              );
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
    [addCommentToPost.fulfilled]: (state, action) => {
      if (action.payload) {
        let posts = current(state.searchedPlace).filter(
          (i) => i.favorites._id !== action.payload.businessId
        );

        let posts1 = current(state.searchedPlace).filter(
          (i) => i.favorites._id === action.payload.businessId
        );

        if (posts1 && posts1.length > 0) {
          let findBusinessPost = posts1[0].posts.filter(
            (i) => i.postId === action.payload.commentInfo.itemId
          );
          let findBusinessPost1 = posts1[0].posts.filter(
            (i) => i.postId !== action.payload.commentInfo.itemId
          );
          let dummy1 = [];
          if (findBusinessPost && findBusinessPost.length > 0) {
            let comments = findBusinessPost[0].comments.concat({
              ...action.payload.commentInfo,
              totalReplies: 0,
              userId: action.payload.userDetails,
              likes: [],
            });

            findBusinessPost1 = findBusinessPost1.concat({
              postId: action.payload.commentInfo.itemId,
              postDetails: findBusinessPost[0].postDetails,
              comments: comments,
              totalComments: findBusinessPost[0].totalComments + 1,
              totalLikes: findBusinessPost[0].totalLikes,
            });
            const sortPosts = findBusinessPost1.sort((a, b) => {
              return (
                new Date(b.postDetails.createdAt) -
                new Date(a.postDetails.createdAt)
              );
            });
            dummy1.push({
              favorites: posts1[0].favorites,
              posts: sortPosts,
              events: posts1[0].events,
              totalFollowers: posts1[0].totalFollowers,
              totalPosts: posts1[0].totalPosts,
            });
            dummy1 = dummy1.concat(posts);
            state.searchedPlace = dummy1.sort((a, b) => {
              return (
                new Date(b.favorites.updatedAt) -
                new Date(a.favorites.updatedAt)
              );
            });
          }
        }
      }
    },
    [addReplyToComment.fulfilled]: (state, action) => {
      if (action.payload) {
        let posts = current(state.searchedPlace).filter(
          (i) => i.favorites._id !== action.payload.businessId
        );

        let posts1 = current(state.searchedPlace).filter(
          (i) => i.favorites._id === action.payload.businessId
        );

        if (posts1 && posts1.length > 0) {
          let findBusinessPost = posts1[0].posts.filter(
            (i) => i.postId === action.payload.postId
          );
          let findBusinessPost1 = posts1[0].posts.filter(
            (i) => i.postId !== action.payload.postId
          );
          let dummy1 = [];
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
                postId: action.payload.postId,
                postDetails: findBusinessPost[0].postDetails,
                comments: commentsSort,
                totalComments: findBusinessPost[0].totalComments + 1,
                totalLikes: findBusinessPost[0].totalLikes,
              });

              const sortPosts = findBusinessPost1.sort((a, b) => {
                return (
                  new Date(b.postDetails.createdAt) -
                  new Date(a.postDetails.createdAt)
                );
              });
              dummy1.push({
                favorites: posts1[0].favorites,
                posts: sortPosts,
                events: posts1[0].events,
                totalFollowers: posts1[0].totalFollowers,
                totalPosts: posts1[0].totalPosts,
              });
              dummy1 = dummy1.concat(posts);
              state.searchedPlace = dummy1.sort((a, b) => {
                return (
                  new Date(b.favorites.updatedAt) -
                  new Date(a.favorites.updatedAt)
                );
              });
            }
          }
        }
      }
    },
    [addLikeToCommentViaSocket.fulfilled]: (state, action) => {
      if (action.payload) {
        let posts = current(state.searchedPlace).filter(
          (i) => i.favorites._id !== action.payload.businessId
        );

        let posts1 = current(state.searchedPlace).filter(
          (i) => i.favorites._id === action.payload.businessId
        );

        if (posts1 && posts1.length > 0) {
          let findBusinessPost = posts1[0].posts.filter(
            (i) => i.postId === action.payload.postId
          );
          let findBusinessPost1 = posts1[0].posts.filter(
            (i) => i.postId !== action.payload.postId
          );
          let dummy1 = [];
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
                postId: action.payload.postId,
                postDetails: findBusinessPost[0].postDetails,
                comments: commentsSort,
                totalComments: findBusinessPost[0].totalComments,
                totalLikes: findBusinessPost[0].totalLikes + 1,
              });

              const sortPosts = findBusinessPost1.sort((a, b) => {
                return (
                  new Date(b.postDetails.createdAt) -
                  new Date(a.postDetails.createdAt)
                );
              });
              dummy1.push({
                favorites: posts1[0].favorites,
                posts: sortPosts,
                events: posts1[0].events,
                totalFollowers: posts1[0].totalFollowers,
                totalPosts: posts1[0].totalPosts,
              });
              dummy1 = dummy1.concat(posts);
              state.searchedPlace = dummy1.sort((a, b) => {
                return (
                  new Date(b.favorites.updatedAt) -
                  new Date(a.favorites.updatedAt)
                );
              });
            }
          }
        }
      }
    },
    [addLikeViaSocket.fulfilled]: (state, action) => {
      if (action.payload) {
        let posts = current(state.searchedPlace).filter(
          (i) => i.favorites._id !== action.payload.businessId
        );

        let posts1 = current(state.searchedPlace).filter(
          (i) => i.favorites._id === action.payload.businessId
        );

        if (posts1 && posts1.length > 0) {
          let findBusinessPost = posts1[0].posts.filter(
            (i) => i.postId === action.payload.postId
          );
          let findBusinessPost1 = posts1[0].posts.filter(
            (i) => i.postId !== action.payload.postId
          );
          let dummy1 = [];
          if (findBusinessPost && findBusinessPost.length > 0) {
            let likes = findBusinessPost[0].postDetails.likes.concat(
              action.payload.like
            );
            findBusinessPost1 = findBusinessPost1.concat({
              postId: action.payload.postId,
              postDetails: { ...findBusinessPost[0].postDetails, likes: likes },
              comments: findBusinessPost[0].comments,
              totalComments: findBusinessPost[0].totalComments,
              totalLikes: findBusinessPost[0].totalLikes + 1,
            });
            const sortPosts = findBusinessPost1.sort((a, b) => {
              return (
                new Date(b.postDetails.createdAt) -
                new Date(a.postDetails.createdAt)
              );
            });
            dummy1.push({
              favorites: posts1[0].favorites,
              posts: sortPosts,
              events: posts1[0].events,
              totalFollowers: posts1[0].totalFollowers,
              totalPosts: posts1[0].totalPosts,
            });
            dummy1 = dummy1.concat(posts);
            state.searchedPlace = dummy1.sort((a, b) => {
              return (
                new Date(b.favorites.updatedAt) -
                new Date(a.favorites.updatedAt)
              );
            });
          }
        }
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
          let posts = current(state.searchedPlace).filter(
            (i) => i.favorites._id !== action.payload.businessId
          );

          let posts1 = current(state.searchedPlace).filter(
            (i) => i.favorites._id === action.payload.businessId
          )[0];

          let dummy1 = [];
          let arr = action.payload.data.post.map((obj) => ({
            ...obj.comment,
            totalReplies: obj.totalReplies,
            replies: [],
          }));

          const filterEvent = posts1.events.filter(
            (i) => i._id === action.payload.eventId
          )[0];
          let filterEvent1 = posts1.events.filter(
            (i) => i._id !== action.payload.eventId
          );
          filterEvent1 = filterEvent1.concat({
            ...filterEvent,
            comments: arr,
          });

          const sortEvents = filterEvent1.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          dummy1.push({
            favorites: posts1.favorites,
            posts: posts1.posts,
            events: sortEvents,
            totalFollowers: posts1.totalFollowers,
            totalPosts: posts1.totalPosts,
          });
          dummy1 = dummy1.concat(posts);

          state.searchedPlace = dummy1.sort((a, b) => {
            return (
              new Date(b.favorites.updatedAt) - new Date(a.favorites.updatedAt)
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
    [fetchEventCommentReplies.pending]: (state) => {
      if (!state.loadingEventReplies) {
        state.loadingEventReplies = true;
      }
    },
    [fetchEventCommentReplies.fulfilled]: (state, action) => {
      if (state.loadingEventReplies) {
        state.loadingEventReplies = false;
        if (action.payload) {
          let findBusiness = current(state.searchedPlace).filter(
            (i) => i.favorites._id !== action.payload.businessId
          );

          let findBusiness1 = current(state.searchedPlace).filter(
            (i) => i.favorites._id === action.payload.businessId
          )[0];

          let posts = findBusiness1.events.filter(
            (i) => i._id !== action.payload.data.postId
          );
          let posts1 = findBusiness1.events.filter(
            (i) => i._id === action.payload.data.postId
          )[0];
          let dummy1 = [];
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

            const sortPosts = posts.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });

            dummy1.push({
              favorites: findBusiness1.favorites,
              posts: findBusiness1.posts,
              events: sortPosts,
              totalFollowers: findBusiness1.totalFollowers,
              totalPosts: findBusiness1.totalPosts,
            });
            dummy1 = dummy1.concat(findBusiness);

            state.searchedPlace = dummy1.sort((a, b) => {
              return (
                new Date(b.favorites.updatedAt) -
                new Date(a.favorites.updatedAt)
              );
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
    [addCommentToEvent.fulfilled]: (state, action) => {
      if (action.payload) {
        let posts = current(state.searchedPlace).filter(
          (i) => i.favorites._id !== action.payload.businessId
        );

        let posts1 = current(state.searchedPlace).filter(
          (i) => i.favorites._id === action.payload.businessId
        );

        if (posts1 && posts1.length > 0) {
          let findBusinessEvent = posts1[0].events.filter(
            (i) => i._id === action.payload.commentInfo.itemId
          );
          let findBusinessPost1 = posts1[0].events.filter(
            (i) => i._id !== action.payload.commentInfo.itemId
          );
          let dummy1 = [];
          if (findBusinessEvent && findBusinessEvent.length > 0 && findBusinessEvent[0].comments) {
            let comments = findBusinessEvent[0].comments.concat({
              ...action.payload.commentInfo,
              totalReplies: 0,
              userId: action.payload.userDetails,
              likes: [],
            });

            findBusinessPost1 = findBusinessPost1.concat({
              ...findBusinessEvent[0],
              comments: comments,
              totalComments: findBusinessEvent[0].totalComments + 1,
            });
            const sortPosts = findBusinessPost1.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
            dummy1.push({
              favorites: posts1[0].favorites,
              posts: posts1[0].favorites,
              events: sortPosts,
              totalFollowers: posts1[0].totalFollowers,
              totalPosts: posts1[0].totalPosts,
            });
            dummy1 = dummy1.concat(posts);
            state.searchedPlace = dummy1.sort((a, b) => {
              return (
                new Date(b.favorites.updatedAt) -
                new Date(a.favorites.updatedAt)
              );
            });
          }
        }
      }
    },

    [addReplyToEventComment.fulfilled]: (state, action) => {
      if (action.payload) {
        let posts = current(state.searchedPlace).filter(
          (i) => i.favorites._id !== action.payload.businessId
        );

        let posts1 = current(state.searchedPlace).filter(
          (i) => i.favorites._id === action.payload.businessId
        );

        if (posts1 && posts1.length > 0) {
          let findBusinessPost = posts1[0].events.filter(
            (i) => i._id === action.payload.postId
          );
          let findBusinessPost1 = posts1[0].events.filter(
            (i) => i._id !== action.payload.postId
          );
          let dummy1 = [];
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
                totalComments: findBusinessPost[0].totalComments + 1,
              });

              const sortEvents = findBusinessPost1.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
              });
              dummy1.push({
                favorites: posts1[0].favorites,
                posts: posts1[0].posts,
                events: sortEvents,
                totalFollowers: posts1[0].totalFollowers,
                totalPosts: posts1[0].totalPosts,
              });
              dummy1 = dummy1.concat(posts);
              state.searchedPlace = dummy1.sort((a, b) => {
                return (
                  new Date(b.favorites.updatedAt) -
                  new Date(a.favorites.updatedAt)
                );
              });
            }
          }
        }
      }
    },
    [addEventLikeToCommentViaSocket.fulfilled]: (state, action) => {
      if (action.payload) {
        let posts = current(state.searchedPlace).filter(
          (i) => i.favorites._id !== action.payload.businessId
        );

        let posts1 = current(state.searchedPlace).filter(
          (i) => i.favorites._id === action.payload.businessId
        );

        if (posts1 && posts1.length > 0) {
          let findBusinessPost = posts1[0].events.filter(
            (i) => i._id === action.payload.postId
          );
          let findBusinessPost1 = posts1[0].events.filter(
            (i) => i._id !== action.payload.postId
          );
          let dummy1 = [];
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
                totalComments: findBusinessPost[0].totalComments,
              });

              const sortPosts = findBusinessPost1.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
              });
              dummy1.push({
                favorites: posts1[0].favorites,
                posts: posts1[0].posts,
                events: sortPosts,
                totalFollowers: posts1[0].totalFollowers,
                totalPosts: posts1[0].totalPosts,
              });
              dummy1 = dummy1.concat(posts);
              state.searchedPlace = dummy1.sort((a, b) => {
                return (
                  new Date(b.favorites.updatedAt) -
                  new Date(a.favorites.updatedAt)
                );
              });
            }
          }
        }
      }
    },

    [addEventLikeViaSocket.fulfilled]: (state, action) => {
      if (action.payload) {
        let posts = current(state.searchedPlace).filter(
          (i) => i.favorites._id !== action.payload.businessId
        );

        let posts1 = current(state.searchedPlace).filter(
          (i) => i.favorites._id === action.payload.businessId
        );

        if (posts1 && posts1.length > 0) {
          let findBusinessPost = posts1[0].events.filter(
            (i) => i._id === action.payload.postId
          );
          let findBusinessPost1 = posts1[0].events.filter(
            (i) => i._id !== action.payload.postId
          );
          let dummy1 = [];
          if (findBusinessPost && findBusinessPost.length > 0) {
            let likes = findBusinessPost[0].likes.concat(action.payload.like);
            findBusinessPost1 = findBusinessPost1.concat({
              ...findBusinessPost[0],
              likes: likes,
              totalComments: findBusinessPost[0].totalComments,
            });
            const sortEvents = findBusinessPost1.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
            dummy1.push({
              favorites: posts1[0].favorites,
              posts: posts1[0].posts,
              events: sortEvents,
              totalFollowers: posts1[0].totalFollowers,
              totalPosts: posts1[0].totalPosts,
            });
            dummy1 = dummy1.concat(posts);
            state.searchedPlace = dummy1.sort((a, b) => {
              return (
                new Date(b.favorites.updatedAt) -
                new Date(a.favorites.updatedAt)
              );
            });
          }
        }
      }
    },
  },
});

export const { setSearchData } = slice.actions;
export default slice.reducer;
