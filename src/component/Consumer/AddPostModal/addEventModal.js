import React, { useState } from 'react';
import styled from 'styled-components';
import AllListingsContent from './AllListings';
import CreateListModel from './createList';
import CreateEventModal from './createEvent';
import ScheduleAnEvent from './ScheduleAnEvent';

const ModalContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 20px;
  max-width: 600px;
  min-width: 600px;
  background: #282352;
  box-shadow: 0px 32px 70px rgba(0, 0, 0, 0.25);
  color: #fff;
  @media (max-width: 767px) {
    padding: 15px;
    min-width: 300px;
    max-width: 300px;
    max-height: 70vh;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 60px;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    max-height: 80vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

function AddEventModal({ closeModal }) {
  const [displayList, setDisplayList] = useState(false);
  const [displayCreateList, setDisplayCreateList] = useState(false);
  const [selectedListForPost, setSelectedListForPost] = useState(null);
  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [description, setDescription] = useState('');
  const [mentionArrayList, setMentionArrayList] = useState([]);
  const [mentionArrayUser, setMentionArrayUser] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [imageCopy, setImageCopy] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUploadCopy, setImageUploadCopy] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  return (
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
        <CreateListModel
          setSelectedListForPost={setSelectedListForPost}
          setDisplayList={setDisplayList}
          setDisplayCreateList={setDisplayCreateList}
        />
      ) : displayCalendar ? (
        <ScheduleAnEvent
          setDisplayCalendar={setDisplayCalendar}
          setEventDetails={setEventDetails}
          setDisplayList={setDisplayList}
        />
      ) : (
        <CreateEventModal
          closeModal={closeModal}
          setDisplayList={setDisplayList}
          selectedListForPost={selectedListForPost}
          setSelectedListForPost={setSelectedListForPost}
          setDisplayCalendar={setDisplayCalendar}
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
          eventTitle={eventTitle}
          setEventTitle={setEventTitle}
          eventDescription={eventDescription}
          setEventDescription={setEventDescription}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          imageCopy={imageCopy}
          setImageCopy={setImageCopy}
          imageUpload={imageUpload}
          setImageUpload={setImageUpload}
          imageUploadCopy={imageUploadCopy}
          setImageUploadCopy={setImageUploadCopy}
          imageFile={imageFile}
          setImageFile={setImageFile}
          mentionArrayList={mentionArrayList}
          setMentionArrayList={setMentionArrayList}
          mentionArrayUser={mentionArrayUser}
          setMentionArrayUser={setMentionArrayUser}
        />
      )}
    </ModalContent>
  );
}

export default AddEventModal;
