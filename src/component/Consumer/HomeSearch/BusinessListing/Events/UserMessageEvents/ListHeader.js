import React, { useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import moment from "moment";
import BannerImg from "../../../../../../images/sliderimg.png";
import {
  InnerListBannerList,
  InnerOverlayList,
  ListAuthorNameList,
  ListInfoList,
  ListNameList,
  ListNameWrapList,
  EventListImg,
  BuisinessName,
  RightBuisinessImg,
  LeftFirst,
} from "../../../../FeedContent/styled";
import { useHistory } from "react-router";

const DetailsHeader = ({ eventData, businessInfo }) => {
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
    <InnerListBannerList>
      <LeftFirst>
        <EventListImg>
          <img src={listImage} onError={() => setListImage(BannerImg)} alt="" />
        </EventListImg>
        <ListNameWrapList>
          <ListNameList>{eventData.listId[0].name}</ListNameList>
          <ListInfoList>
            <FaCaretRight />
            {eventData.ownerId && (
              <ListAuthorNameList onClick={() => displayUserDetails()}>
                <span>{eventData.ownerId[0].name}</span>
              </ListAuthorNameList>
            )}
            <span>|</span>
            <ListAuthorNameList>
              Added on{" "}
              {moment(eventData.createdAt).format("MMM DD, YYYY, hh:MMa")}
            </ListAuthorNameList>
          </ListInfoList>
        </ListNameWrapList>
      </LeftFirst>
      <RightBuisinessImg>
        <BuisinessName>{businessInfo.company_name}</BuisinessName>
        <div className="hex">
          <div className="hex-background">
            <img src={businessInfo.default_image_url} />
          </div>
        </div>
      </RightBuisinessImg>
    </InnerListBannerList>
  );
};

export default DetailsHeader;
