import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphQlEndPoint } from "../Api/graphQl";
import {
  addEventToList,
  addPostToList,
  CreateList,
  getAllLists,
  getUserCreatedAndFollowedLists,
  getUserLists,
  DeleteList,
  GetListDetails,
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
  },
  reducers: {},
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
          state.data = action.payload.list;
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
      if (state.loadingUserLists) {
        state.loadingUserLists = false;
        if (action.payload.success) {
          state.data = state.data.filter(
            (i) => i._id !== action.payload.list._id
          );
        }
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
          state.selectedListData = action.payload.data;
          state.totalPostInList = action.payload.totalLists;
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

export default slice.reducer;
