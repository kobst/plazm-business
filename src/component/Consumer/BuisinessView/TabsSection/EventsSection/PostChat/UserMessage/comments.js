import React, { useState } from "react";
import styled from "styled-components";
import ProfileImg from "../../../../../../../images/profile-img.png";
import ReplyInput from "./ReplyInput";
import LikesBar from "../LikesBar";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import ScrollToBottom from "./ScrollToBottom";

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

const ReplyWrap = styled.div``;

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
    cursor: pointer;
  }
`;

const Comments = ({ i, eventData, displayComments }) => {
  const [displayReply, setDisplayReply] = useState(false);
  const [displayReplyInput, setDisplayReplyInput] = useState(false);
  const [replyDescription, setReplyDescription] = useState("");
  const business = useSelector((state) => state.business.business)[0];
  const ws = useSelector((state) => state.user.ws);
  /** to add reply function */
  const addReply = async (obj) => {
    ws.send(
      JSON.stringify({
        action: "message",
        commentId: obj._id, //commentId
        userId: obj.userId, //userId
        comment: obj.replyUser + " " + obj.body,
        postId: obj.postId,
        businessId: business._id,
        taggedUsers: obj.taggedUsers,
        type: "Event",
      })
    );
    setReplyDescription("");
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
            <span>by</span>
            {i.userId.name}{" "}
          </ProfileName>
          <ChatInput>
            {" "}
            <p>{findDesc(i.body, i.taggedUsers)}</p>
          </ChatInput>
          <LikesBar
            type="reply"
            commentId={i._id}
            date={new Date(i.createdAt)}
            totalLikes={i.likes.length}
            totalComments={i.replies.length}
            setDisplayReply={setDisplayReply}
            displayReply={displayReply}
            commentLikes={i.likes}
            setDisplayReplyInput={setDisplayReplyInput}
            displayReplyInput={displayReplyInput}
            eventId={eventData._id}
          />
          <Scrollbars
            autoHeight
            autoHeightMin={0}
            autoHeightMax={300}
            thumbMinSize={30}
          >
            <ReplyWrap>
              {(displayReply || displayReplyInput) && i.replies.length > 0
                ? i.replies.map((j, key) => (
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
                  ))
                : null}
              {displayReply || displayReplyInput ? (
                <>
                  <ReplyInput
                    type="reply"
                    eventId={eventData._id}
                    displayComments={displayComments}
                    replyDescription={replyDescription}
                    setReplyDescription={setReplyDescription}
                    commentId={i._id}
                    addReply={addReply}
                    name={i.userId.name}
                  />
                </>
              ) : null}
              <ScrollToBottom/>
            </ReplyWrap>
          </Scrollbars>
        </ProfileNameWrap>
      </ProfileNameHeader>
    </UserMessageContent>
  );
};

export default Comments;
