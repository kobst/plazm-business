import React from "react";
import styled from "styled-components";
import UserMessage from "./UserMessage";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";

const ChatContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 12px 0 12px 12px;
  flex-direction: column;
  /* overflow: hidden; */
  @media (max-width: 767px) {
  }
`;
const NoMorePost = styled.p`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
`;

const PostChat = () => {
  const events = useSelector((state) => state.event.events);
  const loading = useSelector((state) => state.event.loading);
  const loadingForAWeek = useSelector((state) => state.event.loadingForAWeek);
  const loadingForInitialWeek = useSelector((state) => state.event.loadingForInitialWeek);
  return (
    <>
      <Scrollbars
        autoHeight
        autoHeightMin={0}
        autoHeightMax={500}
        thumbMinSize={30}
      >
        <ChatContent>
          {events && events.length > 0 &&  !loadingForInitialWeek &&!loadingForAWeek? (
            events.map((i,key) => <UserMessage eventData={i} key={key} />)
          ) : !loading && !loadingForAWeek && !loadingForInitialWeek ? (
            <center>
              <NoMorePost>No events to display</NoMorePost>
            </center>
          ) : null}
        </ChatContent>
      </Scrollbars>
    </>
  );
};

export default PostChat;
