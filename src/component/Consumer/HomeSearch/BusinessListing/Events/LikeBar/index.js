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
  type,
  totalLikes,
  totalComments,
}) => {
  const [eventDate, setEventDate] = useState();
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

  }, [date]);

  return (
    <>
      <BottomBarLikes>
        <LikesBtnWrap>
          {type !== "commentReply" ? (
            <UsersButton>
              {type === "comment" ? "Reply" : "Reply"}
            </UsersButton>
          ) : null}
          {type !== "commentReply" ? <CircleDot /> : null}
          {type !== "commentReply" ? (
            <UsersButton              
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
              {totalLikes}
            </RightDiv>
            <RightDiv>
              <MdChatBubbleOutline
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
