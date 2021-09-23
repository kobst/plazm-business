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
  padding:0;
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
  width: 100%;
  height: 80px;
  margin: 0 0 15px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    max-height: 80px;
  }
`;

export const InnerOverlay = styled.div`
  background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 153.38%);;
  width: 100%;
  position: absolute;
  height: 100%;
  top: 0;
`;

export const ListNameWrap = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 0;
  font-weight: 700;
  color: #fff;
  position: absolute;
  left: 15px;
  bottom: 15px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 93%;
  @media (max-width: 767px) {
    left: 5px;
  }
`;

export const ListName = styled.div`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
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
      margin: 0 10px 0 0;
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
  color: #FF2E9A;
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

