import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import { MdKeyboardArrowLeft } from "react-icons/md";
import styled from "styled-components";
import {
  clearListData,
  deleteUserCreatedList,
  UnSubscribeToAList,
} from "../../../reducers/listReducer";
import {
  fetchSelectedListDetails,
  clearMyFeedData,
} from "../../../reducers/myFeedReducer";
import ValueLoader from "../../../utils/loader";
import DisplayPostInAList from "./DisplayPostsInAList";
import { unwrapResult } from "@reduxjs/toolkit";
import { removeSubscribedList } from "../../../reducers/userReducer";

const ListOptionSection = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0px;
  @media (max-width: 767px) {
    margin: 0;
  }
`;

const HeadingWrap = styled.div`
  padding: 0px;
  display: flex;
  flex-direction: column;
`;

const TopHeadingWrap = styled.div`
  padding: 30px 30px 0;
  display: flex;
  flex-direction: column;
  border-bottom: 1px dashed #fff;
  @media (max-width: 767px) {
    padding: 15px 15px 0;
  }
`;

const CloseDiv = styled.div`
  width: 24px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 17px;
  cursor: pointer;
  top: 17px;
  svg {
    font-size: 24px;
    color: #fff;
  }
`;

const ListingOptionWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px 0 0;
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

const NoData = styled.div`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
  text-align: center;
`;

const ArrowBack = styled.div`
  background: #ff2e9a;
  border-radius: 3px;
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 15px;
  cursor: pointer;
  top: 66px;
  z-index: 1;
  svg {
    font-size: 34px;
    color: #fff;
  }
  @media (max-width: 767px) {
    width: 24px;
    height: 24px;
  }
`;

const ButtonWrapperDiv = styled.div`
  padding-top: 50px;
  display: flex;
  flex-direction: row-reverse;
`;
/*
 * @desc: to display list description
 */
const ListDescriptionView = ({
  setDisplayTab,
  setSelectedListId,
  selectedListId,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.myFeed.loadingSelectedList);
  const loadingUnSubScribe = useSelector(
    (state) => state.list.loadingUnSubscribe
  );
  const totalData = useSelector((state) => state.myFeed.totalData);
  const postsInList = useSelector((state) => state.myFeed.myFeed);
  const selectedList = useSelector((state) => state.myFeed.selectedListDetails);
  const user = useSelector((state) => state.user.user);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffSet] = useState(0);

  /** to clear all the data initially */
  useEffect(() => {
    dispatch(clearMyFeedData());
    setOffSet(0);
    setHasMore(true);
  }, [dispatch]);

  /** to return to all business listing */
  const backBusiness = () => {
    dispatch(clearListData());
    setSelectedListId(null);
  };

  /** to fetch initial posts in a list */
  useEffect(() => {
    if (offset === 0)
      dispatch(fetchSelectedListDetails({ id: selectedListId, value: offset }));
  }, [dispatch, selectedListId, offset]);

  const fetchMorePosts = () => {
    if (offset + 20 < totalData) {
      setOffSet(offset + 20);
      dispatch(
        fetchSelectedListDetails({ id: selectedListId, value: offset + 20 })
      );
    } else setHasMore(false);
  };

  /** to unsubscribe from a list */
  const listUnSubscribe = async () => {
    const obj = {
      userId: user._id,
      listId: selectedList._id,
    };
    const list = await dispatch(UnSubscribeToAList(obj));
    const response = await unwrapResult(list);
    if (response) {
      dispatch(removeSubscribedList(response.listId));
      setSelectedListId(null);
    }
  };

  /** to delete a list */
  const deleteList = async () => {
    const obj = {
      userId: user._id,
      listId: selectedList._id,
    };
    const data = await dispatch(deleteUserCreatedList(obj));
    const response = await unwrapResult(data);
    if (response) {
      setSelectedListId(null);
    }
  };
  return (loading && offset === 0 && !loadingUnSubScribe) ||
    loadingUnSubScribe ? (
    <LoaderWrap>
      <ValueLoader />
    </LoaderWrap>
  ) : (
    <>
      <ListOptionSection>
        <HeadingWrap>
          <TopHeadingWrap>
            <CloseDiv>
              <IoMdClose onClick={() => setDisplayTab(false)} />
            </CloseDiv>
          </TopHeadingWrap>
        </HeadingWrap>
        <ButtonWrapperDiv>
          <ArrowBack>
            <MdKeyboardArrowLeft onClick={() => backBusiness()} />
          </ArrowBack>
          {selectedList &&
          selectedList.ownerId &&
          selectedList.ownerId._id === user._id ? (
            <>
              <button>Make Public</button>
              <button>Invite</button>
              <button onClick={()=>deleteList()}>Delete</button>
            </>
          ) : (
            <button onClick={() => listUnSubscribe()}>Unsubscribe</button>
          )}
        </ButtonWrapperDiv>
        <div
          id="scrollableDiv"
          style={{ height: "calc(100vh - 175px)", overflow: "auto" }}
        >
          <InfiniteScroll
            dataLength={postsInList ? postsInList.length : 0}
            next={fetchMorePosts}
            hasMore={hasMore}
            loader={
              offset < totalData && loading ? (
                <div style={{ textAlign: "center", margin: " 40px auto 0" }}>
                  {" "}
                  <ValueLoader height="40" width="40" />
                </div>
              ) : null
            }
            scrollableTarget="scrollableDiv"
            endMessage={
              postsInList.length > 20 && !loading ? (
                <center>
                  <NoMorePost className="noMorePost">
                    No more List to show
                  </NoMorePost>
                </center>
              ) : null
            }
          >
            <ListingOptionWrap>
              {postsInList.length > 0 ? (
                postsInList.map((i, key) => (
                  <DisplayPostInAList data={i} key={key} />
                ))
              ) : (
                <NoData>No Posts In A List To Display</NoData>
              )}
            </ListingOptionWrap>
          </InfiniteScroll>
        </div>
      </ListOptionSection>
    </>
  );
};

export default ListDescriptionView;
