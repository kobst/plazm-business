import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import moment from "moment";
import styled from "styled-components";
import ProfileImg from "../../../../../images/profile-img.png";
import UserMessage from "../UserMessage";
import UserMessageEvents from "../Events/UserMessageEvents";
import DisplayComment from "../DisplayComments";
import DisplayCommentForEvent from "../DisplayCommentForEvent";
import useOnScreen from "../../../MyFeed/trackElement";
import useStore from "../../../useState";
import {
  ProfileNameFeed,
  ProfileThumbBannerFeed,
  ProfileThumbOverlay,
  TopBuisinessBar,
  HeartIcon,
  RightBuisinessImg,
  BuisinessName,
  ShowMoreDiv,
  BottomShowMoreDiv,
  BuisinessThumbImages,
  BuisinessThumbImg,
  HastagWrap,
  HastagDiv,
} from "../../../FeedContent/styled";

import HeartBorder from "../../../../../images/heart-border.png";
import ArrowSm from "../../../../../images/arrow-sm.png";
import ArrowSmUP from "../../../../../images/arrow-sm-up.png";
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
  padding: 0;
  position: relative;
  border: 1px solid #322c5c;
  border-radius: 10px;
  margin: 5px 15px 0px;
  overflow: hidden;
  cursor: pointer;
  // &.search-active {
  //   &:after {
  //     content: "";
  //     position: absolute;
  //     width: 1px;
  //     height: calc(100% - 20px);
  //     background: #878787;
  //     top: 50px;
  //     left: 26px;
  //     z-index: 1;
  //   }
  // }
`;

const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0;
  margin: 0;
  width: 100%;
  flex-direction: column;
`;

const ProfileThumbBanner = styled.div`
  width: 100%;
  height: 135px;
  margin: 0;
  overflow: hidden;
  position: relative;
  img {
    object-fit: cover;
    height: 135px;
    width: 100%;
  }
`;
//   object-fit: cover;
//height: 204px;

//    width: 100%;
// max-height: 204px;

const ProfileNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
  padding: 0 0 0 11px;
  width: 100%;
  position: relative;
  height: 95px;
  background: linear-gradient(360deg, #07060d 0%, #120f29 100%);
  border-radius: 0px 0px 10px 10px;
`;

const ProfileName = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 11px 0 0px 0;
  font-weight: 700;
  color: #fff;
  .businessNameTitle {
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  svg {
    color: #ff0000;
    margin: 0;
  }
  div {
    cursor: pointer;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  span {
    font-weight: 700;
    color: #fff;
    margin: 0 3px;
  }
  @media (max-width: 1024px) {
    // flex-direction: column;
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
  flex-direction: row;
  display: flex;
  span {
    font-size: 12px;
    color: #ff2e9a;
    font-weight: 700;
    cursor: pointer;
    margin: 0 4px 0 0px;
  }
  .postSpan {
    // margin-left: 4%;
  }
  p {
    display: flex;
    font-size: 12px !important;
    margin: 0 10px 0 0;
    @media (max-width: 767px) {
      margin: 0 5px 0 0 !important;
    }
  }
`;

/** display favorite business */
const DisplayFavoriteBusiness = ({
  data,
  setSelectedListId,
  setListClickedFromSearch,
  setSearchIndex,
}) => {
  const businessInfo =
    data.business && data.business.length > 0 ? data.business[0] : data;

  const search = useSelector((state) => state.myFeed.enterClicked);
  const getUtcHour = new Date().getUTCHours();
  const getUtcMinutes = new Date().getUTCMinutes();
  const currentUtcDay = new Date().getUTCDay();
  const [image, setImage] = useState(businessInfo.default_image_url);

  const ref = useRef()
  const isVisible = useOnScreen(ref)
  const setPostsInView = useStore(state => state.setPostsInView)
  const postsInView = useStore(state => state.postsInView)
  const setSelectedPlace = useStore(state => state.setSelectedPlace)

  // useEffect(() => {
  //   if (isVisible) {
  //     console.log("on screen " + data.company_name)
      
  //     let deepClone = JSON.parse(JSON.stringify(data));
  //     if (!deepClone.businessLocation && deepClone.location) {
  //         deepClone.businessLocation = deepClone.location
  //     }
  //     // console.log(deepClone)
   
  //     setPostsInView([...postsInView, deepClone])

  //   }
  //   if (!isVisible) {
  //     console.log("off screen " + data.company_name)
  //     let _postsInView = postsInView
  //     _postsInView = _postsInView.filter(item => {
  //       return item._id != data._id
  //     })
  //     setPostsInView(_postsInView)
  //   }

  // }, [isVisible])

  useEffect(() => {

    const removePost = () => {
      let _postsInView = postsInView
      _postsInView = _postsInView.filter(item => {
        return item._id != data._id
      })
      setPostsInView(_postsInView)
    }
    if (isVisible) {
      let deepClone = JSON.parse(JSON.stringify(data));
      if (!deepClone.businessLocation && deepClone.location) {
          deepClone.businessLocation = deepClone.location
      }
      // console.log(deepClone)
   
      setPostsInView([...postsInView, deepClone])

    }
    if (!isVisible) {removePost()}

    return () => {removePost()}

  }, [isVisible])

  
  const history = useHistory();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [showDiv, setShowDiv] = useState(false);
  /** to check if business is open/close */
  const checkBusinessOpenClose = () => {
    if (businessInfo.hours_format) {
      for (let i = 0; i < businessInfo.hours_format.length; i++) {
        const startDayIndex = days.indexOf(
          businessInfo.hours_format[i].StartDay
        );
        const endDayIndex = days.indexOf(businessInfo.hours_format[i].EndDay);
        if (currentUtcDay >= startDayIndex && currentUtcDay <= endDayIndex) {
          const time = moment(getUtcHour + ":" + getUtcMinutes, "HH:mm");
          const beforeTime = moment(
            businessInfo.hours_format[i].Start,
            "HH:mm"
          );
          const afterTime = moment(businessInfo.hours_format[i].End, "HH:mm");
          if (time.isBetween(beforeTime, afterTime)) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  };

  /** to display business details page */
  const displayBusinessDetail = () => {
    setSearchIndex(businessInfo._id);
    history.push(`/b/${businessInfo._id}`);
  };


  const handleHover = () => {
    // console.log("hover " + businessInfo.company_name)
    let deepClone = JSON.parse(JSON.stringify(businessInfo));
    deepClone.businessLocation = deepClone.location;
    setSelectedPlace(deepClone);
  }

  const handleLeave = () => {
    // console.log("leave" + businessData.company_name)
    //delay, if selectedPlace is not the same as postData, then cancel. If it is, then set to null
    setSelectedPlace(null)
  }

  return data ? (
    <>
      {!search && businessInfo.company_name !== null ? (
        <UserMsgWrap
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
          ref={ref}
          onClick={() => displayBusinessDetail()}
          className={
            data.eventSchedule !== null ||
            data.data !== null ||
            (data.body !== null && data.type === "Post") ||
            (data.body !== null && data.type === "Events")
              ? "search-active"
              : ""
          }
        >
          <UserMessageContent>
            <ProfileNameHeader>
              <ProfileThumbBanner>
                <img
                  src={businessInfo.default_image_url ? image : ProfileImg}
                  onError={() => setImage(ProfileImg)}
                  alt=""
                />
              </ProfileThumbBanner>
              <TopBuisinessBar>
                {/* <HeartIcon>
                  <img src={HeartBorder} />
                </HeartIcon> */}
                <RightBuisinessImg>
                  <BuisinessName onClick={() => displayBusinessDetail()}>
                    {businessInfo.company_name}
                  </BuisinessName>
                  <div className="hex">
                    <div className="hex-background">
                      <img
                        src={
                          businessInfo.default_image_url ? image : ProfileImg
                        }
                        onError={() => setImage(ProfileImg)}
                        onClick={() => displayBusinessDetail()}
                      />
                    </div>
                  </div>
                </RightBuisinessImg>
              </TopBuisinessBar>

              {/* <BottomShowMoreDiv
                onClick={() => {
                  setShowDiv((prev) => !prev);
                }}
              >
                <ShowMoreDiv>
                  {!showDiv && (
                    <span>
                      Show More <img src={ArrowSm} className="ArrowSm" />
                    </span>
                  )}
                  {showDiv && (
                    <span>
                      Show Less <img src={ArrowSmUP} className="ArrowSm" />
                    </span>
                  )}
                </ShowMoreDiv>
              </BottomShowMoreDiv> */}

              {/* <HastagWrap>
                <HastagDiv>#burger</HastagDiv>
                <HastagDiv>#Credit Card</HastagDiv>
                <HastagDiv>#Fresh Fruits</HastagDiv>
                <HastagDiv>#Takeaway</HastagDiv>
                <HastagDiv>#burger</HastagDiv>
              </HastagWrap> */}
              {showDiv && (
                <ProfileNameWrap>
                  <ProfileName>
                    {/* <div
                      className="businessNameTitle"
                      onClick={() => displayBusinessDetail()}
                    >
                      {businessInfo.company_name}
                    </div> */}
                    <ChatInput>
                      {/* <p>
                      <span className="postSpan">
                        245
                      </span>{" "}
                      Followers
                    </p> */}
                      <p>
                        <span className="postSpan">
                          {data.totalPosts && data.totalPosts.length > 0
                            ? data.totalPosts[0].totalPosts
                            : 0}
                        </span>{" "}
                        Posts
                      </p>
                    </ChatInput>
                    {/* <BuisinessThumbImages>
                    <BuisinessThumbImg><img src="https://picsum.photos/200/300" /></BuisinessThumbImg>
                    <BuisinessThumbImg><img src="https://picsum.photos/200/300" /></BuisinessThumbImg>
                    <BuisinessThumbImg><img src="https://picsum.photos/200/300" /></BuisinessThumbImg>
                    <BuisinessThumbImg><img src="https://picsum.photos/200/300" /></BuisinessThumbImg>
                  </BuisinessThumbImages> */}
                  </ProfileName>
                </ProfileNameWrap>
              )}
            </ProfileNameHeader>
          </UserMessageContent>
        </UserMsgWrap>
      ) : (data.body !== null && data.type === "Post" && search) ||
        (data.data !== null && search) ? (
        <ProfileThumbBannerFeed>
          <img
            src={businessInfo.default_image_url ? image : ProfileImg}
            onError={() => setImage(ProfileImg)}
            alt=""
          />
          <ProfileThumbOverlay />
          <ProfileNameFeed>
            <span>{businessInfo.company_name}</span>
          </ProfileNameFeed>
        </ProfileThumbBannerFeed>
      ) : null}

      {data.eventSchedule !== null ? (
        <UserMessageEvents
          eventData={data}
          businessInfo={businessInfo}
          setSearchIndex={setSearchIndex}
          myFeedView={true}
          setMyFeedIndex={setSearchIndex}
          setSelectedListId={setSelectedListId}
        />
      ) : data.data !== null ? (
        <UserMessage
          postData={data}
          businessData={businessInfo}
          listView={true}
          setSelectedListId={setSelectedListId}
          setListClickedFromSearch={setListClickedFromSearch}
          type="search"
          myFeedView={true}
          setMyFeedIndex={setSearchIndex}
        />
      ) : data.body !== null && data.type === "Post" ? (
        <DisplayComment
          postData={data}
          businessData={businessInfo}
          setSelectedListId={setSelectedListId}
        />
      ) : data.body !== null && data.type === "Events" ? (
        <DisplayCommentForEvent postData={data} businessData={businessInfo} />
      ) : search && businessInfo.company_name !== null ? (
        <UserMsgWrap
          handleHover={handleHover}
          handleLeave={handleLeave}
          className={
            data.eventSchedule !== null ||
            data.data !== null ||
            (data.body !== null && data.type === "Post") ||
            (data.body !== null && data.type === "Events")
              ? "search-active"
              : ""
          }
        >
          <UserMessageContent>
            <ProfileNameHeader>
              <ProfileThumbBanner>
                <img
                  src={businessInfo.default_image_url ? image : ProfileImg}
                  onError={() => setImage(ProfileImg)}
                  alt=""
                />
                {/* {businessInfo.hours_format &&
                businessInfo.hours_format.length === 0 ? (
                  <div className="CloseDiv">Closed</div>
                ) : checkBusinessOpenClose() === true ? null : (
                  <div className="CloseDiv">Closed</div>
                )} */}
              </ProfileThumbBanner>

              <ProfileNameWrap>
                <ProfileName>
                  <div
                    className="businessNameTitle"
                    onClick={() => displayBusinessDetail()}
                  >
                    {businessInfo.company_name}
                  </div>
                  <ChatInput>
                    <p>
                      <span className="postSpan">
                        {data.totalPosts && data.totalPosts.length > 0
                          ? data.totalPosts[0].totalPosts
                          : 0}
                      </span>{" "}
                      Posts
                    </p>
                  </ChatInput>
                </ProfileName>
              </ProfileNameWrap>
            </ProfileNameHeader>
          </UserMessageContent>
        </UserMsgWrap>
      ) : null}
    </>
  ) : null;
};

export default DisplayFavoriteBusiness;
