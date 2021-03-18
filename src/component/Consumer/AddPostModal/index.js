import React from "react";
import styled from "styled-components";
import ModalPostContent from './ModalPostContent'
import AllListingsContent from '../AddPostModal/AllListings'
import CreateList from './CreateList'


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


const AddPostModal = ({}) => {
  return (
    <>
      <ModalContent>
          {/* <ModalPostContent /> */}
          {/* <AllListingsContent /> */}
          <CreateList />
      </ModalContent>
    </>
  );
};

export default AddPostModal;
