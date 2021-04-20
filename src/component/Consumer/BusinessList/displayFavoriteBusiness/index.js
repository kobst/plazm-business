import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ProfileImg from "../../../../images/profile-img.png";
import BusinessHashTags from "../businessHashtags";
import FavoritesIcon from "../../../../images/favorites.png";
import FavoritesIconFilled from "../../../../images/favorites-filled.png";
import {
  AddBusinessFavorite,
  RemoveUserBusinessFavorite,
} from "../../../../reducers/userReducer";
import moment from "moment";

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
  :nth-child(even) {
    background-color: #282352;
  }
  :nth-child(odd) {
    background-color: #221e45;
  }
`;

const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0;
  margin: 15px 0;
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
  padding: 0 25px 15px 0px;
  width: 100%;
  @media (max-width: 1024px) {
    padding: 0 45px 15px 0px;
  }
`;

const ProfileName = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 7px 0 0px 0;
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
`;

const ChatInput = styled.div`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
  width: 100%;
  span {
    font-size: 13px;
    color: #ff2e9a;
    font-weight: 600;
    cursor: pointer;
  }
  .postSpan {
    margin-left: 4%;
  }
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0px;
  align-items: center;
  flex-wrap: wrap;
`;

/** display favorite business */
const DisplayFavoriteBusiness = ({ data }) => {
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
    for (let i = 0; i < data.favorites.hours_format.length; i++) {
      const startDayIndex = days.indexOf(data.favorites.hours_format[i].StartDay);
      const endDayIndex = days.indexOf(data.favorites.hours_format[i].EndDay);
      if (currentUtcDay >= startDayIndex && currentUtcDay <= endDayIndex) {
        const time = moment(getUtcHour + ":" + getUtcMinutes, "HH:mm");
        const beforeTime = moment(
          data.favorites.hours_format[i].Start,
          "HH:mm"
        );
        const afterTime = moment(data.favorites.hours_format[i].End, "HH:mm");
        if (time.isBetween(beforeTime, afterTime)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false
      }
    }
  };

  useEffect(() => {
    const find = user.favorites.find((i) => i === data.favorites._id);
    if (find) {
      setFavoriteBusiness(true);
    } else setFavoriteBusiness(false);
  }, [user, data.favorites._id]);

  /** to add a business to user favorites */
  const addFavorite = async () => {
    const obj = {
      businessId: data.favorites._id,
      userId: user._id,
    };
    await dispatch(AddBusinessFavorite(obj));
  };

  /** to remove a business to user favorites */
  const removeFavorite = async () => {
    const obj = {
      businessId: data.favorites._id,
      userId: user._id,
    };
    await dispatch(RemoveUserBusinessFavorite(obj));
  };
  return (
    <>
      <UserMsgWrap>
        <UserMessageContent>
          <ProfileNameHeader>
            <ProfileThumb>
              <img
                src={
                  data.favorites.default_image_url
                    ? data.favorites.default_image_url
                    : ProfileImg
                }
                alt=""
              />
            </ProfileThumb>
            <ProfileNameWrap>
              <ProfileName>
                <div
                  onClick={() =>
                    (window.location.href = `/b/${data.favorites._id}`)
                  }
                >
                  {data.favorites.company_name}
                </div>
                <RightWrap>
                  {favoriteBusiness ? (
                    <img
                      src={FavoritesIconFilled}
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
                  )}
                  {data.favorites.hours_format.length === 0 ? (
                    <div>Close</div>
                  ) : checkBusinessOpenClose() === true ? (
                    <div>Open</div>
                  ) : (
                    <div>Close</div>
                  )}
                </RightWrap>
              </ProfileName>
              <ChatInput>
                <p>
                  <span>{data.totalFollowers}</span> Followers{" "}
                  <span className="postSpan">{data.totalPosts}</span> Posts
                </p>
              </ChatInput>
              <BusinessHashTags data={data.favorites.filter_tags} />
            </ProfileNameWrap>
          </ProfileNameHeader>
        </UserMessageContent>
      </UserMsgWrap>
    </>
  );
};

export default DisplayFavoriteBusiness;
