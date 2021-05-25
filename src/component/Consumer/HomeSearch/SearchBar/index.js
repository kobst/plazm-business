import React, { useEffect, useState } from "react";
import Input from "../../UI/Input/Input";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import error from "../../../../constants";
import {
  HomeSearch,
  clearSearchedData,
  setSearchData,
  setSideFiltersHomeSearch,
  setEnterClicked,
} from "../../../../reducers/myFeedReducer";

const SearchWrap = styled.div`
  background: #fff;
  height: 45px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 23px 20px 16px 20px;
  box-sizing: border-box;
  input {
    border: 0;
    outline: 0;
    padding: 0 10px;
    width: calc(100% - 115px);
    height: 45px;
    font-size: 18px;
    font-weight: normal;
    border-radius: 3px;
    box-shadow: none;
  }
`;

const SearchIconDiv = styled.div`
  width: 195px;
  height: 45px;
  font-size: 12px;
  color: #5a5a5a;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    font-size: 30px;
    color: #c4c4c4;
    font-weight: bold;
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

const SearchBar = ({ offset, setOffset }) => {
  const [search, setSearch] = useState("");
  const loader = useSelector((state) => state.myFeed.loading);
  const [searchError, setSearchError] = useState("");
  const filterClosest = useSelector((state) => state.myFeed.filterByClosest);
  const updatedAtFilter = useSelector(
    (state) => state.myFeed.filterByUpdatedAt
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setSearch("");
    dispatch(setSearchData(""));
  }, [dispatch]);

  /** on key press handler for search */
  const searchList = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (search !== "" && search.length >= 4 && !search.trim() === false) {
        setOffset(0)
        dispatch(clearSearchedData());
        dispatch(setSideFiltersHomeSearch());
        const obj = {
          search: search,
          value: 0,
          filters: { closest: filterClosest, updated: updatedAtFilter },
          latitude: process.env.REACT_APP_LATITUDE,
          longitude: process.env.REACT_APP_LONGITUDE,
        };
        dispatch(setEnterClicked(true));
        dispatch(HomeSearch(obj));
        setSearchError("");
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
        <Input
          value={search}
          onKeyPress={(event) => searchList(event)}
          onChange={(e) => onChangeSearch(e)}
          disabled={loader}
        />
        <SearchIconDiv>Press Enter To Search</SearchIconDiv>
      </SearchWrap>
      {searchError !== "" ? <ErrorDiv>{searchError}</ErrorDiv> : null}
    </>
  );
};

export default SearchBar;
