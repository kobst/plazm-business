import React from "react";
import styled from "styled-components"
import AddPostSection from './AddPostSection'
import PostFilter from './PostFilter'
import PostChat from './PostChat'

const PostsSectionContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    flex-direction: column;
`

const PostsSection = ({profile, businessId, setSelectedListId}) => {
    return (
    <>
    <PostsSectionContent>
        <AddPostSection profile={profile} businessId={businessId}/>
        <PostFilter />        
        <PostChat setSelectedListId={setSelectedListId}/>
    </PostsSectionContent>
    </>
    )
}
  
  export default PostsSection