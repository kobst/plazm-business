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
import {
  clearBusinessData,
  clearTopPost,
} from "../../../../reducers/businessReducer";
import { FiSearch, FiHome, FiGlobe, FiHeart, FiBell, FiList } from "react-icons/fi";
import { BsListUl, BsThreeDots } from "react-icons/bs";
import PolygonArrow from "../../../../images/Polygon.png";
import { Auth } from "aws-amplify";
import { setGloablLoader } from "../../../../reducers/consumerReducer";
import DiscoverList from "../../../Consumer/DiscoverList";

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
  businessId,
  isUserOpen,
  userId,
}) => {
  const [displayChangePassword, setDisplayChangePassword] = useState(false);
  const [tabIndex, setTabIndex] = useState(2);
  const user = useSelector((state) => state.user.user);
  const userLocation = useSelector((state) => state.business.userLocation);
  const [selectedListId, setSelectedListId] = useState(null);
  const [listClickedFromSearch, setListClickedFromSearch] = useState(false);
  const loading = useSelector((state) => state.myFeed.loading);
  const loader = useSelector((state) => state.consumer.globalLoader);
  const [searchIndex, setSearchIndex] = useState(null);
  const [myFeedIndex, setMyFeedIndex] = useState(null);
  const [listIndex, setListIndex] = useState(null);
  const [favoriteIndex, setFavoriteIndex] = useState(null);
  const [profileClosed, setProfileClosed] = useState(false);
  const [userDataId, setUserDataId] = useState(userId);
  const [discoverBtn, setDiscoverBtn] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const [tabSelectedTest, setTabSelectedTest] = useState(false)

  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setUserDataId(userId);
  }, [userId]);

    /** to clear selected data on tab click */
    const homeSearchFunction = () => {


      console.log("home search" + tabIndex)
      setFavoriteIndex(null);
      if (tabIndex !== 1 && !loading) {
        // const obj = {
        //   search: "",
        //   value: 0,
        //   filters: { closest: false, updated: false },
        //   latitude: process.env.REACT_APP_LATITUDE,
        //   longitude: process.env.REACT_APP_LONGITUDE,
        // };
        dispatch(setSearchData(""));
        dispatch(clearMyFeedData());
        dispatch(setSideFiltersHomeSearch());
        // dispatch(HomeSearch(obj));
        setUserDataId(null);
        setSelectedListId(null);
        dispatch(clearBusinessData());
        dispatch(clearTopPost());
        setSearchIndex(null);
        history.push("/");
      }
    };

        

    /** to clear selected data on tab click */
  const myFeedFunction = () => {
    console.log(" my feed" + tabIndex)
    if (tabIndex !== 2 && !loading) {
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
      history.push("/");
      dispatch(setSideFiltersHomeSearch());
      dispatch(clearMyFeedData());
      dispatch(fetchMyFeedData(obj));
      dispatch(clearBusinessData());
      dispatch(clearTopPost());
    }
  };

    const exitFunction = () => {
      setTabSelectedTest(false)
    }

  const handleHover = () => {
    console.log("set expanded true")
    setExpanded(true)
  }

  const handleLeave = () => {
    console.log("set expanded false")
    setExpanded(false)

  }

  const handleScroll = () => {
    console.log("scrolling")
  }

  const setTab = (index) => {
    console.log("setting index " + index)
    setTabIndex(index)

    // <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>

  }

  return (
  <>
    <div className={expanded ? "Sidebar expanded" : "Sidebar"} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
        <Tabs selectedIndex={tabIndex} onSelect={setTab} >
            <TabList className={"tablist"} >
                <Tab
                    disabled={loading || tabIndex === 0}
                    className={
                    0 === tabIndex - 1
                    ? tabIndex === 1
                    ? "react-tabs__tab LIBefore removeBorder"
                    : "react-tabs__tab LIBefore"
                    : tabIndex + 1 === 0
                    ? "react-tabs__tab LIAFter"
                    : tabIndex === 0
                    ? "react-tabs__tab react-tabs__tab--selected"
                    : "react-tabs__tab"
                    }
                >
                    <div className="sidebar-header">
                        <h1 className="sidebar-logo">PLAZM</h1>
                    </div>
                </Tab>
                <Tab
                    disabled={loading || tabIndex === 1}
                    className={
                      1 === tabIndex - 1
                        ? tabIndex === 2
                          ? "react-tabs__tab LIBefore removeBorder"
                          : "react-tabs__tab LIBefore"
                        : tabIndex + 1 === 1
                        ? "react-tabs__tab"
                        : tabIndex === 1
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
                    disabled={loading || tabIndex === 2}
                    className={
                      2 === tabIndex - 1
                        ? tabIndex === 3
                          ? "react-tabs__tab LIBefore removeBorder"
                          : "react-tabs__tab LIBefore"
                        : tabIndex + 1 === 2
                        ? "react-tabs__tab"
                        : tabIndex === 2
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
                    disabled={loading || tabIndex === 3}
                    className={
                      3 === tabIndex - 1
                        ? tabIndex === 4
                          ? "react-tabs__tab LIBefore removeBorder"
                          : "react-tabs__tab LIBefore"
                        : tabIndex + 1 === 3
                        ? "react-tabs__tab"
                        : tabIndex === 3
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
                    disabled={loading || tabIndex === 4}
                    className={
                      4 === tabIndex - 1
                        ? tabIndex === 5
                          ? "react-tabs__tab LIBefore removeBorder"
                          : "react-tabs__tab LIBefore"
                        : tabIndex + 1 === 4
                        ? "react-tabs__tab"
                        : tabIndex === 4
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
                    disabled={loading || tabIndex === 5}
                    className={
                      5 === tabIndex - 1
                        ? tabIndex === 6
                          ? "react-tabs__tab LIBefore removeBorder"
                          : "react-tabs__tab LIBefore"
                        : tabIndex + 1 === 5
                        ? "react-tabs__tab"
                        : tabIndex === 5
                        ? "react-tabs__tab react-tabs__tab--selected removeBorder"
                        : "react-tabs__tab"
                    }
                >
                    <div className="item">
                        <FiList className="sidebar-icon"/>
                        <span className="sidebar-text">Lists</span>
                    </div>
                </Tab>
      </TabList>
</Tabs>

  <div className="list-scroll" onScroll={handleScroll}>
      <div className="sidebar-list"> 
        <FiHome/>
      </div>
      <div className="sidebar-list"> 
        <FiHome/>
      </div>
      <div className="sidebar-list"> 
        <FiHome/>
      </div>
      <div className="sidebar-list"> 
        <FiHome/>
      </div>
      <div className="sidebar-list"> 
        <FiHome/>
      </div>
      <div className="sidebar-list"> 
        <FiHome/>
      </div>
      <div className="sidebar-list"> 
        <FiHome/>
      </div>
      <div className="sidebar-list"> 
        <FiHome/>
      </div>
      <div className="sidebar-list"> 
        <FiHome/>
      </div>
      <div className="sidebar-list"> 
        <FiHome/>
      </div>
      <div className="sidebar-list"> 
        <FiHome/>
      </div>
      <div className="sidebar-list"> 
        <FiHome/>
      </div>
      <div className="sidebar-list"> 
        <FiHome/>
      </div>
      <div className="sidebar-list"> 
        <FiHome/>
      </div>
  </div>
</div>

<div className="panel-content">
{tabIndex === 1 && 
  <HomeSearchComponent
    setDisplayTab={() => setTabIndex(0)}
    setSelectedListId={setSelectedListId}
    setListClickedFromSearch={setListClickedFromSearch}
    setSearchIndex={setSearchIndex}
  /> }

{tabIndex === 2 && 
  <MyFeed
    setDisplayTab={() => setTabIndex(0)}
    setMyFeedIndex={setMyFeedIndex}
    setSelectedListId={setSelectedListId}
  /> } 


{tabIndex === 5 && 
  <ListDescriptionView
    listOpenedFromBusiness={false}
    setDisplayTab={() => setTabIndex(0)}
    setSelectedListId={setSelectedListId}
    selectedListId={selectedListId}
    listClickedFromSearch={listClickedFromSearch}
    setListClickedFromSearch={setListClickedFromSearch}
    setListIndex={setListIndex}
    readMore={readMore}
    setDiscoverBtn={setDiscoverBtn}
  />}

</div>
</>

       
  )

}

export default SideBarTabs




// <div className={expanded ? "Sidebar expanded" : "Sidebar"} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
// <div className="sidebar-header">
//     <h1 className="sidebar-logo">PLAZM</h1>
// </div>
// <div className="sidebar-items">
//   <div className="item">
//       <FiGlobe className="sidebar-icon"/>
//     <span className="sidebar-text">Explore</span>
//   </div>
//   <div className="item"  onClick={() => homeSearchFunction()}>
//       <FiHome className="sidebar-icon" />
//     <span className="sidebar-text">Home</span>
//   </div>
//   <div className="item" onClick={() => exitFunction()}>
//       <FiBell className="sidebar-icon" />
//     <span className="sidebar-text">Notifications</span>
//   </div>
//   <div className="item">
//       <FiHeart className="sidebar-icon"/>
//     <span className="sidebar-text">Favorites</span>
//   </div>
//   <div className="item">
//       <FiList className="sidebar-icon"/>
//     <span className="sidebar-text">Lists</span>
//   </div>
// </div>
// </div>

{/* <div className="list-scroll" onScroll={handleScroll}>
<div className="sidebar-list"> 
  <FiHome/>
</div>
<div className="sidebar-list"> 
  <FiHome/>
</div>
<div className="sidebar-list"> 
  <FiHome/>
</div>
<div className="sidebar-list"> 
  <FiHome/>
</div>
<div className="sidebar-list"> 
  <FiHome/>
</div>
<div className="sidebar-list"> 
  <FiHome/>
</div>
<div className="sidebar-list"> 
  <FiHome/>
</div>
<div className="sidebar-list"> 
  <FiHome/>
</div>
<div className="sidebar-list"> 
  <FiHome/>
</div>
<div className="sidebar-list"> 
  <FiHome/>
</div>
<div className="sidebar-list"> 
  <FiHome/>
</div>
<div className="sidebar-list"> 
  <FiHome/>
</div>
<div className="sidebar-list"> 
  <FiHome/>
</div>
<div className="sidebar-list"> 
  <FiHome/>
</div>

</div> */}
