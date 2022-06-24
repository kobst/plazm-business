import styled from "styled-components";

export const UserProfileBody = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 60px 0 0 60px;
  @media (max-width: 767px) {
    margin: 120px 0 0 60px;
  }
`;

export const UserProfileContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  flex-direction: column;
`;

export const ProfileTopBanner = styled.div`
  display: flex;
  width: 100%;
  height: 203px;
  overflow: hidden;
  border-radius: 0 0 10px 0;
  position: relative;
  @media (max-width: 991px) {
    overflow: visible;
  }
  img {
    width: 100%;
    height: 100%;
    max-height: 203px;
  }
`;

export const BackgroundOpacity = styled.div`
  height: 71px;
  width: 100%;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.54) 2.05%,
    rgba(0, 0, 0, 0) 49.3%
  );
  position: absolute;
  bottom: 0;
`;

export const PanelContent = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const LeftPanel = styled.div`
  display: flex;
  width: 225px;
  flex-direction: column;
  @media (max-width: 767px) {
    margin: 0 auto;
  }
`;

export const TopProfileDetails = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background: #1c1939;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 5px 5px;
  position: relative;
  align-items: center;
  min-height: 210px;
  margin: 0 0 10px;
`;

export const UserProfileImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 134px;
  height: 134px;
  border: 1px solid #ffffff;
  overflow: hidden;
  border-radius: 50%;
  margin: -65px auto 24px;
  position: absolute;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const UserProfileName = styled.h2`
  margin: 90px auto 0;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  padding: 0;
  display: flex;
  flex-direction: column;
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    color: #c4c4c4;
    margin: 5px auto 0;
  }
`;

export const UserProfileDescription = styled.p`
  margin: 11px auto 0;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.03em;
  color: #ffffff;
  padding: 0 10px;
`;

export const BottomButtonList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background: #1c1939;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 5px 5px;
  position: relative;
  align-items: center;
  margin: 0 0 10px;
  padding: 18px 1px;
  justify-content: center;
`;

export const ListButtons = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  height: 39px;
  svg {
    font-size: 18px;
    margin-right: 21px;
  }
  cursor: pointer;
  img {
    filter: brightness(0) invert(1);
    margin-right: 21px;
  }
  :hover {
    color: #ff2e9a;
    background: #292549;
    border-radius: 5px;
    img {
      filter: inherit;
    }
  }
  &.active {
    color: #ff2e9a;
    background: #292549;
    border-radius: 5px;
    border: 0 !important;
    img {
      filter: inherit;
    }
  }
`;

export const RightPanel = styled.div`
  display: flex;
  width: 100%;
  max-width: calc(100% - 227px);
  @media (max-width: 767px) {
    max-width: 100%;
    padding: 0 15px 15px;
  }
`;
