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
  HomeSearch,
  setSearchData,
  fetchMyFeedData
} from "../../../../reducers/myFeedReducer";
import Profile from "../../../Consumer/Profile";
import HomeSearchComponent from "../../../Consumer/HomeSearch";
import { useHistory } from "react-router-dom";
import { clearBusinessData } from "../../../../reducers/businessReducer";
import { FiSearch, FiHome, FiHeart } from "react-icons/fi";
import { BsListUl, BsThreeDots } from "react-icons/bs";
import PolygonArrow from "../../../../images/Polygon.png";

const LeftBarContent = styled.div`
  width: 100px;
  position: relative;
  display: flex;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
  flex-direction: column;
  @media (max-width: 767px) {
    width: 50px;
  }
`;

const UserImage = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid #ff2a88;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    width: 30px;
    height: 30px;
  }
`;

const SearchIcon = styled.div`
  width: 36px;
  svg {
    color: #767676;
    font-size: 26px;
    @media (max-width: 767px) {
      font-size: 24px;
    }
  }
`;

const BottomSettingsWrap = styled.div`
  height: 100px;
  background: #f3f3f3;
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  border-top: 0.75px solid #C4C4C4;
  color: #767676;
  font-size: 18px;
  cursor: pointer;
  position: relative;
  .BottomSettings {
    visibility: hidden;
    font-size: 0;
  }
  :hover {
    background: #211D43;
    color: #fff;
    :before {
      width: 15px;
      height: 10px;
      position: absolute;
      top: -8px;
      background: url(${PolygonArrow}) no-repeat top center;
      content: "";
    }
    .BottomSettings {
      visibility: visible;
      position: absolute;
      width: 100%;
      bottom: 99px;
      ul {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 0;
        padding: 0;
        li {
          width: 100%;
          list-style: none;
          color: #767676;
          font-size: 13px;
          margin: 30px 0;
          padding: 0;
          cursor: pointer;
          text-align: center;
          text-transform: uppercase;
          font-weight: 700;
          :hover {
            color: #EE3840;
          }
        }
      }
    }
  }
`;

const LeftBar = (
  {
    profile,
    setFlag,
    isBusinessOpen,
    businessExists,
    businessId,
    isUserOpen,
    userId,
  },
) => {
  const [displayChangePassword, setDisplayChangePassword] = useState(false);
  const [tabIndex, setTabIndex] = useState(
    isBusinessOpen ? 6 : isUserOpen ? 3 : 0
  );
  const user = useSelector((state) => state.user.user);
  const [selectedListId, setSelectedListId] = useState(null);
  const [listClickedFromSearch, setListClickedFromSearch] = useState(false);
  const loading = useSelector((state) => state.myFeed.loading);
  const [searchIndex, setSearchIndex] = useState(null);
  const [myFeedIndex, setMyFeedIndex] = useState(null);
  const [listIndex, setListIndex] = useState(null);
  const [favoriteIndex, setFavoriteIndex] = useState(null);
  const [profileClosed, setProfileClosed] = useState(false);
  const [userDataId, setUserDataId] = useState(userId)
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(tabIndex);

  useEffect(()=>{
    setUserDataId(userId)
  },[userId])

  useEffect(() => {
    if (profileClosed && tabIndex === 6) {
      history.push(`/b/${businessId}`);
      setProfileClosed(false);
    } else if (
      profileClosed &&
      (tabIndex === 7 || tabIndex === 4 || tabIndex === 3)
    ) {
      history.push("/");
      setProfileClosed(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileClosed, tabIndex]);

  /** to clear selected data on tab click */
  const listView = () => {
    if (tabIndex !== 7 && !loading) {
      dispatch(clearMyFeedData());
      setSelectedListId(null);
      setListIndex(null);
      setUserDataId(null)
      history.push('/')
    }
  };

  /** to clear selected data on tab click */
  const myFeedFunction = () => {
    if (tabIndex !== 4 && !loading) {
      const obj = {
        id: user._id,
        value: 0,
      };
      setUserDataId(null)
      setSelectedListId(null)
      history.push('/')
      dispatch(clearMyFeedData());
      dispatch(fetchMyFeedData(obj));
    }
  };
  
  /** to clear selected data on tab click */
  const favoriteFunction = () => {
    dispatch(clearBusinessData());
    setFavoriteIndex(null)
    setSelectedListId(null)
    setUserDataId(null)
    setSelectedListId(null)
    history.push('/')
  };

  /** to clear selected data on tab click */
  const homeSearchFunction = () => {
    setFavoriteIndex(null);
    if (tabIndex !== 3 && !loading) {
      const obj = {
        search: "",
        value: 0,
        filters: { closest: false, updated: false },
        latitude: process.env.REACT_APP_LATITUDE,
        longitude: process.env.REACT_APP_LONGITUDE,
      };
      dispatch(setSearchData(""));
      dispatch(clearMyFeedData());
      dispatch(HomeSearch(obj));
      setUserDataId(null)
      setSelectedListId(null)
      history.push('/')
    }
  };
  return (
    <>
      <LeftBarContent className="MainTabs">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab
              disabled={loading || tabIndex === 0}
              className={
                0 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 0
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 0
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              {/* <img src={PlazmLogo} alt="" /> */}
            </Tab>
            {/* <Tab
              disabled={loading || tabIndex === 1}
              className={
                1 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex === 1
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              <img src={LocalNav} alt="" />
            </Tab>
            <Tab
              disabled={loading || tabIndex === 2}
              className={
                2 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 2
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 2
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              <UserImage>
                <img src={user.photo ? user.photo : ProfileImg} alt="" />
              </UserImage>
            </Tab> */}
            <Tab
              disabled={loading || tabIndex === 3}
              className={
                3 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 3
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 3
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
              onClick={() => homeSearchFunction()}
            >
              <SearchIcon>
                <FiSearch />
              </SearchIcon>
            </Tab>
            <Tab
              disabled={loading || tabIndex === 4}
              className={
                4 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 4
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 4
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
              onClick={() => myFeedFunction()}
            >
              {/* <img src={Mention} alt="" /> */}
              <SearchIcon>
                <FiHome />
              </SearchIcon>
              
            </Tab>
            <Tab
              disabled={loading || tabIndex === 5}
              className={
                5 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 5
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 5
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              <img src={Notifications} alt="" />
              
            </Tab>
            <Tab
              disabled={loading || tabIndex === 6}
              onClick={() => favoriteFunction()}
              className={
                6 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 6
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 6
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              {/* <img src={Favorites} alt="" /> */}
              <SearchIcon>
                <FiHeart />
              </SearchIcon>
            </Tab>
            <Tab
              disabled={loading || tabIndex === 7}
              className={
                7 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 7
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 7
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
              onClick={() => listView()}
            >
              {/* <img src={GridIcon} alt="" /> */}
              <SearchIcon>
                <BsListUl />
              </SearchIcon>
            </Tab>
            <Tab
              disabled={loading || tabIndex === 8}
              className={
                8 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 8
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 8
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              {/* <img src={ProfileSettingImg} alt="" /> */}
            </Tab>

            <Tab
              disabled={loading}
              className={
                10 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 10
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 10
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              &nbsp;
            </Tab>
            <Tab
              disabled={loading}
              className={
                11 === tabIndex - 1
                  ? "react-tabs__tab LIBefore"
                  : tabIndex + 1 === 11
                  ? "react-tabs__tab LIAFter"
                  : tabIndex === 11
                  ? "react-tabs__tab react-tabs__tab--selected"
                  : "react-tabs__tab"
              }
            >
              &nbsp;
            </Tab>
          </TabList>

          <TabPanel></TabPanel>
          {/* <TabPanel>
            <div className="panel-content">
              <h2>Any content 2</h2>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              <h2>Any content 3</h2>
            </div>
          </TabPanel> */}
          <TabPanel>
            <div className="panel-content">
              {isUserOpen && !selectedListId? (
                <Profile
                  setDisplayTab={() => setTabIndex(0)}
                  userId={userDataId}
                  setProfileClosed={setProfileClosed}
                />
              ) : selectedListId ? (
                <ListDescriptionView
                  setDisplayTab={() => setTabIndex(0)}
                  setSelectedListId={setSelectedListId}
                  selectedListId={selectedListId}
                  listClickedFromSearch={listClickedFromSearch}
                  setListClickedFromSearch={setListClickedFromSearch}
                  setListIndex={setListIndex}
                />
              ) : !searchIndex ? (
                <HomeSearchComponent
                  setDisplayTab={() => setTabIndex(0)}
                  setSelectedListId={setSelectedListId}
                  setListClickedFromSearch={setListClickedFromSearch}
                  setSearchIndex={setSearchIndex}
                />
              ) : userDataId ? (
                <Profile
                  setDisplayTab={() => setTabIndex(0)}
                  userId={userDataId}
                  setProfileClosed={setProfileClosed}
                />
              ) : 
              (
                <BuisinessView
                  setDisplayTab={() => setTabIndex(0)}
                  profile={profile}
                  businessExists={businessExists}
                  businessId={businessId}
                  searchIndex={searchIndex}
                  setTabIndex={setTabIndex}
                  setSearchIndex={setSearchIndex}
                  myFeedIndex={myFeedIndex}
                  setMyFeedIndex={setMyFeedIndex}
                  setListIndex={setListIndex}
                  listIndex={listIndex}
                  favoriteIndex={favoriteIndex}
                  setFavoriteIndex={setFavoriteIndex}
                />
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              {!myFeedIndex && !userDataId && !selectedListId ? (
                <MyFeed
                  setDisplayTab={() => setTabIndex(0)}
                  setMyFeedIndex={setMyFeedIndex}
                  setSelectedListId={setSelectedListId}
                />
              ) : userDataId && !selectedListId ? (
                <Profile
                  setDisplayTab={() => setTabIndex(0)}
                  userId={userDataId}
                  setProfileClosed={setProfileClosed}
                />
              ) : selectedListId ? (
                <ListDescriptionView
                  listOpenedFromBusiness={true}
                  setDisplayTab={() => setTabIndex(0)}
                  setSelectedListId={setSelectedListId}
                  selectedListId={selectedListId}
                  listClickedFromSearch={listClickedFromSearch}
                  setListClickedFromSearch={setListClickedFromSearch}
                  setListIndex={setListIndex}
                />
              ) : (
                <BuisinessView
                  setDisplayTab={() => setTabIndex(0)}
                  profile={profile}
                  businessExists={businessExists}
                  businessId={businessId}
                  searchIndex={searchIndex}
                  setTabIndex={setTabIndex}
                  setSearchIndex={setSearchIndex}
                  myFeedIndex={myFeedIndex}
                  setMyFeedIndex={setMyFeedIndex}
                  setListIndex={setListIndex}
                  listIndex={listIndex}
                  favoriteIndex={favoriteIndex}
                  setFavoriteIndex={setFavoriteIndex}
                />
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              <h2>Any content 6</h2>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              {(favoriteIndex || businessId) && !userDataId && !selectedListId? (
                <BuisinessView
                  setDisplayTab={() => setTabIndex(0)}
                  profile={profile}
                  businessExists={businessExists}
                  businessId={businessId}
                  searchIndex={searchIndex}
                  setTabIndex={setTabIndex}
                  setSearchIndex={setSearchIndex}
                  myFeedIndex={myFeedIndex}
                  setMyFeedIndex={setMyFeedIndex}
                  setListIndex={setListIndex}
                  listIndex={listIndex}
                  favoriteIndex={favoriteIndex}
                  setFavoriteIndex={setFavoriteIndex}
                  setSelectedListId={setSelectedListId}
                />
              ) : userDataId ? (
                <Profile
                  setDisplayTab={() => setTabIndex(0)}
                  userId={userDataId}
                  setProfileClosed={setProfileClosed}
                />
              ) :  selectedListId ? (
                <ListDescriptionView
                  listOpenedFromBusiness={true}
                  setDisplayTab={() => setTabIndex(0)}
                  setSelectedListId={setSelectedListId}
                  selectedListId={selectedListId}
                  listClickedFromSearch={listClickedFromSearch}
                  setListClickedFromSearch={setListClickedFromSearch}
                  setListIndex={setListIndex}
                />
              )
              : (
                <BusinessList
                  setDisplayTab={() => setTabIndex(0)}
                  setFavoriteIndex={setFavoriteIndex}
                />
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              {!selectedListId && !userDataId ? (
                <ListOptionView
                  setDisplayTab={() => setTabIndex(0)}
                  setSelectedListId={setSelectedListId}
                  selectedListId={selectedListId}
                />
              ) : !listIndex && !userDataId ? (
                <ListDescriptionView
                  setDisplayTab={() => setTabIndex(0)}
                  setSelectedListId={setSelectedListId}
                  selectedListId={selectedListId}
                  listClickedFromSearch={listClickedFromSearch}
                  setListClickedFromSearch={setListClickedFromSearch}
                  setListIndex={setListIndex}
                />
              ) : userDataId ? (
                <Profile
                  setDisplayTab={() => setTabIndex(0)}
                  userId={userDataId}
                  setProfileClosed={setProfileClosed}
                />
              ) : (
                <BuisinessView
                  setDisplayTab={() => setTabIndex(0)}
                  profile={profile}
                  businessExists={businessExists}
                  businessId={businessId}
                  searchIndex={searchIndex}
                  setTabIndex={setTabIndex}
                  setSearchIndex={setSearchIndex}
                  myFeedIndex={myFeedIndex}
                  setMyFeedIndex={setMyFeedIndex}
                  setListIndex={setListIndex}
                  listIndex={listIndex}
                  favoriteIndex={favoriteIndex}
                  setFavoriteIndex={setFavoriteIndex}
                />
              )}
            </div>
          </TabPanel>
          {/* <TabPanel>
            <div className="panel-content">
              {displayChangePassword === true ? (
                <ChangePassword
                  setDisplayChangePassword={setDisplayChangePassword}
                  setDisplayTab={() => setTabIndex(0)}
                />
              ) : (
                <ProfileSettings
                  setDisplayChangePassword={setDisplayChangePassword}
                  setDisplayTab={() => setTabIndex(0)}
                  profile={profile}
                  setFlag={setFlag}
                />
              )}
            </div>
          </TabPanel> */}
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
            
        </Tabs>
        <BottomSettingsWrap>
          <BsThreeDots />
          <div className="BottomSettings">
            <ul>
              <li>Logout</li>
              <li>Profile</li>
            </ul>
          </div>
        </BottomSettingsWrap>
      </LeftBarContent>
    </>
  );
};

export default LeftBar;
