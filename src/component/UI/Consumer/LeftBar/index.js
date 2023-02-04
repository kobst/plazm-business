import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import './styles.css';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Notifications from '../../../../images/notifications-new.png';
import BuisinessView from '../../../Consumer/BuisinessView';
import BusinessList from '../../../Consumer/BusinessList';
import {useDispatch, useSelector} from 'react-redux';
import ListOptionView from '../../../Consumer/ListOptionView';
import ListDescriptionView from '../../../Consumer/ListDescriptionView';
import MyFeed from '../../../Consumer/MyFeed';
import {
  clearMyFeedData,
  setSearchData,
  fetchMyFeedData,
  setSideFiltersHomeSearch,
} from '../../../../reducers/myFeedReducer';
import Profile from '../../../Consumer/Profile';
import ChangePassword from '../../../Consumer/ChangePassword';
import ProfileSettings from '../../../Consumer/ProfileSettings';
import HomeSearchComponent from '../../../Consumer/HomeSearch';
import {useHistory} from 'react-router-dom';
import {
  clearBusinessData,
  clearTopPost,
} from '../../../../reducers/businessReducer';
import {FiSearch, FiHome, FiHeart} from 'react-icons/fi';
import {BsListUl, BsThreeDots} from 'react-icons/bs';
import PolygonArrow from '../../../../images/Polygon.png';
import {Auth} from 'aws-amplify';
import {setGloablLoader} from '../../../../reducers/consumerReducer';
import DiscoverList from '../../../Consumer/DiscoverList';

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
  border-top: 0.75px solid #c4c4c4;
  color: #767676;
  font-size: 18px;
  cursor: pointer;
  position: relative;
  .BottomSettings {
    visibility: hidden;
    font-size: 0;
    display: none;
  }
  :hover {
    background: #211d43;
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
      display: flex;
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
          @media (max-width: 767px) {
            font-size: 9px;
          }
          :hover {
            color: #ee3840;
          }
          button {
            color: #767676;
            font-size: 13px;
            padding: 0;
            cursor: pointer;
            text-align: center;
            text-transform: uppercase;
            font-weight: 700;
            border: 0;
            @media (max-width: 767px) {
              font-size: 9px;
            }
            :hover {
              color: #ee3840;
            }
          }
        }
      }
    }
  }
`;

const LeftBar = ({
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
    isBusinessOpen ? 4 : isUserOpen ? 1 : 0,
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
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setUserDataId(userId);
  }, [userId]);

  useEffect(() => {
    if (profileClosed && tabIndex === 4 && businessId) {
      history.push(`/b/${businessId}`);
      setProfileClosed(false);
    } else if (profileClosed && tabIndex === 4) {
      history.push('/');
      setProfileClosed(false);
    } else if (
      profileClosed &&
      (tabIndex === 5 || tabIndex === 2 || tabIndex === 1)
    ) {
      history.push('/');
      setProfileClosed(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileClosed, tabIndex]);

  /** to clear selected data on tab click */
  const listView = () => {
    if (tabIndex !== 5 && !loading) {
      dispatch(clearMyFeedData());
      dispatch(clearBusinessData());
      dispatch(clearTopPost());
      setSelectedListId(null);
      setListIndex(null);
      setUserDataId(null);
      history.push('/');
      setDiscoverBtn(false);
    }
  };

  /** to clear selected data on tab click */
  const myFeedFunction = () => {
    if (tabIndex !== 2 && !loading) {
      const obj = {
        id: user._id,
        value: 0,
        filters: {closest: false, updated: false},
        latitude: userLocation ?
          userLocation.latitude :
          process.env.REACT_APP_LATITUDE,
        longitude: userLocation ?
          userLocation.longitude :
          process.env.REACT_APP_LONGITUDE,
        search: '',
      };
      dispatch(setSearchData(''));
      setUserDataId(null);
      setSelectedListId(null);
      history.push('/');
      dispatch(setSideFiltersHomeSearch());
      dispatch(clearMyFeedData());
      dispatch(fetchMyFeedData(obj));
      dispatch(clearBusinessData());
      dispatch(clearTopPost());
    }
  };

  /** to clear selected data on tab click */
  const favoriteFunction = () => {
    dispatch(setSideFiltersHomeSearch());
    dispatch(clearBusinessData());
    dispatch(clearTopPost());
    dispatch(setSearchData(''));
    setFavoriteIndex(null);
    setSelectedListId(null);
    setUserDataId(null);
    setSelectedListId(null);
    history.push('/');
  };

  /** to clear selected data on tab click */
  const homeSearchFunction = () => {
    setFavoriteIndex(null);
    if (tabIndex !== 1 && !loading) {
      // const obj = {
      //   search: "",
      //   value: 0,
      //   filters: { closest: false, updated: false },
      //   latitude: process.env.REACT_APP_LATITUDE,
      //   longitude: process.env.REACT_APP_LONGITUDE,
      // };
      dispatch(setSearchData(''));
      dispatch(clearMyFeedData());
      dispatch(setSideFiltersHomeSearch());
      // dispatch(HomeSearch(obj));
      setUserDataId(null);
      setSelectedListId(null);
      dispatch(clearBusinessData());
      dispatch(clearTopPost());
      setSearchIndex(null);
      history.push('/');
    }
  };

  /** to open user profile tab */
  const showUserProfile = () => {
    setTabIndex(6);
  };

  /** for logout functionality redirection */
  const redirectUserToLoginScreen = () => {
    dispatch(setGloablLoader(false));
    history.push('/consumer/login');
  };
  /** logout consumer */
  const consumerLogout = async () => {
    try {
      dispatch(setGloablLoader(true));
      await Auth.signOut();
      setTimeout(() => redirectUserToLoginScreen(), 3000);
    } catch (error) {
      dispatch(setGloablLoader(false));
      // console.log("error signing out: ", error);
    }
  };

  const setTab = (index) => {
    // console.log("setting index " + index)
    setTabIndex(index);

    // <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
  };

  return (
    <>
      <LeftBarContent className="MainTabs">
        <Tabs selectedIndex={tabIndex} onSelect={setTab}>
          <TabList>
            <Tab
              disabled={loading || tabIndex === 0}
              className={
                0 === tabIndex - 1 ?
                  tabIndex === 1 ?
                  'react-tabs__tab LIBefore removeBorder' :
                  'react-tabs__tab LIBefore' :
                  tabIndex + 1 === 0 ?
                  'react-tabs__tab LIAFter' :
                  tabIndex === 0 ?
                  'react-tabs__tab react-tabs__tab--selected' :
                  'react-tabs__tab'
              }
            ></Tab>
            <Tab
              disabled={loading || tabIndex === 1}
              className={
                1 === tabIndex - 1 ?
                  tabIndex === 2 ?
                    'react-tabs__tab LIBefore removeBorder' :
                    'react-tabs__tab LIBefore' :
                  tabIndex + 1 === 1 ?
                  'react-tabs__tab' :
                  tabIndex === 1 ?
                  'react-tabs__tab react-tabs__tab--selected removeBorder' :
                  'react-tabs__tab'
              }
              onClick={() => homeSearchFunction()}
            >
              <SearchIcon>
                <FiSearch />
              </SearchIcon>
            </Tab>
            <Tab
              disabled={loading || tabIndex === 2}
              className={
                2 === tabIndex - 1 ?
                  'react-tabs__tab LIBefore' :
                  tabIndex + 1 === 2 ?
                  'react-tabs__tab LIAFter' :
                  tabIndex === 2 ?
                  'react-tabs__tab react-tabs__tab--selected' :
                  'react-tabs__tab'
              }
              onClick={() => myFeedFunction()}
            >
              <SearchIcon>
                <FiHome />
              </SearchIcon>
            </Tab>
            <Tab
              disabled={loading || tabIndex === 3}
              className={
                3 === tabIndex - 1 ?
                  'react-tabs__tab LIBefore' :
                  tabIndex + 1 === 3 ?
                  'react-tabs__tab LIAFter' :
                  tabIndex === 3 ?
                  'react-tabs__tab react-tabs__tab--selected' :
                  'react-tabs__tab'
              }
            >
              <img src={Notifications} alt="" />
            </Tab>
            <Tab
              disabled={loading || tabIndex === 4}
              onClick={() => favoriteFunction()}
              className={
                4 === tabIndex - 1 ?
                  'react-tabs__tab LIBefore' :
                  tabIndex + 1 === 4 ?
                  'react-tabs__tab LIAFter' :
                  tabIndex === 4 ?
                  'react-tabs__tab react-tabs__tab--selected' :
                  'react-tabs__tab'
              }
            >
              <SearchIcon>
                <FiHeart />
              </SearchIcon>
            </Tab>
            <Tab
              disabled={loading || tabIndex === 5}
              className={
                5 === tabIndex - 1 ?
                  'react-tabs__tab' :
                  tabIndex + 1 === 5 ?
                  'react-tabs__tab LIAFter' :
                  tabIndex === 5 ?
                  'react-tabs__tab react-tabs__tab--selected' :
                  'react-tabs__tab'
              }
              onClick={() => listView()}
            >
              <SearchIcon>
                <BsListUl />
              </SearchIcon>
            </Tab>
            <Tab
              disabled={true}
              className={
                tabIndex === 5 ?
                  'react-tabs__tab LIAFter' :
                  tabIndex !== 6 ?
                  'react-tabs__tab--disabled' :
                  'react-tabs__tab LiDisable'
              }
              style={{backgroundColor: '#f3f3f3'}}
            ></Tab>

            <Tab
              disabled={loading}
              className={tabIndex === 6 ? 'test' : 'test1'}
              style={{backgroundColor: '#f3f3f3'}}
            >
              &nbsp;
            </Tab>
            <Tab
              disabled={loading}
              className={
                8 === tabIndex - 1 ?
                  'react-tabs__tab LIBefore' :
                  tabIndex + 1 === 8 ?
                  'react-tabs__tab LIAFter' :
                  tabIndex === 8 ?
                  'react-tabs__tab react-tabs__tab--selected' :
                  'react-tabs__tab'
              }
            >
              &nbsp;
            </Tab>
          </TabList>

          <TabPanel></TabPanel>
          <TabPanel>
            <div className="panel-content">
              {isUserOpen && !selectedListId ? (
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
              {/* <FeedDataContent /> */}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
              {(favoriteIndex || businessId) &&
              !userDataId &&
              !selectedListId ? (
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
              ) : userDataId && !profileClosed ? (
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
                <BusinessList
                  setDisplayTab={() => setTabIndex(0)}
                  setFavoriteIndex={setFavoriteIndex}
                />
              )}
            </div>
          </TabPanel>
          <TabPanel className={discoverBtn ? 'DiscoverWrapper' : ''}>
            <div className="panel-content">
              {!selectedListId && !userDataId && !discoverBtn ? (
                <ListOptionView
                  setDisplayTab={() => setTabIndex(0)}
                  setSelectedListId={setSelectedListId}
                  selectedListId={selectedListId}
                  setDiscoverBtn={setDiscoverBtn}
                />
              ) : !listIndex && !userDataId && !discoverBtn ? (
                <ListDescriptionView
                  listOpenedFromBusiness={true}
                  setDisplayTab={() => setTabIndex(0)}
                  setSelectedListId={setSelectedListId}
                  selectedListId={selectedListId}
                  listClickedFromSearch={listClickedFromSearch}
                  setListClickedFromSearch={setListClickedFromSearch}
                  setListIndex={setListIndex}
                  readMore={readMore}
                  setDiscoverBtn={setDiscoverBtn}
                />
              ) : userDataId && !discoverBtn ? (
                <Profile
                  setDisplayTab={() => setTabIndex(0)}
                  userId={userDataId}
                  setProfileClosed={setProfileClosed}
                />
              ) : discoverBtn && !selectedListId ? (
                <DiscoverList
                  setDiscoverBtn={setDiscoverBtn}
                  setSelectedListId={setSelectedListId}
                  setReadMore={setReadMore}
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
          </TabPanel>

          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
        </Tabs>
        <BottomSettingsWrap>
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
        </BottomSettingsWrap>
      </LeftBarContent>
    </>
  );
};

export default LeftBar;
