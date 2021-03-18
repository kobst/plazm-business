import React from "react";
import styled from "styled-components";
import Textarea from '../../UI/Textarea'
import Input from '../../UI/Input/Input.js'
import BottomButtons from '../BottomButtons'
import AddImageImg from "../../../../images/addImage.svg";


const PostContent = styled.div`
  width: 100%;
  color: #fff;
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 0 15px;
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

const InputWrap = styled.div`
    border: 1px solid #ffffff;
    min-height: 60px;
    font-size: 16px;
    line-height: 21px;
    width: 100%;
    padding: 6px 8px;
    margin: 0 0 20px;
    background: #ffffff;
    box-shadow: 0px 4px 8px rgb(44 39 56 / 4%);
    border-radius: 0px;
    display: flex;
    flex-direction: column;
    textarea {
      min-height: 100px;
      font-weight: 500;
      color: #000;
      margin: 0;
      padding: 0;
      font-size: 14px;
    }
    input {
      font-weight: 500;
      color: #000;
      margin: 0;
      height: 28px;
      font-size: 14px;
    }
`;

const LabelDiv = styled.label`
    font-weight: bold;
    font-size: 10px;
    text-transform: uppercase;
    color: #7f75bf;
    line-height: normal;
    margin: 0 0 5px;
`;


const CreateList = ({}) => {
  return (
    <>
      <PostContent>
          <TopBar>
            <Heading>Create List</Heading>
          </TopBar>
          <InputWrap>
            <LabelDiv>add title</LabelDiv>
            <Input></Input>
          </InputWrap>
          <InputWrap>
            <LabelDiv>add Description</LabelDiv>
            <Textarea></Textarea>
          </InputWrap>
          
          <AddYourPostBar>
            <AddYourPostLabel>Add to Photo to your List (required)</AddYourPostLabel>
            <AddImageDiv>
                <img
                  src={AddImageImg}
                  alt=""
                />
              </AddImageDiv>
          </AddYourPostBar>
          <BottomButtons />
      </PostContent>
    </>
  );
};

export default CreateList;
