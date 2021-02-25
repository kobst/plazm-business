import React from "react";
import styled from "styled-components";
import ProfileImg from "../../../../images/profile-img.png";
import FacebookImg from "../../../../images/Facebook-new.svg";
import TwitterImg from "../../../../images/Twitter-new.svg";
import LinkedInImg from "../../../../images/Linkedin-new.svg";
import InstagramImg from "../../../../images/Instagram-new.svg";
import { useSelector } from "react-redux";

const BuisinessViewContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 15px;
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

const BuisinessProfileSection = ({ setDisplayTab }) => {
  const businessProfile = useSelector((state) => state.business.business)[0];
  return (
    <>
      <BuisinessViewContent>
        <BusinessIcon>
          <img
            src={
              businessProfile.default_image_url
                ? businessProfile.default_image_url
                : ProfileImg
            }
            alt=""
          />
        </BusinessIcon>
        <BusinessNameWrap>
          <BusinessName>{businessProfile.company_name}</BusinessName>
          <SocialIconsWrap>
            {businessProfile.handles.instagram ? (
              <a href={businessProfile.handles.instagram}>
                <SocialIcon>
                  <img src={InstagramImg} alt="" />
                </SocialIcon>
              </a>
            ) : null}
            {businessProfile.handles.twitter ? (
              <a href={businessProfile.handles.instagram}>
                <SocialIcon>
                  <img src={TwitterImg} alt="" />
                </SocialIcon>
              </a>
            ) : null}
            {businessProfile.handles.linkedin ? (
              <a href={businessProfile.handles.linkedin}>
                <SocialIcon>
                  <img src={LinkedInImg} alt="" />
                </SocialIcon>
              </a>
            ) : null}
            {businessProfile.handles.facebook ? (
              <a href={businessProfile.handles.facebook}>
                <SocialIcon>
                  <img src={FacebookImg} alt="" />
                </SocialIcon>
              </a>
            ) : null}
          </SocialIconsWrap>
        </BusinessNameWrap>
      </BuisinessViewContent>
    </>
  );
};

export default BuisinessProfileSection;
