import React from "react";
import styled from "styled-components";
import ModalPostContent from './ModalPostContent'



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
  }
`;


const AddPostModal = ({}) => {
  return (
    <>
      <ModalContent>
          <ModalPostContent />
      </ModalContent>
    </>
  );
};

export default AddPostModal;
