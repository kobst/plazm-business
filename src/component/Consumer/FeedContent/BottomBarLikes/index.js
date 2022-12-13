import React from 'react';
import styled from 'styled-components';
import {MdChatBubbleOutline, MdFavoriteBorder} from 'react-icons/md';
import SaveButton from '../../UI/SaveButton';

export const BottomBarLikes = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 767px) {
    align-items: flex-start;
  }
`;

export const LikesBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0px;
  align-items: center;
  flex-wrap: wrap;
`;

export const RightDiv = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  align-items: center;
  display: flex;
  margin: 0 15px 0 0;
  position: relative;
  @media (max-width: 767px) {
    margin: 8px 15px 0 0px;
  }
  svg {
    margin: 0 7px 0 0;
  }
  svg:hover {
    cursor: pointer;
  }
  button {
    color: #767676;
    font-size: 13px;
    padding: 0;
    cursor: pointer;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    border: 0;
    background-color: transparent;
    display: flex;
  }
`;

const BottomBarLikesContent = () => {
  return (
    <>
      <BottomBarLikes>
        <LikesBtnWrap>
          <RightDiv>
            <MdFavoriteBorder />5
          </RightDiv>
          <RightDiv>
            <button>
              <MdChatBubbleOutline />
            </button>
            5
          </RightDiv>
        </LikesBtnWrap>

        <SaveButton>VISIT</SaveButton>
      </BottomBarLikes>
    </>
  );
};

export default BottomBarLikesContent;
