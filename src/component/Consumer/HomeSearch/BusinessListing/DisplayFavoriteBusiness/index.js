import React, { useState } from "react";
import styled from "styled-components";
import ProfileImg from "../../../../../images/profile-img.png";
import BusinessHashTags from "../BusinessHashTags";
import { MdFavorite, MdAdd, MdRemove } from "react-icons/md";
import UserMessage from "../UserMessage";
import UserMessageEvents from "../Events/UserMessageEvents";

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
  margin: 7px 0 0px 0;
  font-weight: 700;
  color: #ff2e9a;
  svg {
    color: #ff0000;
    margin: 0;
  }
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
  width: 100%;
  span {
    font-size: 13px;
    color: #ff2e9a;
    font-weight: 600;
    cursor: pointer;
  }
  .postSpan {
    margin-left: 4%;
  }
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0px;
  align-items: center;
  flex-wrap: wrap;
`;

/** display favorite business */
const DisplayFavoriteBusiness = ({ data }) => {
  const [displayData, setDisplayData] = useState(false);
  return data ? (
    <>
      <UserMsgWrap>
        <UserMessageContent>
          <ProfileNameHeader>
            <ProfileThumb>
              <img
                src={
                  data.favorites.default_image_url
                    ? data.favorites.default_image_url
                    : ProfileImg
                }
                alt=""
              />
            </ProfileThumb>
            <ProfileNameWrap>
              <ProfileName>
                {data.favorites.company_name}
                <RightWrap>
                  <MdFavorite />
                  {!displayData ? (
                    <MdAdd onClick={() => setDisplayData(true)} />
                  ) : (
                    <MdRemove onClick={() => setDisplayData(false)} />
                  )}
                </RightWrap>
              </ProfileName>
              <ChatInput>
                <p>
                  <span>{data.totalFollowers}</span> Followers{" "}
                  <span className="postSpan">{data.totalPosts}</span> Posts
                </p>
              </ChatInput>
              <BusinessHashTags data={data.favorites.filter_tags} />
            </ProfileNameWrap>
          </ProfileNameHeader>
        </UserMessageContent>
      </UserMsgWrap>

      {displayData ? (
        <>
          {/* to display posts */}
          {data.posts.length > 0
            ? data.posts.map((i, key) => (
                <UserMessage postData={i} key={key} businessData={data.favorites} />
              ))
            : null}

          {/* to display events */}
          {data.events.length > 0
            ? data.events.map((i, key) => (
                <UserMessageEvents
                  eventData={i}
                  key={key}
                  businessInfo={data.favorites}
                />
              ))
            : null}
        </>
      ) : null}
    </>
  ) : null;
};

export default DisplayFavoriteBusiness;
