import React from 'react';
import styled from 'styled-components';
import CalenderSection from './CalenderSection';
import PostChat from './PostChat';

const PostsSectionContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const PostsSection = ({ businessId, addEventModal, setAddEventModal }) => {
  return (
    <>
      <PostsSectionContent>
        <CalenderSection businessId={businessId} addEventModal={addEventModal} setAddEventModal={setAddEventModal} />
        <PostChat />
      </PostsSectionContent>
    </>
  );
};

export default PostsSection;
