import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import {  MdKeyboardArrowDown } from "react-icons/md";
import ProfileImg from "../../../../images/profile-img.png";
import FacebookImg from "../../../../images/Facebook-new.svg";
import TwitterImg from "../../../../images/Twitter-new.svg";
import LinkedInImg from "../../../../images/Linkedin-new.svg";
import InstagramImg from "../../../../images/Instagram-new.svg";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const BuisinessHeaderContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 150px;
  &.NotSlider{
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
  &.ProfileHeaderNam{
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
`;

const BusinessNameWrap = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 85%;
  @media (max-width: 767px) {
    max-width: 75%;
  }
`;
const BusinessName = styled.h1`
  font-size: 20px;
  line-height: normal;
  font-weight: 800;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0 30px 0 10px;
  padding: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  @media (max-width: 767px) {
    font-size: 14px;
    margin: 0 10px;
  }
`;
const SocialIconsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
const SocialIcon = styled.div`
  width: 17px;
  height: 17px;
  margin: 0 2px;
  cursor: pointer;
`;

const BuisinessHeaderNotClaimed = ({
  setDisplayTab,
  setDisplayBusinessProfile,
  isProfile,
}) => {
  const businessProfile = useSelector((state) => state.business.business);
  const history = useHistory();

  /*
   * @desc: close tab function to be called on cross icon click 
   */
  const closeTab = () => {
    setDisplayTab(false);
    history.push("/")
  }
  return (
    <>
      <BuisinessHeaderContent className={isProfile&&businessProfile&&businessProfile[0].userSub===null?"NotSlider":''}>
        <CloseDiv>
          <IoMdClose onClick={() => closeTab()} />
        </CloseDiv>
        <BottomBar className={isProfile?"ProfileHeaderNam":''}>
          {!isProfile ? (
            <BusinessIcon>
              <img
                src={
                  businessProfile&&businessProfile[0].default_image_url
                    ? businessProfile[0].default_image_url
                    : ProfileImg
                }
                alt=""
              />
            </BusinessIcon>
          ) : null}
          {!isProfile ? (
            <BusinessNameWrap>
              <BusinessName>{businessProfile&&businessProfile[0].company_name}</BusinessName>
              <SocialIconsWrap>
                {businessProfile&&businessProfile[0].handles.instagram ? (
                  <a href={businessProfile&&businessProfile[0].handles.instagram}>
                    <SocialIcon>
                      <img src={InstagramImg} alt="" />
                    </SocialIcon>
                  </a>
                ) : null}
                {businessProfile&&businessProfile[0].handles.twitter ? (
                  <a href={businessProfile&&businessProfile[0].handles.twitter}>
                    <SocialIcon>
                      <img src={TwitterImg} alt="" />
                    </SocialIcon>
                  </a>
                ) : null}
                {businessProfile&&businessProfile[0].handles.linkedin ? (
                  <a href={businessProfile&&businessProfile[0].handles.linkedin}>
                    <SocialIcon>
                      <img src={LinkedInImg} alt="" />
                    </SocialIcon>
                  </a>
                ) : null}
                {businessProfile&&businessProfile[0].handles.facebook ? (
                  <a href={businessProfile[0].handles.facebook}>
                    <SocialIcon>
                      <img src={FacebookImg} alt="" />
                    </SocialIcon>
                  </a>
                ) : null}
              </SocialIconsWrap>
            </BusinessNameWrap>
          ) : null}
          {!isProfile ?<ArrowDown>
              <MdKeyboardArrowDown
                onClick={() => setDisplayBusinessProfile(true)}
              />
              </ArrowDown>
            : null}
        </BottomBar>
      </BuisinessHeaderContent>
    </>
  );
};

export default BuisinessHeaderNotClaimed;
