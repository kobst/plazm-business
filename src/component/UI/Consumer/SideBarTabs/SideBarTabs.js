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


import useStore from '../../../Consumer/useState/index'


import { FiSearch, FiHome, FiGlobe, FiHeart, FiBell, FiList } from "react-icons/fi";
import { BsListUl, BsThreeDots } from "react-icons/bs";
import PolygonArrow from "../../../../images/Polygon.png";
import { Auth } from "aws-amplify";
import { setGloablLoader } from "../../../../reducers/consumerReducer";
import DiscoverList from "../../../Consumer/DiscoverList";

import ListTab from './ListTab'
import PanelContent from '../Panel-Content/PanelContent'

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


const SideBarTabs = ({
  profile,
  setFlag,
  isBusinessOpen,
  businessExists,
  detailId,
  businessId,
  isUserOpen,
  userId,
  view
}) => {

  const dispatch = useDispatch();
  const history = useHistory();
  
  const user = useSelector((state) => state.user.user);
  const userLocation = useSelector((state) => state.business.userLocation);
  const filteredListData = useSelector((state) => state.list.filteredList);
  const totalList = useSelector((state) => state.list.totalList);
  const listData = useSelector((state) => state.list.data);
  const userLists = useSelector((state) => state.list.userLists);
  const loading = useSelector((state) => state.myFeed.loading);
  const loader = useSelector((state) => state.consumer.globalLoader);


  const [displayChangePassword, setDisplayChangePassword] = useState(false);
  const [tabIndex, setTabIndex] = useState();


  // new useStore
  const selectedTab= useStore((state) => state.tabSelected)
  const selectedListId = useStore((state) => state.selectedListId)
  const searchIndex = useStore((state) => state.searchIndex)
  const listClickedFromSearch = useStore((state) => state.listClickedFromSearch)
  const myFeedIndex = useStore((state) => state.myFeedIndex)
  const listIndex = useStore((state) => state.listIndex)
  const favoriteIndex = useStore((state) => state.favoriteIndex)
  const userDataId = useStore((state) => state.userDataId)
  const discoverBtn = useStore((state) => state.discoverBtn)
  const businessDetailProfile = useStore((state) => state.businessDetailProfile)
  const readMore = useStore((state) => state.readMore)


  const setBusinessDetailProfile = useStore((state) => state.setBusinessDetailProfile)
  const setSelectedTab = useStore((state) => state.setTabSelected)
  const setSelectedListId = useStore((state) => state.setSelectedListId)
  const setSearchIndex = useStore((state) => state.setSearchIndex)
  const setListClickedFromSearch = useStore((state) => state.setListClickedFromSearch)
  const setMyFeedIndex = useStore((state) => state.setMyFeedIndex)
  const setListIndex = useStore((state) => state.setListIndex)
  const setFavoriteIndex = useStore((state) => state.setFavoriteIndex)
  const setUserDataId = useStore((state) => state.setUserDataId)
  const setDiscoverBtn = useStore((state) => state.setDiscoverBtn)
  const setReadMore = useStore((state) => state.setReadMore)


//old useStore

  const [expanded, setExpanded] = useState(false)

  useEffect(() => {

  }, []);


  useEffect(() => {
    if (userLists.length === 0 && user && user._id)
      dispatch(fetchUserLists(user._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // useEffect(()=>{
  //   console.log("user lists" + JSON.stringify(userLists))
  // }, [userLists])


  useEffect(()=>{
    console.log("selectedListId" + JSON.stringify(selectedListId))
  }, [selectedListId])

    /** to fetch all the user created and subscribed lists */
    useEffect(() => {
      if (user && user._id) {
        
        const fetchListData = async () => {
          const obj = {
            id: user._id,
            value: 0,
          };
          dispatch(clearListData());
          const data = await dispatch(fetchUserCreatedAndFollowedList(obj));
          const res = await unwrapResult(data);
          if (res) {
            setFlag(false);
          }
        };
        fetchListData();
      }

    }, [dispatch, user]);



    /** to clear selected data on tab click */
    const homeSearchFunction = () => {

      console.log("home search" + selectedTab)
      setFavoriteIndex(null);
      if (!loading) {
        dispatch(setSearchData(""));
        dispatch(clearMyFeedData());
        dispatch(setSideFiltersHomeSearch());
        // dispatch(HomeSearch(obj));
        setUserDataId(null);
        setSelectedListId(null);
        dispatch(clearBusinessData());
        dispatch(clearTopPost());
        setSearchIndex(null);
        history.push("/explore");
      }
    };

        

    /** to clear selected data on tab click */
  const myFeedFunction = () => {
    console.log(" my feed" + selectedTab)
    if (!loading) {
      console.log("in home feed ")
      const obj = {
        id: user._id,
        value: 0,
        filters: { closest: false, updated: false },
        latitude: userLocation
          ? userLocation.latitude
          : process.env.REACT_APP_LATITUDE,
        longitude: userLocation
          ? userLocation.longitude
          : process.env.REACT_APP_LONGITUDE,
        search: "",
      };
      dispatch(setSearchData(""));
      setUserDataId(null);
      setSelectedListId(null);
      dispatch(setSideFiltersHomeSearch());
      dispatch(clearMyFeedData());
      dispatch(fetchMyFeedData(obj));
      dispatch(clearBusinessData());
      dispatch(clearTopPost());
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
      // if (!loading) {
        console.log(" list discovery - xxx")
        dispatch(clearMyFeedData());
        dispatch(clearBusinessData());
        dispatch(clearTopPost());
        setSelectedListId(null);
        setListIndex(null);
        setUserDataId(null);
        history.push("/lists");
        setDiscoverBtn(false);
      // }
    }


  const handleHover = () => {
    console.log("set expanded true")
    setExpanded(true)
  }

  const handleLeave = () => {
    console.log("set expanded false")
    setExpanded(false)

  }

  const setTab = (index) => {
    console.log("setting index " + index)
    setTabIndex(index)
    setSelectedTab(index)
  }

  const handleListTabClick = (data) => {
    console.log("handle list tab" + data.name)
    dispatch(clearMyFeedData());
    // history.push("/list");
    setTabIndex(-1)
    setSelectedTab(-1)
  }


    /** to open user profile tab */
    const showUserProfile = () => {
      setTabIndex(6);
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
        console.log("error signing out: ", error);
      }
    };



  return (
  <div >
    <div className={expanded ? "Sidebar expanded" : "Sidebar"} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
        <Tabs selectedIndex={selectedTab} onSelect={setTab} >
            <TabList className={"tablist"} >
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
                        <FiGlobe className="sidebar-icon"/>
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
                        <FiHome className="sidebar-icon" />
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
                        <FiBell className="sidebar-icon" />
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
                        <FiHeart className="sidebar-icon"/>
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
                        <FiList className="sidebar-icon"/>
                        <span className="sidebar-text">Lists</span>
                    </div>
                </Tab>


      </TabList>
</Tabs>

  <div className="list-scroll" >
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
  </div>
</div>

{/* <div className="panel-content">

{selectedTab === 1 && view !== "business_detail" && view !== "list_detail" &&
  <HomeSearchComponent/> }

{selectedTab === 2 && view !== "business_detail" && view !== "list_detail" &&
  <MyFeed/> } 

{view ==="list_detail" && 
  <ListDetail/>
}

{view ==="business_detail" && 
    <BuisinessView
      // profile={profile}
      // businessExists={businessExists}
      businessId={detailId}
    />
}
</div>  */}
 
</div>

       
  )

}

export default SideBarTabs




