import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa";
import moment from "moment";
import BannerImg from "../../../../../../../images/sliderimg.png";
import ReplyInput from "./ReplyInput";
import LikesBar from "../LikesBar";
import { useSelector, useDispatch } from "react-redux";
import ValueLoader from "../../../../../../../utils/loader";
import { Scrollbars } from "react-custom-scrollbars";
import {
  addCommentToPost,
  addReplyToComment,
  addPostViaSocket,
  addLikeViaSocket,
  addLikeToCommentViaSocket,
} from "../../../../../../../reducers/businessReducer";
import Comment from "./comments";
import ScrollToBottom from "./ScrollToBottom";
import { setWs } from "../../../../../../../reducers/userReducer";
import {
  FeedBigImage,
  FeedDescription,
  InnerListBanner,
  InnerOverlay,
  ListAuthorName,
  ListInfo,
  ListName,
  ListNameWrap,
} from "../../../../../FeedContent/styled";
import DateBar from "../../../EventsSection/PostChat/DateBar";
import TimeBar from "../../../EventsSection/PostChat/TimeBar";

import useStore from "../../../../../useState";

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
    padding: 10px 0 0 0px;
    @media (max-width: 767px) {
      padding: 10px 0 0 0px;
    }
  }
  .InnerScroll {
    overflow-x: hidden;
  }
`;

const UserMsgWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  :nth-child(even) {
    background-color: #282352;
  }
  :nth-child(odd) {
    background-color: #221e45;
  }
`;

const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0;
  margin: 15px 0;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const ProfileNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 100%;
  // border-bottom: 0.25px solid #878787;
  padding: 0 0px 15px 0px;
  width: 100%;
  @media (max-width: 1024px) {
    padding: 0 0px 15px 0px;
  }
  @media (max-width: 767px) {
    padding: 0 0px 15px 0px;
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
  margin: 30px 0 20px;
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

const UserMessage = ({ postData }) => {
  const dispatch = useDispatch();
  const [displayComments, setDisplayComments] = useState(false);
  const loadingComments = useSelector(
    (state) => state.business.loadingPostComments
  );
  const business = useSelector((state) => state.business.business)[0];
  const [description, setDescription] = useState("");
  const [displayCommentInput, setDisplayCommentInput] = useState(false);
  const [flag, setFlag] = useState(false);
  const filters = useSelector((state) => state.business.filters);
  const user = useSelector((state) => state.user.user);
  const ws = useSelector((state) => state.user.ws);
  const history = useHistory();
  const [listImage, setListImage] = useState(
    postData.postDetails.list.image
      ? postData.postDetails.list.image
      : BannerImg
  );

  const setSelectedListId = useStore((state) => state.setSelectedListId)


  ws.onmessage = (evt) => {
    const message = JSON.parse(evt.data);
    /** to add reply via socket */
    if (message.comment && message.commentId && message.type === "Post") {
      if (message.businessId === business._id) {
        dispatch(addReplyToComment(message));
      }
    } else if (message.commentInfo && message.commentType === "Post") {
      /** to add comment via socket */
      setDescription("");
      if (message.businessId === business._id) {
        dispatch(addCommentToPost(message));
      }
    } else if (message.post) {
      /** to add post via socket */
      if (message.businessId === business._id) {
        if (message.userId === user._id) {
          /** in posts by me the posts added in subscribed lists by the user to be displayed*/
          if (
            filters.PostsByMe === true &&
            (message.post.postDetails.list._id === null ||
              message.post.postDetails.list._id !== null) &&
            user.listFollowed.find(
              (i) => i === message.post.postDetails.list._id
            )
          ) {
            dispatch(addPostViaSocket(message));
          } else if (
            filters.MySubscriptions === true &&
            message.post.postDetails.list._id !== null
          ) {
            dispatch(addPostViaSocket(message));
          }
        } else {
          if (
            filters.PostsByMe === true &&
            (message.post.postDetails.list._id === null ||
              message.post.postDetails.list._id !== null) &&
            user.listFollowed.find(
              (i) => i === message.post.postDetails.list._id
            )
          ) {
            dispatch(addPostViaSocket(message));
          }
          if (filters.Others === true) {
            dispatch(addPostViaSocket(message));
          } else if (
            message.post.postDetails.type === "Business" &&
            filters.Business === true
          ) {
            dispatch(addPostViaSocket(message));
          }
        }
      }
    } else if (message.like && message.commentId) {
      /** to add comment like via socket */
      if (message.businessId === business._id) {
        dispatch(addLikeToCommentViaSocket(message));
      }
    } else if (message.like && message.type === "Post") {
      /** to add post like via socket */
      if (
        message.businessId === business._id &&
        message.like._id !== user._id
      ) {
        dispatch(addLikeViaSocket(message));
      }
    }
  };

  ws.onclose = () => {
    if (user) {
      const ws = new WebSocket(
        `${process.env.REACT_APP_WEBSOCKET}/?userId=${user._id}`
      );
      dispatch(setWs(ws));
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
        businessId: business._id,
        taggedUsers: obj.taggedUsers,
      })
    );
  };

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
                key={j}
                className="mentionData"
                onClick={() => setSelectedListId(arr[i].id)}
              >
                {match}
              </span>
            ));
          else
            data = reactStringReplace(value, arr[i].name, (match, j) => (
              <span
                key={j}
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
                key={j}
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
                  key={j}
                  className="mentionData"
                  onClick={() => history.push(`/u/${mentions[i]._id}`)}
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
      for (let i = 0; i < mentionsList.length; i++) {
        if (value.search(new RegExp("@" + mentionsList[i].name, "g") !== -1)) {
          return (
            <div>
              {reactStringReplace(
                value,
                "@" + mentionsList[i].name,
                (match, j) => (
                  <span
                    className="mentionData"
                    onClick={() => setSelectedListId(mentionsList[i]._id)}
                  >
                    {match}
                  </span>
                )
              )}
            </div>
          );
        } else {
          return <div>{value}</div>;
        }
      }
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
      return <div className="postData">{value}</div>;
    }
  };

  /** to display user details */
  const displayUserDetails = () => {
    history.push(`/u/${postData.postDetails.ownerId._id}`);
  };
  return (
    <>
      <UserMsgWrap>
        <UserMessageContent>
          <ProfileNameHeader>
            <ProfileNameWrap>
              {postData.postDetails.list._id !== null ? (
                <InnerListBanner>
                  <img
                    src={listImage}
                    alt=""
                    onError={() => setListImage(BannerImg)}
                  />
                  <InnerOverlay />
                  <ListNameWrap>
                    <ListName>{postData.postDetails.list.name}</ListName>
                    <ListInfo>
                      <FaCaretRight />
                      <ListAuthorName onClick={() => displayUserDetails()}>
                        {" "}
                        {postData.postDetails.ownerId.name}
                      </ListAuthorName>
                      <span>|</span>
                      <ListAuthorName>
                        Added on{" "}
                        {moment(postData.postDetails.createdAt).format(
                          "MMM DD,YYYY, hh:MM a"
                        )}{" "}
                        EDT{" "}
                      </ListAuthorName>
                    </ListInfo>
                  </ListNameWrap>
                </InnerListBanner>
              ) : null}
              {postData.postDetails.title && (
                <SubHeading>{postData.postDetails.title}</SubHeading>
              )}
              <FeedDescription>
                {findDesc(
                  postData.postDetails.data,
                  postData.postDetails.taggedUsers,
                  postData.postDetails.taggedLists
                )}
              </FeedDescription>
              {postData.postDetails.eventSchedule && (
                <>
                  {" "}
                  <DateBar
                    startDay={
                      days[
                        new Date(
                          postData.postDetails.eventSchedule.start_time
                        ).getDay()
                      ]
                    }
                    endDay={
                      days[
                        new Date(
                          postData.postDetails.eventSchedule.end_time
                        ).getDay()
                      ]
                    }
                  />
                  <TimeBar
                    startTime={
                      new Date(postData.postDetails.eventSchedule.start_time)
                    }
                    endTime={
                      new Date(postData.postDetails.eventSchedule.end_time)
                    }
                  />
                </>
              )}
              {postData.postDetails.media.length > 0 && (
                <FeedBigImage>
                  <img src={postData.postDetails.media[0]} alt="" />
                </FeedBigImage>
              )}
              <LikesBar
                type="comment"
                totalLikes={postData.totalLikes}
                totalComments={postData.totalComments}
                date={new Date(postData.postDetails.createdAt)}
                setDisplayComments={setDisplayComments}
                displayComments={displayComments}
                postId={postData.postId}
                postLikes={postData.postDetails.likes}
                displayCommentInput={displayCommentInput}
                setDisplayCommentInput={setDisplayCommentInput}
                setFlag={setFlag}
                flag={flag}
              />
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
                    <Comment
                      i={i}
                      key={key}
                      postData={postData}
                      displayComments={displayComments}
                      setFlag={setFlag}
                      flag={flag}
                    />
                  );
                })}
                {flag === false ? <ScrollToBottom /> : null}
              </>
            ) : (displayComments || displayCommentInput) && loadingComments ? (
              <LoaderWrap>
                <ValueLoader />
              </LoaderWrap>
            ) : null}
          </ReplyWrap>
        </Scrollbars>
        {displayComments || displayCommentInput ? (
          <>
            <ReplyInput
              type="comment"
              postId={postData.postId}
              displayComments={displayComments}
              description={description}
              setDescription={setDescription}
              addComment={addComment}
            />
          </>
        ) : null}
      </UserMsgWrap>
    </>
  );
};

export default UserMessage;
