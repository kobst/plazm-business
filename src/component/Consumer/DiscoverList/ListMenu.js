import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import styled from 'styled-components';

import {
	clearListSearchData,
	fetchMostPopularLists,
	fetchTrendingLists,
	setListSearch,
	searchListApi,
} from '../../../reducers/listReducer';
import CreateListModel from '../AddPostModal/createList';
import ButtonOrange from '../UI/ButtonOrange';
import ModalComponent from '../UI/Modal';
import SliderSection from './SliderSection';
import useStore from '../useState';
import ValueLoader from '../../../utils/loader';
import Input from '../../UI/Input/Input';
import error from '../../../constants';
import {RightSearchWrap, ErrorDiv} from './styled.js';
import {unwrapResult} from '@reduxjs/toolkit';

const TopContent = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
	flex-direction: row;
	.react-tabs {
		width: 100%;
	}
	.react-tabs__tab-list {
		display: flex;
		justify-content: space-between;
		background: #18123a;
		border: 0;
		min-height: 60px;
		align-items: center;
		padding: 0 20px 0 60px;
		@media (max-width: 1024px) {
			padding: 0 10px 0 0px;
		}
		@media (max-width: 767px) {
			padding: 60px 10px 0 0px;
		}
		@media (max-width: 599px) {
			flex-direction: column;
			padding: 60px 10px 10px 0px;
		}
	}
	.react-tabs__tab-panel {
		padding: 0 60px;
		@media (max-width: 767px) {
			padding: 0 10px;
		}
	}
	.LeftTabsList {
		display: flex;
		height: 100%;
		@media (max-width: 599px) {
			margin: 0 0 10px 0;
		}
	}
	.react-tabs__tab {
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: Roboto;
		font-weight: bold;
		font-size: 18px;
		color: #ffffff;
		min-height: 60px;
		border: 0;
		padding: 0px 20px;
		@media (max-width: 991px) {
			font-size: 14px;
			padding: 0px 10px;
		}
		@media (max-width: 479px) {
			font-size: 11px;
			padding: 0px 5px;
		}
	}
	.react-tabs__tab--selected {
		background: #ff2e9a;
		color: #ffffff;
		border-radius: 0;
		border: 0;
		top: 0;
	}
	.react-tabs__tab:focus {
		box-shadow: none !important;
	}

	.react-tabs__tab:focus:after {
		display: none;
	}
`;

const ModalContent = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	padding: 20px;
	max-width: 540px;
	min-width: 536px;
	background: #282352;
	box-shadow: 0px 32px 70px rgba(0, 0, 0, 0.25);
	color: #fff;
	&.large {
		max-width: 748px;
		min-width: 748px;
		@media (min-width: 992px) and (max-width: 1024px) {
			margin: 90px 0 0;
		}
		@media (max-width: 991px) {
			max-width: 80vw;
			min-width: 80vw;
		}
		@media (max-width: 767px) {
			max-width: 90vw;
			min-width: 90vw;
		}
		.text-input {
			min-height: 20px;
			height: 32px;
			overflow: hidden;
		}
	}
	@media (max-width: 767px) {
		padding: 15px;
		min-width: 300px;
		max-width: 300px;
	}
	@media (max-width: 991px) and (orientation: landscape) {
		max-height: 80vh;
		overflow-y: auto;
		overflow-x: hidden;
	}
`;

const ListMenu = () => {
	const dispatch = useDispatch();
	const setListTabSelected = useStore((state) => state.setListTabSelected);
	const popularLists = useSelector((state) => state.list.popularLists);
	const popularLoading = useSelector((state) => state.list.loadingPopularLists);
	const totalPopularLists = useSelector((state) => state.list.totalPopularLists);
	const user = useSelector((state) => state.user.user);
	const totalList = useSelector((state) => state.list.totalList);
	const listData = useSelector((state) => state.list.data);
	const userLists = listData.filter((i) => i.ownerId === user._id);
	const loading = useSelector((state) => state.list.loadingSearchList);
	const listSearch = useSelector((state) => state.list.listSearch);
	const searchList = useSelector((state) => state.list.searchList);

	const [selectedTab, setSelectedTab] = useState(2);
	const userCreatedLoading = useSelector((state) => state.list.loadingUserLists);

	const [searchError, setSearchError] = useState('');
	const [search, setSearch] = useState('');
	const [offset] = useState(0);
	const [offsetPopular, setOffSetPopular] = useState(0);
	const [loader, setLoader] = useState(false);
	const [displayTrendingModel, setDisplayTrendingModel] = useState(false);
	const [selectedId, setSelectedId] = useState(null);
	const [totalLists, setTotalLists] = useState(parseInt(totalList - userLists.length));

	const [displayCreateList, setDisplayCreateList] = useState(false);

	const userSubscribedLists = useStore((state) => state.userSubscribedLists);
	const userCreatedLists = useStore((state) => state.userCreatedLists);
	const setSelectedListId = useStore((state) => state.setSelectedListId);
	const setDiscoverBtn = useStore((state) => state.setDiscoverBtn);
	const setReadMore = useStore((state) => state.setReadMore);

	useEffect(() => {
		const fetchData = async () => {
			/** to fetch most trending list data */
			const trending = await dispatch(fetchTrendingLists(0));
			await unwrapResult(trending);
			/** to fetch most popular list data */
			await dispatch(fetchMostPopularLists(0));
		};
		(offset === 0 || offsetPopular === 0) && fetchData();
	}, []);

	/** search data */
	const searchListsData = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			if (!search.trim()) {
				dispatch(setListSearch(event.target.value));
			}
			if (search !== '' && search.length >= 4 && !search.trim() === false) {
				dispatch(clearListSearchData());
				dispatch(setListSearch(event.target.value));
				setSearchError('');
			} else if (search.length > 0 && search.length < 4) {
				setSearchError(error.SEARCH_ERROR);
			}
		}
	};

	/** to search data based on input */
	useEffect(() => {
		const obj = {};
		setSearch(listSearch);
		const searchData = async () => {
			const data = await dispatch(
				searchListApi({value: 0, search: listSearch, ...obj})
			);
		};
		searchData();
	}, [listSearch, dispatch]);

	useEffect(() => {
		const obj = {};
		setSearch(listSearch);
		const searchData = async () => {
			await dispatch(searchListApi({value: 0, search: listSearch, ...obj}));
		};
		searchData();
	}, [listSearch, dispatch]);

	/** to set search value */
	useEffect(() => {
		setSearch(listSearch);
	}, [listSearch]);

	const setTab = (index) => {
		setSearch('');
		dispatch(clearListSearchData());
		dispatch(setListSearch(''));
		setSearchError('');
		setSelectedTab(index);
		setListTabSelected(index);
	};

	const handleSearchChange = (e) => {
		setSearchError('');
		setSearch(e.target.value);
	};

	const handleToggleCreateList = () => {
		setDisplayCreateList((prevState) => !prevState);
	};

	return (
		<>
			{displayCreateList && (
				<ModalComponent
					closeOnOutsideClick={true}
					isOpen={displayCreateList}
					closeModal={() => setDisplayCreateList(false)}
				>
					<ModalContent>
						<CreateListModel
							setDisplayCreateList={
								setDisplayCreateList
							}
						/>
					</ModalContent>
				</ModalComponent>
			)}

			<TopContent>
				<Tabs selectedIndex={selectedTab} onSelect={setTab}>
					<TabList>
						<div className="LeftTabsList">
							<Tab>
								Lists
								Subscribed
							</Tab>
							<Tab>My Lists</Tab>
							<Tab>
								Discover
								More
							</Tab>
						</div>

						<RightSearchWrap>
							<ButtonOrange
								onClick={
									handleToggleCreateList
								}
								type="submit"
								className="createListBtn"
							>
								Create
								List
							</ButtonOrange>
							<Input
								value={
									search
								}
								onKeyPress={(
									event
								) =>
									searchListsData(
										event
									)
								}
								onChange={
									handleSearchChange
								}
								className="SearchSubscriptionsInput"
								placeholder="Search Lists"
								disabled={
									loading
								}
							/>
							{searchError && (
								<ErrorDiv className="list-error">
									{
										searchError
									}
								</ErrorDiv>
							)}
						</RightSearchWrap>
					</TabList>
					<TabPanel index={0}>
						{!listSearch && (
							<SliderSection
								heading="Subscribed Lists"
								data={
									userSubscribedLists
								}
								totalList={
									totalPopularLists
								}
								setSelectedListId={
									setSelectedListId
								}
								setDiscoverBtn={
									setDiscoverBtn
								}
								setReadMore={
									setReadMore
								}
								offset={
									offsetPopular
								}
								setOffSet={
									setOffSetPopular
								}
								loader={
									loader
								}
								setLoader={
									setLoader
								}
								modal={
									displayTrendingModel
								}
								setModal={
									setDisplayTrendingModel
								}
								setSelectedId={
									setSelectedId
								}
								selectedId={
									selectedId
								}
								setTotalLists={
									setTotalLists
								}
								totalLists={
									totalLists
								}
							/>
						)}
						{listSearch && (
							<SliderSection
								heading="search results"
								data={
									searchList
								}
								totalList={
									totalPopularLists
								}
								setSelectedListId={
									setSelectedListId
								}
								setDiscoverBtn={
									setDiscoverBtn
								}
								setReadMore={
									setReadMore
								}
								offset={
									offsetPopular
								}
								setOffSet={
									setOffSetPopular
								}
								loader={
									loader
								}
								setLoader={
									setLoader
								}
								modal={
									displayTrendingModel
								}
								setModal={
									setDisplayTrendingModel
								}
								setSelectedId={
									setSelectedId
								}
								selectedId={
									selectedId
								}
								setTotalLists={
									setTotalLists
								}
								totalLists={
									totalLists
								}
							/>
						)}
					</TabPanel>
					<TabPanel index={1}>
						{!listSearch && (
							<SliderSection
								heading="My Lists"
								data={
									userCreatedLists
								}
								totalList={
									totalPopularLists
								}
								setSelectedListId={
									setSelectedListId
								}
								setDiscoverBtn={
									setDiscoverBtn
								}
								setReadMore={
									setReadMore
								}
								offset={
									offsetPopular
								}
								setOffSet={
									setOffSetPopular
								}
								loader={
									loader
								}
								setLoader={
									setLoader
								}
								modal={
									displayTrendingModel
								}
								setModal={
									setDisplayTrendingModel
								}
								setSelectedId={
									setSelectedId
								}
								selectedId={
									selectedId
								}
								setTotalLists={
									setTotalLists
								}
								totalLists={
									totalLists
								}
							/>
						)}
						{listSearch && (
							<SliderSection
								heading="search results"
								data={
									searchList
								}
								totalList={
									totalPopularLists
								}
								setSelectedListId={
									setSelectedListId
								}
								setDiscoverBtn={
									setDiscoverBtn
								}
								setReadMore={
									setReadMore
								}
								offset={
									offsetPopular
								}
								setOffSet={
									setOffSetPopular
								}
								loader={
									loader
								}
								setLoader={
									setLoader
								}
								modal={
									displayTrendingModel
								}
								setModal={
									setDisplayTrendingModel
								}
								setSelectedId={
									setSelectedId
								}
								selectedId={
									selectedId
								}
								setTotalLists={
									setTotalLists
								}
								totalLists={
									totalLists
								}
							/>
						)}
					</TabPanel>
					<TabPanel index={2}>
						{!listSearch &&
							!popularLoading &&
							popularLists.length && (
								<SliderSection
									heading="Most Popular"
									data={
										popularLists
									}
									totalList={
										totalPopularLists
									}
									setSelectedListId={
										setSelectedListId
									}
									setDiscoverBtn={
										setDiscoverBtn
									}
									setReadMore={
										setReadMore
									}
									offset={
										offsetPopular
									}
									setOffSet={
										setOffSetPopular
									}
									loader={
										loader
									}
									setLoader={
										setLoader
									}
									modal={
										displayTrendingModel
									}
									setModal={
										setDisplayTrendingModel
									}
									setSelectedId={
										setSelectedId
									}
									selectedId={
										selectedId
									}
									setTotalLists={
										setTotalLists
									}
									totalLists={
										totalLists
									}
								/>
							)}
						{listSearch && (
							<>
								<SliderSection
									heading="search results"
									data={
										searchList
									}
									totalList={
										totalPopularLists
									}
									setSelectedListId={
										setSelectedListId
									}
									setDiscoverBtn={
										setDiscoverBtn
									}
									setReadMore={
										setReadMore
									}
									offset={
										offsetPopular
									}
									setOffSet={
										setOffSetPopular
									}
									loader={
										loader
									}
									setLoader={
										setLoader
									}
									modal={
										displayTrendingModel
									}
									setModal={
										setDisplayTrendingModel
									}
									setSelectedId={
										setSelectedId
									}
									selectedId={
										selectedId
									}
									setTotalLists={
										setTotalLists
									}
									totalLists={
										totalLists
									}
								/>
							</>
						)}
						{(popularLoading ||
							userCreatedLoading) &&
							!listSearch && (
								<div
									style={{
										textAlign: 'center',
									}}
								>
									<ValueLoader />
								</div>
							)}
					</TabPanel>
				</Tabs>
			</TopContent>
		</>
	);
};

export default ListMenu;
