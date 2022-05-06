import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from "react-icons/md";
import ProfileImg from "../../../../images/profile-img.png";
import FacebookImg from "../../../../images/Facebook-new.svg";
import TwitterImg from "../../../../images/Twitter-new.svg";
import LinkedInImg from "../../../../images/Linkedin-new.svg";
import InstagramImg from "../../../../images/Instagram-new.svg";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import FavoritesIcon from "../../../../images/favorites.png";
import FavoritesIconFilled from "../../../../images/favorites-filled.png";
import {
  AddBusinessFavorite,
  RemoveBusinessFavorite,
} from "../../../../reducers/userReducer";
import { clearBusinessData } from "../../../../reducers/businessReducer";
import useStore from "../../useState";



const BuisinessHeaderContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 150px;
  &.NotSlider {
    height: 20px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
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
  @media (max-width: 767px) {
    padding: 10px;
    position: relative;
    min-height: 100px;
  }
  &.ProfileHeaderNam {
    justify-content: flex-end;
  }
  .favoriteBusiness {
    color: red;
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
  /* width: 100%; */
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
const BuisinessHeaderNotClaimed = ({
  setDisplayTab,
  setDisplayBusinessProfile,
  isProfile,
  // searchIndex,
  // setTabIndex,
  // setSearchIndex,
  // setMyFeedIndex,
  // myFeedIndex,
  // setFavoriteIndex,
  // listIndex,
  // setListIndex
}) => {
  const [favoriteBusiness, setFavoriteBusiness] = useState(false);
  const businessProfile = useSelector((state) => state.business.business);
  const [image, setImage] = useState(
    businessProfile[0] ? businessProfile[0].default_image_url : ProfileImg
  );
  const user = useSelector((state) => state.user.user);

  const listIndex = useStore((state) => state.listIndex)
  const searchIndex = useStore((state) => state.listIndex)
  const myFeedIndex = useStore((state) => state.myFeedIndex)

  const setSearchIndex = useStore((state) => state.setSearchIndex)
  const setMyFeedIndex = useStore((state) => state.setMyFeedIndex)
  const setListIndex = useStore((state) => state.setListIndex)
  const setFavoriteIndex = useStore((state) => state.setFavoriteIndex)
  const setTabIndex = useStore((state) => state.setTabSelected)



  const dispatch = useDispatch();
  const history = useHistory();




  useEffect(() => {
    if (businessProfile && businessProfile.length > 0) {
      const find = user.favorites.find((i) => i === businessProfile[0]._id);
      if (find) {
        setFavoriteBusiness(true);
      } else setFavoriteBusiness(false);
    }
  }, [user, businessProfile]);

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
      businessId: businessProfile[0]._id,
      userId: user._id,
    };
    await dispatch(AddBusinessFavorite(obj));
  };

  /** to remove a business to user favorites */
  const removeFavorite = async () => {
    const obj = {
      businessId: businessProfile[0]._id,
      userId: user._id,
    };
    await dispatch(RemoveBusinessFavorite(obj));
  };

  /** to return to all business listing */
  const backBusiness = () => {
    dispatch(clearBusinessData());
    if (searchIndex) {
      history.push("/");
      setTabIndex(1);
      setSearchIndex(null);
    } else if (myFeedIndex) {
      history.push("/");
      setTabIndex(2);
      setMyFeedIndex(null);
    } else if (listIndex) {
      history.push("/");
      setTabIndex(5);
      setListIndex(null);
    } else {
      setFavoriteIndex(null)
      history.push("/");
    }
  };
  return (
    businessProfile.length>0? <>
      <BuisinessHeaderContent
        className={
          isProfile && businessProfile && businessProfile[0].userSub === null
            ? "NotSlider"
            : ""
        }
      >
        <ArrowBack>
          <MdKeyboardArrowLeft onClick={() => backBusiness()} />
        </ArrowBack>
        <CloseDiv>
          <IoMdClose onClick={() => closeTab()} />
        </CloseDiv>
        <BottomBar className={isProfile ? "ProfileHeaderNam" : ""}>
          <LeftHeader>
            {!isProfile ? (
              <BusinessIcon>
                <img
                  src={businessProfile && image ? image : ProfileImg}
                  onError={() => setImage(ProfileImg)}
                  alt=""
                />
              </BusinessIcon>
            ) : null}
          </LeftHeader>
          {!isProfile ? (
            <BusinessNameWrap>
              <BusinessName>
                <span>
                  {businessProfile && businessProfile[0].company_name}
                </span>{" "}
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
                {businessProfile && businessProfile[0].handles.instagram ? (
                  <a
                    href={
                      businessProfile && businessProfile[0].handles.instagram
                    }
                  >
                    <SocialIcon>
                      <img src={InstagramImg} alt="" />
                    </SocialIcon>
                  </a>
                ) : null}
                {businessProfile && businessProfile[0].handles.twitter ? (
                  <a
                    href={businessProfile && businessProfile[0].handles.twitter}
                  >
                    <SocialIcon>
                      <img src={TwitterImg} alt="" />
                    </SocialIcon>
                  </a>
                ) : null}
                {businessProfile && businessProfile[0].handles.linkedin ? (
                  <a
                    href={
                      businessProfile && businessProfile[0].handles.linkedin
                    }
                  >
                    <SocialIcon>
                      <img src={LinkedInImg} alt="" />
                    </SocialIcon>
                  </a>
                ) : null}
                {businessProfile && businessProfile[0].handles.facebook ? (
                  <a href={businessProfile[0].handles.facebook}>
                    <SocialIcon>
                      <img src={FacebookImg} alt="" />
                    </SocialIcon>
                  </a>
                ) : null}
              </SocialIconsWrap>
            </BusinessNameWrap>
          ) : null}
          {!isProfile ? (
            <ArrowDown>
              <MdKeyboardArrowDown
                onClick={() => setDisplayBusinessProfile(true)}
              />
            </ArrowDown>
          ) : null}
        </BottomBar>
      </BuisinessHeaderContent>
    </>:null
  );
};

export default BuisinessHeaderNotClaimed;
