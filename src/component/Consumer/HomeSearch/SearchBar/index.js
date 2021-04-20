import React, { useEffect, useState } from "react";
import Input from "../../UI/Input/Input";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { HomeSearch, setSearchData } from "../../../../reducers/searchReducer";
import error from "../../../../constants";

const SearchWrap = styled.div`
  width: 100%;
  background: #fff;
  height: 50px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 15px;
  input {
    border: 0;
    outline: 0;
    padding: 0 10px;
    width: calc(100% - 70px);
    height: 50px;
  }
`;

const SearchIconDiv = styled.div`
  width: 140px;
  height: 50px;
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
`;

const SearchBar = ({ offset }) => {
  const [search, setSearch] = useState("");
  const loader = useSelector((state) => state.search.loading);
  const [searchError, setSearchError] = useState("");
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
        const obj = {
          search: search,
          value: offset,
        };
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
