import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./styles.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Notifications from "../../../../images/notifications-new.png";
import BuisinessView from "../../../Consumer/BuisinessView";
import BusinessList from "../../../Consumer/BusinessList";
import { useDispatch, useSelector } from "react-redux";
import ListOptionView from "../../../Consumer/ListOptionView";
import ListDescriptionView from "../../../Consumer/ListDescriptionView";
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

import useStore from "../../../Consumer/useState/index";

import {
  FiSearch,
  FiHome,
  FiGlobe,
  FiHeart,
  FiBell,
  FiList,
} from "react-icons/fi";
import { BsListUl, BsThreeDots } from "react-icons/bs";
import PolygonArrow from "../../../../images/Polygon.png";
import { Auth } from "aws-amplify";
import { setGloablLoader } from "../../../../reducers/consumerReducer";
import DiscoverList from "../../../Consumer/DiscoverList";

import ListTab from "./ListTab";
import PanelContent from "../Panel-Content/PanelContent";

import ValueLoader from "../../../../utils/loader";
import CompassIconWhite from "../../../../images/compass-white.png";
import CompassIcon from "../../../../images/compass.svg";
import HomeIconWhite from "../../../../images/home-white.png";
import HomeIcon from "../../../../images/home.svg";
import BellIconWhite from "../../../../images/bell-white.png";
import BellIcon from "../../../../images/bell.svg";
import { BsGrid } from "react-icons/bs";

const TabIcon = styled.div`
  width: 36px;
  svg {
    color: #767676;
    font-size: 26px;
    @media (max-width: 767px) {
      font-size: 24px;
    }
  }
`;

const SubcriptionHeading = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #262527;
  border-top: 1px dashed #d2d2d2;
  padding: 15px 0 5px 15px;
`;

const SideBarTabs = ({
  profile,
  setFlag,
  isBusinessOpen,
  businessExists,
  detailId,
  businessId,
  isUserOpen,
  userId,
  view,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user.user);
  const userLocation = useSelector((state) => state.business.userLocation);
  const filteredListData = useSelector((state) => state.list.filteredList);
  // const totalList = useSelector((state) => state.list.totalList);
  const listData = useSelector((state) => state.list.data);
  const totalList = useSelector((state) => state.list.totalList);
  const userLists = useSelector((state) => state.list.userLists);
  const loading = useSelector((state) => state.myFeed.loading);
  const loader = useSelector((state) => state.consumer.globalLoader);
  const [displayChangePassword, setDisplayChangePassword] = useState(false);
  const [tabIndex, setTabIndex] = useState();
  const listLoader = useSelector(
    (state) => state.list.loadingUserCreatedAndFollowed
  );
  // new useStore
  const selectedTab = useStore((state) => state.tabSelected);
  const selectedListId = useStore((state) => state.selectedListId);
  const searchIndex = useStore((state) => state.searchIndex);
  const listClickedFromSearch = useStore(
    (state) => state.listClickedFromSearch
  );
  const myFeedIndex = useStore((state) => state.myFeedIndex);
  const listIndex = useStore((state) => state.listIndex);
  const favoriteIndex = useStore((state) => state.favoriteIndex);
  const userDataId = useStore((state) => state.userDataId);
  const discoverBtn = useStore((state) => state.discoverBtn);
  const businessDetailProfile = useStore(
    (state) => state.businessDetailProfile
  );
  const readMore = useStore((state) => state.readMore);

  const setBusinessDetailProfile = useStore(
    (state) => state.setBusinessDetailProfile
  );
  const setSelectedTab = useStore((state) => state.setTabSelected);
  const setSelectedListId = useStore((state) => state.setSelectedListId);
  const setSearchIndex = useStore((state) => state.setSearchIndex);
  const setListClickedFromSearch = useStore(
    (state) => state.setListClickedFromSearch
  );
  const setMyFeedIndex = useStore((state) => state.setMyFeedIndex);
  const setListIndex = useStore((state) => state.setListIndex);
  const setFavoriteIndex = useStore((state) => state.setFavoriteIndex);
  const setUserDataId = useStore((state) => state.setUserDataId);
  const setDiscoverBtn = useStore((state) => state.setDiscoverBtn);
  const setReadMore = useStore((state) => state.setReadMore);
  const draggedLocation = useStore((state) => state.draggedLocation);
  const setSelectedList = useStore((state) => state.setSelectedList);

  //old useStore

  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (userLists.length === 0 && user && user._id)
      dispatch(fetchUserLists(user._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /** to fetch all the user created and subscribed lists */
  useEffect(() => {
    if (user && user._id) {
      const fetchListData = async () => {
        const obj = {
          id: user._id,
          value: page,
          limit: 15,
        };
        // dispatch(clearListData());
        const data = await dispatch(fetchUserCreatedAndFollowedList(obj));
        const res = await unwrapResult(data);
        if (res) {
          // setFlag(false);
        }
      };
      if (page > 1) {
        fetchListData();
      }
    }
  }, [dispatch, user._id, page]);

  /** to clear selected data on tab click */
  const homeSearchFunction = () => {
    setFavoriteIndex(null);
    setSelectedList(null);
    setSelectedListId(null);
    if (!loading) {
      history.push("/explore");
    }
  };

  /** to clear selected data on tab click */
  const myFeedFunction = () => {
    if (!loading) {
      setSelectedList(null);
      setSelectedListId(null);

      history.push("/home");
    }
  };

  /** to clear selected data on tab click */
  const listView = () => {
    if (selectedTab !== 5 && !loading) {
      dispatch(clearMyFeedData());
      dispatch(clearBusinessData());
      dispatch(clearTopPost());
      setSelectedListId(null);
      setListIndex(null);
      setUserDataId(null);
      history.push("/");
      setDiscoverBtn(false);
    }
  };

  const listDiscovery = () => {
    history.push("/lists");
    setDiscoverBtn(false);
  };

  const handleHover = () => {
    setExpanded(true);
  };

  const handleLeave = () => {
    setExpanded(false);
  };

  const setTab = (index) => {
    setTabIndex(index);
    setSelectedTab(index);
  };

  const handleListTabClick = (data) => {
    dispatch(clearMyFeedData());
    setTabIndex(-1);
    setSelectedTab(-1);
  };

  /** to open user profile tab */
  const showUserProfile = () => {
    // setTabIndex(6);
  };

  /** for logout functionality redirection */
  const redirectUserToLoginScreen = () => {
    dispatch(setGloablLoader(false));
    history.push("/consumer/login");
  };
  /** logout consumer */
  const consumerLogout = async () => {
    try {
      dispatch(setGloablLoader(true));
      await Auth.signOut();
      setTimeout(() => redirectUserToLoginScreen(), 3000);
    } catch (error) {
      dispatch(setGloablLoader(false));
    }
  };

  return (
    <div>
      <div
        className={expanded ? "Sidebar expanded" : "Sidebar"}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <Tabs selectedIndex={selectedTab} onSelect={setTab}>
          <TabList className={"tablist"}>
            <Tab
              disabled={loading || selectedTab === 0}
              className={
                0 === selectedTab - 1
                  ? selectedTab === 1
                    ? "react-tabs__tab LIBefore removeBorder"
                    : "react-tabs__tab LIBefore"
                  : selectedTab + 1 === 0
                  ? "react-tabs__tab LIAFter"
                  : selectedTab === 0
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              <div className="sidebar-header">
                <h1 className="sidebar-logo">PLAZM</h1>
              </div>
            </Tab>
            <Tab
              disabled={loading || selectedTab === 1}
              className={
                1 === selectedTab - 1
                  ? selectedTab === 2
                    ? "react-tabs__tab LIBefore removeBorder"
                    : "react-tabs__tab LIBefore"
                  : selectedTab + 1 === 1
                  ? "react-tabs__tab"
                  : selectedTab === 1
                  ? "react-tabs__tab react-tabs__tab--selected removeBorder"
                  : "react-tabs__tab"
              }
              onClick={() => homeSearchFunction()}
            >
              <div className="item">
                {/* <FiGlobe className="sidebar-icon"/> */}
                <img
                  src={selectedTab === 1 ? CompassIconWhite : CompassIcon}
                  className="sidebar-icon"
                />
                <span className="sidebar-text">Explore</span>
              </div>
            </Tab>
            <Tab
              disabled={loading || selectedTab === 2}
              className={
                2 === selectedTab - 1
                  ? selectedTab === 3
                    ? "react-tabs__tab LIBefore removeBorder"
                    : "react-tabs__tab LIBefore"
                  : selectedTab + 1 === 2
                  ? "react-tabs__tab"
                  : selectedTab === 2
                  ? "react-tabs__tab react-tabs__tab--selected removeBorder"
                  : "react-tabs__tab"
              }
              onClick={() => myFeedFunction()}
            >
              <div className="item">
                {/* <FiHome className="sidebar-icon" /> */}
                <img
                  src={selectedTab === 2 ? HomeIconWhite : HomeIcon}
                  className="sidebar-icon"
                />
                <span className="sidebar-text">Home</span>
              </div>
            </Tab>
            <Tab
              disabled={loading || selectedTab === 3}
              className={
                3 === selectedTab - 1
                  ? selectedTab === 4
                    ? "react-tabs__tab LIBefore removeBorder"
                    : "react-tabs__tab LIBefore"
                  : selectedTab + 1 === 3
                  ? "react-tabs__tab"
                  : selectedTab === 3
                  ? "react-tabs__tab react-tabs__tab--selected removeBorder"
                  : "react-tabs__tab"
              }
            >
              <div className="item">
                {/* <FiBell className="sidebar-icon" /> */}
                <img
                  src={selectedTab === 3 ? BellIconWhite : BellIcon}
                  className="sidebar-icon"
                />
                <div className="NotificationDot"></div>
                <span className="sidebar-text">Notifications</span>
              </div>
            </Tab>
            <Tab
              disabled={loading || selectedTab === 4}
              className={
                4 === selectedTab - 1
                  ? selectedTab === 5
                    ? "react-tabs__tab LIBefore removeBorder"
                    : "react-tabs__tab LIBefore"
                  : selectedTab + 1 === 4
                  ? "react-tabs__tab"
                  : selectedTab === 4
                  ? "react-tabs__tab react-tabs__tab--selected removeBorder"
                  : "react-tabs__tab"
              }
            >
              <div className="item">
                <FiHeart className="sidebar-icon" />
                <span className="sidebar-text">Favorites</span>
              </div>
            </Tab>
            <Tab
              disabled={loading || selectedTab === 5}
              className={
                5 === selectedTab - 1
                  ? selectedTab === 6
                    ? "react-tabs__tab LIBefore removeBorder"
                    : "react-tabs__tab LIBefore"
                  : selectedTab + 1 === 5
                  ? "react-tabs__tab"
                  : selectedTab === 5
                  ? "react-tabs__tab react-tabs__tab--selected removeBorder"
                  : "react-tabs__tab"
              }
              onClick={() => listDiscovery()}
            >
              <div className="item">
                <BsGrid className="sidebar-icon" />
                <span className="sidebar-text">Subscriptions</span>
              </div>
            </Tab>
          </TabList>
        </Tabs>

        {listData.length > 0 && (
          <SubcriptionHeading>{expanded && "Subscriptions"}</SubcriptionHeading>
        )}

        <div className="list-scroll">
          {listData.length > 0 ? (
            listData.map((i, key) => (
              <ListTab
                data={i}
                key={key}
                handleListTabClick={handleListTabClick}
                setSelectedListId={setSelectedListId}
              />
            ))
          ) : (
            <h6></h6>
          )}
          {listLoader && (
            <div className="sidebar-loader">
              <ValueLoader />
            </div>
          )}
          {totalList > listData.length && !listLoader && (
            <button
              onClick={() => {
                setPage((prev) => prev + 1);
              }}
              className="loadMore"
            >
              Load
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBarTabs;
