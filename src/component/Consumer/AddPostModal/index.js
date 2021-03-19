import React, { useState } from "react";
import styled from "styled-components";
import ModalPostContent from "./ModalPostContent";
import AllListingsContent from "../AddPostModal/AllListings";
import CreateListModel from "./createList";

const ModalContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 20px;
  max-width: 536px;
  min-width: 536px;
  background: #282352;
  box-shadow: 0px 32px 70px rgba(0, 0, 0, 0.25);
  color: #fff;
  @media (max-width: 767px) {
    padding: 15px;
    min-width: 300px;
    max-width: 300px;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    max-height: 80vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

const AddPostModal = ({ businessId, closeModal }) => {
  const [displayList, setDisplayList] = useState(false);
  const [displayCreateList, setDisplayCreateList] = useState(false);
  const [selectedListForPost, setSelectedListForPost] = useState(null);
  const [description, setDescription] = useState("");
  const [mentionArrayList, setMentionArrayList] = useState([]);
  const [mentionArrayUser, setMentionArrayUser] = useState([]);
  return (
    <>
      <ModalContent>
        {displayList ? (
          <AllListingsContent
            setDisplayList={setDisplayList}
            setSelectedListForPost={setSelectedListForPost}
            selectedListForPost={selectedListForPost}
            setDescription={setDescription}
            description={description}
            mentionArrayList={mentionArrayList}
            setMentionArrayList={setMentionArrayList}
            mentionArrayUser={mentionArrayUser}
            setMentionArrayUser={setMentionArrayUser}
            setDisplayCreateList={setDisplayCreateList}
          />
        ) : displayCreateList ? (
          <CreateListModel setSelectedListForPost={setSelectedListForPost} setDisplayList={setDisplayList} setDisplayCreateList={setDisplayCreateList}/>
        ) : (
          <ModalPostContent
            closeModal={closeModal}
            businessId={businessId}
            setDisplayList={setDisplayList}
            selectedListForPost={selectedListForPost}
            setSelectedListForPost={setSelectedListForPost}
            description={description}
            setDescription={setDescription}
            mentionArrayList={mentionArrayList}
            setMentionArrayList={setMentionArrayList}
            mentionArrayUser={mentionArrayUser}
            setMentionArrayUser={setMentionArrayUser}
          />
        )}
      </ModalContent>
    </>
  );
};

export default AddPostModal;
