import React, {useState} from 'react';
import styled from 'styled-components';
import AddPostSection from './AddPostSection';
import PostChat from './PostChat';
import PostFilterButton from './PostFilterButtons';

const PostsSectionContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const PostsSection = ({profile, businessId}) => {
  const [filterArr, setFilterArr] = useState([]);
  return (
    <>
      <PostsSectionContent>
        <AddPostSection
        // profile={profile}
          businessId={businessId} />
        {/* <PostFilter setFilterArr={setFilterArr} /> */}
        <PostFilterButton setFilterArr={setFilterArr} />
        <PostChat
          // setSelectedListId={setSelectedListId}
          filterArr={filterArr}
          setFilterArr={setFilterArr}
        />
      </PostsSectionContent>
    </>
  );
};

export default PostsSection;
