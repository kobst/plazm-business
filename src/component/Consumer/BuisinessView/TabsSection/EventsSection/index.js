import React,{useState} from "react";
import styled from "styled-components"
import CalenderSection from './CalenderSection'
import PostChat from './PostChat'

const PostsSectionContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    flex-direction: column;
`

const PostsSection = ({}) => {
    return (
    <>
    <PostsSectionContent>
        <CalenderSection />
        <PostChat />
    </PostsSectionContent>
    </>
    )
}
  
  export default PostsSection