import React from "react";
import styled from "styled-components";
import UserMessageEvents from "../../HomeSearch/BusinessListing/Events/UserMessageEvents";
import UserMessage from "../../HomeSearch/BusinessListing/UserMessage";

const FeedListItem = styled.div`
  .background-active {
    background-color: #221e45;
  }
  .background-inactive {
    background-color: #282352;
  }
`;

/** display business details */
const DisplayBusinessDetails = ({
  data,
  id,
  setMyFeedIndex,
  setSelectedListId,
}) => {
  return data ? (
    <FeedListItem>
      <div
        className={id % 2 === 0 ? "background-active" : "background-inactive"}
      >
        {/* to display event for the business */}
        {data.eventSchedule !== null ? (
          <UserMessageEvents
            eventData={data}
            businessInfo={data.business[0]}
            type={"MyFeedEvent"}
            setSearchIndex={setMyFeedIndex}
            myFeedView={true}
          />
        ) : (
          //   to display post for the business
          <UserMessage
            postData={data}
            businessData={data.business[0]}
            listView={true}
            setSelectedListId={setSelectedListId}
            setMyFeedIndex={setMyFeedIndex}
            myFeedView={true}
          />
        )}
      </div>
    </FeedListItem>
  ) : null;
};

export default DisplayBusinessDetails;
