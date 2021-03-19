import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdCloseCircle } from "react-icons/io";
import { useSelector } from "react-redux";

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
  color: #ff2e9a;
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

const SelectedListing = ({ selectedListForPost, setSelectedListForPost }) => {
  const userLists = useSelector((state) => state.list.userLists);
  const [listName, setListName] = useState("");
  
  /** to display the name of the selected list */
  useEffect(() => {
    if (selectedListForPost !== null) {
      setListName(userLists.filter((i) => i._id === selectedListForPost)[0].name);
    }
  }, [selectedListForPost]);
  return (
    <>
      {selectedListForPost !== null ? (
        <AllListingsContent>
          <Listing>{listName}</Listing>
          <CloseList>
            <IoMdCloseCircle onClick={()=>setSelectedListForPost(null)}/>
          </CloseList>
        </AllListingsContent>
      ) : null}
    </>
  );
};

export default SelectedListing;
