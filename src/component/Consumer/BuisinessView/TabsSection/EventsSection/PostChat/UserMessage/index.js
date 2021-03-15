import React, { useState } from "react";
import styled from "styled-components";
import ProfileImg from "../../../../../../../images/profile-img.png";
import ReplyInput from "./ReplyInput";
import LikesBar from "../LikesBar";
import DateBar from "../DateBar";
import TimeBar from "../TimeBar";
import ImageComment from "../ImageComment";
import { useSelector, useDispatch } from "react-redux";
import ValueLoader from "../../../../../../../utils/loader";
import { Scrollbars } from "react-custom-scrollbars";
import {
  addCommentViaSocket,
  addLikeViaSocket,
  addReplyViaSocket,
  addLikeToCommentViaSocket,
} from "../../../../../../../reducers/eventReducer";
import Comment from "./comments";

const UserMessageContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 0 12px;
  flex-direction: column;
  @media (max-width: 767px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
  &.UserReplyContent {
    padding: 0 0 0 40px;
  }
  .InnerScroll {
    overflow-x: hidden;
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
`;

const SubHeading = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 0 0 5px 0;
  font-weight: 700;
  color: #00c2ff;
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
  margin: 100px 0 0 0;
`;

const UserMessage = ({ eventData }) => {
  const businessInfo = useSelector((state) => state.business.business)[0];
  const [displayEventComments, setDisplayEventComments] = useState(false);
  const business = useSelector((state) => state.business.business);
  const [displayEventCommentInput, setDisplayEventCommentInput] = useState(false)
  const [description, setDescription] = useState(""); 
  const loadingComments = useSelector(
    (state) => state.event.loadingEventComments
  );
  const ws = useSelector((state) => state.user.ws);
  const dispatch = useDispatch();

  ws.onmessage = (evt) => {
    const message = JSON.parse(evt.data);
    if (message.commentInfo && message.commentInfo.type === "Events") {
      /** to add event comment via socket */
      setDescription("");
      if (message.businessId === business[0]._id) {
        dispatch(addCommentViaSocket(message));
      }
    } else if (
      message.comment &&
      message.commentId &&
      message.type === "Event"
    ) {
      /** to add event comment via socket */
      if (message.businessId === business[0]._id) {
        dispatch(addReplyViaSocket(message));
      }
    } else if (message.like && message.commentId && message.type === "Event") {
      /** to add comment like via socket */
      if (message.businessId === business[0]._id) {
        dispatch(addLikeToCommentViaSocket(message));
      }
    } else if (message.like && message.type === "Event") {
      /** to add post like via socket */
      if (message.businessId === business[0]._id) {
        dispatch(addLikeViaSocket(message));
      }
    }
  };

  /** to add comment on event function */
  const addComment = async (obj) => {
    ws.send(
      JSON.stringify({
        action: "comment",
        postId: obj.itemId,
        type: "Events",
        comment: obj.body,
        userId: obj.userId,
        businessId: business[0]._id,
        taggedUsers: obj.taggedUsers,
      })
    );
  };

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
      <UserMessageContent>
        <ProfileNameHeader>
          <ProfileThumb>
            <img
              src={
                eventData.user !== null && eventData.user.photo
                  ? eventData.user.photo
                  : eventData.user == null
                  ? businessInfo.default_image_url
                    ? businessInfo.default_image_url
                    : ProfileImg
                  : ProfileImg
              }
              alt=""
            />
          </ProfileThumb>
          <ProfileNameWrap>
            <ProfileName>{businessInfo.company_name}</ProfileName>
            <SubHeading>{eventData.title}</SubHeading>
            <ChatInput>{eventData.description}</ChatInput>
            <DateBar
              startDay={
                days[new Date(eventData.eventSchedule.start_time).getDay() - 1]
              }
              endDay={
                days[new Date(eventData.eventSchedule.end_time).getDay() - 1]
              }
            />
            <TimeBar
              startTime={new Date(eventData.eventSchedule.start_time)}
              endTime={new Date(eventData.eventSchedule.end_time)}
            />
            <LikesBar
              type="comment"
              eventId={eventData._id}
              date={new Date(eventData.createdAt)}
              setDisplayEventComments={setDisplayEventComments}
              displayEventComments={displayEventComments}
              totalLikes={eventData.likes.length}
              totalComments={eventData.totalComments}
              postLikes={eventData.likes}
              displayEventCommentInput={displayEventCommentInput}
              setDisplayEventCommentInput={setDisplayEventCommentInput}
            />
          </ProfileNameWrap>
        </ProfileNameHeader>
        <ImageComment
          image={eventData.media.length > 0 ? eventData.media[0].image : ""}
        />
      </UserMessageContent>
      <Scrollbars
        autoHeight
        autoHeightMin={0}
        autoHeightMax={300}
        thumbMinSize={30}
        className="InnerScroll"
      >
        <ReplyWrap>
          {(displayEventComments||displayEventCommentInput) &&
          !loadingComments &&
          eventData.comments.length > 0 ? (
            eventData.comments.map((i) => {
              return <Comment i={i} eventData={eventData} />;
            })
          ) : (displayEventComments||displayEventCommentInput)  && loadingComments ? (
            <LoaderWrap>
              <ValueLoader />
            </LoaderWrap>
          ) : null}
        </ReplyWrap>
      </Scrollbars>
      {(displayEventComments||displayEventCommentInput)  ? (
        <ReplyInput
          type="comment"
          eventId={eventData._id}
          description={description}
          setDescription={setDescription}
          addComment={addComment}
        />
      ) : null}
    </>
  );
};

export default UserMessage;
