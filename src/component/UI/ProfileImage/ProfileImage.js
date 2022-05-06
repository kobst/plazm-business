import React from 'react';
import styled from 'styled-components';
import Heading from '../Heading/Heading';
import Button from '../Button/Button';
import SubHeading from '../SubHeading';

const ProfileSection = styled.div`
  margin-bottom: 25px;
  text-align: center;
`;
const ProfileImg = styled.div`
  width: 124px;
  height: 124px;
  border-radius: 100%;
  background-color: #c4c4c4;
  margin: 0 auto 10px;
`;
const Numbers = styled.p`
  font-size: 14px;
  margin-top: 10px;
  font-family: 'Roboto', sans-serif;
`;

function ProfileImage({ name, setIsOpen }) {
  return (
    <ProfileSection>
      <ProfileImg />
      <Heading name={name} />
      <SubHeading name="Followers" />
      <Numbers>-</Numbers>
      <Button buttontext="Edit Profile" onClick={() => setIsOpen(true)}>
        {' '}
        Edit{' '}
      </Button>
    </ProfileSection>
  );
}

export default ProfileImage;
