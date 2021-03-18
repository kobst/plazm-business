import React from "react";
import styled from "styled-components";
import Input from '../../UI/Input/Input'
import { FiSearch } from "react-icons/fi";
import { MdCheck } from "react-icons/md";
import { Scrollbars } from "react-custom-scrollbars";
import BottomButtons from '../BottomButtons'

const AllListingsContent = styled.div`
  width: 100%;
  .ScrollListing {
    border-bottom: 1px dashed #FFFFFF;
    margin: 0 0 18px;
    .thumb-vertical {
      position: relative;
      display: block;
      width: 100px;
      height: 100px;
      cursor: pointer;
      border-radius: inherit;
      background-color: #fff;
    }

    .track-vertical {
      position: absolute;
      width: 3px !important;
      display: block!important;
      right: 2px;
      bottom: 2px;
      top: 2px;
      border-radius: 0px;
    }
  }
`;

const SearchWrap = styled.div`
  width: 100%;
  background: #fff;
  height:50px;
  border-radius:2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 15px;
  input {
    border:0; 
    outline:0;
    padding: 0 10px;
    width: calc(100% - 70px);
    height: 50px;
  }
`;

const SearchIconDiv = styled.div`
  width: 70px;
  height: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    font-size: 30px;
    color: #c4c4c4;
    font-weight: bold;
  }
`;

const AllListingHead = styled.div`
  width: 100%;
  border-bottom: 1px dashed #FFFFFF;
  padding: 0 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 10px;
`;

const AllListingHeading = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #fff;
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`;

const SelectedListed = styled.h1`
  font-weight: 600;
  font-size: 11px;
  line-height: 13px;
  color: #FF2E9A;
`;

const ListingWrap = styled.div`
  width: 100%;
  border-bottom: 1px dashed #FFFFFF;
  padding: 0 0 8px;
  display: flex;
  flex-direction:column;
`;

const ListingList = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: 12px;
  color: #FFFFFF;
  min-height: 30px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0 7px;
  cursor: pointer;
  transition: 0.3s;
  .RightTickImg{
    display:none;
  }
  :hover{
    background: #201D42;
    transition: 0.3s;
    .RightTickImg{
      display:block;
    }
    svg {
      display:block;
    }
  }
`;

const RightTick = styled.div`
  svg{
    color: #fff;
    font-size: 22px;
  }
`;

const AllListings = ({}) => {
  return (
    <>
      <AllListingsContent>
          <SearchWrap>
            <Input />
            <SearchIconDiv>
              <FiSearch />
            </SearchIconDiv>
          </SearchWrap>
          <AllListingHead>
            <AllListingHeading>All lists</AllListingHeading>
            <SelectedListed>1 list selected</SelectedListed>
          </AllListingHead>
          <Scrollbars
            autoHeight
            autoHeightMin={0}
            autoHeightMax={220}
            thumbMinSize={30}
            renderThumbVertical={props => < div {...props} className="thumb-vertical"/>}
             renderTrackVertical={props => < div {...props} className="track-vertical"/>}
            className="ScrollListing"
          >
          <ListingWrap>
            <ListingList>
              Best 10 Gyms in New York
              <RightTick className="RightTickImg">
                <MdCheck />
              </RightTick>
            </ListingList>
            <ListingList>
              Best 10 Gyms in New York
              <RightTick className="RightTickImg">
                <MdCheck />
              </RightTick>
            </ListingList>
            <ListingList>
              Best 10 Gyms in New York
              <RightTick className="RightTickImg">
                <MdCheck />
              </RightTick>
            </ListingList>
            <ListingList>
              Best 10 Gyms in New York
              <RightTick className="RightTickImg">
                <MdCheck />
              </RightTick>
            </ListingList>
            <ListingList>
              Best 10 Gyms in New York
              <RightTick className="RightTickImg">
                <MdCheck />
              </RightTick>
            </ListingList>
            <ListingList>
              Best 10 Gyms in New York
              <RightTick className="RightTickImg">
                <MdCheck />
              </RightTick>
            </ListingList>
            <ListingList>
              Best 10 Gyms in New York
              <RightTick className="RightTickImg">
                <MdCheck />
              </RightTick>
            </ListingList>
            <ListingList>
              Best 10 Gyms in New York
              <RightTick className="RightTickImg">
                <MdCheck />
              </RightTick>
            </ListingList>
            <ListingList>
              Best 10 Gyms in New York
              <RightTick className="RightTickImg">
                <MdCheck />
              </RightTick>
            </ListingList>
            <ListingList>
              Best 10 Gyms in New York
              <RightTick className="RightTickImg">
                <MdCheck />
              </RightTick>
            </ListingList>
            <ListingList>
              Best 10 Gyms in New York
              <RightTick className="RightTickImg">
                <MdCheck />
              </RightTick>
            </ListingList>
            <ListingList>
              Best 10 Gyms in New York
              <RightTick className="RightTickImg">
                <MdCheck />
              </RightTick>
            </ListingList>
            <ListingList>
              Best 10 Gyms in New York
              <RightTick className="RightTickImg">
                <MdCheck />
              </RightTick>
            </ListingList>
          </ListingWrap>
          </Scrollbars>
          <BottomButtons />
      </AllListingsContent>
    </>
  );
};

export default AllListings;
