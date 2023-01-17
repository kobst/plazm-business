import styled from "styled-components";

export const BottomButtonsBar = styled.div`
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 10px;
  }
  textarea {
    min-height: 100px;
    font-weight: 500;
    color: #000;
    margin: 0 0 14px;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    padding: 0 0 15px;
  }
  @media (max-width: 767px) {
    padding-bottom: 15px;
  }
  @media (max-width: 379px) {
    flex-direction: column;
  }
  .BackButtonCreateList {
    margin-right: auto;
    margin-left: 0;
    left: 0px;
    position: relative;
    display: none;
  }
  button {
    @media (max-width: 379px) {
      width: 100%;
      margin: 0 0 5px;
    }
  }
`;

export const PostContent = styled.div`
  width: 100%;
  color: #fff;
`;

export const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 0 15px;
`;

// export const Heading = styled.h1`
//   font-family: "Roboto";
//   font-style: normal;
//   font-weight: 800;
//   font-size: 18px;
//   @media (max-width: 767px) {
//     font-size: 14px;
//     line-height: normal;
//   }
// `;

export const Heading = styled.h1`
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 21px;
  font-family: "Roboto";
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`;

export const AddYourPostBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 14px;
  border: 1px dashed #ffffff;
  align-items: center;
  padding: 13px;
  @media (max-width: 767px) {
    padding: 7px;
  }
`;

export const AddYourPostLabel = styled.label`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  margin: 0 0 0 10px;
  max-width: calc(100% - 35px);
  @media (max-width: 767px) {
    font-size: 12px;
    margin: 0;
  }
`;

export const AddImageDiv = styled.div`
  background: #ff2e9a;
  border-radius: 3px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  cursor: pointer;
  svg {
    font-size: 34px;
    color: #fff;
  }
`;

export const ErrorDiv = styled.div`
  color: #ff0000;
  font-weight: 600;
  font-size: 12px;
  margin: 0;
  margin-bottom: 10px;
`;

export const RightButtons = styled.div`
  color: #fff;
  display: flex;
  margin-left: auto;
  button {
    :first-child {
      margin-right: 10px;
    }
  }
`;

export const LeftButtons = styled.div`
  color: #fff;
  display: flex;
`;

export const TabsSectionContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 100%;
  margin: 15px 0 22px;
  ul {
    background-color: #2b2652 !important;
  }
  &.CreateListTabs {
    .react-tabs {
      display: flex;
      width: 100%;
      border: 0;
      color: #fff;
      position: relative;
      flex-direction: column;
      background: transparent;
    }
    .react-tabs__tab {
      height: auto;
      width: 50%;
      list-style: none;
      padding: 18px 0;
      cursor: pointer;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: "Roboto";
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      text-transform: capitalize;
      color: #746f9f;
      background-color: inherit;
      background: #282352;
      border-bottom: 1px dashed #fff;
    }
    .react-tabs__tab-list {
      display: flex;
      flex-direction: row;
      width: 100%;
      margin: 0 !important;
      padding: 0;
      justify-content: space-between;
    }
    .react-tabs__tab.react-tabs__tab--selected {
      background: #332e5a;
      border: 1px dashed #b1abea;
      color: #fff;
      border-radius: 5px 5px 0px 0px;
      border-bottom: 0;
      margin-bottom: -1px;
    }
    .react-tabs__tab-panel {
      background: #332e5a;
      border: 1px dashed #b1abea;
      border-radius: 5px;
      height: 210px;
      overflow: auto;
      position: relative;
      border-top: 0;
      .ReactCrop {
        overflow: auto !important;
        min-height: 150px;
        ::-webkit-scrollbar {
          width: 6px;
          height: 5px;
          cursor: pointer;
        }
        ::-webkit-scrollbar-track {
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: #000;
          border-radius: 10px;
          cursor: pointer;
          width: 6px;
          height: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #000;
        }
      }
      .ConfirmImgBtn {
        position: absolute;
        bottom: 0;
        right: 3px;
        border: 0;
        background: transparent;
        cursor: pointer;
      }
      .PreviewImg {
        transform: translate(-50%, -50%);
        margin-top: -21px;
        position: absolute;
        text-align: center;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        top: 50%;
        left: 50%;
      }
      .CropAgainContainer {
        background: rgba(0, 0, 0, 0.6);
        width: 100%;
        height: 43px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 0;
        overflow: hidden;
      }
      .CropAgainBtn {
        background: #0094ff;
        border-radius: 2px;
        font-family: "Roboto";
        font-style: normal;
        font-weight: 700;
        font-size: 9px;
        line-height: 11px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #ffffff;
        border: 0;
        padding: 6px 33px;
        cursor: pointer;
      }
      .CloseCropCross {
        position: absolute;
        cursor: pointer;
        top: 2px;
        right: 2px;
      }
    }
    .react-tabs__tab:focus {
      box-shadow: none;
    }
    .react-tabs__tab:focus:after {
      display: none;
    }
  }
`;

export const ContentTabPanel = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  ${(props) => props.hide && "display: none"}
`;

export const PlusIcon = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: #b1abea;
  font-size: 48px;
  margin: 0 0 20px;
`;

export const ClickText = styled.p`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #c1c1c1;
  margin: 0;
  padding: 0;
`;

export const ClickTextBottom = styled.p`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #c1c1c1;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 12px;
`;

export const CroppedFinalSection = styled.div`
  display: flex;
  width: 100%;
  height: 166px;
  justify-content: center;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  margin: 0 0 40px;
  @media (max-width: 767px) {
    margin: 0 0 20px;
  }
`;

export const BlackBG = styled.div`
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 27.08%, #000000 100%);
  width: 100%;
  position: absolute;
  height: 100%;
  top: 0;
  z-index: 1;
`;

export const CroppedFinalImgSec = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 166px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 100%;
    height: 100%;
    max-height: 166px;
  }
`;

export const FinalImgdesp = styled.div`
  width: 100%;
  margin: 0 8px 0 0;
  overflow: hidden;
  position: absolute;
  z-index: 1;
  display: flex;
  padding: 0 16px;
  bottom: 15px;
`;

export const FinalImgdespThumb = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 8px 0 0;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  border: 1px solid #ffffff;
  img {
    width: 100%;
    height: 100%;
  }
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
  width: calc(100% - 50px);
  font-family: "Roboto", sans-serif;
`;

export const ListName = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.75);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

export const ListInfo = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #ffffff;
  @media (max-width: 767px) {
    font-size: 11px;
  }
`;
