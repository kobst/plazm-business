import React from "react";
import styled from "styled-components";
import { IoMdCloseCircle } from "react-icons/io";

const AllListingsContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 15px;
`;

const Listing = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: #FF2E9A;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  max-width: calc(100% - 30px);
`;

const CloseList = styled.div`
  cursor: pointer;
  svg {
    color: #fff;
    font-size: 20px;
  }
`;




const SelectedListing = ({}) => {
  return (
    <>
      <AllListingsContent>
        <Listing>Top 10 Restaurant in NYC</Listing>
        <CloseList>
          <IoMdCloseCircle />
        </CloseList>
      </AllListingsContent>
    </>
  );
};

export default SelectedListing;
