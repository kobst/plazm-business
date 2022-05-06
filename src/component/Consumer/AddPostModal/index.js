import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ModalPostContent from './ModalPostContent';
import AllListingsContent from './AllListings';
import CreateListModel from './createList';
import { fetchUserLists } from '../../../reducers/listReducer';

const ModalContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 20px;
  max-width: 540px;
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
  &.CreateListModal {
    max-width: 748px;
    min-width: 748px;
    @media (max-width: 767px) {
      padding: 15px;
      min-width: 90vw;
      max-width: 300px;
      max-height: 85vh;
      overflow-y: auto;
    }
    .TitleRed {
      label {
        color: #ee3840;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 11px;
        text-transform: capitalize;
      }
      input::placeholder {
        color: #fac2c4;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
      }
    }
    .CustomLabel {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      font-size: 11px;
      text-transform: capitalize;
      color: #7f75bf;
    }
    .PL-15 {
      padding-left: 15px;
      height: 28px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
    }
  }
`;

function AddPostModal({ businessId, closeModal, data }) {
  const dispatch = useDispatch();
  const [displayList, setDisplayList] = useState(false);
  const [displayCreateList, setDisplayCreateList] = useState(false);
  const [selectedListForPost, setSelectedListForPost] = useState(
    data && data.listId.length > 0 ? data.listId[0]._id : null
  );
  const [description, setDescription] = useState(data ? data.data : '');
  const [mentionArrayList, setMentionArrayList] = useState([]);
  const [mentionArrayUser, setMentionArrayUser] = useState([]);
  const [imageUpload, setImageUpload] = useState(
    data && data.media && data.media.length > 0 ? data.media[0] : null
  );
  const user = useSelector((state) => state.user.user);
  const userLists = useSelector((state) => state.list.userLists);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (data && data.taggedLists) {
      const arr = [];
      data.taggedLists.map((i) => arr.push(i._id));
      setMentionArrayList(arr);
    }
    if (data && data.taggedUsers) {
      const arr = [];
      data.taggedUsers.map((i) => arr.push(i._id));
      setMentionArrayUser(arr);
    }
  }, [data]);

  /** fetch user list */
  useEffect(() => {
    if (userLists.length === 0) dispatch(fetchUserLists(user._id));
  }, [dispatch, user._id, userLists.length]);

  return (
    <ModalContent className={displayCreateList && 'CreateListModal'}>
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
        <CreateListModel
          setSelectedListForPost={setSelectedListForPost}
          setDisplayList={setDisplayList}
          setDisplayCreateList={setDisplayCreateList}
        />
      ) : (data && userLists.length > 0) || !data ? (
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
          imageUpload={imageUpload}
          setImageUpload={setImageUpload}
          businessData={data}
          imageFile={imageFile}
          setImageFile={setImageFile}
        />
      ) : null}
    </ModalContent>
  );
}

export default AddPostModal;
