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
  fetchEventComments,
} from "../../../../../../../reducers/eventReducer";
import { unwrapResult } from "@reduxjs/toolkit";
import { addLikeToComment } from "../../../../../../../reducers/businessReducer";

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
}) => {
  const [eventDate, setEventDate] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const business = useSelector((state) => state.business.business);
  const ws = useSelector((state) => state.user.ws);
  const [userLikedEvent, setUserLikedEvent] = useState(false);
  const [userLikedComment, setUserLikedComment] = useState(false);

  /** to convert date into display format */
  useEffect(() => {
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
        const findUser = postLikes.find((i) => i._id === user._id);
        if (findUser) {
          setUserLikedEvent(true);
        }
      }
    }
    else if (type === "reply") {
      if (commentLikes.length > 0) {
        const findUser = commentLikes.find((i) => i._id === user._id);
        if (findUser) {
          setUserLikedComment(true);
        }
      }
    }
  }, [date, commentLikes, postLikes, type, user._id]);

  const displayCommentsWithEvents = () => {
    if (type === "comment") {
      setDisplayEventComments(!displayEventComments);
      if (type === "comment") dispatch(fetchEventComments(eventId));
    } else if (type === "reply") {
      setDisplayReply(!displayReply);
    }
  };

  const addLike = async () => {
    if (type === "comment") {
      const obj = {
        eventId: eventId,
        userId: user._id,
      };
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
      <BottomBarLikes>
        <LikesBtnWrap>
          {type !== "commentReply" ? (
            <UsersButton>
              {type === "comment" ? "Comment" : "Reply"}
            </UsersButton>
          ) : null}
          {type !== "commentReply" ? <CircleDot /> : null}
          {type !== "commentReply" ? <UsersButton>Like</UsersButton> : null}
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
                <MdFavoriteBorder onClick={() => addLike()} />
              )}{" "}
              {totalLikes}
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
