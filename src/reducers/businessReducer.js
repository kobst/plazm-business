import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { graphQlEndPoint } from "../Api/graphQl";
import {
  createPost,
  getPlace,
  findPostComments,
  addLikeToPost,
  AddLikeToComment,
  findCommentReplies,
  findBusinessPhotos,
} from "../graphQl";

/*
 * @desc:  to check if business exists or not
 * @params: businessId
 */
export const checkBusiness = createAsyncThunk(
  "data/checkBusiness",
  async (obj) => {
    const graphQl = getPlace(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.searchPlacesByUserId;
  }
);

/*
 * @desc:  to get images
 * @params: businessId
 */
export const getBusinessImages = createAsyncThunk(
  "data/getBusinessImages",
  async (id) => {
    const graphQl = findBusinessPhotos(id);
    const response = await graphQlEndPoint(graphQl);
    return response.data.getPostImages;
  }
);

/*
 * @desc:  to add a post to a business
 * @params: obj
 */
export const addPostToBusiness = createAsyncThunk(
  "data/addPostToBusiness",
  async (obj) => {
    const graphQl = createPost(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.createPost;
  }
);

/*
 * @desc:  to sort posts by most recent
 */
export const filterData = createAsyncThunk("data/filterData", async (obj) => {
  const graphQl = getPlace(obj);
  const response = await graphQlEndPoint(graphQl);
  return response.data.searchPlacesByUserId;
});

/*
 * @desc:  to concat filtered posts to posts array
 * @params: obj
 */
export const addFilteredPosts = createAsyncThunk(
  "data/addFilteredPosts",
  async (obj) => {
    const graphQl = getPlace(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.searchPlacesByUserId;
  }
);

/*
 * @desc:  to comment to post
 * @params: obj
 */
export const addCommentToPost = createAsyncThunk(
  "data/addCommentToPost",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to fetch post comments
 * @params: postId
 */
export const fetchPostComments = createAsyncThunk(
  "data/fetchPostComments",
  async (businessId) => {
    const graphQl = findPostComments(businessId);
    const response = await graphQlEndPoint(graphQl);
    return response.data.getComment;
  }
);

/*
 * @desc:  to fetch post replies
 * @params: postId
 */
export const fetchCommentReplies = createAsyncThunk(
  "data/fetchCommentReplies",
  async (businessId) => {
    const graphQl = findCommentReplies(businessId);
    const response = await graphQlEndPoint(graphQl);
    return response.data.getReplies;
  }
);

/*
 * @desc:  to add reply to comment
 * @params: obj
 */
export const addReplyToComment = createAsyncThunk(
  "data/addReplyToComment",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to add a post via sockets
 * @params: obj
 */
export const addPostViaSocket = createAsyncThunk(
  "data/addPostViaSocket",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to add like to a post
 * @params: obj
 */
export const AddLikeToPost = createAsyncThunk(
  "data/AddLikeToPost",
  async (obj) => {
    const graphQl = addLikeToPost(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.addLikeToPost;
  }
);

/*
 * @desc:  to add like to a comment
 * @params: obj
 */
export const addLikeToComment = createAsyncThunk(
  "data/addLikeToComment",
  async (obj) => {
    const graphQl = AddLikeToComment(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.addLikeToComment;
  }
);

/*
 * @desc:  to add like to post via sockets
 * @params: obj
 */
export const addLikeViaSocket = createAsyncThunk(
  "data/addLikeViaSocket",
  async (obj) => {
    return obj;
  }
);

/*
 * @desc:  to add like to comment via sockets
 * @params: obj
 */
export const addLikeToCommentViaSocket = createAsyncThunk(
  "data/addLikeToCommentViaSocket",
  async (obj) => {
    return obj;
  }
);

export const slice = createSlice({
  name: "business",
  initialState: {
    loading: false,
    loadingAddPosts: false,
    posts: [],
    loadingAddComment: false,
    loadingPostComments: false,
    filters: {
      Business: true,
      PostsByMe: false,
      MySubscriptions: false,
      Others: false,
    },
    filterByMostLiked: false,
    filterByMostRecent: false,
    loadingFilterData: false,
    loadingAddReply: false,
    loadingAddLike: false,
    loadingAddLikeToComment: false,
    loadingAddFilteredPosts: false,
    loadingReplies: false,
    totalPosts: 0,
    images: [],
    loadingImages: false
  },
  reducers: {
    setFilters: (state, action) => {
      if (
        action.payload["Business"] === false &&
        action.payload["PostsByMe"] === false &&
        action.payload["MySubscriptions"] === false &&
        action.payload["Others"] === false
      )
        state.filters = {
          Business: true,
          PostsByMe: false,
          MySubscriptions: false,
          Others: false,
        };
      else state.filters = action.payload;
    },
    setSideFiltersByMostLiked: (state, action) => {
      state.filterByMostLiked = true;
      state.filterByMostRecent = false;
    },
    setSideFiltersByMostRecent: (state, action) => {
      state.filterByMostLiked = false;
      state.filterByMostRecent = true;
    },
    setSideFilters: (state, action) => {
      state.filterByMostLiked = false;
      state.filterByMostRecent = false;
    },
  },
  extraReducers: {
    [checkBusiness.pending]: (state) => {
      if (!state.loading) {
        state.loading = true;
      }
    },
    [checkBusiness.fulfilled]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        if (action.payload) {
          state.business = action.payload.place;
          state.posts = action.payload.posts;
          state.totalPosts = action.payload.totalPosts;
        }
      }
    },
    [checkBusiness.rejected]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        state.error = action.payload;
      }
    },
    [getBusinessImages.pending]: (state) => {
      if (!state.loadingImages) {
        state.loadingImages = true;
      }
    },
    [getBusinessImages.fulfilled]: (state, action) => {
      if (state.loadingImages) {
        state.loadingImages = false;
        if (action.payload) {
          state.images = action.payload.post;
        }
      }
    },
    [getBusinessImages.rejected]: (state, action) => {
      if (state.loadingImages) {
        state.loadingImages = false;
        state.error = action.payload;
      }
    },
    [addPostViaSocket.fulfilled]: (state, action) => {
      if (action.payload) {
        state.posts = [action.payload.post].concat(state.posts);
      }
    },
    [addLikeViaSocket.fulfilled]: (state, action) => {
      if (action.payload) {
        let findPost = current(state.posts).filter(
          (i) => i.postId !== action.payload.postId
        );
        let findPost1 = current(state.posts).filter(
          (i) => i.postId === action.payload.postId
        );
        if (findPost1 && findPost1.length > 0) {
          let likes = findPost1[0].postDetails.likes.concat(
            action.payload.like
          );
          let dummy1 = [];
          dummy1.push({
            postId: action.payload.postId,
            postDetails: { ...findPost1[0].postDetails, likes: likes },
            comments: findPost1[0].comments,
            totalComments: findPost1[0].totalComments,
            totalLikes: findPost1[0].totalLikes + 1,
          });
          dummy1 = dummy1.concat(findPost);
          state.posts = dummy1.sort((a, b) => {
            return (
              new Date(b.postDetails.createdAt) -
              new Date(a.postDetails.createdAt)
            );
          });
          if (state.filterByMostLiked === true) {
            state.posts = state.posts.sort((a, b) => {
              return new Date(b.totalLikes) - new Date(a.totalLikes);
            });
          }
        }
      }
    },
    [addLikeToCommentViaSocket.fulfilled]: (state, action) => {
      if (action.payload) {
        let findPost = current(state.posts).filter(
          (i) => i.postId !== action.payload.postId
        );
        let findPost1 = current(state.posts).filter(
          (i) => i.postId === action.payload.postId
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
                postId: action.payload.postId,
                postDetails: findPost1[0].postDetails,
                comments: commentsSort,
                totalComments: findPost1[0].totalComments,
                totalLikes: findPost1[0].totalLikes + 1,
              });
              dummy1 = dummy1.concat(findPost);
              state.posts = dummy1.sort((a, b) => {
                return (
                  new Date(b.postDetails.createdAt) -
                  new Date(a.postDetails.createdAt)
                );
              });
            }
          }
        }
      }
    },
    [addCommentToPost.fulfilled]: (state, action) => {
      if (action.payload) {
        let posts = current(state.posts).filter(
          (i) => i.postId !== action.payload.commentInfo.itemId
        );
        let posts1 = current(state.posts).filter(
          (i) => i.postId === action.payload.commentInfo.itemId
        );
        if (posts1 && posts1.length > 0) {
          let comments = posts1[0].comments.concat({
            ...action.payload.commentInfo,
            totalReplies: 0,
            userId: action.payload.userDetails,
            likes: [],
          });
          let dummy1 = [];
          dummy1.push({
            postId: action.payload.commentInfo.itemId,
            postDetails: posts1[0].postDetails,
            comments: comments,
            totalComments: posts1[0].totalComments + 1,
            totalLikes: posts1[0].totalLikes,
          });
          dummy1 = dummy1.concat(posts);
          state.posts = dummy1.sort((a, b) => {
            return (
              new Date(b.postDetails.createdAt) -
              new Date(a.postDetails.createdAt)
            );
          });
        }
      }
    },
    [addReplyToComment.fulfilled]: (state, action) => {
      if (action.payload) {
        let posts = current(state.posts).filter(
          (i) => i.postId !== action.payload.postId
        );
        let posts1 = current(state.posts).filter(
          (i) => i.postId === action.payload.postId
        )[0];
        if (posts1.comments.length > 0) {
          let findComment = posts1.comments.filter(
            (i) => i._id === action.payload.commentId
          )[0];
          let findComment1 = posts1.comments.filter(
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
            .concat({ ...findComment, replies: replies, totalReplies: findComment.totalReplies+1 })
            .sort((a, b) => {
              return new Date(a.createdAt) - new Date(b.createdAt);
            });
          let dummy1 = [];
          dummy1.push({
            postId: action.payload.postId,
            postDetails: posts1.postDetails,
            comments: commentsSort,
            totalComments: posts1.totalComments + 1,
            totalLikes: posts1.totalLikes,
          });
          dummy1 = dummy1.concat(posts);
          state.posts = dummy1.sort((a, b) => {
            return (
              new Date(b.postDetails.createdAt) -
              new Date(a.postDetails.createdAt)
            );
          });
        }
      }
    },
    [addPostToBusiness.rejected]: (state, action) => {
      if (state.loadingAddPosts) {
        state.loadingAddPosts = false;
        state.error = action.payload;
      }
    },
    [fetchPostComments.pending]: (state) => {
      if (!state.loadingPostComments) {
        state.loadingPostComments = true;
      }
    },
    [fetchPostComments.fulfilled]: (state, action) => {
      if (state.loadingPostComments) {
        state.loadingPostComments = false;
        if (action.payload) {
          if (action.payload.post.length > 0) {
            let posts = current(state.posts).filter(
              (i) => i.postId !== action.payload.post[0].comment.itemId
            );
            let posts1 = current(state.posts).filter(
              (i) => i.postId === action.payload.post[0].comment.itemId
            )[0];
            let dummy1 = [];
            let arr = action.payload.post.map((obj) => ({
              ...obj.comment,
              totalReplies: obj.totalReplies,
              replies: [],
            }));
            dummy1.push({
              postId: action.payload.post[0].comment.itemId,
              postDetails: posts1.postDetails,
              comments: arr,
              totalComments: action.payload.post.length,
              totalLikes: posts1.totalLikes,
            });
            dummy1 = dummy1.concat(posts);
            state.posts = dummy1.sort((a, b) => {
              return (
                new Date(b.postDetails.createdAt) -
                new Date(a.postDetails.createdAt)
              );
            });
          }
        }
      }
    },
    [fetchPostComments.rejected]: (state, action) => {
      if (state.loadingPostComments) {
        state.loadingPostComments = false;
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
            let posts = current(state.posts).filter(
              (i) => i.postId !== action.payload.postId
            );
            let posts1 = current(state.posts).filter(
              (i) => i.postId === action.payload.postId
            )[0];
            let dummy1 = [];
            if(posts1.comments.length>0) {
            let findComment = posts1.comments.filter(i=>i._id === action.payload.commentId);
            let findComment1 = posts1.comments.filter(i=>i._id !== action.payload.commentId);
            let newArr = []
            newArr = newArr.concat({...findComment[0],replies: action.payload.replies})            
            newArr = newArr.concat(findComment1)
            newArr = newArr.sort((a, b) => {
              return (
                new Date(a.createdAt) -
                new Date(b.createdAt)
              );
            });
            dummy1.push({
              postId: action.payload.postId,
              postDetails: posts1.postDetails,
              comments: newArr,
              totalComments: posts1.totalComments,
              totalLikes: posts1.totalLikes,
            });
            dummy1 = dummy1.concat(posts);
            state.posts = dummy1.sort((a, b) => {
              return (
                new Date(b.postDetails.createdAt) -
                new Date(a.postDetails.createdAt)
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
    [filterData.pending]: (state) => {
      if (!state.loadingFilterData) {
        state.loadingFilterData = true;
      }
    },
    [filterData.fulfilled]: (state, action) => {
      if (state.loadingFilterData) {
        state.loadingFilterData = false;
        if (action.payload) {
          state.posts = action.payload.posts;
          state.totalPosts = action.payload.totalPosts;
        }
      }
    },
    [filterData.rejected]: (state, action) => {
      if (state.loadingFilterData) {
        state.loadingFilterData = false;
        state.error = action.payload;
      }
    },
    [addFilteredPosts.pending]: (state) => {
      if (!state.loadingAddFilteredPosts) {
        state.loadingAddFilteredPosts = true;
      }
    },
    [addFilteredPosts.fulfilled]: (state, action) => {
      if (state.loadingAddFilteredPosts) {
        state.loadingAddFilteredPosts = false;
        if (action.payload) {
          state.posts = state.posts.concat(action.payload.posts);
          state.totalPosts = action.payload.totalPosts;
        }
      }
    },
    [addFilteredPosts.rejected]: (state, action) => {
      if (state.loadingAddFilteredPosts) {
        state.loadingAddFilteredPosts = false;
        state.error = action.payload;
      }
    },
  },
});

export const {
  setFilters,
  setSideFiltersByMostRecent,
  setSideFiltersByMostLiked,
  setSideFilters,
} = slice.actions;
export default slice.reducer;
