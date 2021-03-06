import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  MdFavoriteBorder,
  MdChatBubbleOutline,
  MdFavorite,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostComments,
  AddLikeToPost,
  addLikeToComment,
} from "../../../../../../../reducers/businessReducer";
import { unwrapResult } from "@reduxjs/toolkit";

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
  svg: hover {
    cursor: pointer
  }
`;

const LikesBar = ({
  totalLikes,
  totalComments,
  date,
  setDisplayComments,
  displayComments,
  postId,
  type,
  name,
  postLikes,
  commentId,
  commentLikes,
  displayReplyInput,
  setDisplayReplyInput,
  displayCommentInput,
  setDisplayCommentInput,
}) => {
  const [eventDate, setEventDate] = useState();
  const [userLikedPost, setUserLikedPost] = useState(false);
  const [userLikedComment, setUserLikedComment] = useState(false);
  const [likeCount, setLikeCount] = useState(0)
  const [likeCountForComment, setLikeCountForComment] = useState(0)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const ws = useSelector((state) => state.user.ws);
  const business = useSelector((state) => state.business.business);

  /** to convert date into display format */
  useEffect(() => {
    setUserLikedComment(false);
    setUserLikedPost(false);
    setLikeCount(0)
    setLikeCountForComment(0)
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

    if (type === "comment" && totalLikes>0) {
      if (postLikes.length > 0) {
        const findUser = postLikes.find((i) => i._id === user._id);
        if (findUser) {
          setUserLikedPost(true);
          setUserLikedComment(false);
        } else {
          setUserLikedPost(false);
        }
      }
    } else if (type === "reply" && totalLikes>0) {
      if (commentLikes.length > 0) {
        const findUser = commentLikes.find((i) => i._id === user._id);
        if (findUser) {
          setUserLikedComment(true);
          setUserLikedPost(false);
        } else {
          setUserLikedComment(false);
        }
      }
    }
  }, [date,commentLikes,postLikes,type,user._id, totalLikes]);

  const displayCommentsWithPosts = () => {
    setDisplayComments(!displayComments);
    if (type === "comment") {
      if(displayCommentInput === false)
      dispatch(fetchPostComments(postId));
    }
  };

  const addLike = async () => {
    if (type === "comment") {
      setUserLikedPost(true);
      setLikeCount(totalLikes+1)
      const obj = {
        postId: postId,
        userId: user._id,
      };
      const data = await dispatch(AddLikeToPost(obj));
      const response = await unwrapResult(data);
      if (response.success === true) {
        ws.send(
          JSON.stringify({
            action: "like",
            postId: postId,
            like: response.like,
            businessId: business[0]._id,
            type: "Post"
          })
        );
      } else {
        setUserLikedPost(false);
        setLikeCount(totalLikes-1)
      }
    } else if (type === "reply") {
      setUserLikedComment(true)
      setLikeCountForComment(totalLikes+1)
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
            type: "Post"
          })
        );
      } else {
        setUserLikedComment(false)
        setLikeCountForComment(totalLikes-1)
      }
    }
  };

  const setReplyDisplay = () => {
    if(type === "reply")
    setDisplayReplyInput(!displayReplyInput);
    else if(type === "comment")  {
    setDisplayCommentInput(!displayCommentInput);
    if(displayComments === false)
    dispatch(fetchPostComments(postId));
    }
  };
  return (
    <>
      <BottomBarLikes>
        <LikesBtnWrap>
          {type !== "commentReply" ? (
            <UsersButton onClick={() => setReplyDisplay()}>{type==="comment"?"Comment":"Reply"}</UsersButton>
          ) : null}
          {type !== "commentReply" ? <CircleDot /> : null}
          {type !== "commentReply" ? <UsersButton onClick={() => addLike()} disabled={userLikedPost || userLikedComment}>Like</UsersButton> : null}

          <ChatDate>
            <span>-</span>
            {eventDate}
          </ChatDate>
        </LikesBtnWrap>
        {type !== "commentReply" ? (
          <LikesBtnWrap>
            <RightDiv>
              {userLikedPost || userLikedComment ? (
                <MdFavorite style={{ color: "red" }} />
              ) : (
                <MdFavoriteBorder/>
              )}{" "}
              {likeCount === 0? likeCountForComment ===0 ?  totalLikes : likeCountForComment : likeCount}
            </RightDiv>
            <RightDiv>
              <MdChatBubbleOutline onClick={() => displayCommentsWithPosts()} />{" "}
              {totalComments}
            </RightDiv>
          </LikesBtnWrap>
        ) : null}
      </BottomBarLikes>
    </>
  );
};

export default LikesBar;
