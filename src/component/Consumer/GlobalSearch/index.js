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
  left: 650px;
  z-index: 101;
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
  @media (max-width: 1279px) {
    top: 100px;
    left: 50vw;
  }
  @media (max-width: 767px) {
    top: 75px;
    right: -70px;
    left: inherit;
    margin-top: 0;
    z-index: 999;
    border: 1px solid #ccc;
    border-radius: 5px;
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
