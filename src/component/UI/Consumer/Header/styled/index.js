import styled from "styled-components";

export const HeaderBar = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  z-index: 110;
  background-color: #f3f3f3;
  align-items: center;
  justify-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  @media (max-width: 1199px) {
    width: 100%;
  }
  @media (max-width: 767px) {
    height: auto;
    flex-direction: column;
  }
`;

export const LeftHeaderBar = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  @media (max-width: 767px) {
    width: 100%;
    border-bottom: 1px solid #d6d6d6;
  }
`;
export const UserNameCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #3f3777;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  margin: 17px;
`;

export const BreadcrumbsDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 16px;
  @media (max-width: 767px) {
    margin: 16px 0;
  }
`;

export const BackArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
`;

export const BreadcrumbsText = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: #656565;
  margin: 0 0 0 12px;
  font-family: "Roboto", sans-serif;
  span {
    color: #261f55;
    margin: 0 0 0 5px;
    font-weight: 900;
    &.crumb-text {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      max-width: 150px;
      overflow: hidden;
    }
  }
  div {
    color: #656565;
    margin: 0 0 0 5px;
    font-weight: 900;
    &.crumb-text {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      max-width: 150px;
      overflow: hidden;
    }
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

export const GridBtnWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 16px;
`;

export const RightHeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  position: relative;
  @media (max-width: 767px) {
    width: 100%;
    padding-left: 15px;
  }
  .ChangeMode {
    border: 0;
    background: transparent;
    cursor: pointer;
    font-size: 0;
  }
`;

export const LocationWrap = styled.div`
  display: flex;
  align-items: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #393939;
`;

export const UserImgWrap = styled.div`
  display: flex;
  align-items: center;
  border-left: 1px solid #d6d6d6;
  padding: 0 18px;
  height: 60px;
`;

export const UserImg = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ffffff;
  cursor: pointer;
  img {
    border-radius: 50%;
    width: 25px;
    height: 25px;
  }
`;

export const LogoutSection = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 60px;
  right: 0;
  width: 128px;
  background: #f3f3f3;
  box-shadow: 0px 10px 8px rgba(44, 39, 56, 0.15);
  border-top: 1px solid #d6d6d6;
  padding: 0;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: right;
    width: 100%;
    li {
      list-style: none;
      margin: 0;
      padding: 0;
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      color: #575757;
      padding: 8px 12px;
      text-transform: capitalize;
      cursor: pointer;
      :last-child {
        color: #ff2730;
      }
      .logoutDiv {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
      }
      &.lightGrayBg {
        background: #ededed;
      }
    }
  }
`;

export const LogoutComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282352;
  box-shadow: 0px 32px 70px rgba(0, 0, 0, 0.25);
  padding: 30px;
  width: 100%;
  width: 360px;
  color: #fff;
  flex-direction: column;
  @media (max-width: 767px) {
    padding: 20px 15px;
    width: 100%;
    max-width: 360px;
  }
`;

export const AlertIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  font-size: 42px;
  margin: 0 0 20px;
`;

export const LogoutMsg = styled.p`
  display: flex;
  align-items: center;
  margin: 0 0 20px;
  padding: 0;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
`;

export const LogoutBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  button {
    :first-child {
      margin-right: 10px;
    }
  }
`;
