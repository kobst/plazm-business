<<<<<<< HEAD
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Tab, Tabs, TabList} from 'react-tabs';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {BsGrid} from 'react-icons/bs';

import './styles.css';
import ListTab from './ListTab';
import {clearMyFeedData, setSearchData} from '../../../../reducers/myFeedReducer';
import {
	fetchUserLists,
	fetchUserCreatedAndFollowedList,
	clearListData,
	setListCreated,
} from '../../../../reducers/listReducer';
import useStore from '../../../Consumer/useState/index';
import CompassIconWhite from '../../../../images/compass-white.png';
import CompassIcon from '../../../../images/compass.svg';
import HomeIconWhite from '../../../../images/home-white.png';
import HomeIcon from '../../../../images/home.svg';

const TabIcon = styled.div`
	width: 36px;
	svg {
		color: #767676;
		font-size: 26px;
		@media (max-width: 767px) {
			font-size: 24px;
		}
	}
=======
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList } from "react-tabs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BsGrid } from "react-icons/bs";

import "./styles.css";
import ListTab from "./ListTab";
import {
  clearMyFeedData,
  setSearchData,
} from "../../../../reducers/myFeedReducer";
import {
  fetchUserLists,
  fetchUserCreatedAndFollowedList,
  clearListData,
  setListCreated,
} from "../../../../reducers/listReducer";
import useStore from "../../../Consumer/useState/index";
import { setGloablLoader } from "../../../../reducers/consumerReducer";
import CompassIconWhite from "../../../../images/compass-white.png";
import CompassIcon from "../../../../images/compass.svg";
import HomeIconWhite from "../../../../images/home-white.png";
import HomeIcon from "../../../../images/home.svg";

const TabIcon = styled.div`
  width: 36px;
  svg {
    color: #767676;
    font-size: 26px;
    @media (max-width: 767px) {
      font-size: 24px;
    }
  }
>>>>>>> master
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

const SideBarTabs = () => {
<<<<<<< HEAD
	const dispatch = useDispatch();
	const history = useHistory();

	const user = useSelector((state) => state.user.user);
	const listData = useSelector((state) => state.list.data);

	const userLists = useSelector((state) => state.list.userLists);
	const loading = useSelector((state) => state.myFeed.loading);
	const isListCreated = useSelector((state) => state.list.isListCreated);

	const userSubscribedLists = useStore((state) => state.userSubscribedLists);
	const setUserSubscribedLists = useStore((state) => state.setUserSubscribedLists);
	const setUserCreatedLists = useStore((state) => state.setUserCreatedLists);
	const selectedTab = useStore((state) => state.tabSelected);

	const setSelectedTab = useStore((state) => state.setTabSelected);
	const setSelectedListId = useStore((state) => state.setSelectedListId);
	const setFavoriteIndex = useStore((state) => state.setFavoriteIndex);
	const setDiscoverBtn = useStore((state) => state.setDiscoverBtn);
	const setSelectedList = useStore((state) => state.setSelectedList);
	const setSelectedPlace = useStore((state) => state.setSelectedPlace);
	const setOrderedPlaces = useStore((state) => state.setOrderedPlaces);

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
		if (!!user?._id) {
			const fetchListData = () => {
				const obj = {
					id: user._id,
					value: page,
					limit: 15,
				};
				if (!isListCreated) dispatch(clearListData());
				dispatch(fetchUserCreatedAndFollowedList(obj));
			};
			if (listData.length < 1 || isListCreated) {
				fetchListData();
				dispatch(setListCreated(false));
			}
		}
	}, [dispatch, user._id, isListCreated]);

	useEffect(() => {
		let _userFollowedLists = [];
		let _userCreatedLists = [];

		if (listData.length > 0) {
			const listUnique = [...new Map(listData.map((v) => [v._id, v])).values()];
			listUnique.forEach((list) => {
				var arrayLength = list.subscribers.length;
				for (var i = 0; i < arrayLength; i++) {
					if (list.subscribers[i]._id === user._id) {
						_userFollowedLists.push(list);
						break;
					}
				}
				if (list.ownerId === user._id) {
					_userCreatedLists.push(list);
				}
			});
		}

		setUserSubscribedLists(_userFollowedLists);
		setUserCreatedLists(_userCreatedLists);
	}, [listData]);

	/** to clear selected data on tab click */
	const homeSearchFunction = () => {
		setFavoriteIndex(null);
		setSelectedList(null);
		setSelectedListId(null);
		setOrderedPlaces([]);
		setSelectedPlace(null);
		if (!loading) {
			history.push('/explore');
		}
	};

	/** to clear selected data on tab click */
	const myFeedFunction = () => {
		setSelectedList(null);
		setSelectedListId(null);
		setOrderedPlaces([]);
		setSelectedPlace(null);
		history.push('/home');
	};

	const listDiscovery = () => {
		setSelectedPlace(null);
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
=======
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user.user);
  const listData = useSelector((state) => state.list.data);

  const userLists = useSelector((state) => state.list.userLists);
  const loading = useSelector((state) => state.myFeed.loading);
  const isListCreated = useSelector((state) => state.list.isListCreated);

  const userSubscribedLists = useStore((state) => state.userSubscribedLists);
  const setUserSubscribedLists = useStore(
    (state) => state.setUserSubscribedLists
  );
  const setUserCreatedLists = useStore((state) => state.setUserCreatedLists);
  const selectedTab = useStore((state) => state.tabSelected);

  const setSelectedTab = useStore((state) => state.setTabSelected);
  const setSelectedListId = useStore((state) => state.setSelectedListId);
  const setFavoriteIndex = useStore((state) => state.setFavoriteIndex);
  const setDiscoverBtn = useStore((state) => state.setDiscoverBtn);
  const setSelectedList = useStore((state) => state.setSelectedList);
  const setSelectedPlace = useStore((state) => state.setSelectedPlace);
  const setOrderedPlaces = useStore((state) => state.setOrderedPlaces);

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
    if (!!user?._id) {
      const fetchListData = () => {
        const obj = {
          id: user._id,
          value: page,
          limit: 15,
        };
        if (!isListCreated) dispatch(clearListData());
        dispatch(fetchUserCreatedAndFollowedList(obj));
      };
      if (listData.length < 1 || isListCreated) {
        fetchListData();
        dispatch(setListCreated(false));
      }
    }
  }, [dispatch, user._id, isListCreated]);

  useEffect(() => {
    let _userFollowedLists = [];
    let _userCreatedLists = [];

    if (listData.length > 0) {
      const listUnique = [...new Map(listData.map((v) => [v._id, v])).values()];
      listUnique.forEach((list) => {
        var arrayLength = list.subscribers.length;
        for (var i = 0; i < arrayLength; i++) {
          if (list.subscribers[i]._id === user._id) {
            _userFollowedLists.push(list);
            break;
          }
        }
        if (list.ownerId === user._id) {
          _userCreatedLists.push(list);
        }
      });
    }

    setUserSubscribedLists(_userFollowedLists);
    setUserCreatedLists(_userCreatedLists);
  }, [listData]);

  /** to clear selected data on tab click */
  const homeSearchFunction = () => {
    setFavoriteIndex(null);
    setSelectedList(null);
    setSelectedListId(null);
    setOrderedPlaces([]);
    setSelectedPlace(null);
    if (!loading) {
      history.push('/explore');
    }
  };

  /** to clear selected data on tab click */
  const myFeedFunction = () => {
    setSelectedList(null);
    setSelectedListId(null);
    setOrderedPlaces([]);
    setSelectedPlace(null);
    history.push("/home");
  };

  const listDiscovery = () => {
    setSelectedPlace(null);
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
>>>>>>> master
								selectedTab ===
									0
							}
							className={
								0 ===
								selectedTab -
									1
									? selectedTab ===
									  1
										? 'react-tabs__tab LIBefore removeBorder'
										: 'react-tabs__tab LIBefore'
									: selectedTab +
											1 ===
									  0
									? 'react-tabs__tab LIAFter'
									: selectedTab ===
									  0
									? 'react-tabs__tab react-tabs__tab--selected'
									: 'react-tabs__tab'
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
									1
									? selectedTab ===
									  2
										? 'react-tabs__tab LIBefore removeBorder'
										: 'react-tabs__tab LIBefore'
									: selectedTab +
											1 ===
<<<<<<< HEAD
									  1
									? 'react-tabs__tab'
									: selectedTab ===
									  1
									? 'react-tabs__tab react-tabs__tab--selected removeBorder'
									: 'react-tabs__tab'
							}
							onClick={() =>
								homeSearchFunction()
							}
						>
							<div className="item">
								<img
									src={
=======
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
                <img
                  src={
>>>>>>> master
										selectedTab ===
										1
											? CompassIconWhite
											: CompassIcon
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
									1
									? selectedTab ===
									  3
										? 'react-tabs__tab LIBefore removeBorder'
										: 'react-tabs__tab LIBefore'
									: selectedTab +
											1 ===
									  2
									? 'react-tabs__tab'
									: selectedTab ===
									  2
									? 'react-tabs__tab react-tabs__tab--selected removeBorder'
									: 'react-tabs__tab'
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
										2
											? HomeIconWhite
											: HomeIcon
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
									5
							}
							className={
								5 ===
								selectedTab -
									1
									? selectedTab ===
									  6
										? 'react-tabs__tab LIBefore removeBorder'
										: 'react-tabs__tab LIBefore'
									: selectedTab +
											1 ===
									  5
									? 'react-tabs__tab'
									: selectedTab ===
									  5
									? 'react-tabs__tab react-tabs__tab--selected removeBorder'
									: 'react-tabs__tab'
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
				{userSubscribedLists.length > 0 && (
					<SubcriptionHeading>
						{expanded && 'Subscriptions'}
					</SubcriptionHeading>
				)}

				<div className="list-scroll">
					{userSubscribedLists.length > 0 ? (
						userSubscribedLists.map(
							(i, key) => (
								<ListTab
									data={
										i
									}
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
							)
						)
					) : (
						<h6></h6>
					)}
				</div>
			</div>
		</div>
	);
};

export default SideBarTabs;
