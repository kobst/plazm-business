import styled from "styled-components";

export const UserMessageContent = styled.div`
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
export const UserMsgWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  position: relative;
`;

export const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const ProfileThumbBanner = styled.div`
  width: 100%;
  height: 50px;
  margin: 0;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    max-height: 50px;
  }
`;

export const ProfileThumbBannerFeed = styled.div`
  width: 100%;
  height: 50px;
  margin: 0;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    max-height: 50px;
  }
`;

export const ProfileThumbOverlay = styled.div`
  background: linear-gradient(
    360deg,
    rgba(0, 0, 0, 0.6) -30%,
    rgba(0, 0, 0, 0.6) 100%
  );
  width: 100%;
  position: absolute;
  height: 100%;
  top: 0;
`;

export const ProfileName = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 0;
  font-weight: 700;
  color: #fff;
  position: absolute;
  top: 15px;
  left: 15px;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 93%;
  span {
    font-weight: 700;
    color: #fff;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    cursor: pointer;
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

export const ProfileNameFeed = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 0;
  font-weight: 700;
  color: #fff;
  position: absolute;
  top: 15px;
  left: 15px;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 93%;
  span {
    font-weight: 700;
    color: #fff;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    cursor: pointer;
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

export const DescriptionViewItem = styled.div`
  .background-active {
    background-color: #221e45;
  }
  .background-inactive {
    background-color: #282352;
  }
`;

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

export const RightIcons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 18px;
  justify-content: space-between;
  margin: 0 15px 0 0;
  img {
    margin: 0 0 0 8px;
  }
`;
export const InnerListBanner = styled.div`
  width: 27px;
    height: 27px;
  margin: 0 8px 0 0;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  border: 1px solid #FFFFFF;
  img {
  }
`;

export const InnerOverlay = styled.div`
  background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 153.38%);
  width: 100%;
  position: absolute;
  height: 100%;
  top: 0;
`;

export const ListNameWrap = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 4px 0 0 0;
  font-weight: 700;
  color: #fff;
  position: relative;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  font-family: 'Roboto',sans-serif;
`;

export const ListName = styled.div`
  font-style: normal;
  font-size: 11px;
  line-height: normal;
  margin: 0 0 3px;
  font-weight: 700;
  color: #fff;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ListInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #fff;
  svg {
    margin: 0 2px 0 0;
    @media (max-width: 767px) {
      margin: 0 2px 0 0;
    }
  }
  span {
    margin: 0 5px;
    font-weight: 500;
    font-size: 12px;
    @media (max-width: 767px) {
      margin: 0 2px;
    }
  }
`;

export const ListAuthorName = styled.div`
  font-style: normal;
  font-size: 9px;
  line-height: normal;
  margin: 0;
  font-weight: 700;
  color: #ff2e9a;
  cursor: pointer;
`;

export const FeedDescription = styled.p`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 15px;
  font-weight: 400;
  color: #fff;
  padding: 0%;
  text-align: justify;
  white-space: pre-wrap;
  .mentionData {
    font-size: 13px;
    color: #ff2e9a;
    font-weight: 600;
    cursor: pointer;
  }
`;

export const FeedBigImage = styled.p`
  width: 100%;
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 15px;
  img {
    max-height: 230px;
  }
`;

export const EventBigImage = styled.p`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 15px;
`;

export const TopListHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 15px;
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const RightBuisinessName = styled.div`
  display: flex;
  align-items: center;
  .hex {
  display: block;
  margin: 0 auto;
  position: relative;
  width: 32px;
  height: 30px; /* width * 0.866 */
  background: #fff;
  box-sizing: border-box;
  -webkit-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
  -moz-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
}

.hex-background {
  position: absolute;
  background-color: orange; /*color of the main-background*/
  top: 2px; /* equal to border thickness */
  left: 2px; /* equal to border thickness */
  width: 28px;
  height: 26px;/* width * 0.866 */
  -webkit-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
  -moz-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
}

.hex img {
  position: absolute;
  width: 100%; 
  height: 100%; 
  object-fit: cover;
  -webkit-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
  -moz-clip-path: polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%);
}
`;

export const BuisinessNme = styled.div`
  font-weight: bold;
  font-size: 13px;
  text-align: right;
  text-transform: capitalize;
  color: #FFFFFF;
  text-shadow: 0px 0px 7px #000000;
  margin: 0 5px 0 0;
`;

export const LeftListHeader = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  @media (max-width: 767px) {
    width: 100%;
    margin: 0 0 10px;
  }
`;


export const ShowMoreDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  font-weight: 500;
  font-size: 9px;
  color: #FFFFFF;
  span {
    cursor: pointer;
  }
  .ArrowSm {
    margin: 2px 0 0 4px;
  }
`;

export const ImgThumbWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  img {
    width: 41px;
    height: 30px;
    margin: 0 5px 0 0;
  }
`;