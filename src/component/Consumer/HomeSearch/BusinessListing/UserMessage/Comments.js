import React, { useState } from "react";
import styled from "styled-components";
import ProfileImg from "../../../../../images/profile-img.png";
import ReplyInput from "./ReplyInput";
import LikesBar from "../LikesBar";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import ValueLoader from "../../../../../utils/loader";
import ScrollToBottom1 from "./ScrollToBottom1";

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

const ReplyWrap = styled.div`
  overflow-x: hidden;
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

const LoaderWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0 30px;
`;

const Comments = ({ i, postData, displayComments, setFlag, flag, business }) => {
  const [displayReply, setDisplayReply] = useState(false);
  const [displayReplyInput, setDisplayReplyInput] = useState(false);
  const [replyDescription, setReplyDescription] = useState("");
  const ws = useSelector((state) => state.user.ws);
  const loadingReplies = useSelector((state) => state.search.loadingReplies);

  /** to add reply function */
  const addReply = async (obj) => {
    setReplyDescription("");
    ws.send(
      JSON.stringify({
        action: "message",
        commentId: obj._id, //commentId
        userId: obj.userId, //userId
        comment: "@" + i.userId.name + " " + obj.body,
        postId: obj.postId,
        businessId: business._id,
        taggedUsers: obj.taggedUsers,
        type: "Post",
      })
    );
  };
  /** to highlight the user mentions mentioned in post description */
  const findDesc = (value, mentions) => {
    let divContent = value;
    if (mentions.length > 0) {
      mentions.map((v) => {
        let re = new RegExp("@" + v.name, "g");
        divContent = divContent.replace(
          re,
          `<span className='mentionData'> ${"@" + v.name}  </span>`
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
    } else return value;
  };
  return (
    <UserMessageContent className="UserReplyContent">
      <ProfileNameHeader>
        <ProfileThumb>
          <img src={i.userId.photo ? i.userId.photo : ProfileImg} alt="" />
        </ProfileThumb>
        <ProfileNameWrap>
          <ProfileName>
            {i.userId.name}{" "}
          </ProfileName>
          <ChatInput>
            {" "}
            <p>{findDesc(i.body, i.taggedUsers)}</p>
          </ChatInput>
          <LikesBar
            type="reply"
            date={new Date(i.createdAt)}
            setDisplayComments={setDisplayReply}
            displayComments={displayReply}
            name={i.userId.name}
            totalLikes={i.likes.length}
            totalComments={i.totalReplies}
            commentId={i._id}
            commentLikes={i.likes}
            setDisplayReplyInput={setDisplayReplyInput}
            displayReplyInput={displayReplyInput}
            flag={flag}
            setFlag={setFlag}
            business={business}
          />
          <Scrollbars
            autoHeight
            autoHeightMin={0}
            autoHeightMax={300}
            thumbMinSize={30}
            style={{ overflowX: "hidden" }}
            className="InnerScroll"
          >
            <ReplyWrap style={{ overflowX: "hidden" }}>
              {displayReply && i.replies.length > 0 && !loadingReplies ? (
                <div>
                  {i.replies.map((j, key) => (
                    <>
                      <UserMessageContent
                        className="UserReplyContent"
                        key={key}
                      >
                        <ProfileNameHeader>
                          <ProfileThumb>
                            <img
                              src={j.userId.photo ? j.userId.photo : ProfileImg}
                              alt=""
                            />
                          </ProfileThumb>
                          <ProfileNameWrap>
                            <ProfileName>
                              <span>by</span>
                              {j.userId.name}{" "}
                            </ProfileName>
                            <ChatInput>
                              {" "}
                              {findDesc(j.body, j.taggedUsers)}
                            </ChatInput>
                            <LikesBar
                              date={new Date(j.created_on)}
                              type="commentReply"
                            />
                          </ProfileNameWrap>
                        </ProfileNameHeader>
                      </UserMessageContent>
                    </>
                  ))}
                  <ScrollToBottom1 />
                </div>
              ) : displayReply && loadingReplies ? (
                <LoaderWrap>
                  <ValueLoader />
                </LoaderWrap>
              ) : null}
            </ReplyWrap>
          </Scrollbars>
          {displayReply && !loadingReplies ? (
            <>
              <ReplyInput
                type="reply"
                postId={postData.postId}
                displayComments={displayComments}
                replyDescription={replyDescription}
                setReplyDescription={setReplyDescription}
                commentId={i._id}
                addReply={addReply}
                name={i.userId.name}
              />
            </>
          ) : null}
        </ProfileNameWrap>
      </ProfileNameHeader>
    </UserMessageContent>
  );
};

export default Comments;