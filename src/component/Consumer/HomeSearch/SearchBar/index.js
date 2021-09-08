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
import { FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

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
      color: #BDBDBD;
    }
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

const Heading = styled.h1`
  color: #FF2E79;
  font-weight: 700;
  font-size: 18px;
  margin: 0 0 0 20px;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  width: calc(100% - 350px);
`;

const FilterBox = styled.div`
  margin: 0px;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  svg {
    color: #fff;
    font-size: 14px;
  }
`;

const RightSearchWrap = styled.div`
  display: flex;
`;
const CloseDiv = styled.div`
  width: 40px;
  position: relative;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -40px;
  cursor: pointer;
  top: 0px;
  background: #FE02B9;
  box-shadow: 4px 0px 14px -5px #fe02b9;
  svg {
    font-size: 32px;
    color: #fff;
  }
`;

const SearchBar = ({ setOffset }) => {
  const [search, setSearch] = useState("");
  const loader = useSelector((state) => state.myFeed.loading);
  const [searchError, setSearchError] = useState("");
  const filterClosest = useSelector((state) => state.myFeed.filterByClosest);
  const updatedAtFilter = useSelector(
    (state) => state.myFeed.filterByUpdatedAt
  );
  const searchData = useSelector(state => state.myFeed.searchData)
  const dispatch = useDispatch();

  useEffect(()=>{
    setSearch(searchData)
  },[searchData])

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
        <Heading>Favorites</Heading>
        <RightSearchWrap>
          <Input
            value={search}
            onKeyPress={(event) => searchList(event)}
            onChange={(e) => onChangeSearch(e)}
            disabled={loader}
            placeholder="Search Favorites"
          />
          <FilterBox>
            <FaFilter />
          </FilterBox>
        </RightSearchWrap>
        <CloseDiv>
          <IoMdClose />
        </CloseDiv>
      </SearchWrap>
      {searchError !== "" ? <ErrorDiv>{searchError}</ErrorDiv> : null}
    </>
  );
};

export default SearchBar;
