import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DisplayFavoriteBusiness from './DisplayFavoriteBusiness';
import styled from 'styled-components';
import {unwrapResult} from '@reduxjs/toolkit';
import InfiniteScroll from 'react-infinite-scroll-component';
import ValueLoader from '../../../../utils/loader';
import {clearSearchFeed, HomeSearch, HomeSearchInitial, setEnterClicked} from '../../../../reducers/myFeedReducer';
import error from '../../../../constants';

import GlobalSearchBox from '../../GlobalSearch/GlobalSearchBox';
import useStore from '../../useState';
import {useHistory} from 'react-router-dom';
import {SearchListingContent} from './styles';

const BusinessListWrap = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	padding: 0;
	flex-direction: column;
	overflow: hidden;
`;

const LoaderWrap = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 100px 0 0 0;
	@media (max-width: 767px) {
		margin: 30px 0 0 0;
	}
`;

const NoMorePost = styled.p`
	font-style: normal;
	font-size: 12px;
	line-height: normal;
	margin: 0 0 5px;
	color: #fff;
`;

const BusinessListing = ({loader, coords, closestFilter}) => {
	const history = useHistory();

	const businessData = useSelector((state) => state.myFeed.searchFeed);
	const loading = useSelector((state) => state.myFeed.loading);
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const totalPlaces = useSelector((state) => state.myFeed.totalData);
	const dispatch = useDispatch();
	const search = useSelector((state) => state.myFeed.searchData);
	const filterClosest = useSelector((state) => state.myFeed.filterByClosest);
	const updatedAtFilter = useSelector((state) => state.myFeed.filterByUpdatedAt);

	const showSearchBar = useSelector((state) => state.globalSearch.displayBar);
	const [filterSelected, setFilterSelected] = useState(false);
	const [flag, setFlag] = useState(true);

	const setSelectedListId = useStore((state) => state.setSelectedListId);
	const setSearchIndex = useStore((state) => state.setSearchIndex);
	const setListClickedFromSearch = useStore((state) => state.setListClickedFromSearch);
	const draggedLocation = useStore((state) => state.draggedLocation);
	const setGridMode = useStore((state) => state.setGridMode);
	const gridMode = useStore((state) => state.gridMode);
	const setPostsInView = useStore((state) => state.setPostsInView);

	useEffect(() => {
		dispatch(setEnterClicked(false));
		dispatch(clearSearchFeed());
	}, []);

	/** useEffect called when any side filters are selected */
	useEffect(() => {
		const fetchSearchData = async () => {
			// setPostsInView([])
			const _gridMode = gridMode;
			if (_gridMode) {
				setGridMode(false);
			}
			const obj = {
				search: search,
				value: 0,
				filters: {
					closest:
						closestFilter && !updatedAtFilter
							? closestFilter
							: filterClosest,
					updated: updatedAtFilter,
				},
				latitude: draggedLocation.lat,
				longitude: draggedLocation.lng,
			};
			const result = await dispatch(HomeSearchInitial(obj));
			const data = await unwrapResult(result);
			if (data) {
				setFlag(false);
			}
			if (_gridMode) {
				setGridMode(true);
			}
			// setFilterSelected(false);
		};
		if (loader === false && offset === 0) fetchSearchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, filterSelected, filterClosest, updatedAtFilter, offset, loader, draggedLocation]);

	/** to fetch more places matching the search */
	const fetchMorePlaces = () => {
		if (offset + 20 < totalPlaces) {
			setOffset(offset + 20);
			const obj = {
				search: search,
				value: offset + 20,
				filters: {closest: filterClosest, updated: updatedAtFilter},
				latitude: draggedLocation.lat,
				longitude: draggedLocation.lng,
			};
			dispatch(HomeSearch(obj));
		} else setHasMore(false);
	};

	/** to display business details page */
	const displayBusinessDetail = (id) => {
		history.push(`/b/${id}`);
	};

	return (
		<>
			{showSearchBar && <GlobalSearchBox setOffset={setOffset} type={'Explore'} />}
			{search.length && (
				<SearchListingContent>
					{businessData.map((ele) => (
						<li
							onClick={() =>
								displayBusinessDetail(
									ele._id
								)
							}
						>
							{ele.company_name}
						</li>
					))}
				</SearchListingContent>
			)}
			{(loading && offset === 0) || flag ? (
				<LoaderWrap>
					<ValueLoader />
				</LoaderWrap>
			) : (
				!gridMode && (
					<div
						id="scrollableDiv"
						style={{
							height: 'calc(100vh - 44px)',
							overflow: 'auto',
						}}
					>
						<InfiniteScroll
							dataLength={
								businessData
									? businessData.length
									: 0
							}
							next={fetchMorePlaces}
							hasMore={hasMore}
							loader={
								offset <
									totalPlaces &&
								loading ? (
									<div
										style={{
											textAlign: 'center',
											margin: ' 40px auto 0',
										}}
									>
										{' '}
										<ValueLoader
											height="40"
											width="40"
										/>
									</div>
								) : null
							}
							scrollableTarget="scrollableDiv"
							endMessage={
								businessData.length >
									20 &&
								!loading &&
								!flag ? (
									<center>
										<NoMorePost className="noMorePost">
											{
												error.NO_MORE_BUSINESS_TO_DISPLAY
											}
										</NoMorePost>
									</center>
								) : null
							}
						>
							<BusinessListWrap>
								{businessData.length >
								0 ? (
									businessData.map(
										(
											i,
											key
										) => (
											<DisplayFavoriteBusiness
												data={
													i
												}
												key={
													key
												}
												setSelectedListId={
													setSelectedListId
												}
												setListClickedFromSearch={
													setListClickedFromSearch
												}
												setSearchIndex={
													setSearchIndex
												}
											/>
										)
									)
								) : !loading &&
								  !flag &&
								  businessData.length ===
										0 ? (
									<center>
										<NoMorePost className="noMorePost">
											{
												error.NO_BUSINESS_FOUND
											}
										</NoMorePost>
									</center>
								) : null}
							</BusinessListWrap>
						</InfiniteScroll>
					</div>
				)
			)}
		</>
	);
};

export default BusinessListing;
