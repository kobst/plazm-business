import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import BannerImg from "../../../images/sliderimg.png";
import { MdKeyboardArrowLeft } from "react-icons/md";
import styled from "styled-components";
import { CgLock } from "react-icons/cg";

import {
  clearListData,
  deleteUserCreatedList,
  UnSubscribeToAList,
  SubscribeToAListAction,
} from "../../../reducers/listReducer";
import {
  fetchSelectedListDetails,
  clearMyFeedData,
} from "../../../reducers/myFeedReducer";
import ValueLoader from "../../../utils/loader";
import DisplayPostInAList from "./DisplayPostsInAList";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  addSubscribedList,
  removeSubscribedList,
} from "../../../reducers/userReducer";
import { useHistory } from "react-router-dom";
import ButtonOrange from "../UI/ButtonOrange";

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
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const CloseDiv = styled.div`
  width: 40px;
  position: relative;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -40px;
  cursor: pointer;
  top: 0px;
  background: #FE02B9;
  box-shadow: 4px 0px 14px -5px #fe02b9;
  svg {
    font-size: 32px;
    color: #fff;
  }
  @media (max-width:767px){
    left: 0;
    right: inherit;
    width: 30px;
    height: 30px;
  }
`;

const ListingOptionWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0;
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

  cursor: pointer;

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
  display: flex;
  justify-content: space-between;
  padding: 7px 9px;
  align-items: center;

  button.unsubscribe {
    border: 0px;
    margin-right: 8px;
    font-size: 9px;
    font-weight: bold;
    color: #fff;
    border-radius: 2px;
    padding: 5px 10px;
    cursor: pointer;
    background-color: #ff6067;
  }
  button.subscribe {
    border: 0px;
    margin-right: 8px;
    font-size: 9px;
    font-weight: bold;
    color: #fff;
    border-radius: 2px;
    padding: 5px 10px;
    cursor: pointer;
    background-color: #ff2e9a;
  }
`;

const ListBannerSection = styled.div`
  width: 100%;
  height: 210px;
  padding: 0 20px 20px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  position: relative;
  img {
    position: absolute;
    z-index: -1;
    left: 0;
    width: 100%;
    height: 100%;
    bottom: 0;
    top: 0;
    @media (max-width: 767px) {
      top: 0;
    }
  }
  h1 {
    font-size:18px;
    font-weight: 800;
    color:#fff;
    text-transform: uppercase;
    margin-bottom:7px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    @media (max-width: 767px) {
      font-size:14px;
    }
  }
  h5 {
    font-size:12px;
    font-weight:normal;
    color:#fff;
    margin-bottom:0px;
    span {
      color:#FF2E9A;
      border-right: 1px solid #fff;
      padding-right: 10px;
      cursor: pointer;
    }
    strong {
      margin-left: 0px;
      font-weight: bold;
      margin-right: 5px;
    }
  }
  p {
    font-size:13px;
    font-weight:600;
    color:#fff;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    margin:0 0 7px;
    padding: 0;
    line-height: normal;
    @media (max-width: 767px) {
      font-size:12px;
    }
  }
  .BannerWrapBtn {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ButtonOuterDiv = styled.div`
  button {
    border: 0px;
    margin-right: 8px;
    font-size: 9px;
    font-weight: bold;
    color: #fff;
    border-radius: 2px;
    padding: 5px 10px;
    cursor: pointer;
  }
  button:last-child {
    margin-right: 0;
  }
  button.PinkColor {
    background-color: #ff2e9a;
  }
  button.OrangeColor {
    background-color: #ff6067;
  }
`;

const LockDiv = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 3px;
  border: 0;
  background: #ff2e9a;
  display: inline-block;
  text-align: center;
  line-height: 18px;
  margin-left: 12px;
  svg {
    font-size: 12px;
    color: #fff;
    position: relative;
    top: 2px;
  }
`;

/*
 * @desc: to display list description
 */
const ListDescriptionView = ({
  setDisplayTab,
  setSelectedListId,
  selectedListId,
  setListIndex,
  listOpenedFromBusiness
}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.myFeed.loadingSelectedList);
  const loadingUnSubScribe = useSelector(
    (state) => state.list.loadingUnSubscribe
  );
  const loadingSelectedList = useSelector(
    (state) => state.myFeed.loadingSelectedList
  );
  const totalData = useSelector((state) => state.myFeed.totalData);
  const postsInList = useSelector((state) => state.myFeed.myFeed);
  const selectedList = useSelector((state) => state.myFeed.selectedListDetails);
  const user = useSelector((state) => state.user.user);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffSet] = useState(0);
  const [flag, setFlag] = useState(true)
  const history = useHistory();

  /** to clear all the data initially */
  useEffect(() => {
    dispatch(clearMyFeedData());
    setOffSet(0);
    setHasMore(true);
  }, [dispatch]);

  /** to return to all business listing */
  const backBusiness = () => {
    dispatch(clearListData());
    dispatch(clearMyFeedData());
    setSelectedListId(null);
  };

  /** to fetch initial posts in a list */
  useEffect(() => {
    const fetchListDetails = async () => {
      const result = await dispatch(fetchSelectedListDetails({ id: selectedListId, value: offset }));
      const data = await unwrapResult(result)
      if(data) {
        setFlag(false)
      }
    }
    offset === 0 && fetchListDetails()
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
    }
  };

  /** to subscribe from a list */
  const listSubscribe = async () => {
    const obj = {
      userId: user._id,
      listId: selectedList._id,
    };
    const list = await dispatch(SubscribeToAListAction(obj));
    const response = await unwrapResult(list);
    if (response) {
      dispatch(addSubscribedList(response.listId));
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

  const onCloseTab = () => {
    if(!listOpenedFromBusiness)
    setDisplayTab(false);
    dispatch(clearMyFeedData());
    setSelectedListId(null)
  };
  return ((loading &&
    offset === 0 &&
    !loadingUnSubScribe &&
    !loadingSelectedList) ||
    loadingUnSubScribe ||
    loadingSelectedList) || flag? (
    <LoaderWrap>
      <ValueLoader />
    </LoaderWrap>
  ) : (
    <>
      {selectedList ? (
        <ListOptionSection>
          <HeadingWrap>
            <TopHeadingWrap>
              <ListBannerSection>
                <img
                  src={
                    selectedList.media.length > 0
                      ? selectedList.media[0].image
                      : BannerImg
                  }
                  alt=""
                />
                <h1>{selectedList.name}</h1>
                <p>{selectedList.description}</p>
                <div className="BannerWrapBtn">
                <h5>
                  by{" "}
                  <strong>
                  <span
                    onClick={() =>
                      history.push(`/u/${selectedList.ownerId._id}`)
                    }
                  >
                    {selectedList.ownerId.name}
                  </span>
                  </strong>{" "}
                  
                    Updated{" "}
                    {moment(selectedList.updatedAt).format(
                      "MMM DD,YYYY, hh:MM a"
                    )}{" "}
                    EST
                  {" "}
                  <LockDiv>
                    <CgLock />
                  </LockDiv>
                </h5>
                
                <ButtonOrange>Unsubscribe</ButtonOrange>
                </div>

              </ListBannerSection>
              <CloseDiv>
                <IoMdClose onClick={() => onCloseTab()} />
              </CloseDiv>
            </TopHeadingWrap>
          </HeadingWrap>
          {/* <ButtonWrapperDiv>
            <ArrowBack>
              <MdKeyboardArrowLeft onClick={() => backBusiness()} />
            </ArrowBack>
            {selectedList &&
            selectedList.ownerId &&
            selectedList.ownerId._id === user._id ? (
              <>
                <ButtonOuterDiv>
                  <button className="PinkColor">Make Public</button>
                  <button className="PinkColor">Invite</button>
                  <button className="OrangeColor" onClick={() => deleteList()}>
                    Delete
                  </button>
                </ButtonOuterDiv>
              </>
            ) : !user.listFollowed.includes(selectedList._id) ? (
              <button className="subscribe" onClick={() => listSubscribe()}>
                Subscribe
              </button>
            ) : (
              <button className="unsubscribe" onClick={() => listUnSubscribe()}>
                Unsubscribe
              </button>
            )}
          </ButtonWrapperDiv> */}
          <div
            id="scrollableDiv"
            style={{ height: "calc(100vh - 258px)", overflow: "auto" }}
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
                    <DisplayPostInAList
                      data={i}
                      key={key}
                      id={key}
                      setListIndex={setListIndex}
                      setSelectedListId={setSelectedListId}
                    />
                  ))
                ) : (
                  <NoData>No Posts In A List To Display</NoData>
                )}
              </ListingOptionWrap>
            </InfiniteScroll>
          </div>
        </ListOptionSection>
      ) : null}
    </>
  );
};

export default ListDescriptionView;
