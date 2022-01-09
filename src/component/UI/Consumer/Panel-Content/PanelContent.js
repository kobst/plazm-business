import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./styles.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Notifications from "../../../../images/notifications-new.png";
import { useDispatch, useSelector } from "react-redux";

import ListDetail from "../../../Consumer/ListDescriptionView/ListDetail";

import MyFeed from "../../../Consumer/MyFeed";
import {
  clearMyFeedData,
  setSearchData,
  fetchMyFeedData,
  setSideFiltersHomeSearch,
} from "../../../../reducers/myFeedReducer";

import Profile from "../../../Consumer/Profile";
import HomeSearchComponent from "../../../Consumer/HomeSearch";
import BuisinessView from "../../../Consumer/BuisinessView";
import BusinessList from "../../../Consumer/BusinessList";
import DiscoverList from "../../../Consumer/DiscoverList";



import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";


import {
  clearBusinessData,
  clearTopPost,
} from "../../../../reducers/businessReducer";


import {
  fetchUserLists,
  fetchUserCreatedAndFollowedList,
  clearListData,
} from "../../../../reducers/listReducer";


import useStore from '../../../Consumer/useState/index'



const PanelContent = ({view}) => {

// const user = useSelector((state) => state.user.user);
// const userLocation = useSelector((state) => state.business.userLocation);
// const [selectedListId, setSelectedListId] = useState(null);
// const [listClickedFromSearch, setListClickedFromSearch] = useState(false);
// const loading = useSelector((state) => state.myFeed.loading);
// const loader = useSelector((state) => state.consumer.globalLoader);
// const [searchIndex, setSearchIndex] = useState(null);
// const [myFeedIndex, setMyFeedIndex] = useState(null);
// const [listIndex, setListIndex] = useState(null);
// const [favoriteIndex, setFavoriteIndex] = useState(null);
// const [profileClosed, setProfileClosed] = useState(false);
// const [userDataId, setUserDataId] = useState(userId);

// const [readMore, setReadMore] = useState(false);
// const dispatch = useDispatch();
// const history = useHistory();

const selectedTab= useStore((state) => state.tabSelected)
const detailId = useStore((state) => state.detailId)


    return (
        <>
        <div className="panel-content">
                {selectedTab === 1 && <HomeSearchComponent/> }

                {selectedTab === 2 && <MyFeed/> } 

                {view ==="list_detail" && <ListDetail/>}

                {view ==="business_detail" && <BuisinessView businessId={detailId}/>}

                {view ==="user_detail" && <Profile userId={detailId}/>}

        </div>

        {view === "list_explore" && <DiscoverList/>}

        </>
    )
}

export default PanelContent