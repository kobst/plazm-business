import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchIcon from "../../../images/search-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayBar } from "../../../reducers/globalSearchReducer";
import error from "../../../constants";
import { setSearchData } from "../../../reducers/myFeedReducer";

const GlobalSearchBtnWrap = styled.div`
  position: relative;
  display: flex;
  width: 38px;
  height: 38px;
  top: 70px;
  left: 10px;
  button {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const GlobalSearch = () => {
  const dispatch = useDispatch();
  const currentStatus = useSelector((state) => state.globalSearch.displayBar);
  const loading = useSelector((state) => state.myFeed.loading);
  const handleClick = () => {
    dispatch(setDisplayBar(!currentStatus));
  };

  return (
    <>
      {!loading && (
        <GlobalSearchBtnWrap>
          <button onClick={handleClick}>
            <img src={SearchIcon} />
          </button>
        </GlobalSearchBtnWrap>
      )}
    </>
  );
};

export default GlobalSearch;
