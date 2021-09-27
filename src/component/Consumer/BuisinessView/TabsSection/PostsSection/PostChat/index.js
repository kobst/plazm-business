import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserMessage from "./UserMessage";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import ValueLoader from "../../../../../../utils/loader";
import { addFilteredPosts } from "../../../../../../reducers/businessReducer";

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

const NoMorePost = styled.p`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
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

const PostChat = ({ setSelectedListId, filterArr, setFilterArr }) => {
  const posts = useSelector((state) => state.business.posts);
  const business = useSelector((state) => state.business.business);
  const user = useSelector((state) => state.user.user);
  const filters = useSelector((state) => state.business.filters);
  const sideFilterForLikes = useSelector(
    (state) => state.business.filterByMostLiked
  );
  const sideFilterForRecent = useSelector(
    (state) => state.business.filterByMostRecent
  );
  const loadingFilterData = useSelector(
    (state) => state.business.loadingFilterData
  );
  const totalPosts = useSelector((state) => state.business.totalPosts);
  const topPost = useSelector((state) => state.business.topPost);
  const topPostId = useSelector((state) => state.business.topPostId);
  const [offset, setOffSet] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setOffSet(0);
    setHasMore(true);
  }, [filters, sideFilterForRecent, sideFilterForLikes]);

  // /** to remove first object from array */
  // useEffect(() => {
  //   if (topPost) {
  //     let arr = [];
  //     for (let i = 1; i < posts.length; i++) {
  //       arr.push(posts[i]);
  //     }
  //     setFilterArr(arr);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [topPost]);

  const fetchMorePosts = () => {
    if (offset + 20 < totalPosts) {
      setOffSet(offset + 20);
      dispatch(
        addFilteredPosts({
          businessId: business && business[0] ? business[0]._id : "",
          filters: filters,
          value: offset + 20,
          ownerId: user._id,
          sideFilters: { likes: sideFilterForLikes },
        })
      );
    } else setHasMore(false);
  };
  return (
    <>
      <div
        id="scrollableDiv"
        style={{ height: "calc(100vh - 490px)", overflow: "auto" }}
      >
        {/* to display Top Post If any */}
        {/* {topPost && <h5>Top Post</h5>} */}
        {topPost && (
          <UserMessage
            postData={topPostId}
            setSelectedListId={setSelectedListId}
          />
        )}
        {topPost && <hr />}
        <InfiniteScroll
          dataLength={posts ? posts.length : 0}
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={
            posts &&
            posts.length > 20 &&
            offset + 20 < totalPosts &&
            !loadingFilterData ? (
              <div style={{ textAlign: "center", margin: " 40px auto 0" }}>
                {" "}
                <ValueLoader height="40" width="40" />
              </div>
            ) : null
          }
          scrollableTarget="scrollableDiv"
          endMessage={
            posts.length > 20 && !loadingFilterData ? (
              <center>
                <NoMorePost className="noMorePost">
                  No more posts to show
                </NoMorePost>
              </center>
            ) : null
          }
        >
          <ChatContent>
            {!loadingFilterData && posts.length > 0 ? (
              posts.map((i, key) => (
                <UserMessage
                  postData={i}
                  key={key}
                  setSelectedListId={setSelectedListId}
                />
              ))
            ) : loadingFilterData ? (
              <LoaderWrap>
                <ValueLoader />
              </LoaderWrap>
            ) : (
              <center>
                <NoMorePost>No posts to display</NoMorePost>
              </center>
            )}
          </ChatContent>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default PostChat;
