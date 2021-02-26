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
`;

const BottomBarLikes = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 767px) {
    flex-direction: column;
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
  margin: 0 0 0 20px;
  @media (max-width: 767px) {
    margin: 8px 15px 0 0px;
  }
  svg {
    margin: 0 7px 0 0;
  }
`;

const UserMessage = ({postData}) => {
  return (
    <>
      <UserMsgWrap>
        <UserMessageContent>
          <ProfileNameHeader>
            <ProfileThumb>
              <img src={ProfileImg} alt="" />
            </ProfileThumb>
            <ProfileNameWrap>
              <ProfileName>
                Top 10 Restaurant in NYC<span>by</span>NYPlazm_Eater{" "}
              </ProfileName>
              <ChatInput>{postData.postDetails.data}</ChatInput>
              <LikesBar
                totalLikes={postData.totalLikes}
                totalComments={postData.totalComments}
              />
            </ProfileNameWrap>
          </ProfileNameHeader>
        </UserMessageContent>
        {postData.comments.length > 0 ? (
          <UserMessageContent className="UserReplyContent">
            <ProfileNameHeader>
              <ProfileThumb>
                <img
                  src={
                    postData.comments[0].userId.photo
                      ? postData.comments[0].userId.photo
                      : ProfileImg
                  }
                  alt=""
                />
              </ProfileThumb>
              <ProfileNameWrap>
                <ProfileName>
                  Top 10 Restaurant in NYC<span>by</span>NYPlazm_Eater{" "}
                </ProfileName>
                <ChatInput>
                  {postData.comments[0].body ? postData.comments[0].body : ""}
                </ChatInput>
                <LikesBar />
              </ProfileNameWrap>
            </ProfileNameHeader>
            <ReplyInput />
          </UserMessageContent>
        ) : null}
      </UserMsgWrap>
    </>
  );
};

export default UserMessage;
