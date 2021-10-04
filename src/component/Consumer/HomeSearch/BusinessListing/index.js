import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplayFavoriteBusiness from "./DisplayFavoriteBusiness";
import styled from "styled-components";
import ValueLoader from "../../../../utils/loader";
import SearchBar from "../SearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomeSearch } from "../../../../reducers/myFeedReducer";
import error from "../../../../constants";
import { unwrapResult } from "@reduxjs/toolkit";

const BusinessListWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 0;
  flex-direction: column;
  overflow: hidden;
`;

const LoaderWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px 0 0 0;
  @media (max-width: 767px) {
    margin: 30px 0 0 0;
  }
`;

const NoMorePost = styled.p`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
`;

const BusinessListing = ({
  setSelectedListId,
  setListClickedFromSearch,
  setSearchIndex,
  setDisplayTab,
  loader,
  coords,
  closestFilter,
}) => {
  const businessData = useSelector((state) => state.myFeed.myFeed);
  const loading = useSelector((state) => state.myFeed.loading);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const totalPlaces = useSelector((state) => state.myFeed.totalData);
  const dispatch = useDispatch();
  const search = useSelector((state) => state.myFeed.searchData);
  const filterClosest = useSelector((state) => state.myFeed.filterByClosest);
  const updatedAtFilter = useSelector(
    (state) => state.myFeed.filterByUpdatedAt
  );
  const [filterSelected, setFilterSelected] = useState(false);
  const [flag, setFlag] = useState(true);

  /** useEffect called when any side filters are selected */
  useEffect(() => {
    const fetchSearchData = async () => {
      const obj = {
        search: search,
        value: 0,
        filters: {
          closest:
            closestFilter && !updatedAtFilter ? closestFilter : filterClosest,
          updated: updatedAtFilter,
        },
        latitude: coords ? coords.latitude : process.env.REACT_APP_LATITUDE,
        longitude: coords ? coords.longitude : process.env.REACT_APP_LONGITUDE,
      };
      const result = await dispatch(HomeSearch(obj));
      const data = await unwrapResult(result);
      if (data) {
        setFlag(false);
      }
      // setFilterSelected(false);
    };
    if (loader === false && offset === 0) fetchSearchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    filterSelected,
    filterClosest,
    updatedAtFilter,
    offset,
    loader,
  ]);

  /** to fetch more places matching the search */
  const fetchMorePlaces = () => {
    if (offset + 20 < totalPlaces) {
      setOffset(offset + 20);
      const obj = {
        search: search,
        value: offset + 20,
        filters: { closest: filterClosest, updated: updatedAtFilter },
        latitude: process.env.REACT_APP_LATITUDE,
        longitude: process.env.REACT_APP_LONGITUDE,
      };
      dispatch(HomeSearch(obj));
    } else setHasMore(false);
  };

  return (
    <>
      <SearchBar
        offset={offset}
        setOffset={setOffset}
        setFilterSelected={setFilterSelected}
        setDisplayTab={setDisplayTab}
      />
      {(loading && offset === 0) || flag ? (
        <LoaderWrap>
          <ValueLoader />
        </LoaderWrap>
      ) : (
        <div
          id="scrollableDiv"
          style={{ height: "calc(100vh - 44px)", overflow: "auto" }}
        >
          <InfiniteScroll
            dataLength={businessData ? businessData.length : 0}
            next={fetchMorePlaces}
            hasMore={hasMore}
            loader={
              offset < totalPlaces && loading ? (
                <div style={{ textAlign: "center", margin: " 40px auto 0" }}>
                  {" "}
                  <ValueLoader height="40" width="40" />
                </div>
              ) : null
            }
            scrollableTarget="scrollableDiv"
            endMessage={
              businessData.length > 20 && !loading && !flag ? (
                <center>
                  <NoMorePost className="noMorePost">
                    {error.NO_MORE_BUSINESS_TO_DISPLAY}
                  </NoMorePost>
                </center>
              ) : null
            }
          >
            <BusinessListWrap>
              {businessData.length > 0 ? (
                businessData.map((i, key) => (
                  <DisplayFavoriteBusiness
                    data={i}
                    key={key}
                    setSelectedListId={setSelectedListId}
                    setListClickedFromSearch={setListClickedFromSearch}
                    setSearchIndex={setSearchIndex}
                  />
                ))
              ) : !loading && businessData.length === 0 ? (
                <center>
                  <NoMorePost className="noMorePost">
                    {error.NO_BUSINESS_FOUND}
                  </NoMorePost>
                </center>
              ) : null}
            </BusinessListWrap>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default BusinessListing;
