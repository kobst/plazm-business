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


const SideBar = () => {

  const [expanded, setExpanded] = useState(false)

  const handleHover = () => {
    console.log("set expanded true")
    setExpanded(true)
  }

  const handleLeave = () => {
    console.log("set expanded false")
    setExpanded(false)

  }

  return (
    <div className={expanded ? "Sidebar" : "Sidebar collapsed"} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      <div className="sidebar-header">
          <h1 className="sidebar-logo">PLAZM</h1>
      </div>
      <div className="sidebar-items">
        <div className="item">
            <FiGlobe className="sidebar-icon"/>
          <span className="sidebar-text">Explore</span>
        </div>
        <div className="item">
            <FiHome className="sidebar-icon" />
          <span className="sidebar-text">Home</span>
        </div>
        <div className="item">
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


    </div>
  )

}

export default SideBar