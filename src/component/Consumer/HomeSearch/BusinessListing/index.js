import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplayFavoriteBusiness from "./DisplayFavoriteBusiness";
import styled from "styled-components";
import ValueLoader from "../../../../utils/loader";
import SearchBar from "../SearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomeSearch } from "../../../../reducers/searchReducer";
import error from "../../../../constants";

const BusinessListWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 12px 0;
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

const BusinessListing = () => {
  const businessData = useSelector((state) => state.search.searchedPlace);
  const loading = useSelector((state) => state.search.loading);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const totalPlaces = useSelector((state) => state.search.totalPlaces);
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.searchData);

  useEffect(() => {
    const obj = {
      search: "",
      value: offset,
    };
    dispatch(HomeSearch(obj));
  }, [dispatch, offset]);

  /** to fetch more places matching the search */
  const fetchMorePlaces = () => {
    if (offset + 20 < totalPlaces) {
      setOffset(offset + 20);
      const obj = {
        search: search,
        value: offset + 20,
      };
      dispatch(HomeSearch(obj));
    } else setHasMore(false);
  };
  return (
    <>
      <SearchBar offset={offset} />
      {loading && offset === 0 ? (
        <LoaderWrap>
          <ValueLoader />
        </LoaderWrap>
      ) : (
        <div id="scrollableDiv" style={{ height: "100vh", overflow: "auto" }}>
          <InfiniteScroll
            dataLength={businessData ? businessData.length : 0}
            next={fetchMorePlaces}
            hasMore={hasMore}
            loader={
              offset + 20 < totalPlaces && loading ? (
                <div style={{ textAlign: "center", margin: " 40px auto 0" }}>
                  {" "}
                  <ValueLoader height="40" width="40" />
                </div>
              ) : null
            }
            scrollableTarget="scrollableDiv"
            endMessage={
              businessData.length > 20 && !loading ? (
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
                  <DisplayFavoriteBusiness data={i} key={key} />
                ))
              ) : (
                <center>
                  <NoMorePost className="noMorePost">
                    {error.NO_BUSINESS_FOUND}
                  </NoMorePost>
                </center>
              )}
            </BusinessListWrap>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default BusinessListing;
