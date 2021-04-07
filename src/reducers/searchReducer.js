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
export const slice = createSlice({
  name: "search",
  initialState: {
    loading: false,
    searchedPlace: [],
    totalPlaces: 0,
    searchData: "",
    loadingPostComments: false,
    loadingReplies: false,
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
              totalPosts: posts1.totalPosts
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
              totalPosts: findBusiness1.totalPosts
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
  },
});

export const { setSearchData } = slice.actions;
export default slice.reducer;
