import React,{useState} from "react";
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

const PostsSection = ({profile, businessId}) => {
    return (
    <>
    <PostsSectionContent>
        <AddPostSection profile={profile} businessId={businessId}/>
        <PostFilter />
        <PostChat />
    </PostsSectionContent>
    </>
    )
}
  
  export default PostsSection