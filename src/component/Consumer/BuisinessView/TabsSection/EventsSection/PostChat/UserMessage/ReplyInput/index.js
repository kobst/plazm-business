import React, { useState } from "react";
import styled from "styled-components";
import { FaRegSmile } from "react-icons/fa";
import ProfileImg from "../../../../../../../../images/profile-img.png";
import { useSelector } from "react-redux";
import { MentionsInput, Mention } from "react-mentions";

const ChatContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 12px 0 12px 0px;
  flex-direction: column;
  /* overflow: hidden; */
  @media (max-width: 767px) {
  }
  .replyInput {
    border: 0;
    outline: 0;
    padding:0;
    margin: 0;
    font-size: 13px;
    font-weight: 400;
    color: #fff;
    background: transparent;
    height: 37px;
    max-width: calc(100% - 30px);
    width: 100%;
    :hover, :focus {
      border: 0;
      outline: 0;
  }
  .replyInput__suggestions {
    background-color: #FE02B9 !important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    padding: 15px;
    height: auto;
    max-height: 150px;
    overflow: auto;
    overflow-x: hidden;
    ul{
      margin: 0 0 5px;
      padding: 0;
      li{
        color: #fff;
        font-size:10px;
        font-weight: 500;
        margin: 0 0 5px;
        padding: 0;
      }
    } 
  }
`;
const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0;
  margin: 0;
  width: 100%;
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
  padding: 0 25px 0px 0px;
  width: 100%;
  @media (max-width: 1024px) {
    padding: 0 45px 0px 0px;
  }
`;

const InputWrap = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 0 0 5px 0;
  font-weight: 500;
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
  height: 37px;
  border-bottom: 0.5px solid #afafaf;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  textarea {
    border: 0;
    box-shadow: none;
    padding: 10px 0;
    height: auto;
    overflow: auto;
    height: 100%;
  }
  input {
    border: 0;
    background: transparent;
    outline: 0;
    width: auto;
    color: #fff;
    padding: 0;
    width: 110px;
  }
`;
const EmojiWrap = styled.div`
  width: 15px;
  height: 15px;
  svg {
    color: #fff;
    font-size: 15px;
  }
`;
const ReplyInput = ({
  eventId,
  type,
  name,
  description,
  setDescription,
  addComment,
  replyDescription,
  setReplyDescription,
  commentId,
  addReply,
}) => {
  const user = useSelector((state) => state.user.user);
  const allUsers = useSelector((state) => state.consumer.users);
  const [mentionArrayUser, setMentionArrayUser] = useState([]);
  let userMentionData = allUsers.map((myUser) => ({
    id: myUser._id,
    display: `@${myUser.name}`,
  }));

  const handleChange = (event, newValue, newPlainTextValue, mentions) => {
    if (mentions.length !== 0) {
      /** to find if the mention is of users or lists */
      const findUser = allUsers.find((i) => i._id === mentions[0].id);
      if (findUser) {
        /** if mention is of user add it into user's mention array */
        const valueArr = mentionArrayUser;
        valueArr.push(mentions[0].id);
        setMentionArrayUser(valueArr);
      }
    }
    if (type === "comment") setDescription(newPlainTextValue);
    else if (type === "reply") setReplyDescription(newPlainTextValue);
  };

  const addCommentToPost = async () => {
    if (
      type === "comment" &&
      description !== "" &&
      !description.trim() === false
    ) {
      const obj = {
        itemId: eventId,
        userId: user._id,
        body: description,
        created_on: new Date(),
        taggedUsers: mentionArrayUser,
      };
      addComment(obj);
    } else if (
      type === "reply" &&
      replyDescription !== "" &&
      !replyDescription.trim() === false
    ) {
      const obj = {
        postId: eventId,
        _id: commentId,
        userId: user._id,
        body: replyDescription,
        taggedUsers: mentionArrayUser,
        replyUser:"@" + name
      };
      addReply(obj);
    }
  };

  return (
    <>
      <ChatContent>
        <ProfileNameHeader>
          <ProfileThumb>
            <img src={user.photo ? user.photo : ProfileImg} alt="" />
          </ProfileThumb>
          <ProfileNameWrap>
            <InputWrap>
              {type === "reply" ? <input value={"@" + name} readOnly /> : null}
              {type==="comment"?<MentionsInput
                markup="@(__id__)[__display__]"
                value={type === "reply" ? replyDescription : description}
                onChange={handleChange}
                placeholder={type === "reply" ? "Add Reply" : "Add Comment"}
                className="replyInput"
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    addCommentToPost();
                  }
                }}
              >
                <Mention type="user" trigger="@" data={userMentionData} />
              </MentionsInput>:<input value={replyDescription} onChange={e=>setReplyDescription(e.target.value)} onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    addCommentToPost();
                  }
                }} />}
              <EmojiWrap>
                <FaRegSmile />
              </EmojiWrap>
            </InputWrap>
          </ProfileNameWrap>
        </ProfileNameHeader>
      </ChatContent>
    </>
  );
};

export default ReplyInput;
