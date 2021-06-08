import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import BusinessListing from "./BusinessListing";
import {
  clearMyFeedData,
  setSideFiltersHomeSearch,
} from "../../../reducers/myFeedReducer";

const ContentWrap = styled.div`
  padding: 0px;
`;

const HomeSearch = ({ setSelectedListId, setListClickedFromSearch, setSearchIndex }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSideFiltersHomeSearch());
    dispatch(clearMyFeedData());
  }, [dispatch]);
  return (
    <>
      <ContentWrap>
        <BusinessListing
          setSelectedListId={setSelectedListId}
          setListClickedFromSearch={setListClickedFromSearch}
          setSearchIndex={setSearchIndex}
        />
      </ContentWrap>
    </>
  );
};

export default HomeSearch;
