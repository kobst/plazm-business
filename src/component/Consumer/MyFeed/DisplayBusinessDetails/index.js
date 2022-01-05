import React from "react";
import styled from "styled-components";
import ProfileImg from "../../../../images/profile-img.png";
import UserMessage from "../../HomeSearch/BusinessListing/UserMessage";
import UserMessageEvents from "../../HomeSearch/BusinessListing/Events/UserMessageEvents";

import { useHistory } from "react-router";
import {
  ProfileThumbBanner,
  ProfileThumbOverlay,
  ProfileName,
} from "../../FeedContent/styled";

import useStore from "../../useState";

const UserMsgWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  position: relative;
`;

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
  id
}) => {

  const setSelectedListId = useStore((state) => state.setSelectedListId)

  const setMyFeedIndex = useStore((state) => state.setMyFeedIndex)



  const history = useHistory();

  /** to display business details page */
  const displayBusinessDetail = () => {
    setMyFeedIndex(data.business[0]._id);
    history.push(`/b/${data.business[0]._id}`);
  };

  return data ? (
    <FeedListItem>
      <div
        className={id % 2 === 0 ? "background-active" : "background-inactive"}
      >
        <UserMsgWrap>
          <ProfileThumbBanner onClick={() => displayBusinessDetail()}>
            <img
              src={data.business[0].default_image_url || ProfileImg}
              alt=""
            />
            <ProfileThumbOverlay />
            <ProfileName>
              <span>{data.business[0].company_name}</span>
            </ProfileName>
          </ProfileThumbBanner>
        </UserMsgWrap>

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
