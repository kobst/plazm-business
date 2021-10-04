import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { FaCaretRight } from "react-icons/fa";
import { Scrollbars } from "react-custom-scrollbars";
import { useHistory } from "react-router";
import moment from "moment";
import BannerImg from "../../../../../../../images/sliderimg.png";
import ReplyInput from "./ReplyInput";
import LikesBar from "../LikesBar";
import DateBar from "../DateBar";
import TimeBar from "../TimeBar";
import ImageComment from "../ImageComment";
import ValueLoader from "../../../../../../../utils/loader";
import {
  addCommentViaSocket,
  addLikeViaSocket,
  addReplyViaSocket,
  addLikeToCommentViaSocket,
  addEventViaSocket,
  deleteEventViaSocket,
  editEventViaSocket,
} from "../../../../../../../reducers/eventReducer";
import Comment from "./comments";
import ScrollToBottom from "./ScrollToBottom";
import {
  EventBigImage,
  InnerListBanner,
  InnerOverlay,
  ListAuthorName,
  ListInfo,
  ListName,
  ListNameWrap,
} from "../../../../../FeedContent/styled";

const reactStringReplace = require("react-string-replace");

const UserMessageContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 0 22px 0 12px;
  flex-direction: column;
  @media (max-width: 767px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
  &.UserReplyContent {
    padding: 10px 0 0 0px;
    @media (max-width: 767px) {
      padding: 10px 0 0 0px;
    }
  }
  .InnerScroll {
    overflow-x: hidden;
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

const ProfileNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  // max-width: calc(100% - 40px);
  // border-bottom: 0.25px solid #878787;
  padding: 0 25px 15px 0px;
  width: 100%;
  @media (max-width: 1024px) {
    padding: 0 0px 15px 0px;
  }
  @media (max-width: 767px) {
    padding: 0 0px 15px 0px;
  }
`;

const ChatInput = styled.div`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
  white-space: pre-wrap;
  .mentionData {
    font-size: 13px;
    color: #ff2e9a;
    font-weight: 600;
    cursor: pointer;
  }
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
  margin: 30px 0 20px;
`;

const UserMessage = ({ eventData, setSelectedListId }) => {
  const [listImage, setListImage] = useState(
    eventData.list.image ? eventData.list.image : BannerImg
  );
  const [displayEventComments, setDisplayEventComments] = useState(false);
  const [flag, setFlag] = useState(false);
  const business = useSelector((state) => state.business.business);
  const [displayEventCommentInput, setDisplayEventCommentInput] =
    useState(false);
  const [description, setDescription] = useState("");
  const loadingComments = useSelector(
    (state) => state.event.loadingEventComments
  );
  const ws = useSelector((state) => state.user.ws);
  const user = useSelector((state) => state.user.user);
  const selectedDate = useSelector((state) => state.event.selectedDate);
  const dispatch = useDispatch();
  const history = useHistory();

  ws.onmessage = (evt) => {
    const message = JSON.parse(evt.data);

    if (message.commentInfo && message.commentType === "Events") {
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
      if (
        message.businessId === business[0]._id &&
        message.like._id !== user._id
      ) {
        dispatch(addLikeViaSocket(message));
      }
    } else if (
      message.type === "newEvent" &&
      message.businessId === business[0]._id
    ) {
      /** to add new event */
      if (
        message.event.eventSchedule &&
        moment(message.event.eventSchedule.start_time).format("DD MMM YYYY") ===
          moment(selectedDate).format("DD MMM YYYY") &&
        message.event.type === "addEvent"
      ) {
        if (message.userId) {
          if (message.userId !== user._id) {
            dispatch(addEventViaSocket(message));
          }
        } else {
          dispatch(addEventViaSocket(message));
        }
      } else if (message.event.type === "deleteEvent") {
        /** to delete an event deleted on admin app*/
        dispatch(deleteEventViaSocket(message.event.id));
      } else if (message.event.type === "editEvent") {
        /** to edit an event edited on admin app*/
        dispatch(editEventViaSocket(message.event));
      }
    }
  };

  /** to highlight the user mentions mentioned in post description */
  const findDesc = (value, mentions, mentionsList) => {
    let divContent = value;
    if (mentions.length > 0 && mentionsList.length > 0) {
      let arr = [],
        data;
      for (let i = 0; i < mentions.length; i++) {
        if (value.includes(mentions[i].name)) {
          arr.push({
            name: mentions[i].name,
            id: mentions[i]._id,
            type: "name",
          });
        }
      }
      for (let i = 0; i < mentionsList.length; i++) {
        if (value.includes(mentionsList[i].name)) {
          arr.push({
            name: mentionsList[i].name,
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
        if (value.search(new RegExp(mentions[i].name, "g") !== -1)) {
          return (
            <div>
              {reactStringReplace(value, mentions[i].name, (match, j) => (
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
      for (let i = 0; i < mentionsList.length; i++) {
        if (value.search(new RegExp(mentionsList[i].name, "g") !== -1)) {
          return (
            <div>
              {reactStringReplace(value, mentionsList[i].name, (match, j) => (
                <span
                  className="mentionData"
                  onClick={() => setSelectedListId(mentionsList[i]._id)}
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
      return <div className="postData">{value}</div>;
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
        <InnerListBanner>
          <img src={listImage} onError={() => setListImage(BannerImg)} alt="" />
          <InnerOverlay />
          <ListNameWrap>
            <ListName>{eventData.list.name}</ListName>
            <ListInfo>
              <FaCaretRight />
              <ListAuthorName>{user.name}</ListAuthorName>
              <span>|</span>
              <ListAuthorName>
                Added on{" "}
                {moment(eventData.createdAt).format("MMM DD,YYYY, hh:MM a")} EDT{" "}
              </ListAuthorName>
            </ListInfo>
          </ListNameWrap>
        </InnerListBanner>
        <ProfileNameHeader>
          <ProfileNameWrap>
            <SubHeading>{eventData.title}</SubHeading>
            <ChatInput>
              {findDesc(
                eventData.description,
                eventData.taggedUsers,
                eventData.taggedLists
              )}
            </ChatInput>
            <DateBar
              startDay={
                days[new Date(eventData.eventSchedule.start_time).getDay()]
              }
              endDay={days[new Date(eventData.eventSchedule.end_time).getDay()]}
            />
            <TimeBar
              startTime={new Date(eventData.eventSchedule.start_time)}
              endTime={new Date(eventData.eventSchedule.end_time)}
            />
            <EventBigImage>
              <ImageComment
                image={eventData.media.length > 0 ? eventData.media[0] : ""}
              />
            </EventBigImage>
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
              flag={flag}
              setFlag={setFlag}
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
          {displayEventComments &&
          !loadingComments &&
          eventData.comments.length > 0 ? (
            eventData.comments.map((i, key) => {
              return (
                <Comment
                  key={key}
                  i={i}
                  eventData={eventData}
                  flag={flag}
                  setFlag={setFlag}
                />
              );
            })
          ) : displayEventComments && loadingComments ? (
            <LoaderWrap>
              <ValueLoader />
            </LoaderWrap>
          ) : null}
          {displayEventComments ? (
            <>
              <ReplyInput
                type="comment"
                eventId={eventData._id}
                description={description}
                setDescription={setDescription}
                addComment={addComment}
              />
              {flag === false ? <ScrollToBottom /> : null}
            </>
          ) : null}
        </ReplyWrap>
      </Scrollbars>
    </>
  );
};

export default UserMessage;
