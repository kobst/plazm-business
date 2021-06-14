import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import SectionSlider from "./SectionSlider";
import ProfileImg from "../../../../images/profile-img.png";
import FacebookImg from "../../../../images/Facebook-new.svg";
import TwitterImg from "../../../../images/Twitter-new.svg";
import LinkedInImg from "../../../../images/Linkedin-new.svg";
import InstagramImg from "../../../../images/Instagram-new.svg";
import FavoritesIcon from "../../../../images/favorites.png";
import FavoritesIconFilled from "../../../../images/favorites-filled.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AddBusinessFavorite,
  RemoveBusinessFavorite,
} from "../../../../reducers/userReducer";
import { clearBusinessData } from "../../../../reducers/businessReducer";

const BuisinessHeaderContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 294px;
  @media (max-width: 767px) {
    flex-direction: column;
    height: 200px;
  }
  &.HeaderSpacing {
    @media (max-width: 767px) {
      height: 140px;
    }
  }
  .react-multiple-carousel__arrow {
    min-width: 24px;
    min-height: 24px;
    border-radius: 6px;
    background: rgba(196, 196, 196, 0.15);
  }
  .react-multiple-carousel__arrow::before {
    font-size: 8px;
  }
  .react-multiple-carousel__arrow--left {
    left: calc(4% + -4px);
  }
  .react-multiple-carousel__arrow--right {
    right: calc(4% + -4px);
  }
`;
const CloseDiv = styled.div`
  width: 24px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 17px;
  cursor: pointer;
  top: 17px;
  z-index: 1;
  svg {
    font-size: 24px;
    color: #fff;
  }
`;
const ArrowBack = styled.div`
  background: #ff2e9a;
  border-radius: 3px;
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 15px;
  cursor: pointer;
  top: 15px;
  z-index: 1;
  svg {
    font-size: 34px;
    color: #fff;
  }
  @media (max-width: 767px) {
    width: 24px;
    height: 24px;
  }
`;
const BottomBar = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  bottom: 0;
  z-index: 1;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  align-items: flex-end;
  .favoriteBusiness {
    color: #ee3840;
    cursor: pointer;
  }
  .favoriteBusinessBorder {
    color: #ee3840;
    cursor: pointer;
  }
  @media (max-width: 767px) {
    padding: 10px;
    position: relative;
  }
  &.ProfileHeaderNam {
    justify-content: flex-end;
  }
`;
const BusinessIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 6px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  @media (max-width: 767px) {
    width: 38px;
    height: 38px;
    border: 3px solid #fff;
  }
`;
const ArrowDown = styled.div`
  background: #ff2e9a;
  border-radius: 3px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  svg {
    font-size: 34px;
    color: #fff;
  }
  svg: hover {
    cursor: pointer;
  }
`;

const BusinessNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 0 10px;
  max-width: calc(100% - 60px);
  width: 100%;
  .FavoritesIcon {
    max-width: 18px;
    margin: 0 0 0 10px;
  }
  svg {
    font-size: 18px;
  }
`;

const LeftHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const BusinessName = styled.h1`
  font-size: 20px;
  line-height: normal;
  font-weight: 800;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  width: 100%;
  span {
    max-width: 90%;
    margin: 0 10px 0 0;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;
const SocialIconsWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  margin-left: -2px;
`;
const SocialIcon = styled.div`
  width: 17px;
  height: 17px;
  margin: 0 2px;
  cursor: pointer;
`;

const BuisinessHeader = ({
  setDisplayTab,
  setDisplayBusinessProfile,
  isProfile,
  displayBusinessProfile,
  searchIndex,
  setTabIndex,
  setSearchIndex,
  myFeedIndex,
  setMyFeedIndex,
  listIndex,
  setListIndex,
  favoriteIndex,
  setFavoriteIndex
}) => {
  const history = useHistory();
  const [favoriteBusiness, setFavoriteBusiness] = useState(false);
  const businessProfile = useSelector((state) => state.business.business)[0];
  const [image, setImage] = useState(
    businessProfile.default_image_url
      ? businessProfile.default_image_url
      : ProfileImg
  );
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const find = user.favorites.find((i) => i === businessProfile._id);
    if (find) {
      setFavoriteBusiness(true);
    } else setFavoriteBusiness(false);
  }, [user, businessProfile._id]);

  /*
   * @desc: close tab function to be called on cross icon click
   */
  const closeTab = () => {
    setDisplayTab(false);
    history.push("/");
  };

  /** to add a business to user favorites */
  const addFavorite = async () => {
    const obj = {
      businessId: businessProfile._id,
      userId: user._id,
    };
    await dispatch(AddBusinessFavorite(obj));
  };

  /** to remove a business to user favorites */
  const removeFavorite = async () => {
    const obj = {
      businessId: businessProfile._id,
      userId: user._id,
    };
    await dispatch(RemoveBusinessFavorite(obj));
  };

  /** to return to all business listing */
  const backBusiness = () => {
    dispatch(clearBusinessData());
    if (searchIndex) {
      history.push("/");
      setTabIndex(3);
      setSearchIndex(null);
    } else if (myFeedIndex) {
      history.push("/");
      setTabIndex(4);
      setMyFeedIndex(null);
    } else if (listIndex) {
      history.push("/");
      setTabIndex(7);
      setListIndex(null);
    } else {
      setFavoriteIndex(null)
      history.push("/");
    }
  };
  return (
    <>
      <BuisinessHeaderContent
        className={displayBusinessProfile ? "HeaderSpacing" : ""}
      >
        <ArrowBack>
          <MdKeyboardArrowLeft onClick={() => backBusiness()} />
        </ArrowBack>
        <CloseDiv>
          <IoMdClose onClick={() => closeTab()} />
        </CloseDiv>
        <SectionSlider images={businessProfile.additional_media} />
        <BottomBar className={isProfile ? "ProfileHeaderNam" : ""}>
          <LeftHeader>
            {!isProfile ? (
              <BusinessIcon>
                <img
                  src={image ? image : ProfileImg}
                  alt=""
                  onError={() => setImage(ProfileImg)}
                />
              </BusinessIcon>
            ) : null}
            {!isProfile ? (
              <BusinessNameWrap>
                <BusinessName>
                  <span>{businessProfile.company_name}</span>{" "}
                  {/* business favorite toggle */}
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
                </BusinessName>
                <SocialIconsWrap>
                  {businessProfile.handles.instagram ? (
                    <a
                      href={businessProfile.handles.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SocialIcon>
                        <img src={InstagramImg} alt="" />
                      </SocialIcon>
                    </a>
                  ) : null}
                  {businessProfile.handles.twitter ? (
                    <a
                      href={businessProfile.handles.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SocialIcon>
                        <img src={TwitterImg} alt="" />
                      </SocialIcon>
                    </a>
                  ) : null}
                  {businessProfile.handles.linkedin ? (
                    <a
                      href={businessProfile.handles.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SocialIcon>
                        <img src={LinkedInImg} alt="" />
                      </SocialIcon>
                    </a>
                  ) : null}
                  {businessProfile.handles.facebook ? (
                    <a
                      href={businessProfile.handles.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SocialIcon>
                        <img src={FacebookImg} alt="" />
                      </SocialIcon>
                    </a>
                  ) : null}
                </SocialIconsWrap>
              </BusinessNameWrap>
            ) : null}
          </LeftHeader>
          <ArrowDown>
            {isProfile ? (
              <MdKeyboardArrowUp
                onClick={() => setDisplayBusinessProfile(false)}
              />
            ) : (
              <MdKeyboardArrowDown
                onClick={() => setDisplayBusinessProfile(true)}
              />
            )}
          </ArrowDown>
        </BottomBar>
      </BuisinessHeaderContent>
    </>
  );
};

export default BuisinessHeader;
