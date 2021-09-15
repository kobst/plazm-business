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
  },
  reducers: {
    clearListData: (state, action) => {
      state.data = [];
      state.filteredList = [];
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
      state.filteredList = state.data
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
  },
});

export const { clearListData, filterSubscribedLists, filterUserCreatedLists, filterByAll } =
  slice.actions;
export default slice.reducer;
