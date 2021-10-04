import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { FaCaretRight } from "react-icons/fa";
import moment from "moment";
import BannerImg from "../../../../../../images/sliderimg.png";
import LikeBar from "../LikeBar";
import DateBar from "../DateBar";
import TimeBar from "../TimeBar";
import ImageComment from "../ImageComment";
import { useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import ValueLoader from "../../../../../../utils/loader";
import ReplyInput from "./ReplyInput";
import Comments from "./comments";
import {
  EventBigImage,
  InnerListBanner,
  InnerOverlay,
  ListAuthorName,
  ListInfo,
  ListName,
  ListNameWrap,
} from "../../../../FeedContent/styled";
import { useHistory } from "react-router";

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
  }
  .InnerScroll {
    overflow-x: hidden;
  }
`;
const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0 0 0 12px;
  margin: 15px 0;
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

const ProfileNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  // max-width: calc(100% - 40px);
  padding: 0 12px 15px 0px;
  width: 100%;
  @media (max-width: 1024px) {
    padding: 0 12px 15px 0px;
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

const ReplyWrap = styled.div`
  // max-height: 335px;
`;

const LoaderWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0 10px;
`;

const UserMessageEvents = ({
  eventData,
  businessInfo,
  type,
  setSearchIndex,
  myFeedView,
  setSelectedListId,
}) => {
  const [displayEventComments, setDisplayEventComments] = useState(false);
  const [flag, setFlag] = useState(false);
  const [displayEventCommentInput, setDisplayEventCommentInput] =
    useState(false);
  const [description, setDescription] = useState("");
  const [listImage, setListImage] = useState(
    eventData.listId.length > 0 && eventData.listId[0].media.length > 0
      ? eventData.listId[0].media[0].image
      : BannerImg
  );
  const loadingComments = useSelector(
    (state) => state.myFeed.loadingEventComments
  );
  const ws = useSelector((state) => state.user.ws);
  const search = useSelector((state) => state.myFeed.enterClicked);
  const commentsRef = useRef(null);
  const selectedEventId = useSelector(
    (state) => state.myFeed.selectedEventIdForComments
  );
  const commentAdded = useSelector((state) => state.myFeed.commentAdded);
  const history = useHistory();

  /** to scroll to bottom of comments */
  useEffect(() => {
    if (
      (displayEventComments &&
        !loadingComments &&
        eventData._id === selectedEventId) ||
      (commentAdded && eventData._id === selectedEventId)
    ) {
      commentsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [
    displayEventComments,
    loadingComments,
    eventData._id,
    selectedEventId,
    commentAdded,
  ]);
  /** to add comment on event function */
  const addComment = async (obj) => {
    ws.send(
      JSON.stringify({
        action: "comment",
        postId: obj.itemId,
        type: "Events",
        comment: obj.body,
        userId: obj.userId,
        businessId: businessInfo._id,
        taggedUsers: obj.taggedUsers,
      })
    );
    setDescription("");
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

  /** to display user details */
  const displayUserDetails = () => {
    if (eventData.ownerId) history.push(`/u/${eventData.ownerId[0]._id}`);
  };
  return (
    <>
      <UserMessageContent>
        <ProfileNameHeader
          className={
            type !== "MyFeedEvent" &&
            ((eventData.body !== null && eventData.type === "Post") ||
              eventData.data !== null ||
              !search)
              ? "line-active"
              : "line-inactive"
          }
        >
          <ProfileNameWrap>
            <InnerListBanner>
              <img
                src={listImage}
                onError={() => setListImage(BannerImg)}
                alt=""
              />
              <InnerOverlay />
              <ListNameWrap>
                <ListName>{eventData.listId[0].name}</ListName>
                <ListInfo>
                  <FaCaretRight />
                  {eventData.ownerId && (
                    <ListAuthorName onClick={() => displayUserDetails()}>
                      {eventData.ownerId[0].name}
                    </ListAuthorName>
                  )}
                  <span>|</span>
                  <ListAuthorName>
                    Added on{" "}
                    {moment(eventData.createdAt).format("MMM DD,YYYY, hh:MM a")}{" "}
                    EDT{" "}
                  </ListAuthorName>
                </ListInfo>
              </ListNameWrap>
            </InnerListBanner>
            <SubHeading>{eventData.title}</SubHeading>
            <ChatInput>
              {findDesc(
                eventData.data,
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
            <LikeBar
              type="comment"
              eventId={eventData._id}
              date={new Date(eventData.createdAt)}
              totalLikes={eventData.likes ? eventData.likes.length : 0}
              totalComments={
                eventData.totalComments.length > 0
                  ? eventData.totalComments[0].totalCount
                  : 0
              }
              setDisplayEventComments={setDisplayEventComments}
              displayEventComments={displayEventComments}
              postLikes={eventData.likes || []}
              displayEventCommentInput={displayEventCommentInput}
              setDisplayEventCommentInput={setDisplayEventCommentInput}
              flag={flag}
              setFlag={setFlag}
              business={businessInfo}
              commentsRef={commentsRef}
              setSearchIndex={setSearchIndex}
              myFeedView={myFeedView}
              eventData={eventData}
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
            <>
              {eventData.comments.map((i, key) => {
                return (
                  <Comments
                    key={key}
                    i={i}
                    eventData={eventData}
                    flag={flag}
                    setFlag={setFlag}
                    business={businessInfo}
                  />
                );
              })}
              {/* {flag === false ? <ScrollToBottom /> : null} */}
            </>
          ) : displayEventComments && loadingComments ? (
            <LoaderWrap>
              <ValueLoader />
            </LoaderWrap>
          ) : null}
          <div ref={commentsRef}></div>
        </ReplyWrap>
      </Scrollbars>
      {displayEventComments ? (
        <>
          <ReplyInput
            type="comment"
            eventId={eventData._id}
            description={description}
            setDescription={setDescription}
            addComment={addComment}
            commentsRef={commentsRef}
          />
          {/* {flag === false ? <ScrollToBottom /> : null} */}
        </>
      ) : null}
    </>
  );
};

export default UserMessageEvents;
