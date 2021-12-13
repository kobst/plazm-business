import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { graphQlEndPoint } from "../Api/graphQl";
import {
  addEventToList,
  addPostToList,
  CreateList,
  getAllLists,
  getUserCreatedAndFollowedLists,
  getUserLists,
  DeleteList,
  UnsubscribeToAList,
  SubscribeToAList,
  DeletePostFromAList,
  getMostTrendingLists,
  getMostPopularLists,
  SearchLists,
} from "../graphQl";

/*
 * @desc:  to check if business exists or not
 * @params: businessId
 */
export const findAllLists = createAsyncThunk("data/findAllLists", async () => {
  const graphQl = getAllLists();
  const response = await graphQlEndPoint(graphQl);
  return response.data.getLists.list;
});

/*
 * @desc:  to create a list
 * @params: businessId
 */
export const createList = createAsyncThunk("data/createList", async (obj) => {
  const graphQl = CreateList(obj);
  const response = await graphQlEndPoint(graphQl);
  return response;
});

/*
 * @desc:  to get user lists
 * @params: ownerId
 */
export const fetchUserLists = createAsyncThunk(
  "data/fetchUserLists",
  async (obj) => {
    console.log(obj)
    console.log("fetching user lists")
    const graphQl = getUserLists(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.getUserLists.list;
  }
);

/*
 * @desc:  to add post to list
 * @params: listId, postId
 */
export const AddPostToList = createAsyncThunk(
  "data/AddPostToList",
  async (obj) => {
    const graphQl = addPostToList(obj);
    const response = await graphQlEndPoint(graphQl);
    return response;
  }
);

/*
 * @desc:  to add post to list
 * @params: listId, postId
 */
export const RemovePostFromAList = createAsyncThunk(
  "data/RemovePostFromAList",
  async (obj) => {
    const graphQl = DeletePostFromAList(obj);
    const response = await graphQlEndPoint(graphQl);
    return response;
  }
);

/*
 * @desc:  to add event to list
 * @params: listId, eventId
 */
export const AddEventToList = createAsyncThunk(
  "data/AddEventToList",
  async (obj) => {
    const graphQl = addEventToList(obj);
    const response = await graphQlEndPoint(graphQl);
    return response;
  }
);

/*
 * @desc:  to fetch user created and followed list
 * @params: userId
 */
export const fetchUserCreatedAndFollowedList = createAsyncThunk(
  "data/fetchUserCreatedAndFollowedList",
  async (obj) => {
    const graphQl = getUserCreatedAndFollowedLists(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.getUserCreatedAndFollowedLists;
  }
);

/*
 * @desc:  to delete a user created list
 * @params: userId, listId
 */
export const deleteUserCreatedList = createAsyncThunk(
  "data/deleteUserCreatedList",
  async (obj) => {
    const graphQl = DeleteList(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.deleteUserList;
  }
);

/*
 * @desc:  to unsubscribe to a list
 * @params: businessId
 */
export const UnSubscribeToAList = createAsyncThunk(
  "data/UnSubscribeToAList",
  async (obj) => {
    const graphQl = UnsubscribeToAList(obj);
    const response = await graphQlEndPoint(graphQl);
    if (response.data.unSubscribeToAList.success === true) return obj;
  }
);

/*
 * @desc:  to subscribe to a list
 * @params: businessId
 */
export const SubscribeToAListAction = createAsyncThunk(
  "data/SubscribeToAList",
  async (obj) => {
    const graphQl = SubscribeToAList(obj);
    const response = await graphQlEndPoint(graphQl);
    if (response.data.subscribeToAList.success === true) return obj;
  }
);

/*
 * @desc:  to fetch trending lists
 * @params: value
 */
export const FetchTrendingLists = createAsyncThunk(
  "data/FetchTrendingLists",
  async (value) => {
    const graphQl = getMostTrendingLists(value);
    const response = await graphQlEndPoint(graphQl);
    return response.data.fetchMostTrendingLists;
  }
);

/*
 * @desc:  to fetch most popular lists
 * @params: value
 */
export const FetchMostPopularLists = createAsyncThunk(
  "data/FetchMostPopularLists",
  async (value) => {
    const graphQl = getMostPopularLists(value);
    const response = await graphQlEndPoint(graphQl);
    return response.data.fetchMostPopularLists;
  }
);

/*
 * @desc:  to search lists
 * @params: value
 */
export const SearchListApi = createAsyncThunk(
  "data/SearchListApi",
  async (value) => {
    const graphQl = SearchLists(value);
    const response = await graphQlEndPoint(graphQl);
    return response.data.listSearch;
  }
);

export const slice = createSlice({
  name: "list",
  initialState: {
    loading: false,
    lists: [],
    loadingUserLists: false,
    loadingCreateList: false,
    userLists: [],
    loadingUserCreatedAndFollowed: false,
    data: [],
    totalList: 0,
    loadingSelectedList: false,
    totalPostInList: 0,
    selectedListData: [],
    selectedListDetails: {},
    loadingUnSubscribe: false,
    loadingSubscribe: false,
    filteredList: [],
    loadingTrendingLists: false,
    trendingLists: [],
    totalTrendingList: 0,
    loadingPopularLists: false,
    popularLists: [],
    totalPopularLists: 0,
    listSearch: "",
    loadingSearchList: false,
    searchList: [],
    totalSearchList: 0,
  },
  reducers: {
    clearListData: (state) => {
      state.data = [];
      state.filteredList = [];
      state.popularLists = [];
      state.trendingLists = [];
    },
    setListSearch: (state, action) => {
      state.listSearch = action.payload;
    },
    clearListSearchData: (state) => {
      state.searchList = [];
      state.totalSearchList = 0;
    },
    clearDiscoverPageData: (state) => {
      state.popularLists = [];
      state.trendingLists = [];
    },
    filterUserCreatedLists: (state, action) => {
      state.filteredList = current(state.data).filter(
        (i) => i.ownerId === action.payload
      );
    },
    filterSubscribedLists: (state, action) => {
      state.filteredList = current(state.data).filter(
        (i) => i.ownerId !== action.payload
      );
    },
    filterByAll: (state) => {
      state.filteredList = state.data;
    },
    userSubscribeToAList: (state, action) => {
      if (action.payload.type === "Trending") {
        const findList = state.trendingLists.find(
          (i) => i._id === action.payload.listId
        );
        if (findList) {
          findList.subscribers = findList.subscribers.concat({
            _id: action.payload.user._id,
            name: action.payload.user.name,
            image: action.payload.user.photo,
          });
        }
      } else {
        const findList = state.popularLists.find(
          (i) => i._id === action.payload.listId
        );
        if (findList) {
          findList.subscribers = findList.subscribers.concat({
            _id: action.payload.user._id,
            name: action.payload.user.name,
            image: action.payload.user.photo,
          });
        }
      }
    },
    userUnSubscribeToAList: (state, action) => {
      if (action.payload.type === "Trending") {
        const findList = state.trendingLists.find(
          (i) => i._id === action.payload.listId
        );
        if (findList) {
          findList.subscribers = findList.subscribers.filter(
            (i) => i._id !== action.payload.user._id
          );
        }
      } else {
        const findList = state.popularLists.find(
          (i) => i._id === action.payload.listId
        );
        if (findList) {
          findList.subscribers = findList.subscribers.filter(
            (i) => i._id !== action.payload.user._id
          );
        }
      }
    },
  },
  extraReducers: {
    [findAllLists.pending]: (state) => {
      if (!state.loading) {
        state.loading = true;
      }
    },
    [findAllLists.fulfilled]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        if (action.payload) {
          state.lists = action.payload;
        }
      }
    },
    [findAllLists.rejected]: (state, action) => {
      if (state.loading) {
        state.loading = false;
        state.error = action.payload;
      }
    },
    [fetchUserLists.pending]: (state) => {
      if (!state.loadingUserLists) {
        state.loadingUserLists = true;
      }
    },
    [fetchUserLists.fulfilled]: (state, action) => {
      if (state.loadingUserLists) {
        state.loadingUserLists = false;
        if (action.payload) {
          state.userLists = action.payload;
        }
      }
    },
    [fetchUserLists.rejected]: (state, action) => {
      if (state.loadingUserLists) {
        state.loadingUserLists = false;
        state.error = action.payload;
      }
    },
    [createList.pending]: (state) => {
      if (!state.loadingCreateList) {
        state.loadingCreateList = true;
      }
    },
    [createList.fulfilled]: (state, action) => {
      if (state.loadingCreateList) {
        state.loadingCreateList = false;
        if (action.payload) {
          state.userLists = state.userLists.concat(
            action.payload.data.createList.list
          );
        }
      }
    },
    [createList.rejected]: (state, action) => {
      if (state.loadingCreateList) {
        state.loadingCreateList = false;
        state.error = action.payload;
      }
    },
    [fetchUserCreatedAndFollowedList.pending]: (state) => {
      if (!state.loadingUserCreatedAndFollowed) {
        state.loadingUserCreatedAndFollowed = true;
      }
    },
    [fetchUserCreatedAndFollowedList.fulfilled]: (state, action) => {
      if (state.loadingUserCreatedAndFollowed) {
        state.loadingUserCreatedAndFollowed = false;
        if (action.payload) {
          state.data = state.data.concat(action.payload.list);
          state.totalList = action.payload.totalLists;
        }
      }
    },
    [fetchUserCreatedAndFollowedList.rejected]: (state, action) => {
      if (state.loadingUserCreatedAndFollowed) {
        state.loadingUserCreatedAndFollowed = false;
        state.error = action.payload;
      }
    },
    [deleteUserCreatedList.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.data = state.data.filter(
          (i) => i._id !== action.payload.list._id
        );
      }
    },
    [UnSubscribeToAList.pending]: (state) => {
      if (!state.loadingUnSubscribe) {
        state.loadingUnSubscribe = true;
      }
    },
    [UnSubscribeToAList.fulfilled]: (state, action) => {
      if (state.loadingUnSubscribe) {
        state.loadingUnSubscribe = false;
        if (action.payload) {
          if (state.data.length > 0) {
            state.data = state.data.filter(
              (i) => i._id !== action.payload.listId
            );
          }
        }
      }
    },
    [UnSubscribeToAList.rejected]: (state, action) => {
      if (state.loadingUnSubscribe) {
        state.loadingUnSubscribe = false;
        state.error = action.payload;
      }
    },
    [FetchTrendingLists.pending]: (state) => {
      if (!state.loadingTrendingLists) {
        state.loadingTrendingLists = true;
      }
    },
    [FetchTrendingLists.fulfilled]: (state, action) => {
      if (state.loadingTrendingLists) {
        state.loadingTrendingLists = false;
        if (action.payload) {
          state.trendingLists = state.trendingLists.concat(action.payload.list);
          state.totalTrendingList = action.payload.totalLists;
        }
      }
    },
    [FetchTrendingLists.rejected]: (state, action) => {
      if (state.loadingTrendingLists) {
        state.loadingTrendingLists = false;
        state.error = action.payload;
      }
    },
    [FetchMostPopularLists.pending]: (state) => {
      if (!state.loadingPopularLists) {
        state.loadingPopularLists = true;
      }
    },
    [FetchMostPopularLists.fulfilled]: (state, action) => {
      if (state.loadingPopularLists) {
        state.loadingPopularLists = false;
        if (action.payload) {
          state.popularLists = state.popularLists.concat(action.payload.list);
          state.totalPopularLists = action.payload.totalLists;
        }
      }
    },
    [FetchMostPopularLists.rejected]: (state, action) => {
      if (state.loadingPopularLists) {
        state.loadingPopularLists = false;
        state.error = action.payload;
      }
    },
    [SearchListApi.pending]: (state) => {
      if (!state.loadingSearchList) {
        state.loadingSearchList = true;
        if (state.listSearch === "") {
          state.searchList = [];
          state.totalList = 0;
        }
      }
    },
    [SearchListApi.fulfilled]: (state, action) => {
      if (state.loadingSearchList) {
        state.loadingSearchList = false;
        if (action.payload) {
          state.searchList = state.searchList.concat(action.payload.list);
          state.totalSearchList = action.payload.totalLists;
        }
      }
    },
    [SearchListApi.rejected]: (state, action) => {
      if (state.loadingSearchList) {
        state.loadingSearchList = false;
        state.error = action.payload;
      }
    },
  },
});

export const {
  clearListData,
  filterSubscribedLists,
  filterUserCreatedLists,
  filterByAll,
  clearDiscoverPageData,
  userSubscribeToAList,
  userUnSubscribeToAList,
  setListSearch,
  clearListSearchData,
} = slice.actions;
export default slice.reducer;
