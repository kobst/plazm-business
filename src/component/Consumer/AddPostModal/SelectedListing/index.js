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
  padding: 13px;
  border: 1px dashed #ffffff;
  p {
    font-size: 12px;
    font-weight: 600;
  }
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

const EventListing = styled.div`
  font-weight: 700;
  font-size: 10px;
  color: #ff2e9a;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CloseList = styled.div`
  cursor: pointer;
  svg {
    color: #fff;
    font-size: 20px;
  }
`;

const SelectedListing = ({
  selectedListForPost,
  setSelectedListForPost,
  type,
}) => {
  const userLists = useSelector((state) => state.list.userLists);
  const [listName, setListName] = useState("");

  /** to display the name of the selected list */
  useEffect(() => {
    if (selectedListForPost !== null) {
      setListName(
        userLists.filter((i) => i._id === selectedListForPost)[0].name
      );
    }
  }, [selectedListForPost, userLists]);
  return (
    <>
      {selectedListForPost !== null ? (
        <AllListingsContent>
          {type === "event" ? (
            <div>
              <EventListing>ADDED TO LIST</EventListing>
              <p>{listName}</p>
            </div>
          ) : (
            <Listing>{listName}</Listing>
          )}

          <CloseList>
            <IoMdCloseCircle onClick={() => setSelectedListForPost(null)} />
          </CloseList>
        </AllListingsContent>
      ) : null}
    </>
  );
};

export default SelectedListing;
