import React, { useState } from "react";
import styled from "styled-components";
import UserMessage from "./UserMessage";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import ValueLoader from "../../../../../../utils/loader";

const ChatContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 12px 0;
  flex-direction: column;
  overflow: hidden;
  @media (max-width: 767px) {
  }
`;

const LoaderWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px 0 0 0;
  @media (max-width: 767px) {
    margin: 30px 0 0 0;
  }
`;

const PostChat = () => {
  const posts = useSelector((state) => state.business.posts);

  const loadingFilterData = useSelector(state => state.business.loadingFilterData);
  const [eventPosition, setEventPosition] = useState(20);
  const fetchMorePosts = () => {
    setTimeout(() => {
      setEventPosition(eventPosition + 20);
    }, 4000);
  };
  return (
    <>
      <div id="scrollableDiv" style={{ height: 450 }}>
        <Scrollbars
        autoHeight
        autoHeightMin={0}
        autoHeightMax={450}
        thumbMinSize={30}
      >

        {/* <InfiniteScroll
          dataLength={posts.length}
          next={fetchMorePosts}
          hasMore={true}
          loader={
            posts && eventPosition < posts.length ? (
              <div style={{ textAlign: "center", margin: " 40px auto 0" }}>
                {" "}
                <ValueLoader height="40" width="40" />
              </div>
            ) : (
              <center>
                <p>No more posts to show</p>
              </center>
            )
          }
          scrollableTarget="scrollableDiv"
        > */}
          <ChatContent>
            {!loadingFilterData&&posts.length>0
              ? posts
                  // .slice(0, eventPosition)
                  .map((i) => <UserMessage postData={i} />)
              : loadingFilterData?<LoaderWrap><ValueLoader/></LoaderWrap> : <center><p>No posts to display</p></center>}
          </ChatContent>
        {/* </InfiniteScroll> */}
        </Scrollbars>
      </div>
    </>
  );
};

export default PostChat;
