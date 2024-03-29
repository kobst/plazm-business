import styled from "styled-components";

export const FirstRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 0 20px;
  &.PL-20 {
    padding-left: 35px;
    @media (max-width: 767px) {
      padding-left: 0px;
    }
  }
  .IconOne {
    margin: -6px 0 0;
  }
`;

export const ClockIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px 0 0;
  svg {
    color: #fff;
    font-size: 20px;
  }
`;

export const DatePickerInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  margin: 0 40px 0 0;
  input {
    width: 100%;
    border: 0;
    border-bottom: 2px solid #fff;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: #ffffff;
    padding: 0 0 10px;
  }
`;

export const TimeRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const DateRow = styled.div`
  display: flex;
  align-items: center;
`;

export const DateDiv = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
    margin: 10px 0 0;
  }
`;

export const DateText = styled.div`
  display: flex;
  align-items: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
  position: relative;
  span {
    width: 56px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ActiveBox {
    background: #e3e5e6;
    border-radius: 3px;
    color: #282352;
  }
`;

export const DateDropdown = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 5px;
  cursor: pointer;
  flex-direction: column;
  svg {
    font-size: 16px;
    color: #fff;
  }
  .DropupIcon {
    margin: 0 0 -7px;
  }
`;

export const Hyphen = styled.div`
  display: flex;
  align-items: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
  margin: 0 20px;
`;

export const DropDownSection = styled.div`
  display: flex;
  align-items: flex-start;
  background: #f1f1f1;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
  width: 115px;
  max-height: 93px;
  overflow: auto;
  position: absolute;
  top: 25px;
  padding: 5px 0px;
  overflow-x: hidden;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  @media (max-width: 767px) {
    z-index: 1;
  }
  ::-webkit-scrollbar {
    width: 4px;
    height: 5px;
    cursor: pointer;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #bbb;
    border-radius: 10px;
    cursor: pointer;
    width: 4px;
    height: 5px;
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 100%;
    li {
      font-family: "Roboto";
      font-style: normal;
      font-weight: 500;
      font-size: 10px;
      line-height: 12px;
      color: #261f55;
      margin: 0;
      padding: 3px 7px;
      cursor: pointer;
      &:hover {
        background: #e3e5e6;
      }
    }
  }
`;

export const AddImagesLabel = styled.div`
  display: flex;
  align-items: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-transform: capitalize;
  color: #18a7fc;
  margin: 0;
  cursor: pointer;
`;

export const ImagesRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: calc(100% - 40px);
`;

export const ImagesNameSec = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
  margin: 0 10px 0 0;
`;

export const ImagesCross = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    color: #ff0303;
    font-size: 12px;
    margin: 0 0 0 5px;
  }
`;

export const DropDownList = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: flex-start;
  background: #272631;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
  width: 210px;
  max-height: 200px;
  overflow: auto;
  position: absolute;
  top: 25px;
  padding: 5px 0px;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 4px;
    height: 5px;
    cursor: pointer;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #bbb;
    border-radius: 10px;
    cursor: pointer;
    width: 4px;
    height: 5px;
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 100%;
    li {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 500;
      font-size: 10px;
      color: #fff;
      margin: 0;
      padding: 6px 7px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 22px;
      cursor: pointer;
      &:hover {
      }
      &.ListName {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        max-width: 90%;
      }
      span {
      }
    }
  }
`;

export const RightTick = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: #ff2e9a;
    font-size: 16px;
  }
`;

export const ErrorDiv = styled.div`
  color: #ff0000;
  font-weight: 600;
  font-size: 11px;
  margin: 0;
  margin-bottom: 10px;
`;

export const ForText = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  color: #ffffff;
  margin: 0 10px;
`;
