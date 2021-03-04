import React, { useState } from "react";
import styled from "styled-components";
import ProfileImg from "../../../../../../../images/profile-img.png";
import ReplyInput from "./ReplyInput";
import LikesBar from "../LikesBar";

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
    padding: 0 0 0 40px;
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
  border: 1px solid #ffffff;
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
  margin: 0 0 5px 0;
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
  }
`;

const Comments = ({
  i,
  addReply,
  replyDescription,
  setReplyDescription,
  postData,
  displayComments,
  setReplyUser
}) => {
  const [displayReply, setDisplayReply] = useState(false);
  return (
    <UserMessageContent className="UserReplyContent">
      <ProfileNameHeader>
        <ProfileThumb>
          <img src={i.userId.photo ? i.userId.photo : ProfileImg} alt="" />
        </ProfileThumb>
        <ProfileNameWrap>
          <ProfileName>
            Top 10 Restaurant in NYC<span>by</span>
            {i.userId.name}{" "}
          </ProfileName>
          <ChatInput>{i.body ? i.body : ""}</ChatInput>
          <LikesBar
            type="reply"
            date={new Date(i.createdAt)}
            setDisplayComments={setDisplayReply}
            displayComments={displayReply}
            name={i.userId.name}
            setReplyUser={setReplyUser}
            totalLikes={i.likes.length}
            totalComments={i.replies.length}
            commentId={i._id}
            commentLikes={i.likes}
          />
          <div>
            {displayReply && i.replies.length > 0
              ? i.replies.map((j, key) => (
                  <>
                    <UserMessageContent className="UserReplyContent" key={key}>
                      <ProfileNameHeader>
                        <ProfileThumb>
                          <img
                            src={j.userId.photo ? j.userId.photo : ProfileImg}
                            alt=""
                          />
                        </ProfileThumb>
                        <ProfileNameWrap>
                          <ProfileName>
                            Top 10 Restaurant in NYC<span>by</span>
                            {j.userId.name}{" "}
                          </ProfileName>
                          <ChatInput>{j.body ? j.body : ""}</ChatInput>
                          <LikesBar
                            date={new Date(j.created_on)}
                            type="commentReply"
                          />
                        </ProfileNameWrap>
                      </ProfileNameHeader>
                    </UserMessageContent>
                  </>
                ))
              : null}
            {displayReply ? (
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
          </div>
        </ProfileNameWrap>
      </ProfileNameHeader>
    </UserMessageContent>
  );
};

export default Comments;
