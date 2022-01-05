import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./styles.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Notifications from "../../../../images/notifications-new.png";
import BusinessList from "../../../Consumer/BusinessList";
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
import ChangePassword from "../../../Consumer/ChangePassword";
import ProfileSettings from "../../../Consumer/ProfileSettings";
import HomeSearchComponent from "../../../Consumer/HomeSearch";
import BuisinessView from "../../../Consumer/BuisinessView";
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



const PanelContent = ({isBusinessOpen, tabIndex, selectedListId}) => {

const user = useSelector((state) => state.user.user);
const userLocation = useSelector((state) => state.business.userLocation);
// const [selectedListId, setSelectedListId] = useState(null);
const [listClickedFromSearch, setListClickedFromSearch] = useState(false);

const loading = useSelector((state) => state.myFeed.loading);
const loader = useSelector((state) => state.consumer.globalLoader);
const [searchIndex, setSearchIndex] = useState(null);
const [myFeedIndex, setMyFeedIndex] = useState(null);
const [listIndex, setListIndex] = useState(null);
const [favoriteIndex, setFavoriteIndex] = useState(null);
const [profileClosed, setProfileClosed] = useState(false);
// const [userDataId, setUserDataId] = useState(userId);

const [readMore, setReadMore] = useState(false);
const dispatch = useDispatch();
const history = useHistory();

const selectedTab= useStore((state) => state.tabSelected)


// useEffect(() => {
//   setUserDataId(userId);
// }, [userId]);


    return (
        <div className="panel-content">
        {tabIndex === 1 && !isBusinessOpen &&
            <HomeSearchComponent
        // setDisplayTab={() => setTabIndex(0)}
        // setSelectedListId={setSelectedListId}
        setListClickedFromSearch={setListClickedFromSearch}
        setSearchIndex={setSearchIndex}
    /> }

        {tabIndex === 2 && !isBusinessOpen &&
    <MyFeed
    // setDisplayTab={() => setTabIndex(0)}
        setMyFeedIndex={setMyFeedIndex}
        // setSelectedListId={setSelectedListId}
 
    /> } 



    {tabIndex === -1 && !isBusinessOpen &&
    <ListDetail
        listOpenedFromBusiness={false}
        // setDisplayTab={() => setTabIndex(0)}
        // setSelectedListId={setSelectedListId}
        selectedListId={selectedListId}
        listClickedFromSearch={listClickedFromSearch}
        setListClickedFromSearch={setListClickedFromSearch}
        setListIndex={setListIndex}
        readMore={readMore}
    />
    }


      {isBusinessOpen && 
        <BuisinessView
        //   profile={profile}
        //   businessExists={businessExists}
        //   businessId={businessId}
          searchIndex={searchIndex}
        //   setTabIndex={setTabIndex}
          setSearchIndex={setSearchIndex}
          myFeedIndex={myFeedIndex}
          setMyFeedIndex={setMyFeedIndex}
          setListIndex={setListIndex}
          listIndex={listIndex}
          favoriteIndex={favoriteIndex}
          setFavoriteIndex={setFavoriteIndex}
          setDisplayTab={() => console.log("businessView")}
        />
        }
    </div>
    )
}

export default PanelContent