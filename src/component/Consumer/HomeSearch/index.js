import React from "react";
import BusinessListing from "./BusinessListing";
// import SearchBar from "./SearchBar";

import styled from "styled-components";

const ContentWrap = styled.div`
  padding: 30px;
`;

const HomeSearch = () => {
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
