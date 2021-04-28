import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplayFavoriteBusiness from "./DisplayFavoriteBusiness";
import styled from "styled-components";
import ValueLoader from "../../../../utils/loader";
import DropdwonArrowTop from "../../../../images/top_arrow.png";
import { FaSort } from "react-icons/fa";
import SearchBar from "../SearchBar";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  HomeSearch,
  setSideFiltersByClosest,
  setSideFiltersByUpdatedAt,
} from "../../../../reducers/myFeedReducer";
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

const CheckboxWrap = styled.div`
  display: flex;
  padding: 0;
  flex-direction: row;
  font-size: 13px;
  font-weight: 500;
  position: relative;
  .container .checkmark:after {
    left: 4px;
    top: 1px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 1px 1px 0;
  }
  .container input:checked ~ .checkmark {
    background-color: transparent;
  }
  @media (max-width: 767px) {
    margin: 0 0 5px;
  }
  svg {
    cursor: pointer;
  }
`;

const DropdownContent = styled.div`
  display: flex;
  position: absolute;
  min-width: 102px;
  overflow: auto;
  background: #fe02b9;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.3);
  z-index: 1;
  top: 25px;
  width: 30px;
  overflow: visible;
  right: -5px;
  padding: 5px;
  :before {
    background: url(${DropdwonArrowTop}) no-repeat top center;
    width: 15px;
    height: 15px;
    content: " ";
    top: -12px;
    position: relative;
    margin: 0 auto;
    display: flex;
    text-align: center;
    left: 78px;
    @media (max-width: 767px) {
      left: 0;
    }
  }
  @media (max-width: 767px) {
    top: 31px;
    right: 0;
    left: -5px;
  }
  ul {
    list-style: none;
    margin: 0 0 0 -15px;
    padding: 0;
    width: 100%;
    text-align: right;
  }
  li {
    color: #fff;
    padding: 0px 5px;
    text-decoration: none;
    font-size: 12px;
  }
  li:hover {
    background-color: #fe02b9;
    cursor: pointer;
  }
`;

const BusinessListing = () => {
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
  const menuRef = useRef(null);
  const [uploadMenu, setUploadMenu] = useState(false);
  const [filterSelected, setFilterSelected] = useState(false);

  /** useEffect called when initially tab is rendered */
  useEffect(() => {
    if (offset === 0 && !filterClosest && !updatedAtFilter) {
      const obj = {
        search: "",
        value: offset,
        filters: { closest: filterClosest, updated: updatedAtFilter },
        latitude: process.env.REACT_APP_LATITUDE,
        longitude: process.env.REACT_APP_LONGITUDE,
      };
      dispatch(HomeSearch(obj));
    }
  }, [dispatch, offset, filterClosest, updatedAtFilter, filterSelected]);

  /** useEffect called when any side filters are selected */
  useEffect(() => {
    if (filterSelected === true) {
      const obj = {
        search: search,
        value: 0,
        filters: { closest: filterClosest, updated: updatedAtFilter },
        latitude: process.env.REACT_APP_LATITUDE,
        longitude: process.env.REACT_APP_LONGITUDE,
      };
      dispatch(HomeSearch(obj));
      setFilterSelected(false);
    }
  }, [dispatch, filterSelected, filterClosest, updatedAtFilter, offset, search]);

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

  /** to toggle side filter menu */
  const toggleUploadMenu = () => {
    setUploadMenu(!uploadMenu);
  };

  /** to set side filter by closest */
  const closestFilter = () => {
    dispatch(setSideFiltersByClosest());
    setFilterSelected(true);
  };

  /** to set side filter by recently updated */
  const recentlyUpdatedFilter = () => {
    dispatch(setSideFiltersByUpdatedAt());
    setFilterSelected(true);
  };
  return (
    <>
      <SearchBar offset={offset} />
      <CheckboxWrap ref={menuRef}>
        <FaSort onClick={toggleUploadMenu} />
        {uploadMenu && (
          <DropdownContent>
            <ul>
              <li onClick={() => closestFilter()}>Closest</li>

              <li onClick={() => recentlyUpdatedFilter()}>Recently Updated</li>
            </ul>
          </DropdownContent>
        )}
      </CheckboxWrap>
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
              offset < totalPlaces && loading ? (
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
              ) : !loading ? (
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
