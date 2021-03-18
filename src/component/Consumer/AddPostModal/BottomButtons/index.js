import React from "react";
import styled from "styled-components";
import BackButton from '../../UI/BackButton'
import SaveButton from '../../UI/SaveButton'

const BottomButtonsBar = styled.div`
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: space-between;
  textarea {
    min-height: 100px;
    font-weight: 500;
    color: #000;
    margin: 0 0 14px;
  }
  @media (max-width: 991px) and (orientation: landscape) { 
    padding: 0 0 15px;
  }
`;


const BottomButtons = ({}) => {
  return (
    <>
      <BottomButtonsBar>
          <BackButton>Add to List</BackButton>
          <SaveButton>Post</SaveButton>
      </BottomButtonsBar>
    </>
  );
};

export default BottomButtons;
