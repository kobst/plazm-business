import React, {useEffect, useState} from 'react';
import Input from '../../UI/Input/Input';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import error from '../../../../constants';
import {
  homeSearchThunk,
  clearSearchFeed,
  setSearchData,
  setSideFiltersHomeSearch,
  setEnterClicked,
} from '../../../../reducers/myFeedReducer';

import useStore from '../../useState';

const SearchWrap = styled.div`
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0;
	background: #000000;
	input {
		border: 0;
		outline: 0;
		padding: 0 10px;
		width: 311px;
		height: 40px;
		font-size: 14px;
		font-weight: normal;
		box-shadow: none;
		background: #fff;
		color: #000;
		font-family: 'Roboto', sans-serif;
		::placeholder {
			color: #bdbdbd;
		}
		@media (max-width: 767px) {
			width: 100%;
		}
	}
	@media (max-width: 767px) {
		flex-direction: column;
		height: auto;
		padding: 10px 0;
	}
`;

const ErrorDiv = styled.div`
	color: #ff0000;
	font-weight: 600;
	font-size: 12px;
	margin: 0;
	margin-bottom: 10px;
	margin-left: 20px;
`;

const Heading = styled.h1`
	color: #ff2e79;
	font-weight: 700;
	font-size: 18px;
	margin: 0 0 0 20px;
	padding: 0;
	font-family: 'Roboto', sans-serif;
	width: calc(100% - 350px);
	@media (max-width: 767px) {
		margin: 0 auto 10px;
		width: 100%;
		text-align: center;
		font-size: 16px;
	}
`;

const RightSearchWrap = styled.div`
	display: flex;
	@media (max-width: 767px) {
		width: 90%;
	}
`;

const SearchBar = ({setOffset}) => {
  const [search, setSearch] = useState('');
  const loader = useSelector((state) => state.myFeed.loading);
  const [searchError, setSearchError] = useState('');
  const filterClosest = useSelector((state) => state.myFeed.filterByClosest);
  const updatedAtFilter = useSelector((state) => state.myFeed.filterByUpdatedAt);
  const searchData = useSelector((state) => state.myFeed.searchData);

  const draggedLocation = useStore((state) => state.draggedLocation);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearch(searchData);
  }, [searchData]);

  /** on key press handler for search */
  const searchList = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (search !== '' && search.length >= 4 && !search.trim() === false) {
        setOffset(0);
        dispatch(clearSearchFeed());
        dispatch(setSideFiltersHomeSearch());
        const obj = {
          search: search,
          value: 0,
          filters: {
            closest: filterClosest,
            updated: updatedAtFilter,
          },
          latitude: draggedLocation.lat,
          longitude: draggedLocation.lng,
        };
        dispatch(setEnterClicked(true));
        dispatch(homeSearchThunk(obj));
        setSearchError('');
      } else if (search.length >= 0 && search.length < 4) {
        setSearchError(error.SEARCH_ERROR);
      }
    }
  };

  /** on change handler for search */
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    dispatch(setSearchData(e.target.value));
  };
  return (
    <>
      <SearchWrap>
        <Heading>Search</Heading>
        <RightSearchWrap>
          <Input
            value={search}
            onKeyPress={(event) =>
              searchList(event)
            }
            onChange={(e) => onChangeSearch(e)}
            disabled={loader}
            placeholder="Search"
          />
        </RightSearchWrap>
      </SearchWrap>
      {searchError !== '' ? <ErrorDiv>{searchError}</ErrorDiv> : null}
    </>
  );
};

export default SearchBar;
