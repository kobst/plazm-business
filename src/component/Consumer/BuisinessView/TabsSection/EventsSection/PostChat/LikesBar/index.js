import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  MdFavoriteBorder,
  MdChatBubbleOutline,
  MdFavorite,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  AddLikeToEvent,
  addLikeViaSocket,
  fetchCommentReplies,
  fetchEventComments,
} from "../../../../../../../reducers/eventReducer";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  addLikeToComment,
  setEventId,
} from "../../../../../../../reducers/businessReducer";

export const BottomBarLikes = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 767px) {
    align-items: flex-start;
  }
  &.replyBar {
    /* background: rgba(177, 171, 234, 0.1);
    border: 0.75px solid #3f3777; */
    box-sizing: border-box;
    border-radius: 5px;
    /* padding: 8px 15px; */
  }
  &.replyBarComment {
    /* background: rgba(177, 171, 234, 0.1);
    border: 0.75px solid #3f3777; */
    box-sizing: border-box;
    border-radius: 5px;
    /* padding: 8px 15px;
    margin: 10px 0; */
  }
`;

export const LikesBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0px;
  align-items: center;
  flex-wrap: wrap;
`;

export const RightDiv = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  align-items: center;
  display: flex;
  margin: 0 15px 0 0;
  position: relative;
  @media (max-width: 767px) {
    margin: 8px 15px 0 0px;
  }
  svg {
    margin: 0 7px 0 0;
  }
  svg:hover {
    cursor: pointer;
  }
  button {
    color: #767676;
    font-size: 13px;
    padding: 0;
    cursor: pointer;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    border: 0;
    background-color: transparent;
    display: flex;
  }
`;
const LikesBar = ({
  date,
  displayEventComments,
  setDisplayEventComments,
  type,
  eventId,
  totalLikes,
  totalComments,
  setDisplayReply,
  displayReply,
  postLikes,
  commentId,
  commentLikes,
  flag,
  setFlag,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const business = useSelector((state) => state.business.business);
  const ws = useSelector((state) => state.user.ws);
  const [userLikedEvent, setUserLikedEvent] = useState(false);
  const [userLikedComment, setUserLikedComment] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeCountForComment, setLikeCountForComment] = useState(0);
  /** to convert date into display format */
  useEffect(() => {
    setLikeCount(0);
    setLikeCountForComment(0);
    setUserLikedComment(false);
    setUserLikedEvent(false);

    if (type === "comment") {
      if (postLikes.length > 0) {
        const findUser = postLikes.find((i) => i._id === user._id);
        const findUserInId = postLikes.find((i) => i === user._id);
        if (findUser || findUserInId) {
          setUserLikedEvent(true);
        }
      }
    } else if (type === "reply") {
      if (commentLikes.length > 0) {
        const findUser = commentLikes.find((i) => i._id === user._id);
        if (findUser) {
          setUserLikedComment(true);
        }
      }
    }
  }, [date, commentLikes, postLikes, type, user._id]);

  /** to display comments on a particular event */
  const displayCommentsWithEvents = () => {
    dispatch(setEventId(eventId));
    if (type === "comment") {
      setDisplayEventComments(!displayEventComments);
      setFlag(false);
      if (displayEventComments === false) dispatch(fetchEventComments(eventId));
    } else if (type === "reply") {
      setDisplayReply(!displayReply);
      setFlag(true);
      if (displayReply === false) dispatch(fetchCommentReplies(commentId));
    }
  };

  /** to add like to post or comment */
  const addLike = async () => {
    if (type === "comment") {
      const obj = {
        eventId: eventId,
        userId: user._id,
      };
      dispatch(
        addLikeViaSocket({ postId: eventId, like: { ...obj, _id: user._id } })
      );
      const data = await dispatch(AddLikeToEvent(obj));
      const response = await unwrapResult(data);
      if (response.success === true) {
        ws.send(
          JSON.stringify({
            action: "like",
            postId: eventId,
            like: response.like,
            businessId: business[0]._id,
            type: "Event",
          })
        );
      }
    } else if (type === "reply") {
      setUserLikedComment(true);
      setLikeCountForComment(totalLikes + 1);
      const obj = {
        id: commentId,
        userId: user._id,
      };
      const data = await dispatch(addLikeToComment(obj));
      const response = await unwrapResult(data);
      if (response.success === true) {
        ws.send(
          JSON.stringify({
            action: "like",
            postId: response.postId,
            like: response.like,
            commentId: response.commentId,
            businessId: business[0]._id,
            type: "Event",
          })
        );
      }
    }
  };
  return (
    <>
      <BottomBarLikes
        className={
          type === "reply"
            ? "replyBar"
            : type !== "commentReply"
            ? "replyBarComment"
            : ""
        }
      >
        <LikesBtnWrap>
          {type !== "commentReply" && (
            <RightDiv>
              {userLikedEvent || userLikedComment ? (
                <MdFavorite style={{ color: "red" }} />
              ) : (
                <MdFavoriteBorder
                  onClick={() => addLike()}
                  disabled={userLikedEvent || userLikedComment}
                />
              )}{" "}
              {likeCount === 0
                ? likeCountForComment === 0
                  ? totalLikes
                  : likeCountForComment
                : likeCount}
            </RightDiv>
          )}
          {type !== "commentReply" && (
            <RightDiv>
              <button>
                <MdChatBubbleOutline
                  onClick={() => displayCommentsWithEvents()}
                />
              </button>
              {totalComments}
            </RightDiv>
          )}
        </LikesBtnWrap>
      </BottomBarLikes>
    </>
  );
};

export default LikesBar;
