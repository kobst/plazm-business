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


const SideBar = ({
  profile,
  setFlag,
  isBusinessOpen,
  businessExists,
  businessId,
  isUserOpen,
  userId,
}) => {
  const [displayChangePassword, setDisplayChangePassword] = useState(false);
  const [tabIndex, setTabIndex] = useState(
    isBusinessOpen ? 4 : isUserOpen ? 1 : 0
  );
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
      setTabSelectedTest(true)
      console.log("home search")
      setFavoriteIndex(null);
        dispatch(setSearchData(""));
        dispatch(clearMyFeedData());
        dispatch(setSideFiltersHomeSearch());
        setUserDataId(null);
        setSelectedListId(null);
        dispatch(clearBusinessData());
        dispatch(clearTopPost());
        setSearchIndex(null);
        history.push("/");
      // }
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

  return (
    <div>
    <div className={expanded ? "Sidebar expanded" : "Sidebar"} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      <div className="sidebar-header">
          <h1 className="sidebar-logo">PLAZM</h1>
      </div>
      <div className="sidebar-items">
        <div className="item">
            <FiGlobe className="sidebar-icon"/>
          <span className="sidebar-text">Explore</span>
        </div>
        <div className="item"  onClick={() => homeSearchFunction()}>
            <FiHome className="sidebar-icon" />
          <span className="sidebar-text">Home</span>
        </div>
        <div className="item" onClick={() => exitFunction()}>
            <FiBell className="sidebar-icon" />
          <span className="sidebar-text">Notifications</span>
        </div>
        <div className="item">
            <FiHeart className="sidebar-icon"/>
          <span className="sidebar-text">Favorites</span>
        </div>
        <div className="item">
            <FiList className="sidebar-icon"/>
          <span className="sidebar-text">Lists</span>
        </div>
      </div>
      
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

      {/* <BottomSettingsWrap>
          <BsThreeDots />
          <div className="BottomSettings">
            <ul>
              <li>
                <button onClick={() => consumerLogout()} disabled={loader}>
                  Logout
                </button>
              </li>
              <li onClick={() => showUserProfile()}>Profile</li>
            </ul>
          </div>
        </BottomSettingsWrap> */}

    </div>


<div className="panel-content">
{tabSelectedTest ? 
  <HomeSearchComponent
    setDisplayTab={() => setTabIndex(0)}
    setSelectedListId={setSelectedListId}
    setListClickedFromSearch={setListClickedFromSearch}
    setSearchIndex={setSearchIndex}
  /> : <div></div>

}
</div>

</div>
  )

}

export default SideBar