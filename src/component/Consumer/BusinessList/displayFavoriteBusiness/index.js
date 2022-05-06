import React from "react";
import styled from "styled-components";
import ProfileImg from "../../../../images/profile-img.png";
import { useHistory } from "react-router";
import UserMessageEvents from "../../HomeSearch/BusinessListing/Events/UserMessageEvents";
import UserMessage from "../../HomeSearch/BusinessListing/UserMessage";
import {
  ProfileName,
  ProfileThumbBanner,
  ProfileThumbOverlay,
} from "../../FeedContent/styled";

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

/** display favorite business */
const DisplayFavoriteBusiness = ({ data, setFavoriteIndex }) => {
  const history = useHistory();

  /** to display business details page */
  const displayBusinessDetail = () => {
    setFavoriteIndex(data.business[0]._id);
    history.push(`/b/${data.business[0]._id}`);
  };
  return (
    <>
      <UserMsgWrap>
        <ProfileThumbBanner onClick={() => displayBusinessDetail()}>
          <img src={data.business[0].default_image_url || ProfileImg} alt="" />
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
          myFeedView={true}
          setSearchIndex={setFavoriteIndex}
        />
      ) : (
        //   to display post for the business
        <UserMessage
          postData={data}
          businessData={data.business[0]}
          listView={true}
          myFeedView={true}
          setMyFeedIndex={setFavoriteIndex}
        />
      )}
    </>
  );
};

export default DisplayFavoriteBusiness;
