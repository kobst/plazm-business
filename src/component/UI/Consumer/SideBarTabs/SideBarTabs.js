import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import './styles.css';
import {Tab, Tabs, TabList} from 'react-tabs';
import {useDispatch, useSelector} from 'react-redux';

import {
  clearMyFeedData,
  setSearchData,
} from '../../../../reducers/myFeedReducer';
import {useHistory} from 'react-router-dom';
import {unwrapResult} from '@reduxjs/toolkit';


import {fetchUserLists, fetchUserCreatedAndFollowedList} from '../../../../reducers/listReducer';

import useStore from '../../../Consumer/useState/index';

import {FiHeart} from 'react-icons/fi';

import ListTab from './ListTab';

import CompassIconWhite from '../../../../images/compass-white.png';
import CompassIcon from '../../../../images/compass.svg';
import HomeIconWhite from '../../../../images/home-white.png';
import HomeIcon from '../../../../images/home.svg';
import BellIconWhite from '../../../../images/bell-white.png';
import BellIcon from '../../../../images/bell.svg';
import {BsGrid} from 'react-icons/bs';

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
  const listData = useSelector((state) => state.list.data);
  const totalList = useSelector((state) => state.list.totalList);
  const userLists = useSelector((state) => state.list.userLists);
  const loading = useSelector((state) => state.myFeed.loading);
  const listLoader = useSelector((state) => state.list.loadingUserCreatedAndFollowed);

  // new useStore
  const selectedTab = useStore((state) => state.tabSelected);

  const setSelectedTab = useStore((state) => state.setTabSelected);
  const setSelectedListId = useStore((state) => state.setSelectedListId);
  const setFavoriteIndex = useStore((state) => state.setFavoriteIndex);
  const setDiscoverBtn = useStore((state) => state.setDiscoverBtn);
  const setSelectedList = useStore((state) => state.setSelectedList);

  // old useStore

  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (userLists.length === 0 && user && user._id) {
      dispatch(fetchUserLists(user._id));
    }
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
        const data = await dispatch(
            fetchUserCreatedAndFollowedList(obj)
        );
        await unwrapResult(data);
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
      history.push('/explore');
    }
  };

  /** to clear selected data on tab click */
  const myFeedFunction = () => {
    if (!loading) {
      setSelectedList(null);
      setSelectedListId(null);

      history.push('/home');
    }
  };

  const listDiscovery = () => {
    history.push('/lists');
    setDiscoverBtn(false);
  };

  const handleHover = () => {
    setExpanded(true);
  };

  const handleLeave = () => {
    setExpanded(false);
  };

  const setTab = (index) => {
    setSelectedTab(index);
    dispatch(setSearchData(''));
  };

  const handleListTabClick = (data) => {
    dispatch(clearMyFeedData());
    setSelectedTab(-1);
  };

  return (
    <div>
      <div
        className={expanded ? 'Sidebar expanded' : 'Sidebar'}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <Tabs selectedIndex={selectedTab} onSelect={setTab}>
          <TabList className={'tablist'}>
            <Tab
              disabled={
                loading ||
								selectedTab ===
									0
              }
              className={
								0 ===
								selectedTab -
									1? selectedTab ===
									  1? 'react-tabs__tab LIBefore removeBorder' :
										'react-tabs__tab LIBefore' :
									selectedTab +
											1 ===
									  0? 'react-tabs__tab LIAFter' :
									selectedTab ===
									  0? 'react-tabs__tab react-tabs__tab--selected' :
									'react-tabs__tab'
              }
            >
              <div className="sidebar-header">
                <h1 className="sidebar-logo">
									PLAZM
                </h1>
              </div>
            </Tab>
            <Tab
              disabled={
                loading ||
								selectedTab ===
									1
              }
              className={
								1 ===
								selectedTab -
									1? selectedTab ===
									  2? 'react-tabs__tab LIBefore removeBorder' :
										'react-tabs__tab LIBefore' :
									selectedTab +
											1 ===
									  1? 'react-tabs__tab' :
									selectedTab ===
									  1? 'react-tabs__tab react-tabs__tab--selected removeBorder' :
									'react-tabs__tab'
              }
              onClick={() =>
                homeSearchFunction()
              }
            >
              <div className="item">
                {/* <FiGlobe className="sidebar-icon"/> */}
                <img
                  src={
										selectedTab ===
										1? CompassIconWhite :
											CompassIcon
                  }
                  className="sidebar-icon"
                />
                <span className="sidebar-text">
									Explore
                </span>
              </div>
            </Tab>
            <Tab
              disabled={
                loading ||
								selectedTab ===
									2
              }
              className={
								2 ===
								selectedTab -
									1? selectedTab ===
									  3? 'react-tabs__tab LIBefore removeBorder' :
										'react-tabs__tab LIBefore' :
									selectedTab +
											1 ===
									  2? 'react-tabs__tab' :
									selectedTab ===
									  2? 'react-tabs__tab react-tabs__tab--selected removeBorder' :
									'react-tabs__tab'
              }
              onClick={() =>
                myFeedFunction()
              }
            >
              <div className="item">
                {/* <FiHome className="sidebar-icon" /> */}
                <img
                  src={
										selectedTab ===
										2? HomeIconWhite :
											HomeIcon
                  }
                  className="sidebar-icon"
                />
                <span className="sidebar-text">
									Home
                </span>
              </div>
            </Tab>
            <Tab
              disabled={
                loading ||
								selectedTab ===
									3
              }
              className={
								3 ===
								selectedTab -
									1? selectedTab ===
									  4? 'react-tabs__tab LIBefore removeBorder' :
										'react-tabs__tab LIBefore' :
									selectedTab +
											1 ===
									  3? 'react-tabs__tab' :
									selectedTab ===
									  3? 'react-tabs__tab react-tabs__tab--selected removeBorder' :
									'react-tabs__tab'
              }
            >
              <div className="item">
                {/* <FiBell className="sidebar-icon" /> */}
                <img
                  src={
										selectedTab ===
										3? BellIconWhite :
											BellIcon
                  }
                  className="sidebar-icon"
                />
                <div className="NotificationDot"></div>
                <span className="sidebar-text">
									Notifications
                </span>
              </div>
            </Tab>
            <Tab
              disabled={
                loading ||
								selectedTab ===
									4
              }
              className={
								4 ===
								selectedTab -
									1? selectedTab ===
									  5? 'react-tabs__tab LIBefore removeBorder' :
										'react-tabs__tab LIBefore' :
									selectedTab +
											1 ===
									  4? 'react-tabs__tab' :
									selectedTab ===
									  4? 'react-tabs__tab react-tabs__tab--selected removeBorder' :
									'react-tabs__tab'
              }
            >
              <div className="item">
                <FiHeart className="sidebar-icon" />
                <span className="sidebar-text">
									Favorites
                </span>
              </div>
            </Tab>
            <Tab
              disabled={
                loading ||
								selectedTab ===
									5
              }
              className={
								5 ===
								selectedTab -
									1? selectedTab ===
									  6? 'react-tabs__tab LIBefore removeBorder' :
										'react-tabs__tab LIBefore' :
									selectedTab +
											1 ===
									  5? 'react-tabs__tab' :
									selectedTab ===
									  5? 'react-tabs__tab react-tabs__tab--selected removeBorder' :
									'react-tabs__tab'
              }
              onClick={() =>
                listDiscovery()
              }
            >
              <div className="item">
                <BsGrid className="sidebar-icon" />
                <span className="sidebar-text">
									Subscriptions
                </span>
              </div>
            </Tab>
          </TabList>
        </Tabs>

        {listData.length > 0 && (
          <SubcriptionHeading>
            {expanded && 'Subscriptions'}
          </SubcriptionHeading>
        )}

        <div className="list-scroll">
          {listData.length ? (
						listData.map((i, key) => (
						  <ListTab
						    data={i}
						    key={
						      key
						    }
						    handleListTabClick={
						      handleListTabClick
						    }
						    setSelectedListId={
						      setSelectedListId
						    }
						  />
						))
					) : (
						<h6></h6>
					)}
          {totalList > listData.length && !listLoader && (
            <button
              onClick={() => {
                setPage(
                    (
                        prev
                    ) =>
                      prev +
										1
                );
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
