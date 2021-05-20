import React, { useState } from "react";
import styled from "styled-components";
import Comments from "../UserMessage/Comments";
import ProfileImg from "../../../../../images/profile-img.png";
import LikesBar from "../LikesBar";
import DateBar from "../Events/DateBar";
import TimeBar from "../Events/TimeBar";
import ImageComment from "../Events/ImageComment";
import { useSelector } from "react-redux";

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
  padding-left: 40px;
  &.line-active {
    &:before {
      content: "";
      position: absolute;
      left: 26px;
      background: #878787;
      width: 10px;
      height: 1px;
      top: 30px;
    }
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
  display: flex;
  flex-direction: row;
  cursor: pointer;
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

const SubHeading = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 0 0 5px 0;
  font-weight: 700;
  color: #00c2ff;
`;
const DisplayCommentForEvent = ({ postData, businessData }) => {
  const [displayComments, setDisplayComments] = useState(false);
  const [displayCommentInput, setDisplayCommentInput] = useState(false);
  const search = useSelector((state) => state.myFeed.enterClicked);
  const [flag, setFlag] = useState(false);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <>
      <UserMsgWrap>
        <UserMessageContent>
          <ProfileNameHeader
            className={
              (postData.body !== null && postData.type === "Post") ||
              postData.data !== null ||
              !search
                ? "line-active"
                : "line-inactive"
            }
          >
            <ProfileThumb>
              <img
                src={
                  postData.itemId.ownerId === null ||
                  postData.itemId.ownerId.length === 0
                    ? businessData.default_image_url
                    : postData.itemId.ownerId[0].photo !== "" &&
                      postData.itemId.ownerId[0].photo !== null
                    ? postData.itemId.ownerId[0].photo
                    : ProfileImg
                }
                alt=""
              />
            </ProfileThumb>
            <ProfileNameWrap>
              <ProfileName
                onClick={() =>
                  window.open(`/b/${businessData._id}`, "_self")
                }
              >
                {businessData.company_name}
              </ProfileName>
              <SubHeading>{postData.itemId.title}</SubHeading>
              <ChatInput>{postData.itemId.description}</ChatInput>
              <DateBar
                startDay={
                  days[
                    new Date(postData.itemId.eventSchedule.start_time).getDay()
                  ]
                }
                endDay={
                  days[
                    new Date(postData.itemId.eventSchedule.end_time).getDay()
                  ]
                }
              />
              <TimeBar
                startTime={new Date(postData.itemId.eventSchedule.start_time)}
                endTime={new Date(postData.itemId.eventSchedule.end_time)}
              />
              <LikesBar
                type="disabled"
                totalLikes={postData.itemId.likes.length}
                totalComments={
                  postData.totalComments.length > 0
                    ? postData.totalComments[0].totalCount
                    : 0
                }
                date={new Date(postData.itemId.createdAt)}
                setDisplayComments={setDisplayComments}
                displayComments={displayComments}
                postId={postData._id}
                postLikes={postData.itemId.likes}
                displayCommentInput={displayCommentInput}
                setDisplayCommentInput={setDisplayCommentInput}
                setFlag={setFlag}
                flag={flag}
                business={businessData}
              />
            </ProfileNameWrap>
          </ProfileNameHeader>
          <ImageComment
            image={
              postData.itemId.media.length > 0
                ? postData.itemId.media[0].image
                : ""
            }
          />
        </UserMessageContent>

        <ReplyWrap>
          <Comments
            i={postData}
            postData={postData}
            displayComments={displayComments}
            setFlag={setFlag}
            flag={flag}
            business={businessData}
          />
        </ReplyWrap>
      </UserMsgWrap>
    </>
  );
};

export default DisplayCommentForEvent;
