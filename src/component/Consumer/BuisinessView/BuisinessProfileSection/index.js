import React from 'react';
import styled from 'styled-components';
import ProfileImg from '../../../../images/profile-img.png';
import FacebookImg from '../../../../images/Facebook-new.svg';
import TwitterImg from '../../../../images/Twitter-new.svg';
import LinkedInImg from '../../../../images/Linkedin-new.svg';
import InstagramImg from '../../../../images/Instagram-new.svg';
import {useSelector} from 'react-redux';
import {MdKeyboardArrowUp} from 'react-icons/md';

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

const BuisinessViewContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 15px;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
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
  .favoriteBusiness {
    color: #ee3840;
    cursor: pointer;
  }
  .favoriteBusinessBorder {
    color: #ee3840;
    cursor: pointer;
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

const BuisinessProfileSection = ({setDisplayBusinessProfile}) => {
  const businessProfile = useSelector((state) => state.business.business)[0];

  return (
    <>
      <BuisinessViewContent>
        <LeftSide>
          <LeftHeader>
            <BusinessIcon>
              <img
                src={
                  businessProfile.default_image_url ?
                    businessProfile.default_image_url :
                    ProfileImg
                }
                alt=""
              />
            </BusinessIcon>
            <BusinessNameWrap>
              <BusinessName>
                <span>{businessProfile.company_name}</span>
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
          </LeftHeader>
        </LeftSide>

        {businessProfile.userSub === null ? (
          <ArrowDown>
            <MdKeyboardArrowUp
              onClick={() => setDisplayBusinessProfile(false)}
            />
          </ArrowDown>
        ) : null}
      </BuisinessViewContent>
    </>
  );
};

export default BuisinessProfileSection;
