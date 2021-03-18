import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import Textarea from '../../UI/Textarea'
import BottomButtons from '../BottomButtons'
import AddImageImg from "../../../../images/addImage.svg";
import SelectedListing from '../SelectedListing'
import PostImage from '../PostImage'

const PostContent = styled.div`
  width: 100%;
  color: #fff;
  textarea {
    min-height: 100px;
    font-weight: 500;
    color: #000;
    margin: 0 0 14px;
  }
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 0 5px;
`;

const Heading = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`;

const CloseModal = styled.div`
  cursor: pointer;
  svg{
    color: #fff;
    font-size: 22px;
  }
`;

const AddYourPostBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 14px;
  border: 1px dashed #FFFFFF;
  align-items: center;
  padding: 13px;
  @media (max-width: 767px) {
    padding: 7px;
  }
`;

const AddYourPostLabel = styled.label`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  margin: 0 0 0 10px;
  max-width: calc(100% - 35px);
  @media (max-width: 767px) {
    font-size: 12px;
    margin: 0;
  }
`;

const AddImageDiv = styled.div`
  background: #ff2e9a;
  border-radius: 3px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  cursor: pointer;
  svg {
    font-size: 34px;
    color: #fff;
  }
`;

const ModalPostContent = ({}) => {
  return (
    <>
      <PostContent>
          <TopBar>
            <Heading>What’s Happening?</Heading>
            <CloseModal>
              <MdClose />
            </CloseModal>
          </TopBar>
          <Textarea></Textarea>
          <AddYourPostBar>
            <AddYourPostLabel>Add to your Post</AddYourPostLabel>
            <AddImageDiv>
                <img
                  src={AddImageImg}
                  alt=""
                />
              </AddImageDiv>
          </AddYourPostBar>
          <PostImage />
          <SelectedListing />
          <BottomButtons />
      </PostContent>
    </>
  );
};

export default ModalPostContent;
