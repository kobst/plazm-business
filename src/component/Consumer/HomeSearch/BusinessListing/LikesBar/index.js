import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {
  MdFavoriteBorder,
  MdChatBubbleOutline,
  MdFavorite,
} from 'react-icons/md';
import {useDispatch, useSelector} from 'react-redux';
import {BsThreeDots} from 'react-icons/bs';
import {
  addLikeToPost,
  addLikeToComment,
  setTopPost,
} from '../../../../../reducers/businessReducer';
import {unwrapResult} from '@reduxjs/toolkit';
import {
  addLikeViaSocket,
  fetchSearchCommentReplies,
  fetchSearchPostComments,
  setPostId,
} from '../../../../../reducers/myFeedReducer';
import SaveButton from '../../../UI/SaveButton';
import ModalComponent from '../../../UI/Modal';
import DeletePostModal from '../../../AddPostModal/DeletePostModal';
import AddPostModal from '../../../AddPostModal';
import DropdwonArrowTop from '../../../../../images/top_arrow.png';
import {useHistory} from 'react-router';

const BottomBarLikes = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  @media (max-width: 767px) {
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
  margin: 0 0 0 10px;
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
    &.btnDisable {
      cursor: default;
    }
  }
`;

const DropdownContent = styled.div`
  display: flex;
  position: absolute;
  min-width: 102px;
  overflow: auto;
  background: #fe02b9;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.3);
  z-index: 1;
  top: 25px;
  width: 30px;
  overflow: visible;
  right: -5px;
  padding: 5px;
  :before {
    background: url(${DropdwonArrowTop}) no-repeat top center;
    width: 15px;
    height: 15px;
    content: " ";
    top: -12px;
    position: relative;
    margin: 0 auto;
    display: flex;
    text-align: center;
    left: 78px;
    @media (max-width: 767px) {
      left: 0;
    }
  }
  @media (max-width: 767px) {
    top: 31px;
    right: 0;
    left: -5px;
  }
  ul {
    list-style: none;
    margin: 0 0 0 -15px;
    padding: 0;
    width: 100%;
    text-align: right;
  }
  li {
    color: #fff;
    padding: 0px 5px;
    text-decoration: none;
    font-size: 12px;
  }
  li:hover {
    background-color: #fe02b9;
    cursor: pointer;
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
  business,
  listDescriptionView,
  listData,
  setListIndex,
  myFeedView,
  setMyFeedIndex,
}) => {
  const [eventDate, setEventDate] = useState();
  const [userLikedPost, setUserLikedPost] = useState(false);
  const [userLikedComment, setUserLikedComment] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeCountForComment, setLikeCountForComment] = useState(0);
  const [uploadMenu, setUploadMenu] = useState(false);
  const [addPostModal, setAddPostModal] = useState(false);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const ws = useSelector((state) => state.user.ws);
  const selectedListDetails = useSelector(
      (state) => state.myFeed.selectedListDetails,
  );
  const menuRef = useRef(null);
  const history = useHistory();

  /** to convert date into display format */
  useEffect(() => {
    setUserLikedComment(false);
    setUserLikedPost(false);
    setLikeCount(0);
    setLikeCountForComment(0);
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const day = date.getDate();

    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];

    const year = date.getFullYear();

    setEventDate(`${day} ${monthName} ${year}`);
    if (type === 'comment' && totalLikes > 0) {
      if (postLikes.length > 0) {
        const findUser = postLikes.find((i) => i === user._id);
        if (findUser) {
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
    if (type !== 'disabled') {
      setDisplayComments(!displayComments);
      if (type === 'comment') {
        setFlag(false);
        if (displayComments === false) {
          dispatch(setPostId(postId));
          dispatch(
              fetchSearchPostComments({
                postId: postId,
                businessId: business._id,
              }),
          );
        } else {
          dispatch(setPostId(null));
        }
      } else if (type === 'reply') {
        setFlag(true);
        dispatch(setPostId(postId));
        if (displayComments === false) {
          dispatch(
              fetchSearchCommentReplies({
                commentId: commentId,
                businessId: business._id,
              }),
          );
        }
      }
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
          addLikeViaSocket({
            postId: postId,
            like: {...obj, _id: user._id},
            businessId: business._id,
          }),
      );
      const data = await dispatch(addLikeToPost(obj));
      const response = await unwrapResult(data);
      if (response.success === true) {
        ws.send(
            JSON.stringify({
              action: 'like',
              postId: postId,
              like: response.like,
              businessId: business._id,
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
              businessId: business._id,
              type: 'Post',
            }),
        );
      }
    }
  };

  /** to display comments of the post on click of comment icon */
  const setReplyDisplay = () => {
    if (type === 'reply') {
      dispatch(setPostId(postId));
      setDisplayComments(!displayComments);
      setFlag(true);
      if (displayComments === false) {
        dispatch(
            fetchSearchCommentReplies({
              commentId: commentId,
              businessId: business._id,
            }),
        );
      }
    } else if (type === 'comment') {
      setFlag(false);
      setDisplayComments(!displayComments);
      if (displayComments === false) {
        dispatch(setPostId(postId));
        dispatch(
            fetchSearchPostComments({postId: postId, businessId: business._id}),
        );
      } else {
        dispatch(setPostId(null));
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setUploadMenu(false);
    }
  };

  const toggleUploadMenu = () => {
    setUploadMenu(!uploadMenu);
  };

  /** to delete a post */
  const deletePost = () => {
    setDeletePostModal(true);
    setUploadMenu(false);
  };

  /** to edit a post */
  const editPost = () => {
    setAddPostModal(true);
    setUploadMenu(false);
  };

  /** to display business details page */
  const displayBusinessDetail = () => {
    if (listDescriptionView) {
      setListIndex(listData.business[0]._id);
      history.push(`/b/${listData.business[0]._id}`);
      dispatch(setTopPost(listData));
    } else if (myFeedView) {
      setMyFeedIndex(listData.business[0]._id);
      history.push(`/b/${listData.business[0]._id}`);
      dispatch(setTopPost(listData));
    }
  };
  return (
    <>
      <BottomBarLikes>
        {!listDescriptionView && !myFeedView ? (
          <LikesBtnWrap>
            {type !== 'commentReply' ? (
              <UsersButton onClick={() => setReplyDisplay()}>
                {type === 'comment' ? 'Comment' : 'Reply'}
              </UsersButton>
            ) : null}
            {type !== 'commentReply' ? <CircleDot /> : null}
            {type !== 'commentReply' ? (
              <UsersButton
                onClick={() => addLike()}
                disabled={userLikedPost || userLikedComment}
              >
                Like
              </UsersButton>
            ) : null}

            <ChatDate>
              <span>-</span>
              {eventDate}
            </ChatDate>
          </LikesBtnWrap>
        ) : null}
        {type !== 'commentReply' ? (
          <LikesBtnWrap>
            <RightDiv>
              {userLikedPost || userLikedComment ? (
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
            <RightDiv>
              <button
                disabled={
                  listDescriptionView ?
                    listDescriptionView :
                    myFeedView ?
                    myFeedView :
                    false
                }
                onClick={() => displayCommentsWithPosts()}
                className={
                  listDescriptionView || myFeedView ? 'btnDisable' : ''
                }
              >
                <MdChatBubbleOutline />
              </button>
              {totalComments}
            </RightDiv>
            {selectedListDetails &&
            selectedListDetails.ownerId._id === user._id &&
            !myFeedView ? (
              <RightDiv>
                <BsThreeDots onClick={toggleUploadMenu} />
                {uploadMenu && (
                  <DropdownContent>
                    <ul>
                      <li onClick={() => editPost()}>Edit</li>
                      <li onClick={() => deletePost()}>Delete</li>
                    </ul>
                  </DropdownContent>
                )}
              </RightDiv>
            ) : null}
          </LikesBtnWrap>
        ) : null}
        {listDescriptionView || myFeedView ? (
          <SaveButton onClick={() => displayBusinessDetail()}>VISIT</SaveButton>
        ) : null}
      </BottomBarLikes>
      {addPostModal && (
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={addPostModal}
          closeModal={() => setAddPostModal(false)}
        >
          <AddPostModal
            businessId={listData.business[0]._id}
            closeModal={() => setAddPostModal(false)}
            data={listData}
          />
        </ModalComponent>
      )}
      {deletePostModal && (
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={deletePostModal}
          closeModal={() => setDeletePostModal(false)}
        >
          <DeletePostModal
            closeModal={() => setDeletePostModal(false)}
            id={listData._id}
          />
        </ModalComponent>
      )}
    </>
  );
};

export default LikesBar;
