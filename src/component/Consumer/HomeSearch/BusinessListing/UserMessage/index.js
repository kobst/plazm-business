import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { FaCaretRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import ValueLoader from "../../../../../utils/loader";
import ReplyInput from "./ReplyInput";
import Comments from "./Comments";
import BannerImg from "../../../../../images/sliderimg.png";
import LikesBar from "../LikesBar";
import {
  addLikeViaSocket,
  addLikeToCommentViaSocket,
  addCommentToPost,
  addReplyToComment,
  addPostViaSocket,
  setCommentAdded,
  setPostId,
  setEventId,
} from "../../../../../reducers/myFeedReducer";
import { useHistory } from "react-router-dom";
import useStore from "../../../useState";
import BigImage from "../../../ListDescriptionView/BigImageContainer";
import {
  InnerListBanner,
  InnerOverlay,
  ListAuthorName,
  ListInfo,
  ListName,
  ListNameWrap,
  TopListHeader,
  RightBuisinessName,
  BuisinessName,
  LeftListHeader,
  ShowMoreDiv,
  ImgThumbWrap,
} from "../../../FeedContent/styled";
import DateBar from "../../../BuisinessView/TabsSection/EventsSection/PostChat/DateBar/index.js";
import TimeBar from "../../../BuisinessView/TabsSection/EventsSection/PostChat/TimeBar/index.js";
import ArrowSm from "../../../../../images/arrow-sm-up.png";
import ArrowSmDown from "../../../../../images/arrow-sm.png";
import ImageSlider from "./imageslider";

const reactStringReplace = require("react-string-replace");

const UserMessageContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 0;
  flex-direction: column;
  @media (max-width: 767px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
  &.UserReplyContent {
    padding: 10px 0 0 40px;
  }
  .InnerScroll {
    overflow-x: hidden;
  }
`;
const UserMsgWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  // :nth-child(even) {
  //   background-color: #282352;
  // }
  // :nth-child(odd) {
  //   background-color: #221e45;
  // }
`;

const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0;
  margin: 15px 0;
  padding-left: 40px;
  &.UserMessageView {
    padding-left: 15px;
    width: 100%;
    font-family: "Roboto", sans-serif;
  }
`;

const ProfileNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: calc(100% - 40px);
  padding: 0 25px 0 0px;
  width: 100%;
  @media (max-width: 1024px) {
    padding: 0 45px 0 0px;
  }
  &.UserMessageViewProfileName {
    max-width: 100%;
    padding: 0 15px 0 0px;
    text-align: justify;
    @media (max-width: 1024px) {
      padding: 0 15px 0 0px;
    }
  }
`;

const ChatInput = styled.div`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
  white-space: pre-wrap;
  span {
    font-size: 13px;
    color: #ff2e9a;
    font-weight: 600;
    cursor: pointer;
  }
`;

const ReplyWrap = styled.div``;

const LoaderWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0 10px;
`;

const SubHeading = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 0 0 5px 0;
  font-weight: 700;
  color: #00c2ff;
`;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const UserMessage = ({
  postData,
  businessData,
  listView,
  setSelectedListId,
  setListClickedFromSearch,
  type,
  listDescriptionView,
  setListIndex,
  myFeedView,
  setMyFeedIndex,
}) => {
  const dispatch = useDispatch();
  const [displayComments, setDisplayComments] = useState(false);
  const loadingComments = useSelector(
    (state) => state.myFeed.loadingPostComments
  );
  const [description, setDescription] = useState("");
  const [displayCommentInput, setDisplayCommentInput] = useState(false);
  const [flag, setFlag] = useState(false);
  const [over, setOver] = useState(false)
  const user = useSelector((state) => state.user.user);
  const ws = useSelector((state) => state.user.ws);
  const commentsRef = useRef();
  const history = useHistory();
  const setSelectedPlace = useStore(state => state.setSelectedPlace)
  const selectedPlace = useStore(state => state.selectedPlace)
  const selectedPostId = useSelector(
    (state) => state.myFeed.selectedPostIdForComments
  );
  const commentAdded = useSelector((state) => state.myFeed.commentAdded);
  const [listImage, setListImage] = useState(
    myFeedView &&
      postData.listId &&
      postData.listId.length > 0 &&
      postData.listId[0].media.length > 0
      ? postData.listId[0].media[0].image
      : BannerImg
  );
  const [readMore, setReadMore] = useState(false);
  const listNavigate = () => {
    if (type === "search") {
      setSelectedListId(postData.listId[0]._id);
      setListClickedFromSearch(true);
    }
  };
  ws.onmessage = (evt) => {
    const message = JSON.parse(evt.data);
    dispatch(setCommentAdded());
    /** to add reply via socket */
    if (message.comment && message.commentId && message.type === "Post") {
      dispatch(addReplyToComment(message));
    } else if (message.commentInfo && message.commentType === "Post") {
      /** to add comment via socket */
      setDescription("");
      dispatch(addCommentToPost(message));
      dispatch(setPostId(message.commentInfo.itemId));
    } else if (message.like && message.commentId) {
      /** to add comment like via socket */
      dispatch(addLikeToCommentViaSocket(message));
    } else if (message.like && message.type === "Post") {
      /** to add post like via socket */
      if (message.like._id !== user._id) {
        dispatch(addLikeViaSocket(message));
      }
    } else if (message.like && message.commentId && message.type === "Event") {
      /** to add event comment like via socket */
      dispatch(addLikeToCommentViaSocket(message));
    } else if (message.like && message.type === "Event") {
      /** to add event like via socket */
      if (message.like._id !== user._id) {
        dispatch(addLikeViaSocket(message));
      }
    } else if (message.commentInfo && message.commentType === "Events") {
      /** to add event comment via socket */
      dispatch(setEventId(message.commentInfo.itemId));
      dispatch(addCommentToPost(message));
    } else if (
      message.comment &&
      message.commentId &&
      message.type === "Event"
    ) {
      /** to add event reply via socket */
      dispatch(addReplyToComment(message));
    } else if (message.post) {
      /** to add post via socket */
      if (user.listFollowed.indexOf(message.post.postDetails.listId._id)) {
        dispatch(addPostViaSocket(message));
      }
    }
  };

  /** to add comment function */
  const addComment = async (obj) => {
    ws.send(
      JSON.stringify({
        action: "comment",
        postId: obj.itemId,
        type: "Post",
        comment: obj.body,
        userId: obj.userId,
        businessId: businessData._id,
        taggedUsers: obj.taggedUsers,
      })
    );
  };


  useEffect(() => {
    if (postData) {
      if (postData.listId) {
        console.log("post data " + postData._id + " " + JSON.stringify(postData.listId[0].name))
      } else {
        console.log(postData)
      }
    }
  }, [postData])
  /** to scroll to bottom of comments */
  useEffect(() => {
    if (
      ((displayCommentInput || displayComments) &&
        !loadingComments &&
        postData._id === selectedPostId) ||
      (commentAdded && postData._id === selectedPostId)
    ) {
      commentsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [
    displayComments,
    displayCommentInput,
    loadingComments,
    postData._id,
    selectedPostId,
    commentAdded,
  ]);

  /** to highlight the user mentions mentioned in post description */
  const findDesc = (value, mentions, mentionsList) => {
    let divContent = value;
    if (mentions.length > 0 && mentionsList.length > 0) {
      let arr = [],
        data;
      for (let i = 0; i < mentions.length; i++) {
        if (value.includes("@" + mentions[i].name)) {
          arr.push({
            name: "@" + mentions[i].name,
            id: mentions[i]._id,
            type: "name",
          });
        }
      }
      for (let i = 0; i < mentionsList.length; i++) {
        if (value.includes("@" + mentionsList[i].name)) {
          arr.push({
            name: "@" + mentionsList[i].name,
            id: mentionsList[i]._id,
            type: "list",
          });
        }
      }
      for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
          if (arr[i].type === "list")
            data = reactStringReplace(value, arr[i].name, (match, j) => (
              <span
                key={"key1" + j}
                className="mentionData"
                onClick={() => setSelectedListId(arr[i].id)}
              >
                {match}
              </span>
            ));
          else
            data = reactStringReplace(value, arr[i].name, (match, j) => (
              <span
                key={"key2" + j}
                className="mentionData"
                onClick={() => history.push(`/u/${arr[i].id}`)}
              >
                {match}
              </span>
            ));
        } else {
          if (arr[i].type === "list")
            data = reactStringReplace(data, arr[i].name, (match, j) => (
              <span
                key={"key3" + j}
                className="mentionData"
                onClick={() => setSelectedListId(arr[i].id)}
              >
                {match}
              </span>
            ));
          else
            data = reactStringReplace(data, arr[i].name, (match, j) => (
              <span
                key={j}
                className="mentionData"
                onClick={() => history.push(`/u/${arr[i].id}`)}
              >
                {match}
              </span>
            ));
        }
      }
      return data;
    } else if (mentions.length > 0) {
      for (let i = 0; i < mentions.length; i++) {
        if (value.search(new RegExp("@" + mentions[i].name, "g") !== -1)) {
          return (
            <div>
              {reactStringReplace(value, "@" + mentions[i].name, (match, j) => (
                <span
                  className="mentionData"
                  onClick={() => history.push(`/u/${mentions[i]._id}`)}
                  key={"mentions" + j}
                >
                  {match}
                </span>
              ))}
            </div>
          );
        } else {
          return <div>{value}</div>;
        }
      }
    } else if (mentionsList.length > 0) {
      mentionsList.map((v) => {
        let re = new RegExp("@" + v.name, "g");
        divContent = divContent.replace(
          re,
          `<span className='mentionData'> ${"@" + v.name}  </span>`
        );
        return divContent;
      });
      if (mentionsList.length !== 0) {
        return (
          <>
            <div dangerouslySetInnerHTML={{ __html: divContent }}></div>
          </>
        );
      } else {
        return value;
      }
    } else {
      return value;
    }
  };

  /** to display user details */
  const displayUserDetails = () => {
    history.push(`/u/${postData.ownerId[0]._id}`);
  };

  const handleHover = () => {
    // console.log("hover " + businessData.company_name)
    setSelectedPlace(postData)
  }

  const handleLeave = () => {
    // console.log("leave" + businessData.company_name)
    //delay, if selectedPlace is not the same as postData, then cancel. If it is, then set to null
    setSelectedPlace(null)
  }


  return (
    <>
      <UserMsgWrap
        // onMouseOver={handleHover}
        // onMouseOut={handleLeave}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <UserMessageContent>
          <ProfileNameHeader
            className={
              listDescriptionView || myFeedView ? "UserMessageView" : ""
            }
          >
            <ProfileNameWrap className="UserMessageViewProfileName">
              {/* {myFeedView && ( */}
                <>
                  <TopListHeader>
                    <LeftListHeader>
                    {myFeedView && (
                      <>
                      <InnerListBanner onClick={() => listNavigate()}>
                        <img
                          src={listImage}
                          alt=""
                          onError={() => setListImage(BannerImg)}
                        />
                      </InnerListBanner>
                      <ListNameWrap>
                        <ListName>{postData.listId[0].name}</ListName>
                        <ListInfo>
                          <FaCaretRight />
                          <ListAuthorName onClick={() => displayUserDetails()}>
                            {postData.ownerId[0].name}
                          </ListAuthorName>
                          <span>|</span>
                          <ListAuthorName>
                            {moment(postData.createdAt).format(
                              "MMM DD, YYYY, hh:MMa"
                            )}{" "}
                            EDT{" "}
                          </ListAuthorName>
                        </ListInfo>
                      </ListNameWrap>
                      </>)}
                    </LeftListHeader>
                    <RightBuisinessName>
                      <BuisinessName>{businessData.company_name}</BuisinessName>
                      <div className="hex">
                        <div className="hex-background">
                          <img src={businessData.default_image_url} />
                        </div>
                      </div>
                    </RightBuisinessName>
                  </TopListHeader>
                </>
              {/* )} */}
              {postData.title && <SubHeading>{postData.title}</SubHeading>}

              <ChatInput>
                {findDesc(
                  postData.data.length > 225 && !readMore
                    ? postData.data.substring(0, 225)
                    : postData.data,
                  postData.taggedUsers || [],
                  postData.taggedLists || []
                )}
                {!readMore && postData.data.length > 225 && <b>...</b>}
              </ChatInput>
              {postData.eventSchedule && (
                <>
                  {" "}
                  <DateBar
                    startDay={
                      days[new Date(postData.eventSchedule.start_time).getDay()]
                    }
                    endDay={
                      days[new Date(postData.eventSchedule.end_time).getDay()]
                    }
                  />
                  <TimeBar
                    startTime={new Date(postData.eventSchedule.start_time)}
                    endTime={new Date(postData.eventSchedule.end_time)}
                  />
                </>
              )}

              {!readMore && (
                <ImgThumbWrap>
                  {postData.media.map((src) => (
                    <img src={src} />
                  ))}
                </ImgThumbWrap>
              )}
              {(listDescriptionView || myFeedView) &&
                readMore &&
                postData.media.length >= 1 && (
                  <ImageSlider imgSources={postData.media} />
                )}

              {!readMore && (
                <ShowMoreDiv
                 className="ListingShowMore"
                  onClick={() => {
                    console.log("expand view more")
                    // set detail true
                    setReadMore((prev) => !prev);
                  }}
                >
                  <span>
                    Show More <img src={ArrowSmDown} className="ArrowSm" />
                  </span>
                </ShowMoreDiv>
              )}
              {readMore && (
                <>
                  <ShowMoreDiv
                    onClick={() => {
                      console.log("expand view less")
                      // set detail false
                      setReadMore((prev) => !prev);
                    }}
                  >
                    <span>
                      Show Less <img src={ArrowSm} className="ArrowSm" />
                    </span>
                  </ShowMoreDiv>
                  <LikesBar
                    type="comment"
                    totalLikes={postData.likes ? postData.likes.length : 0}
                    totalComments={
                      postData.totalComments.length > 0
                        ? postData.totalComments[0].totalCount
                        : 0
                    }
                    date={new Date(postData.createdAt)}
                    setDisplayComments={setDisplayComments}
                    displayComments={displayComments}
                    postId={postData._id}
                    postLikes={postData.likes}
                    displayCommentInput={displayCommentInput}
                    setDisplayCommentInput={setDisplayCommentInput}
                    setFlag={setFlag}
                    flag={flag}
                    business={businessData}
                    commentsRef={commentsRef}
                    listDescriptionView={listDescriptionView}
                    listData={postData}
                    setListIndex={setListIndex}
                    myFeedView={myFeedView}
                    setMyFeedIndex={setMyFeedIndex}
                  />
                </>
              )}

              {/* {(listDescriptionView || myFeedView) &&
              readMore &&
              postData.media.length === 1 ? (
                <BigImage image={postData.media} />
              ) : null} */}
            </ProfileNameWrap>
          </ProfileNameHeader>
        </UserMessageContent>
        <Scrollbars
          autoHeight
          autoHeightMin={0}
          autoHeightMax={300}
          thumbMinSize={30}
          className="InnerScroll"
        >
          <ReplyWrap>
            {(displayComments || displayCommentInput) &&
            !loadingComments &&
            postData.comments.length > 0 ? (
              <>
                {postData.comments.map((i, key) => {
                  return (
                    <Comments
                      i={i}
                      key={key}
                      postData={postData}
                      displayComments={displayComments}
                      setFlag={setFlag}
                      flag={flag}
                      business={businessData}
                      listView={listView}
                    />
                  );
                })}

                {/* {flag === false ? <ScrollToBottom /> : null} */}
              </>
            ) : (displayComments || displayCommentInput) && loadingComments ? (
              <LoaderWrap>
                <ValueLoader />
              </LoaderWrap>
            ) : null}
            <div ref={commentsRef}></div>
          </ReplyWrap>
        </Scrollbars>
        {displayComments || displayCommentInput ? (
          <>
            <ReplyInput
              type="comment"
              postId={postData._id}
              displayComments={displayComments}
              description={description}
              setDescription={setDescription}
              addComment={addComment}
              commentsRef={commentsRef}
            />
          </>
        ) : null}
      </UserMsgWrap>
    </>
  );
};

export default UserMessage;
