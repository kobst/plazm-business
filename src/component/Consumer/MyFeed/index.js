import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import ValueLoader from "../../../utils/loader";
import {
  clearMyFeedData,
  fetchMyFeedData,
} from "../../../reducers/myFeedReducer";
import DisplayBusinessDetails from "./DisplayBusinessDetails";
import { unwrapResult } from "@reduxjs/toolkit";
import SearchBar from "./SearchBar";

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
    margin: 0 0 11px;
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
    cursor: pointer;
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
  padding: 10px 0;
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

const MyFeed = ({ setDisplayTab, setMyFeedIndex, setSelectedListId }) => {
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.myFeed.loading);
  const feedData = useSelector((state) => state.myFeed.myFeed);
  const totalData = useSelector((state) => state.myFeed.totalData);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffSet] = useState(0);
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const obj = {
        id: user._id,
        value: 0,
      };
      dispatch(clearMyFeedData());
      const res = await dispatch(fetchMyFeedData(obj));
      const data = await unwrapResult(res);
      if (data) setFlag(false);
    };
    fetchData();
  }, [dispatch, user._id]);

  const fetchMoreData = () => {
    if (offset + 20 < totalData) {
      setOffSet(offset + 20);
      dispatch(fetchMyFeedData({ id: user._id, value: offset + 20 }));
    } else setHasMore(false);
  };

  return (
    <>
      {(loading && offset === 0 && flag) || (offset === 0 && flag) ? (
        <LoaderWrap>
          <ValueLoader />
        </LoaderWrap>
      ) : (
        <BuisinessViewContent>
          <SearchBar setOffset={setOffSet} setDisplayTab={setDisplayTab} />
          <div
            id="scrollableDiv"
            style={{ height: "calc(100vh - 116px)", overflow: "auto" }}
          >
            <InfiniteScroll
              dataLength={feedData ? feedData.length : 0}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={
                offset + 20 < totalData && loading ? (
                  <div style={{ textAlign: "center", margin: " 40px auto 0" }}>
                    {" "}
                    <ValueLoader height="40" width="40" />
                  </div>
                ) : null
              }
              scrollableTarget="scrollableDiv"
              endMessage={
                feedData.length > 20 && !loading ? (
                  <center>
                    <NoMorePost className="noMorePost">
                      No more Data to show
                    </NoMorePost>
                  </center>
                ) : null
              }
            >
              <BusinessListWrap>
                {feedData.length > 0 ? (
                  feedData.map((i, key) => (
                    <DisplayBusinessDetails
                      data={i}
                      id={key}
                      key={key}
                      setMyFeedIndex={setMyFeedIndex}
                      setSelectedListId={setSelectedListId}
                    />
                  ))
                ) : !loading ? (
                  <NoData>No Data To Display</NoData>
                ) : null}
              </BusinessListWrap>
            </InfiniteScroll>
          </div>
        </BuisinessViewContent>
      )}
    </>
  );
};

export default MyFeed;
