import React, {useState, useEffect} from 'react';
import {
  MdFavoriteBorder,
  MdChatBubbleOutline,
  MdFavorite,
} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchPostComments,
  addLikeToPost,
  addLikeToComment,
  addLikeViaSocket,
  fetchCommentReplies,
  setPostId,
} from '../../../../../../../reducers/businessReducer';
import {unwrapResult} from '@reduxjs/toolkit';
import styled from 'styled-components';

export const BottomBarLikes = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: rgba(177, 171, 234, 0.1);
    border: 0.75px solid #3f3777;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 8px 15px;
  @media (max-width: 767px) {
    align-items: flex-start;
  }
  &.replyBar {
    background: rgba(177, 171, 234, 0.1);
    border: 0.75px solid #3f3777;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 8px 15px;
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
  totalLikes,
  totalComments,
  date,
  setDisplayComments,
  displayComments,
  postId,
  type,
  postLikes,
  commentId,
  commentLikes,
  setFlag,
}) => {
  const [userLikedPost, setUserLikedPost] = useState(false);
  const [userLikedComment, setUserLikedComment] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeCountForComment, setLikeCountForComment] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const ws = useSelector((state) => state.user.ws);
  const business = useSelector((state) => state.business.business);

  /** to convert date into display format */
  useEffect(() => {
    setUserLikedComment(false);
    setUserLikedPost(false);
    setLikeCount(0);
    setLikeCountForComment(0);

    if (type === 'comment' && totalLikes > 0) {
      if (postLikes.length > 0) {
        const findUser = postLikes.find((i) => i._id === user._id);
        const findUserInId = postLikes.find((i) => i === user._id);
        if (findUser || findUserInId) {
          setUserLikedPost(true);
          setUserLikedComment(false);
        } else {
          setUserLikedPost(false);
        }
      }
    } else if (type === 'reply' && totalLikes > 0) {
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
  }, [date, commentLikes, postLikes, type, user._id, totalLikes]);

  /** to display comments or replies of the post */
  const displayCommentsWithPosts = () => {
    setDisplayComments(!displayComments);
    dispatch(setPostId(postId));
    if (type === 'comment') {
      setFlag(false);
      if (displayComments === false) dispatch(fetchPostComments(postId));
    } else if (type === 'reply') {
      setFlag(true);
      if (displayComments === false) dispatch(fetchCommentReplies(commentId));
    }
  };

  /** to add like to post or comments */
  const addLike = async () => {
    if (type === 'comment') {
      const obj = {
        postId: postId,
        userId: user._id,
      };
      dispatch(
          addLikeViaSocket({postId: postId, like: {...obj, _id: user._id}}),
      );
      const data = await dispatch(addLikeToPost(obj));
      const response = await unwrapResult(data);
      if (response.success === true) {
        ws.send(
            JSON.stringify({
              action: 'like',
              postId: postId,
              like: response.like,
              businessId: business[0]._id,
              type: 'Post',
            }),
        );
      } else {
        setUserLikedPost(false);
        setLikeCount(totalLikes - 1);
      }
    } else if (type === 'reply') {
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
              action: 'like',
              postId: response.postId,
              like: response.like,
              commentId: response.commentId,
              businessId: business[0]._id,
              type: 'Post',
            }),
        );
      }
    }
  };

  return (
    <>
      <BottomBarLikes className={type === 'reply' ? 'replyBar' : ''}>
        <LikesBtnWrap>
          {type !== 'commentReply' && (
            <RightDiv>
              {userLikedPost || userLikedComment ? (
                <MdFavorite style={{color: 'red'}} />
              ) : (
                <MdFavoriteBorder
                  onClick={() => addLike()}
                  disabled={userLikedPost || userLikedComment}
                />
              )}{' '}
              {likeCount === 0 ?
                likeCountForComment === 0 ?
                  totalLikes :
                  likeCountForComment :
                likeCount}
            </RightDiv>
          )}
          {type !== 'commentReply' && (
            <RightDiv>
              <button>
                <MdChatBubbleOutline
                  onClick={() => displayCommentsWithPosts()}
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
