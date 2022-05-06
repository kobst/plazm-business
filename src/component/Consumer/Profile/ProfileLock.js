import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Frame from "../../../images/Frame.png";

const ProfileLockOuter = styled.div`
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding: 0px 32px;
  margin-top: 125px;
`;

const ProfileLockHeading = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #ff2e9a;
  margin-bottom: 10px;
`;

const ProfileLockContent = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
`;
const ProfileImg = styled.div`
  margin-bottom: 21px;
`;

const ProfileLock = () => {
    const userProfile = useSelector((state) => state.user.selectedUser);
  return (
    <ProfileLockOuter>
      <ProfileImg>
        <img src={Frame} alt={Frame} />
      </ProfileImg>
      <ProfileLockHeading>{userProfile.name} locked Her Profile</ProfileLockHeading>
      <ProfileLockContent>
        Only her friends can see what she shares on her timeline.
      </ProfileLockContent>
    </ProfileLockOuter>
  );
};

export default ProfileLock;
