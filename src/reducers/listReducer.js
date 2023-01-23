import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { graphQlEndPoint } from "../Api/graphQl";
import {
  addEventToListGraphql,
  addPostToListGraphql,
  createListGraphql,
  getAllListsGraphql,
  getUserCreatedAndFollowedListsGraphql,
  getUserSubscribedListsGraphql,
  getUserListsGraphql,
  deleteListGraphql,
  unsubscribeToAListGraphql,
  subscribeToAListGraphql,
  deletePostFromAListGraphql,
  getMostTrendingListsGraphql,
  getMostPopularListsGraphql,
  searchListsGraphql,
} from "../graphQl";

import { filterUserListsGraphql } from "../graphQl/query/list";
/*
 * @desc:  to check if business exists or not
 * @params: businessId
 */
export const findAllLists = createAsyncThunk("data/findAllLists", async () => {
  const graphQl = getAllListsGraphql();
  const response = await graphQlEndPoint(graphQl);
  return response.data.getLists.list;
});

/*
 * @desc:  to create a list
 * @params: businessId
 */
export const createList = createAsyncThunk("data/createList", async (obj) => {
  const graphQl = createListGraphql(obj);
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
    const graphQl = getUserListsGraphql(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.getUserLists.list;
  }
);

/*
 * @desc:  to get user created lists
 * @params: ownerId
 */
export const filterListsByUser = createAsyncThunk(
  "data/filterListsByUser",
  async (obj) => {
    const graphQl = filterUserListsGraphql(obj);
    const response = await graphQlEndPoint(graphQl);
    const { list, totalLists, type } = response.data.fetchUserLists;
    return { data: list, total: totalLists, type };
  }
);

/*
 * @desc:  to add post to list
 * @params: listId, postId
 */
export const addPostToList = createAsyncThunk(
  "data/AddPostToList",
  async (obj) => {
    const graphQl = addPostToListGraphql(obj);
    const response = await graphQlEndPoint(graphQl);
    return response;
  }
);

/*
 * @desc:  to add post to list
 * @params: listId, postId
 */
export const removePostFromAList = createAsyncThunk(
  "data/RemovePostFromAList",
  async (obj) => {
    const graphQl = deletePostFromAListGraphql(obj);
    const response = await graphQlEndPoint(graphQl);
    return response;
  }
);

/*
 * @desc:  to add event to list
 * @params: listId, eventId
 */
export const addEventToList = createAsyncThunk(
  "data/AddEventToList",
  async (obj) => {
    const graphQl = addEventToListGraphql(obj);
    const response = await graphQlEndPoint(graphQl);
    return response;
  }
);

/*
 * @desc:  to fetch user created and followed list
 * @params: userId
 */
export const fetchUserSubscribedList = createAsyncThunk(
  "data/fetchUserSubscribedList",
  async (obj) => {
    const graphQl = getUserSubscribedListsGraphql(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.getUserSubscribedLists;
  }
);

/*
 * @desc:  to fetch user created and followed list
 * @params: userId
 */
export const fetchUserCreatedAndFollowedList = createAsyncThunk(
  "data/fetchUserCreatedAndFollowedList",
  async (obj) => {
    const graphQl = getUserCreatedAndFollowedListsGraphql(obj);
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
    const graphQl = deleteListGraphql(obj);
    const response = await graphQlEndPoint(graphQl);
    return response.data.deleteUserList;
  }
);

/*
 * @desc:  to unsubscribe to a list
 * @params: businessId
 */
export const unSubscribeToAList = createAsyncThunk(
  "data/UnSubscribeToAList",
  async (obj) => {
    const graphQl = unsubscribeToAListGraphql(obj);
    const response = await graphQlEndPoint(graphQl);
    if (response.data.unSubscribeToAList.success === true) return obj;
  }
);

/*
 * @desc:  to subscribe to a list
 * @params: businessId
 */
export const subscribeToAListAction = createAsyncThunk(
  "data/subscribeToAList",
  async (obj) => {
    const graphQl = subscribeToAListGraphql(obj);
    const response = await graphQlEndPoint(graphQl);
    if (response.data.subscribeToAList.success === true) return obj;
  }
);

/*
 * @desc:  to fetch trending lists
 * @params: value
 */
export const fetchTrendingLists = createAsyncThunk(
  "data/FetchTrendingLists",
  async (value) => {
    const graphQl = getMostTrendingListsGraphql(value);
    const response = await graphQlEndPoint(graphQl);
    return response.data.fetchMostTrendingLists;
  }
);

/*
 * @desc:  to fetch most popular lists
 * @params: value
 */
export const fetchMostPopularLists = createAsyncThunk(
  "data/FetchMostPopularLists",
  async (value) => {
    const graphQl = getMostPopularListsGraphql(value);
    const response = await graphQlEndPoint(graphQl);
    return response.data.fetchMostPopularLists;
  }
);

/*
 * @desc:  to search lists
 * @params: value
 */
export const searchListApi = createAsyncThunk(
  "data/SearchListApi",
  async (value) => {
    const graphQl = searchListsGraphql(value);
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
    loadingFilterUserLists: 0,
    userCreatedLists: {
      data: [],
      total: 0,
    },
    userSubscribedLists: {
      data: [],
      total: 0,
    },
    subscribedLists: [],
    loadingUserSubscribed: false,
    loadingUserCreatedAndFollowed: false,
    data: [],
    totalList: 0,
    totalSubscribedList: 0,
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
    isListCreated: false,
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
    setListCreated: (state, action) => {
      state.isListCreated = action.payload;
    },
    clearListSearchData: (state) => {
      state.searchList = [];
      state.totalSearchList = 0;
    },
    clearDiscoverPageData: (state) => {
      state.popularLists = [];
      state.trendingLists = [];
    },
    clearUserProfilePageListData: (state) => {
      state.userCreatedLists = {
        data: [],
        total: 0,
      };
      state.userSubscribedLists = {
        data: [],
        total: 0,
      };
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
    setSelectedListDetails: (state, action) => {
      state.selectedListDetails = action.payload;
    },
    setListData: (state, action) => {
      state.data = state.data.concat(action.payload.list);
      state.totalList = action.payload.totalList;
    },
    userSubscribeToAList: (state, action) => {
      let listName;
      let findList;
      switch (action.payload.type) {
        case "Trending":
          listName = "trendingLists";
          findList = state[listName].find(
            (i) => i._id === action.payload.listId
          );
          break;
        case "Most Popular":
          listName = "popularLists";
          findList = state[listName].find(
            (i) => i._id === action.payload.listId
          );
          break;
        case "Selected":
          listName = "selectedListDetails";
          findList = state.selectedListDetails;
          break;
        case "created":
          listName = "selectedListDetails";
          findList = state.userCreatedLists.data.find(
            (l) => l._id === action.payload.listId
          );
          findList.subscribers = findList.subscribers.concat({
            _id: action.payload.user._id,
          });
          state.userSubscribedLists.data = [
            findList,
            ...state.userSubscribedLists.data,
          ];
          state.userSubscribedLists.total = state.userSubscribedLists.total + 1;
          break;
      }
      if (findList) {
        findList.subscribers =
          listName !== "selectedListDetails" &&
          findList.subscribers.concat({
            _id: action.payload.user._id,
          });
        state.data = [findList, ...state.data];
        state.totalList = state.data.length;
      }
    },
    userUnSubscribeToAList: (state, action) => {
      let listName;
      let findList;
      switch (action.payload.type) {
        case "Trending":
          listName = "trendingLists";
          findList = state[listName].find(
            (i) => i._id === action.payload.listId
          );
          break;
        case "Most Popular":
          listName = "popularLists";
          findList = state[listName].find(
            (i) => i._id === action.payload.listId
          );
          break;
        case "Selected":
          listName = "selectedListDetails";
          findList = state.selectedListDetails;
          break;
        case "created":
          listName = "selectedListDetails";
          findList = state.userSubscribedLists.data.find(
            (l) => l._id === action.payload.listId
          );
          state.userSubscribedLists.data =
            state.userSubscribedLists.data.filter(
              (l) => l._id === action.payload.listId
            );
          state.userSubscribedLists.total = state.userSubscribedLists.total - 1;
          break;
      }
      if (findList && listName !== "selectedListDetails") {
        findList.subscribers = findList.subscribers.filter(
          (i) => i._id !== action.payload.user._id
        );
      }
      if (findList && listName === "selectedListDetails") {
        state.data = state.data.filter(
          (i) => i._id !== state.selectedListDetails._id
        );
      }
      state.totalList = state.data.length;
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
    [filterListsByUser.pending]: (state) => {
      state.loadingFilterUserLists += 1;
    },
    [filterListsByUser.fulfilled]: (state, action) => {
      if (state.loadingFilterUserLists) {
        state.loadingFilterUserLists -= 1;
        if (action.payload) {
          const { type, data, total } = action.payload;
          if (type === "created") {
            // state.userCreatedLists = {data, total}
            state.userCreatedLists.data =
              state.userCreatedLists.data.concat(data);
            state.userCreatedLists.total = total;
          }
          if (type === "subscribed") {
            // state.userSubscribedLists = {data, total};
            state.userSubscribedLists.data =
              state.userSubscribedLists.data.concat(data);
            state.userSubscribedLists.total = total;
          }
        }
      }
    },
    [filterListsByUser.rejected]: (state, action) => {
      if (state.loadingFilterUserLists) {
        state.loadingFilterUserLists -= 1;
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
    [fetchUserSubscribedList.pending]: (state) => {
      if (!state.loadingUserCreatedAndFollowed) {
        state.loadingUserSubscribed = true;
      }
    },
    [fetchUserSubscribedList.fulfilled]: (state, action) => {
      if (state.loadingUserCreatedAndFollowed) {
        state.loadingUserCreatedAndFollowed = false;
        if (action.payload) {
          state.subscribedLists = action.payload.list;
          state.totalSubscribedList = action.payload.totalLists;
        }
      }
    },
    [fetchUserSubscribedList.rejected]: (state, action) => {
      if (state.loadingUserCreatedAndFollowed) {
        state.loadingUserSubscribed = false;
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
          action.payload.list.forEach((item) => {
            if (!state.data.some((i) => item._id === i._id)) {
              state.data.push(item);
            }
          });
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
    [unSubscribeToAList.pending]: (state) => {
      if (!state.loadingUnSubscribe) {
        state.loadingUnSubscribe = true;
      }
    },
    [unSubscribeToAList.fulfilled]: (state, action) => {
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
    [unSubscribeToAList.rejected]: (state, action) => {
      if (state.loadingUnSubscribe) {
        state.loadingUnSubscribe = false;
        state.error = action.payload;
      }
    },
    [fetchTrendingLists.pending]: (state) => {
      if (!state.loadingTrendingLists) {
        state.loadingTrendingLists = true;
      }
    },
    [fetchTrendingLists.fulfilled]: (state, action) => {
      if (state.loadingTrendingLists) {
        state.loadingTrendingLists = false;
        if (action.payload) {
          state.trendingLists = state.trendingLists.concat(action.payload.list);
          state.totalTrendingList = action.payload.totalLists;
        }
      }
    },
    [fetchTrendingLists.rejected]: (state, action) => {
      if (state.loadingTrendingLists) {
        state.loadingTrendingLists = false;
        state.error = action.payload;
      }
    },
    [fetchMostPopularLists.pending]: (state) => {
      if (!state.loadingPopularLists) {
        state.loadingPopularLists = true;
      }
    },
    [fetchMostPopularLists.fulfilled]: (state, action) => {
      if (state.loadingPopularLists) {
        state.loadingPopularLists = false;
        if (action.payload) {
          console.log("hello");
          console.log(state.popularLists, "this is state.popularlists");
          state.popularLists = state.popularLists.concat(action.payload.list);
          console.log(state.popularLists, "again state.poularlists");
          state.totalPopularLists = action.payload.totalLists;
        }
      }
    },
    [fetchMostPopularLists.rejected]: (state, action) => {
      if (state.loadingPopularLists) {
        state.loadingPopularLists = false;
        state.error = action.payload;
      }
    },
    [searchListApi.pending]: (state) => {
      if (!state.loadingSearchList) {
        state.loadingSearchList = true;
        if (state.listSearch === "") {
          state.searchList = [];
          state.totalList = 0;
        }
      }
    },
    [searchListApi.fulfilled]: (state, action) => {
      if (state.loadingSearchList) {
        state.loadingSearchList = false;
        if (action.payload) {
          state.searchList = state.searchList.concat(action.payload.list);
          state.totalSearchList = action.payload.totalLists;
        }
      }
    },
    [searchListApi.rejected]: (state, action) => {
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
  clearUserProfilePageListData,
  userSubscribeToAList,
  userUnSubscribeToAList,
  setListSearch,
  setListCreated,
  clearListSearchData,
  setSelectedListDetails,
  setListData,
} = slice.actions;
export default slice.reducer;
