import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  MdFavoriteBorder,
  MdChatBubbleOutline,
  MdFavorite,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AddLikeToEvent } from "../../../../../../reducers/eventReducer";
import { unwrapResult } from "@reduxjs/toolkit";
import { addLikeToComment } from "../../../../../../reducers/businessReducer";
import {
  fetchEventCommentReplies,
  fetchEventComments,
  addLikeViaSocket,
  setEventId,
} from "../../../../../../reducers/myFeedReducer";

const BottomBarLikes = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const LikesBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0px;
  align-items: center;
  flex-wrap: wrap;
`;

const UsersButton = styled.button`
  font-weight: 600;
  font-size: 13px;
  line-height: normal;
  text-align: center;
  color: #ff2e9a;
  background: transparent;
  width: auto;
  border: 0;
  padding: 0px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 0;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    background: transparent;
  }
`;

const CircleDot = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  margin: 0 5px;
  background: #ff2e9a;
`;
const ChatDate = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  span {
    margin: 0 10px;
  }
`;

const RightDiv = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  align-items: center;
  display: flex;
  margin: 0 0 0 20px;
  @media (max-width: 767px) {
    margin: 8px 15px 0 0px;
  }
  svg {
    margin: 0 7px 0 0;
  }
`;

const LikesBar = ({
  date,
  type,
  totalLikes,
  totalComments,
  displayEventComments,
  setDisplayEventComments,
  eventId,
  setDisplayReply,
  displayReply,
  postLikes,
  commentId,
  commentLikes,
  flag,
  setFlag,
  business,
  commentsRef,
}) => {
  const [eventDate, setEventDate] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
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
    let monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let day = date.getDate();

    let monthIndex = date.getMonth();
    let monthName = monthNames[monthIndex];

    let year = date.getFullYear();

    setEventDate(`${day} ${monthName} ${year}`);

    if (type === "comment") {
      if (postLikes.length > 0) {
        const findUser = postLikes.find((i) => i === user._id);
        if (findUser) {
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
    if (type === "comment") {
      setDisplayEventComments(!displayEventComments);
      setFlag(false);
      if (displayEventComments === false) {
        dispatch(setEventId(eventId));
        dispatch(
          fetchEventComments({ eventId: eventId, businessId: business._id })
        );
      } else {
        dispatch(setEventId(null));
      }
    } else if (type === "reply") {
      setDisplayReply(!displayReply);
      setFlag(true);
      if (displayReply === false)
        dispatch(
          fetchEventCommentReplies({
            commentId: commentId,
            businessId: business._id,
          })
        );
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
        addLikeViaSocket({
          postId: eventId,
          like: { ...obj, _id: user._id },
          businessId: business._id,
        })
      );
      const data = await dispatch(AddLikeToEvent(obj));
      const response = await unwrapResult(data);
      if (response.success === true) {
        ws.send(
          JSON.stringify({
            action: "like",
            postId: eventId,
            like: response.like,
            businessId: business._id,
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
            businessId: business._id,
            type: "Event",
          })
        );
      }
    }
  };

  /** to display comments of a particular event */
  const displayComments = () => {
    if (type === "comment") {
      setDisplayEventComments(!displayEventComments);
      setFlag(false);
      if (displayEventComments === false) {
        dispatch(setEventId(eventId));
        dispatch(
          fetchEventComments({ eventId: eventId, businessId: business._id })
        );
      } else {
        dispatch(setEventId(null));
      }
    } else if (type === "reply") {
      setFlag(true);
      setDisplayReply(!displayReply);
      if (displayReply === false)
        dispatch(
          fetchEventCommentReplies({
            commentId: commentId,
            businessId: business._id,
          })
        );
    }
  };

  return (
    <>
      <BottomBarLikes>
        <LikesBtnWrap>
          {type !== "commentReply" ? (
            <UsersButton onClick={() => displayComments()}>
              {type === "comment" ? "Reply" : "Reply"}
            </UsersButton>
          ) : null}
          {type !== "commentReply" ? <CircleDot /> : null}
          {type !== "commentReply" ? (
            <UsersButton
              onClick={() => addLike()}
              disabled={userLikedEvent || userLikedComment}
            >
              Like
            </UsersButton>
          ) : null}
          <ChatDate>
            <span>-</span>
            {eventDate}
          </ChatDate>
        </LikesBtnWrap>
        {type !== "commentReply" ? (
          <LikesBtnWrap>
            <RightDiv>
              {userLikedEvent || userLikedComment ? (
                <MdFavorite style={{ color: "red" }} />
              ) : (
                <MdFavoriteBorder />
              )}{" "}
              {likeCount === 0
                ? likeCountForComment === 0
                  ? totalLikes
                  : likeCountForComment
                : likeCount}
            </RightDiv>
            <RightDiv>
              <MdChatBubbleOutline
                onClick={() => displayCommentsWithEvents()}
              />{" "}
              {totalComments}
            </RightDiv>
          </LikesBtnWrap>
        ) : null}
      </BottomBarLikes>
    </>
  );
};

export default LikesBar;