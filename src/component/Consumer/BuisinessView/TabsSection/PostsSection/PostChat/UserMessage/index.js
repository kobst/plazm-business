import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
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
import { RiArrowDropRightFill } from "react-icons/ri";
import ReactTooltip from "react-tooltip";
import {
  checkMime,
  replaceBucket,
} from "../../../../../../../utilities/checkResizedImage";

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
    @media (max-width: 767px) {
      padding: 10px 0 0 0px;
    }
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
  @media (max-width: 767px) {
    width: 100%;
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
  border-bottom: 0.25px solid #878787;
  padding: 0 25px 15px 0px;
  width: 100%;
  @media (max-width: 1024px) {
    padding: 0 45px 15px 0px;
  }
  @media (max-width: 767px) {
    padding: 0 0px 15px 0px;
  }
`;

const ProfileName = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 7px 0 0px 0;
  font-weight: 700;
  color: #ff2e9a;
  display: flex;
  flex-direction: row;

  span {
    font-weight: 700;
    color: #fff;
    margin: 0 3px;
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
  margin: 30px 0 20px;
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
  a {
    text-decoration: none;
  }
  span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
    font-weight: bold;
    font-size: 10px;
    max-width: 20ch;
  }
`;

const UserMessage = ({ postData }) => {
  const dispatch = useDispatch();
  const [displayComments, setDisplayComments] = useState(false);
  const loadingComments = useSelector(
    (state) => state.business.loadingPostComments
  );
  const business = useSelector((state) => state.business.business)[0];
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [displayCommentInput, setDisplayCommentInput] = useState(false);
  const [flag, setFlag] = useState(false);
  const filters = useSelector((state) => state.business.filters);
  const user = useSelector((state) => state.user.user);
  const ws = useSelector((state) => state.user.ws);
  const history = useHistory();

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
          if (
            filters.PostsByMe === true &&
            message.post.postDetails.listId === null
          ) {
            dispatch(addPostViaSocket(message));
          } else if (
            filters.MySubscriptions === true &&
            message.post.postDetails.listId !== null
          ) {
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

  /** to check for resized image */
  useEffect(() => {
    if (postData.postDetails.ownerId === null) {
      const findMime = checkMime(business.default_image_url);
      const image = replaceBucket(business.default_image_url, findMime, 30, 30);
      setImage(image);
    } else if (
      postData.postDetails.ownerId.photo !== "" &&
      postData.postDetails.ownerId.photo !== null
    ) {
      const findMime = checkMime(postData.postDetails.ownerId.photo);
      const image = replaceBucket(
        postData.postDetails.ownerId.photo,
        findMime,
        30,
        30
      );
      setImage(image);
    } else {
      setImage(ProfileImg);
    }
  }, [postData, business.default_image_url]);

  /** to check image error */
  const checkError = () => {
    if (postData.postDetails.ownerId === null) {
      setImage(business.default_image_url);
    } else if (
      postData.postDetails.ownerId.photo !== "" &&
      postData.postDetails.ownerId.photo !== null
    ) {
      setImage(postData.postDetails.ownerId.photo);
    } else {
      setImage(ProfileImg);
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
          return <div>{value}</div>;
        }
      }
      mentionsList.map((v) => {
        let re = new RegExp("@" + v.name, "g");
        divContent = divContent.replace(
          re,
          `<span className='mentionData'  onClick={history.push("/u/${
            v._id
          }",'_self')}> ${"@" + v.name}  </span>`
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
      for (let i = 0; i < mentions.length; i++) {
        if (value.search(new RegExp("@" + mentions[i].name, "g") !== -1)) {
          return (
            <div>
              {reactStringReplace(value, "@" + mentions[i].name, (match, j) => (
                <span
                  key={j}
                  className="mentionData"
                  onClick={() => history.push(`/u/${mentions[i]._id}`)}
                >
                  {match}
                </span>
              ))}
            </div>
          );
        } else {
          return <div>{value}</div>;
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
                {postData.postDetails.ownerId === null ? (
                  business.company_name
                ) : (
                  <span
                    onClick={() =>
                      history.push(`/u/${postData.postDetails.ownerId._id}`)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {postData.postDetails.ownerId.name}
                  </span>
                )}{" "}
                {postData.postDetails.listId !== null ? (
                  <RightArrowSec>
                    <ArrowRight>
                      <RiArrowDropRightFill />
                    </ArrowRight>
                    <DescriptionBox>
                      <div
                        data-for="custom-class"
                        data-tip={postData.postDetails.listId.name}
                      >
                        <span>{postData.postDetails.listId.name}</span>
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
                  postData.postDetails.data,
                  postData.postDetails.taggedUsers,
                  postData.postDetails.taggedLists
                )}
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
