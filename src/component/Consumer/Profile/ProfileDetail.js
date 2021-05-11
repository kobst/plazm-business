import React from 'react';
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";

const ProfileOuter = styled.div`
    display: flex;
`;
const CloseDiv = styled.div`
  width: 24px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 17px;
  cursor: pointer;
  top: 17px;
  z-index: 1;
  svg {
    font-size: 24px;
    color: #fff;
  }
`;

const ProfileItem = styled.div`
  display: flex;
  align-item: flex-start;
  justify-content: flex-start;
  padding: 28px 32px 0;
  width: 100%;
  box-sizing: border-box;
`;

const ProfileImg = styled.div`
  display:flex;
  align-item: flex-start;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #000;
  margin-right: 15px;
  border:2px solid #fff;
`;

const ProfileItemContent = styled.div`
  display:flex;
  flex-direction: column;
  width: calc(100% - 45px)
`;

const ProfileItemName = styled.div`
font-weight: 800;
font-size: 16px;
color: #FF2E9A;
margin-bottom: 12px;
`;

const ProfileItemList = styled.div`
  display: flex;
  align-item: flex-start;
`;

const ProfileItemNumber = styled.div`
font-weight: 900;
font-size: 12px;
color: #FF2E9A;
width: 40px;
`;

const ProfileItemCategory = styled.div`
font-weight: 900;
font-size: 12px;
color: #FFF;
width: calc(100% - 40px);
`;


const ProfileLock = (props) => (
    <ProfileOuter>
        <CloseDiv>
          <IoMdClose  />
        </CloseDiv>

        <ProfileItem>
            <ProfileImg></ProfileImg>
            <ProfileItemContent>
                <ProfileItemName>JANE COOPER</ProfileItemName>
                <ProfileItemList>
                      <ProfileItemNumber>345</ProfileItemNumber>  
                      <ProfileItemCategory>Posts</ProfileItemCategory>
                </ProfileItemList>
                <ProfileItemList>
                      <ProfileItemNumber>45</ProfileItemNumber>  
                      <ProfileItemCategory>Lists created by me</ProfileItemCategory>
                </ProfileItemList>
                <ProfileItemList>
                      <ProfileItemNumber>245</ProfileItemNumber>  
                      <ProfileItemCategory>Lists followed by me</ProfileItemCategory>
                </ProfileItemList>
            </ProfileItemContent>
        </ProfileItem>

    </ProfileOuter>
)

export default ProfileLock;