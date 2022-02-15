import React, { useState, useEffect} from "react";
import styled from "styled-components";
import SearchIcon from "../../../images/search-icon.png"

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
    background: #FFFFFF;
    border: 1px solid #F0F0F0;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;


const GlobalSearch = () => {

  return (
    <>
      <GlobalSearchBtnWrap>
        <button><img src={SearchIcon} /></button>
      </GlobalSearchBtnWrap>
    </>
  );
};

export default GlobalSearch;


