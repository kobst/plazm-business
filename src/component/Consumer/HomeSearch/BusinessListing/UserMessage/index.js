import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { useSelector, useDispatch } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { RiArrowDropRightFill } from "react-icons/ri";
import ValueLoader from "../../../../../utils/loader";
import ReplyInput from "./ReplyInput";
import Comments from "./Comments";
import ProfileImg from "../../../../../images/profile-img.png";
import LikesBar from "../LikesBar";
import {
  addLikeViaSocket,
  addLikeToCommentViaSocket,
  addCommentToPost,
  addReplyToComment,
  addPostViaSocket,
  setCommentAdded,
  setPostId,
  setEventId,
} from "../../../../../reducers/myFeedReducer";
import { checkMime, replaceBucket } from "../../../../../utilities/checkResizedImage";
import { useHistory } from "react-router-dom";

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
    padding: 10px 0 0 40px;
  }
  .InnerScroll {
    overflow-x: hidden;
  }
`;
const UserMsgWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  // :nth-child(even) {
  //   background-color: #282352;
  // }
  // :nth-child(odd) {
  //   background-color: #221e45;
  // }
`;

const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0;
  margin: 15px 0;
  padding-left: 40px;
  &:before {
    content: "";
    position: absolute;
    left: 26px;
    background: #878787;
    width: 10px;
    height: 1px;
    top: 30px;
  }
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
  padding: 0 25px 0 0px;
  width: 100%;
  @media (max-width: 1024px) {
    padding: 0 45px 0 0px;
  }
`;

const ProfileName = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 0;
  font-weight: 700;
  color: #ff2e9a;
  display: flex;
  flex-direction: row;
  span {
    font-weight: 700;
    color: #fff;
    margin: 0 3px;
  }
  .ownerId-name {
    margin: 0px;
    color: #ff2e9a;
    font-weight: 700;
    cursor: pointer;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
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

const RightArrowSec = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: 767px) {
    margin: 5px 0 0 0;
  }
`;

const ArrowRight = styled.div`
  margin: -3px 10px 0;
  @media (max-width: 1024px) {
    margin: -3px 0 0 -7px;
  }
  svg {
    color: #fff;
    font-size: 24px;
  }
`;

const DescriptionBox = styled.div`
  font-weight: bold;
  font-size: 10px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  background: #ff2e9a;
  border-radius: 12px;
  padding: 2px 10px;
  max-width: 190px;
  cursor: pointer;
  span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
    font-weight: bold;
    font-size: 10px;
  }
`;

const UserMessage = ({
  postData,
  businessData,
  listView,
  setSelectedListId,
  setListClickedFromSearch,
  type,
}) => {
  const dispatch = useDispatch();
  const [displayComments, setDisplayComments] = useState(false);
  const loadingComments = useSelector(
    (state) => state.myFeed.loadingPostComments
  );
  const [description, setDescription] = useState("");
  const [displayCommentInput, setDisplayCommentInput] = useState(false);
  const [flag, setFlag] = useState(false);
  const [image, setImage] = useState(null);
  const user = useSelector((state) => state.user.user);
  const ws = useSelector((state) => state.user.ws);
  const commentsRef = useRef();
  const history = useHistory();
  const selectedPostId = useSelector(
    (state) => state.myFeed.selectedPostIdForComments
  );
  const commentAdded = useSelector((state) => state.myFeed.commentAdded);

  const listNavigate = () => {
    if (type === "search") {
      setSelectedListId(postData.listId[0]._id);
      setListClickedFromSearch(true);
    }
  };
  ws.onmessage = (evt) => {
    const message = JSON.parse(evt.data);
    dispatch(setCommentAdded());
    /** to add reply via socket */
    if (message.comment && message.commentId && message.type === "Post") {
      dispatch(addReplyToComment(message));
    } else if (message.commentInfo && message.commentInfo.type === "Post") {
      /** to add comment via socket */
      setDescription("");
      dispatch(addCommentToPost(message));
      dispatch(setPostId(message.commentInfo.itemId));
    } else if (message.like && message.commentId) {
      /** to add comment like via socket */
      dispatch(addLikeToCommentViaSocket(message));
    } else if (message.like && message.type === "Post") {
      /** to add post like via socket */
      if (message.like._id !== user._id) {
        dispatch(addLikeViaSocket(message));
      }
    } else if (message.like && message.commentId && message.type === "Event") {
      /** to add event comment like via socket */
      dispatch(addLikeToCommentViaSocket(message));
    } else if (message.like && message.type === "Event") {
      /** to add event like via socket */
      if (message.like._id !== user._id) {
        dispatch(addLikeViaSocket(message));
      }
    } else if (message.commentInfo && message.commentInfo.type === "Events") {
      /** to add event comment via socket */
      dispatch(setEventId(message.commentInfo.itemId));
      dispatch(addCommentToPost(message));
    } else if (
      message.comment &&
      message.commentId &&
      message.type === "Event"
    ) {
      /** to add event reply via socket */
      dispatch(addReplyToComment(message));
    } else if (message.post) {
      /** to add post via socket */
      if (
        user.favorites.indexOf(message.businessId) !== -1 ||
        user.listFollowed.indexOf(message.post.postDetails.listId._id)
      ) {
        dispatch(addPostViaSocket(message));
      }
    }
  };

  /** to find resized image */
  useEffect(() => {
    if (postData.ownerId === null || postData.ownerId.length === 0) {
      const findMime = checkMime(businessData.default_image_url);
      const image = replaceBucket(
        businessData.default_image_url,
        findMime,
        30,
        30
      );
      setImage(image);
    } else if (
      postData.ownerId[0].photo !== "" &&
      postData.ownerId[0].photo !== null
    ) {
      const findMime = checkMime(postData.ownerId[0].photo);
      const image = replaceBucket(postData.ownerId[0].photo, findMime, 30, 30);
      setImage(image);
    } else setImage(ProfileImg);
  }, [postData, businessData.default_image_url]);

  /** to add comment function */
  const addComment = async (obj) => {
    ws.send(
      JSON.stringify({
        action: "comment",
        postId: obj.itemId,
        type: "Post",
        comment: obj.body,
        userId: obj.userId,
        businessId: businessData._id,
        taggedUsers: obj.taggedUsers,
      })
    );
  };

  /** to scroll to bottom of comments */
  useEffect(() => {
    if (
      ((displayCommentInput || displayComments) &&
        !loadingComments &&
        postData._id === selectedPostId) ||
      (commentAdded && postData._id === selectedPostId)
    ) {
      commentsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [
    displayComments,
    displayCommentInput,
    loadingComments,
    postData._id,
    selectedPostId,
    commentAdded,
  ]);

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
                  className="mentionData"
                  onClick={() => history.push(`/u/${mentions[i]._id}`)}
                >
                  {match}
                </span>
              ))}
            </div>
          );
        } else {
          return <div>{value}</div>
        }
      }
    } else if (mentionsList.length > 0) {
      mentionsList.map((v) => {
        let re = new RegExp("@" + v.name, "g");
        divContent = divContent.replace(
          re,
          `<span className='mentionData'> ${"@" + v.name}  </span>`
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

  /** to check image error */
  const checkError = () => {
    if (postData.ownerId === null || postData.ownerId.length === 0) {
      setImage(businessData.default_image_url);
    } else if (
      postData.ownerId[0].photo !== "" &&
      postData.ownerId[0].photo !== null
    ) {
      setImage(postData.ownerId[0].photo);
    } else setImage(ProfileImg);
  };

  return (
    <>
      <UserMsgWrap>
        <UserMessageContent>
          <ProfileNameHeader>
            <ProfileThumb>
              <img src={image} onError={() => checkError()} alt="" />
            </ProfileThumb>
            <ProfileNameWrap>
              <ProfileName>
                {postData.ownerId === null || postData.ownerId.length === 0 ? (
                  businessData.company_name
                ) : (
                  <span
                    className="ownerId-name"
                    onClick={() =>
                      history.push(`/u/${postData.ownerId[0]._id}`)
                    }
                  >
                    {postData.ownerId[0].name}
                  </span>
                )}
                {postData.listId !== null && postData.listId.length !== 0 ? (
                  <RightArrowSec>
                    <ArrowRight>
                      <RiArrowDropRightFill />
                    </ArrowRight>
                    <DescriptionBox>
                      <div
                        data-for="custom-class"
                        data-tip={postData.listId[0].name}
                        onClick={() => listNavigate()}
                      >
                        <span>{postData.listId[0].name}</span>
                      </div>
                      <ReactTooltip
                        id="custom-class"
                        className="extraClass"
                        effect="solid"
                        backgroundColor="#ff2e9a"
                        textColor="white"
                      />
                    </DescriptionBox>
                  </RightArrowSec>
                ) : null}
              </ProfileName>
              <ChatInput>
                {findDesc(
                  postData.data,
                  postData.taggedUsers || [],
                  postData.taggedLists || []
                )}
              </ChatInput>
              <LikesBar
                type="comment"
                totalLikes={postData.likes ? postData.likes.length : 0}
                totalComments={
                  postData.totalComments.length > 0
                    ? postData.totalComments[0].totalCount
                    : 0
                }
                date={new Date(postData.createdAt)}
                setDisplayComments={setDisplayComments}
                displayComments={displayComments}
                postId={postData._id}
                postLikes={postData.likes}
                displayCommentInput={displayCommentInput}
                setDisplayCommentInput={setDisplayCommentInput}
                setFlag={setFlag}
                flag={flag}
                business={businessData}
                commentsRef={commentsRef}
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
                    <Comments
                      i={i}
                      key={key}
                      postData={postData}
                      displayComments={displayComments}
                      setFlag={setFlag}
                      flag={flag}
                      business={businessData}
                      listView={listView}
                    />
                  );
                })}

                {/* {flag === false ? <ScrollToBottom /> : null} */}
              </>
            ) : (displayComments || displayCommentInput) && loadingComments ? (
              <LoaderWrap>
                <ValueLoader />
              </LoaderWrap>
            ) : null}
            <div ref={commentsRef}></div>
          </ReplyWrap>
        </Scrollbars>
        {displayComments || displayCommentInput ? (
          <>
            <ReplyInput
              type="comment"
              postId={postData._id}
              displayComments={displayComments}
              description={description}
              setDescription={setDescription}
              addComment={addComment}
              commentsRef={commentsRef}
            />
          </>
        ) : null}
      </UserMsgWrap>
    </>
  );
};

export default UserMessage;
