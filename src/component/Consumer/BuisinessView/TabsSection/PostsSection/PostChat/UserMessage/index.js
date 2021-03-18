import React, { useState } from "react";
import styled from "styled-components";
import ProfileImg from "../../../../../../../images/profile-img.png";
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
`;

const ProfileThumb = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 10px 0 0;
  border: 3px solid #ffffff;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 30px;
    height: 30px;
  }
`;
const ProfileNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: calc(100% - 40px);
  border-bottom: 0.25px solid #878787;
  padding: 0 25px 15px 0px;
  width: 100%;
  @media (max-width: 1024px) {
    padding: 0 45px 15px 0px;
  }
`;

const ProfileName = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 7px 0 5px 0;
  font-weight: 700;
  color: #ff2e9a;
  span {
    font-weight: 700;
    color: #fff;
    margin: 0 3px;
  }
`;

const ChatInput = styled.div`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
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

  ws.onmessage = (evt) => {
    const message = JSON.parse(evt.data);
    /** to add reply via socket */
    if (message.comment && message.commentId && message.type === "Post") {
      if (message.businessId === business._id) {
        dispatch(addReplyToComment(message));
      }
    } else if (message.commentInfo && message.commentInfo.type === "Post") {
      /** to add comment via socket */
      setDescription("");
      if (message.businessId === business._id) {
        dispatch(addCommentToPost(message));
      }
    } else if (message.post) {
      /** to add post via socket */
      if (message.businessId === business._id) {
        if (message.userId === user._id) {
          if (filters.PostsByMe === true) {
            dispatch(addPostViaSocket(message));
          }
        } else {
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
      mentions.map((v) => {
        let re = new RegExp("@" + v.name, "g");
        divContent = divContent.replace(
          re,
          `<span className='mentionData' onClick={window.open("/u/${
            v._id
          }")}> ${"@" + v.name}  </span>`
        );
        return divContent;
      });
      mentionsList.map((v) => {
        let re = new RegExp("@" + v.name, "g");
        divContent = divContent.replace(
          re,
          `<span className='mentionData' onClick={window.open("/u/${
            v._id
          }")}> ${"@" + v.name}  </span>`
        );
        return divContent;
      });
      if (mentions.length !== 0) {
        return (
          <>
            <div dangerouslySetInnerHTML={{ __html: divContent }}></div>
          </>
        );
      } else {
        return value;
      }
    } else if (mentions.length > 0) {
      mentions.map((v) => {
        let re = new RegExp("@" + v.name, "g");
        divContent = divContent.replace(
          re,
          `<span className='mentionData' onClick={window.open("/u/${
            v._id
          }")}> ${"@" + v.name}  </span>`
        );
        return divContent;
      });
      if (mentions.length !== 0) {
        return (
          <>
            <div dangerouslySetInnerHTML={{ __html: divContent }}></div>
          </>
        );
      } else {
        return value;
      }
    } else if (mentionsList.length > 0) {
      mentionsList.map((v) => {
        let re = new RegExp("@" + v.name, "g");
        divContent = divContent.replace(
          re,
          `<span className='mentionData' onClick={window.open("/u/${
            v._id
          }")}> ${"@" + v.name}  </span>`
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
  return (
    <>
      <UserMsgWrap>
        <UserMessageContent>
          <ProfileNameHeader>
            <ProfileThumb>
              <img
                src={
                  postData.postDetails.ownerId === null
                    ? business.default_image_url
                    : postData.postDetails.ownerId.photo !== "" &&
                      postData.postDetails.ownerId.photo !== null
                    ? postData.postDetails.ownerId.photo
                    : ProfileImg
                }
                alt=""
              />
            </ProfileThumb>
            <ProfileNameWrap>
              <ProfileName>
                <span>by</span>
                {postData.postDetails.ownerId === null
                  ? business.company_name
                  : postData.postDetails.ownerId.name}{" "}
              </ProfileName>
              <ChatInput>
                <p>
                  {findDesc(
                    postData.postDetails.data,
                    postData.postDetails.taggedUsers,
                    postData.postDetails.taggedLists
                  )}
                </p>
              </ChatInput>
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
