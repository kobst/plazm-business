import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './styles.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import Notifications from '../../../../images/notifications-new.png';

import ListDetail from '../../../Consumer/ListDescriptionView/ListDetail';

import MyFeed from '../../../Consumer/MyFeed';
import {
  clearMyFeedData,
  setSearchData,
  fetchMyFeedData,
  setSideFiltersHomeSearch,
} from '../../../../reducers/myFeedReducer';

import Profile from '../../../Consumer/Profile';
import HomeSearchComponent from '../../../Consumer/HomeSearch';
import BuisinessView from '../../../Consumer/BuisinessView';
import BusinessList from '../../../Consumer/BusinessList';
import DiscoverList from '../../../Consumer/DiscoverList';
import ListMenu from '../../../Consumer/DiscoverList/ListMenu';

import {
  clearBusinessData,
  clearTopPost,
} from '../../../../reducers/businessReducer';

import {
  fetchUserLists,
  fetchUserCreatedAndFollowedList,
  clearListData,
} from '../../../../reducers/listReducer';

import useStore from '../../../Consumer/useState/index';

// const PanelContent = ({view}) => {
function PanelContent() {
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

  const selectedTab = useStore((state) => state.tabSelected);
  const detailId = useStore((state) => state.detailId);
  const gridMode = useStore((state) => state.gridMode);
  const view = useStore((state) => state.view);

  return (
    <>
      <div className="panel-content">
        {view === 'explore' && <HomeSearchComponent />}

        {view == 'my_feed' && <MyFeed />}

        {view === 'list_detail' && <ListDetail />}

        {view === 'business_detail' && <BuisinessView businessId={detailId} />}

        {view === 'user_detail' && <Profile userId={detailId} />}
      </div>

      {/* {view === "list_explore" && <ListMenu/>} */}
      {view === 'list_explore' && <DiscoverList />}
    </>
  );
}

export default PanelContent;
