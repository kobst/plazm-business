import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ProfileImg from '../../../images/profile-img.png';

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

const ProfileImgDiv = styled.div`
  width: 45px;
  height: 45px;
  margin: 0 10px 0 0;
  border: 3px solid #ffffff;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 45px;
    height: 45px;
  }
`;

const ProfileItemContent = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 45px);
`;

const ProfileItemName = styled.div`
  font-weight: 800;
  font-size: 16px;
  color: #ff2e9a;
  margin-bottom: 12px;
`;

const ProfileItemList = styled.div`
  display: flex;
  align-item: flex-start;
`;

const ProfileItemNumber = styled.div`
  font-weight: 900;
  font-size: 12px;
  color: #ff2e9a;
  width: 40px;
`;

const ProfileItemCategory = styled.div`
  font-weight: 900;
  font-size: 12px;
  color: #fff;
  width: calc(100% - 40px);
`;

function ProfileLock({ setDisplayTab, setProfileClosed }) {
  const userProfile = useSelector((state) => state.user.selectedUser);

  /*
   * @desc: close tab function to be called on cross icon click
   */
  const closeTab = () => {
    // setDisplayTab();
    // setProfileClosed(true)
    // history.push("/");
  };

  return (
    <ProfileOuter>
      <CloseDiv>
        <IoMdClose onClick={() => closeTab()} />
      </CloseDiv>

      <ProfileItem>
        <ProfileImgDiv>
          <img
            src={userProfile.photo ? userProfile.photo : ProfileImg}
            alt=""
          />
        </ProfileImgDiv>
        <ProfileItemContent>
          <ProfileItemName>{userProfile.name}</ProfileItemName>
          <ProfileItemList>
            <ProfileItemNumber>{userProfile.totalPosts}</ProfileItemNumber>
            <ProfileItemCategory>Posts</ProfileItemCategory>
          </ProfileItemList>
          <ProfileItemList>
            <ProfileItemNumber>{userProfile.totalLists}</ProfileItemNumber>
            <ProfileItemCategory>Lists created by me</ProfileItemCategory>
          </ProfileItemList>
          <ProfileItemList>
            <ProfileItemNumber>
              {' '}
              {userProfile.listFollowed ? userProfile.listFollowed.length : 0}
            </ProfileItemNumber>
            <ProfileItemCategory>Lists followed by me</ProfileItemCategory>
          </ProfileItemList>
        </ProfileItemContent>
      </ProfileItem>
    </ProfileOuter>
  );
}

export default ProfileLock;
