import styled from "styled-components";
import SearchIcon from "../../../images/zoom-out.png";

export const TopSectionWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  @media (max-width: 767px) {
    padding: 15px;
  }
  @media (max-width: 479px) {
    flex-direction: column;
  }
  .BackButtonArrow {
    background: #ff2e9a;
    border-radius: 3px;
    border: 0;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0 15px 0 0;
    svg {
      font-size: 28px;
      color: #fff;
    }
    :hover {
      opacity: 0.8;
    }
  }
`;

export const LeftWrap = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 479px) {
    margin-bottom: 10px;
  }
`;

export const TotalNum = styled.div`
  color: #ffffff;
  font-weight: 500;
  font-size: 11px;
  display: flex;
  align-items: center;
  span {
    font-weight: 700;
    color: #ff2e9a;
    margin: 0 0 0 8px;
  }
`;

export const RightSearchWrap = styled.div`
  display: flex;
  max-width: 285px;
  width: 100%;
  height: 38px;
  @media (max-width: 767px) {
    max-width: 200px;
  }
  .SearchSubscriptionsInput {
    background: url(${SearchIcon}) no-repeat right 10px center #fff;
    border-radius: 2px;
    border: 1px solid #e4e4e4;
    height: 38px;
    font-size: 14px;
    padding-right: 35px;
    margin: 0;
    ::placeholder {
      color: #c8c8c8;
    }
  }
`;

export const FeatureWrapper = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
`;

export const FeatureContainer = styled.div`
  width: 100%;
  position: relative;
  padding: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const MainHeading = styled.h1`
  padding: 0 0 10px 30px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  text-align: left;
  color: #fff;
  position: relative;
`;
export const NewInBuzzSliderWrapper = styled.div`
  position: relative;
  margin: 0 0 35px;
  padding: 0 0 10px;
  width: 100%;
  display: flex;
  overflow-x: scroll;
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
    height: 5px;
    cursor: pointer;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius: 10px;
    cursor: pointer;
    width: 8px;
    height: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #fff;
  }
`;

export const CollectionPara = styled.p`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 12px;
  line-height: normal;
  text-align: left;
  color: #fff;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
`;

export const Lock = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

export const DisplayItemContent = styled.div`
  position: fixed;
  left: ${(props) => props.offsetLeft || 0}px;
  top: ${(props) => props.offsetTop || 0}px;
  background: #000000;
  border: 1px solid #ff2e9a;
  box-sizing: border-box;
  border-radius: 2px;
  padding: 15px 15px 20px;
  width: 320px;
  z-index: 1000;
  &.InnerModal {
    visibility: hidden;
  }
`;

export const LoaderWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  height: 150px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0 10px;
  &.DiscoverLoaderWrap{
    height: calc(100vh - 100px);
  }
`;

export const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 6px;
  padding: 0;
  text-align: center;
  width: 250px;
  &.SearchItemsWrapper {
    margin: 0 5px 10px;
    width: 16%;
    @media (max-width: 1599px) {
      width: 19%;
    }
    @media (max-width: 1024px) {
      width: 22%;
    }
    @media (max-width: 991px) {
      width: 30%;
    }
    @media (max-width: 767px) {
      width: 43%;
    }
    @media (max-width: 479px) {
      width: 100%;
    }
  }
`;
export const CoverImg = styled.div`
  margin: 0px;
  height: 200px;
  display: flex;
  align-items: flex-start;
  /* overflow: hidden; */
  width: 100%;
  padding: 0;
  justify-content: center;
  width: 250px;
  &:hover {
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  &.SearchCoverImg {
    width: 100%;
  }
`;

export const ItemsDescription = styled.div`
  width: 100%;
  padding: 15px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(360deg, #000000 0%, rgba(7, 3, 46, 0) 91.23%);
  :hover {
    .InnerModal {
      visibility: visible;
    }
  }
`;

export const InnerCoverImg = styled.div`
  margin: 0px;
  height: 220px;
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 0;
  justify-content: center;
  width: 100%;
  position: relative;
  &:hover {
  }
  img {
    width: 100%;
    height: 100%;
    max-height: 220px;
    object-fit: cover;
    z-index: -1;
  }
`;

export const InnerItemsDescription = styled.div`
  width: 100%;
  padding: 15px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(360deg, #000000 0%, rgba(7, 3, 46, 0) 91.23%);
  :hover {
    .InnerModal {
      visibility: visible;
    }
  }
`;

export const InnerCollectionPara = styled.p`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 12px;
  line-height: normal;
  text-align: left;
  color: #fff;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
`;

export const AuthorInfo = styled.div`
  font-weight: 500;
  font-size: 11px;
  color: #ffffff;
  text-align: left;
  padding: 0 15px 5px;
  strong {
    font-weight: 700;
    color: #ff2e9a;
  }
`;

export const FollowedBy = styled.div`
  display: flex;
  padding: 0 15px 15px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  h2 {
    font-weight: 500;
    font-size: 10px;
    color: #fff;
    text-align: left;
    padding: 0 0 5px 0;
    margin: 0;
  }
`;

export const FollowedByListUl = styled.ul`
  display: flex;
  padding: 0;
  list-style: none;
  flex-direction: row;
  align-items: center;
  li {
    list-style: none;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    border: 0.5px solid #ffffff;
    filter: drop-shadow(1px 0px 2px rgba(0, 0, 0, 0.25));
    overflow: hidden;
    margin: 0 -5px 0 0;
    padding: 0;
    img {
      width: 17px;
      height: 17px;
      border-radius: 50%;
    }
  }
  .MorePlus {
    font-weight: 500;
    font-size: 10px;
    color: #ffffff;
    margin: 0 0 0 15px;
  }
`;

export const InnerDescriptionPara = styled.p`
  padding: 0 15px 15px;
  margin: 0;
  font-weight: 500;
  font-size: 11px;
  line-height: normal;
  color: #fff;
  text-align: justify;
  strong {
    font-weight: 700;
    color: #ff2e9a;
    font-style: italic;
    cursor: pointer;
  }
`;

export const SubscribeBtn = styled.button`
  background: #ff2e9a;
  border-radius: 2px;
  height: 25px;
  font-size: 9px;
  line-height: 11px;
  cursor: pointer;
  border: none;
  color: #fff;
  font-weight: 700;
  width: 90%;
  font-family: "Roboto", sans-serif;
  :hover,
  :focus {
    opacity: 0.8;
  }
`;

export const ListResultHeading = styled.h1`
  padding: 15px 0 10px 30px;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  text-align: left;
  color: #fff;
  position: relative;
  span {
    color: #ff2e9a;
  }
  @media (max-width: 767px) {
    font-size: 18px;
  }
`;

export const SearchItemsContainer = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  height: calc(100vh - 140px);
  overflow-y: auto;
  padding: 10px 25px;
  /* width */
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    cursor: pointer;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius: 10px;
    cursor: pointer;
    width: 5px;
    height: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #fff;
  }

  .infinite-scroll-component__outerdiv {
    width: 100%;
    .infinite-scroll-component {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
    }
  }
`;

export const NoMorePost = styled.p`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ErrorDiv = styled.div`
  color: #ff0000;
  font-weight: 600;
  font-size: 12px;
  margin: 0;
  margin-bottom: 10px;
  margin-left: 20px;
  float: right;
  margin-right: 30px;
`;