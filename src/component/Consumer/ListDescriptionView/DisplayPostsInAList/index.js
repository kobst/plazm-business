import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import ProfileImg from "../../../../images/profile-img.png";
import FavoritesIcon from "../../../../images/favorites.png";
import RedHeartIcon from "../../../../images/heart.png";
import UserMessage from "../../HomeSearch/BusinessListing/UserMessage";
import {
  AddBusinessFavorite,
  RemoveBusinessFavorite,
} from "../../../../reducers/userReducer";
import BusinessHashTags from "../../BusinessList/businessHashtags";

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
const UserMsgWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  position: relative;
  margin-top: 15px;
  :nth-child(even) {
    background-color: #282352;
  }
  :nth-child(odd) {
    background-color: #221e45;
  }
  &:after {
    content: "";
    position: absolute;
    width: 1px;
    height: calc(100% - 4px);
    background: #878787;
    top: 35px;
    left: 26px;
  }
`;

const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0 0 5px 0;
  margin: 0;
`;

const ProfileThumb = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 10px 0 0;
  border: 3px solid #ffffff;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 30px;
    height: 30px;
  }
`;
const ProfileNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: calc(100% - 40px);
  padding: 0 0 0 0px;
  width: 100%;
  @media (max-width: 1024px) {
    padding: 0 0px 15px 0px;
  }
`;

const ProfileName = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 0;
  font-weight: 700;
  color: #ff2e9a;
  svg {
    color: #ff0000;
    margin: 0;
  }
  div {
    cursor: pointer;
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  span {
    font-weight: 700;
    color: #fff;
    margin: 0 3px;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
  }
  div {
    cursor: pointer;
  }
  .ListName {
    max-width: calc(100% - 95px);
    @media (max-width: 767px) {
      max-width: 100%;
      margin: 0 0 5px;
    }
  }
`;

const ChatInput = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
  width: 100%;
  span {
    font-size: 12px;
    color: #ff2e9a;
    font-weight: 700;
    cursor: pointer;
    margin: 0 4px 0 0px;
  }
  .postSpan {
    margin-left: 4%;
  }
  p {
    display: flex;
    font-size: 12px !important;
    @media (max-width: 767px) {
      margin: 5px 0 0 !important;
    }
  }
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0px;
  align-items: center;
  flex-wrap: wrap;
  .OpenDiv {
    font-size: 10px;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
    background: #3fce56;
    border-radius: 50px;
    padding: 3px 11px;
  }
  .CloseDiv {
    font-size: 10px;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
    background: #fe6f5b;
    border-radius: 50px;
    padding: 3px 11px;
  }
  .favoriteBusiness,
  .favoriteBusinessBorder {
    margin: 0 0 0 11px;
  }
`;

/** display business details */
const DisplayPostInAList = ({ data }) => {
  const [favoriteBusiness, setFavoriteBusiness] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const getUtcHour = new Date().getUTCHours();
  const getUtcMinutes = new Date().getUTCMinutes();
  const currentUtcDay = new Date().getUTCDay();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  /** to check if business is open/close */
  const checkBusinessOpenClose = () => {
    for (let i = 0; i < data.business[0].hours_format.length; i++) {
      const startDayIndex = days.indexOf(
        data.business[0].hours_format[i].StartDay
      );
      const endDayIndex = days.indexOf(data.business[0].hours_format[i].EndDay);
      if (currentUtcDay >= startDayIndex && currentUtcDay <= endDayIndex) {
        const time = moment(getUtcHour + ":" + getUtcMinutes, "HH:mm");
        const beforeTime = moment(
          data.business[0].hours_format[i].Start,
          "HH:mm"
        );
        const afterTime = moment(data.business[0].hours_format[i].End, "HH:mm");
        if (time.isBetween(beforeTime, afterTime)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  };

  /** to check if the business is liked */
  useEffect(() => {
    const find = user.favorites.find((i) => i === data.business[0]._id);
    if (find) {
      setFavoriteBusiness(true);
    } else setFavoriteBusiness(false);
  }, [user, data]);

  /** to add a business to user favorites */
  const addFavorite = async () => {
    const obj = {
      businessId: data.business[0]._id,
      userId: user._id,
    };
    await dispatch(AddBusinessFavorite(obj));
  };

  /** to remove a business to user favorites */
  const removeFavorite = async () => {
    const obj = {
      businessId: data.business[0]._id,
      userId: user._id,
    };
    await dispatch(RemoveBusinessFavorite(obj));
  };

  return data ? (
    <>
      <UserMsgWrap>
        <UserMessageContent>
          <ProfileNameHeader>
            <ProfileThumb>
              <img
                src={
                  data.business[0].default_image_url
                    ? data.business[0].default_image_url
                    : ProfileImg
                }
                alt=""
              />
            </ProfileThumb>
            <ProfileNameWrap>
              <ProfileName>
                <div
                  onClick={() =>
                    (window.location.href = `/b/${data.business[0]._id}`)
                  }
                >
                  {data.business[0].company_name}
                </div>
                <RightWrap>
                  {data.business[0].hours_format.length === 0 ? (
                    <div className="CloseDiv">Close</div>
                  ) : checkBusinessOpenClose() === true ? (
                    <div className="OpenDiv">Open</div>
                  ) : (
                    <div className="CloseDiv">Close</div>
                  )}

                  {data.business[0].hours_format.length > 0 &&
                  checkBusinessOpenClose() === true ? (
                    favoriteBusiness ? (
                      <img
                        src={RedHeartIcon}
                        onClick={() => removeFavorite()}
                        className="favoriteBusiness"
                        alt=""
                      />
                    ) : (
                      <img
                        src={FavoritesIcon}
                        onClick={() => addFavorite()}
                        className="favoriteBusinessBorder"
                        alt=""
                      />
                    )
                  ) : null}
                </RightWrap>
              </ProfileName>
              <ChatInput>
                <p>
                  <span>
                    {data.business[0].favorites !== null
                      ? data.business[0].favorites.length
                      : 0}
                  </span>{" "}
                  Followers{" "}
                  <span className="postSpan">
                    {data.totalPosts.length > 0
                      ? data.totalPosts[0].totalPosts
                      : 0}
                  </span>{" "}
                  Posts
                </p>
              </ChatInput>
              <BusinessHashTags data={data.business[0].filter_tags} />
            </ProfileNameWrap>
          </ProfileNameHeader>
        </UserMessageContent>
      </UserMsgWrap>

      <UserMessage
        postData={data}
        businessData={data.business[0]}
        listView={true}
      />
    </>
  ) : null;
};

export default DisplayPostInAList;
