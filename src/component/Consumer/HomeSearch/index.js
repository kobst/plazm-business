import React, { useEffect } from "react";
import BusinessListing from "./BusinessListing";
// import SearchBar from "./SearchBar";

import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setSideFiltersHomeSearch } from "../../../reducers/searchReducer";

const ContentWrap = styled.div`
  padding: 30px;
`;

const HomeSearch = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setSideFiltersHomeSearch())
  },[dispatch])
  return (
    <>
      <ContentWrap>
        {/* <SearchBar /> */}
        <BusinessListing />
      </ContentWrap>
    </>
  );
};

export default HomeSearch;
