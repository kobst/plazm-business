import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {
  MdFavoriteBorder,
  MdChatBubbleOutline,
  MdFavorite,
} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
import SaveButton from '../../../../UI/SaveButton';
import {useHistory} from 'react-router';
import {setTopEvent} from '../../../../../../reducers/eventReducer';

export const BottomBarLikes = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  &.replyBarComment {
    background: rgba(177, 171, 234, 0.1);
    border: 0.75px solid #3f3777;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 8px 15px;
    margin: 10px 0;
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
    cursor: default;
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
  type,
  totalLikes,
  totalComments,
  postLikes,
  commentLikes,
  setSearchIndex,
  myFeedView,
  eventData,
}) => {
  const user = useSelector((state) => state.user.user);
  const [userLikedEvent, setUserLikedEvent] = useState(false);
  const [userLikedComment, setUserLikedComment] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeCountForComment, setLikeCountForComment] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  /** to convert date into display format */
  useEffect(() => {
    setLikeCount(0);
    setLikeCountForComment(0);
    setUserLikedComment(false);
    setUserLikedEvent(false);

    if (type === 'comment') {
      if (postLikes.length > 0) {
        const findUser = postLikes.find((i) => i === user._id);
        if (findUser) {
          setUserLikedEvent(true);
        }
      }
    } else if (type === 'reply') {
      if (commentLikes.length > 0) {
        const findUser = commentLikes.find((i) => i._id === user._id);
        if (findUser) {
          setUserLikedComment(true);
        }
      }
    }
  }, [date, commentLikes, postLikes, type, user._id]);

  /** to display business details page */
  const displayBusinessDetail = () => {
    if (myFeedView) {
      setSearchIndex(eventData._id);
      history.push(`/b/${eventData.business[0]._id}`);
      dispatch(setTopEvent(eventData));
    }
  };

  return (
    <>
      <BottomBarLikes
        className={
          type === 'reply' ?
            'replyBar' :
            type !== 'commentReply' ?
            'replyBarComment' :
            ''
        }
      >
        <LikesBtnWrap>
          {type !== 'commentReply' && (
            <RightDiv>
              {userLikedEvent || userLikedComment ? (
                <MdFavorite style={{color: 'red'}} />
              ) : (
                <MdFavoriteBorder />
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
                <MdChatBubbleOutline />
              </button>
              {totalComments}
            </RightDiv>
          )}
        </LikesBtnWrap>
        <SaveButton onClick={() => displayBusinessDetail()}>VISIT</SaveButton>
      </BottomBarLikes>
    </>
  );
};

export default LikesBar;
