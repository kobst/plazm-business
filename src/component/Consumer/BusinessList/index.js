import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import ValueLoader from "../../../utils/loader";
import DisplayFavoriteBusiness from "./displayFavoriteBusiness";
import {
  clearUserFavorites,
  fetchUserFavoritesBusiness,
} from "../../../reducers/userReducer";
import { unwrapResult } from "@reduxjs/toolkit";
import SearchBar from "./SearchBar";
import useStore from "../useState";


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

const BuisinessViewContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;

  @media (max-width: 767px) {
    padding: 15px;
  }
  h3 {
    color: #ffffff;
    padding: 0;
    margin: 0 0 15px;
    font-size: 24px;
    font-weight: 600;
    @media (max-width: 767px) {
      font-size: 18px;
    }
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    svg {
      font-size: 12px;
    }
  }
  p {
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 10px;
    padding: 0;
    transition: all 0.2s ease-in-out 0s;
    @media (max-width: 767px) {
      font-size: 13px;
    }
  }
  .dashed {
    border-bottom: 0.5px dashed #ffffff;
    margin-bottom: 2%;
  }

  input {
    border: 0;
  }
`;

const BusinessListWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 12px 0;
  flex-direction: column;
  overflow: hidden;
`;

const NoData = styled.div`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
  text-align: center;
`;

const NoMorePost = styled.p`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
`;

/*
 * @desc: to display all business lists
 */
const BusinessList = ({ setDisplayTab, setFavoriteIndex }) => {
  const [offset, setOffSet] = useState(0);
  const totalFavorites = useSelector((state) => state.user.totalFavorites);
  const [hasMore, setHasMore] = useState(true);
  const user = useSelector((state) => state.user.user);
  const loadingFavoriteBusiness = useSelector(
    (state) => state.user.loadingFavoriteBusiness
  );
  // const userLocation = useSelector((state) => state.business.userLocation);
  const favoriteBusiness = useSelector((state) => state.user.favoriteBusiness);
  const filterByClosest = useSelector((state) => state.myFeed.filterByClosest);
  const filterByUpdatedAt = useSelector(
    (state) => state.myFeed.filterByUpdatedAt
  );
  const [flag, setFlag] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const draggedLocation = useStore((state) => state.draggedLocation)
  const dispatch = useDispatch();

  const userFavorites =
    search !== "" && !search.trim() === false
      ? filteredData.length > 0
        ? filteredData
        : []
      : favoriteBusiness;

  /** to fetch initial data */
  useEffect(() => {
    const fetchFavoriteBusiness = async () => {
      dispatch(clearUserFavorites());
      const result = await dispatch(
        fetchUserFavoritesBusiness({
          id: user._id,
          value: offset,
          latitude: draggedLocation.lat,
          longitude: draggedLocation.lng,
          filters: { closest: filterByClosest, updated: filterByUpdatedAt },
        })
      );
      const data = await unwrapResult(result);
      if (data) {
        setFlag(false);
      }
    };
    offset === 0 && fetchFavoriteBusiness();
  }, [
    user,
    dispatch,
    offset,
    filterByClosest,
    filterByUpdatedAt,
    draggedLocation,
  ]);

  useEffect(() => {
    setOffSet(0);
    setHasMore(true);
  }, []);

  /** to fetch more data if available */
  const fetchMoreBusiness = () => {
    if (offset + 20 < totalFavorites) {
      setOffSet(offset + 20);
      dispatch(
        fetchUserFavoritesBusiness({
          id: user._id,
          value: offset + 20,
          latitude: draggedLocation.lat,
          longitude: draggedLocation.lng,
          filters: { closest: filterByClosest, updated: filterByUpdatedAt },
        })
      );
    } else setHasMore(false);
  };

  /** to filter based on search */
  useEffect(() => {
    if (search !== "" && !search.trim() === false) {
      setFilteredData(
        favoriteBusiness.filter(
          (entry) =>
            entry.listId[0].name.toLowerCase().indexOf(search.toLowerCase()) !==
            -1
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      {(loadingFavoriteBusiness && offset === 0) || flag ? (
        <LoaderWrap>
          <ValueLoader />
        </LoaderWrap>
      ) : (
        <BuisinessViewContent>
          <SearchBar
            setOffset={setOffSet}
            setDisplayTab={setDisplayTab}
            search={search}
            setSearch={setSearch}
          />
          <div
            id="scrollableDiv"
            style={{ height: "calc(100vh - 44px)", overflow: "auto" }}
          >
            <InfiniteScroll
              dataLength={userFavorites ? userFavorites.length : 0}
              next={fetchMoreBusiness}
              hasMore={hasMore}
              loader={
                offset < totalFavorites && loadingFavoriteBusiness ? (
                  <div style={{ textAlign: "center", margin: " 40px auto 0" }}>
                    {" "}
                    <ValueLoader height="40" width="40" />
                  </div>
                ) : null
              }
              scrollableTarget="scrollableDiv"
              endMessage={
                userFavorites.length > 20 && !loadingFavoriteBusiness ? (
                  <center>
                    <NoMorePost className="noMorePost">
                      No more Result to show
                    </NoMorePost>
                  </center>
                ) : null
              }
            >
              <BusinessListWrap>
                {userFavorites.length > 0 ? (
                  userFavorites.map((i, key) => (
                    <DisplayFavoriteBusiness
                      data={i}
                      key={key}
                      setFavoriteIndex={setFavoriteIndex}
                    />
                  ))
                ) : (
                  <NoData>No Result To Display</NoData>
                )}
              </BusinessListWrap>
            </InfiniteScroll>
          </div>
        </BuisinessViewContent>
      )}
    </>
  );
};

export default BusinessList;
