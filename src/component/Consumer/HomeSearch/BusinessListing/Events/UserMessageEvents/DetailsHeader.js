import React, { useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import moment from "moment";
import BannerImg from "../../../../../../images/sliderimg.png";
import {
  InnerListBanner,
  InnerOverlay,
  ListAuthorName,
  ListInfo,
  ListName,
  ListNameWrap,
} from "../../../../FeedContent/styled";
import { useHistory } from "react-router";

const DetailsHeader = ({ eventData }) => {
  const [listImage, setListImage] = useState(
    eventData.listId.length > 0 && eventData.listId[0].media.length > 0
      ? eventData.listId[0].media[0].image
      : BannerImg
  );
  const history = useHistory();
  /** to display user details */
  const displayUserDetails = () => {
    if (eventData.ownerId) history.push(`/u/${eventData.ownerId[0]._id}`);
  };
  return (
    <InnerListBanner>
      <img src={listImage} onError={() => setListImage(BannerImg)} alt="" />
      <InnerOverlay />
      <ListNameWrap>
        <ListName>{eventData.listId[0].name}</ListName>
        <ListInfo>
          <FaCaretRight />
          {eventData.ownerId && (
            <ListAuthorName onClick={() => displayUserDetails()}>
              <span>{eventData.ownerId[0].name}</span>
            </ListAuthorName>
          )}
          <span>|</span>
          <ListAuthorName>
            Added on{" "}
            {moment(eventData.createdAt).format("MMM DD, YYYY, hh:MMa")} EDT{" "}
          </ListAuthorName>
        </ListInfo>
      </ListNameWrap>
    </InnerListBanner>
  );
};

export default DetailsHeader;
