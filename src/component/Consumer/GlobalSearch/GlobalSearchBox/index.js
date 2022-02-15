import React, { useState, useEffect} from "react";
import styled from "styled-components";
import SearchIcon from "../../../../images/search-icon.png"

const GlobalSearchInputWrap = styled.div`
  position: relative;
  display: flex;
  width: 95%;
  height: 46px;
  margin: 10px 10px 15px;
  border-radius: 5px;
  overflow: hidden;
  input {
    width: calc(100% - 38px);
    height: 38px;
    background: #FFFFFF;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
  }
  button {
    width: 38px;
    height: 38px;
    background: #FFFFFF;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;


const GlobalSearchBox = () => {

  return (
    <>
      <GlobalSearchInputWrap>
        <input />
        <button><img src={SearchIcon} /></button>
      </GlobalSearchInputWrap>
    </>
  );
};

export default GlobalSearchBox;


