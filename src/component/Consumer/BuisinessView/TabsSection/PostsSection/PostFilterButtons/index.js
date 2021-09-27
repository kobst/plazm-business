import React, {  } from "react";
import styled from "styled-components";


const PostFilterButtonContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  padding: 12px;
  background: #120F24;
  flex-direction: row;
  justify-content: space-between;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 479px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const RoundButtonsWrap = styled.div`
    display: flex;
`;

const RoundButton = styled.button`
    display: flex;
    background: #292454;
    border-radius: 39px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    color: #FFFFFF;
    margin: 0 5px 0 0;
    cursor: pointer;
    border: 0;
    min-width: 67px;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: 5px 0;
    :hover, :focus {
        background: #FF2E9A;
    }
`;


const BorderButtonsWrap = styled.div`
    display: flex;
`;

const BorderButtons = styled.button`
    display: flex;
    background: transparent;
    border-radius: 0px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    color: #FFFFFF;
    margin: 0 0 0 5px;
    cursor: pointer;
    border: 0;
    min-width: 84px;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: 5px 0;
    position: relative;
    :hover, :focus {
        color: #00E0FF;
        &:before {
            width: 100%;
            height: 2px;
            background:#00E0FF;
            content: "";
            position:absolute;
            bottom: -12px;        }
    }
    @media (max-width: 479px) {
        margin: 10px 0 0 0;
    }
`;

const PostFilterButton = ({}) => {
 

  
  return (
    <>
      <PostFilterButtonContent>

        <RoundButtonsWrap>
            <RoundButton>For Me</RoundButton>
            <RoundButton>Others</RoundButton>
        </RoundButtonsWrap>

        <BorderButtonsWrap>
            <BorderButtons>Most Liked</BorderButtons>
            <BorderButtons>Newest</BorderButtons>
        </BorderButtonsWrap>

      </PostFilterButtonContent>
    </>
  );
};

export default PostFilterButton;
