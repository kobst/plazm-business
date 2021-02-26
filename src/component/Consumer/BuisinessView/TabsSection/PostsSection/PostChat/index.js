import React from "react";
import styled from "styled-components"
import UserMessage from './UserMessage'
import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector } from "react-redux";


const ChatContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    padding: 12px 0;
    flex-direction: column;
    overflow: hidden;
    @media (max-width:767px){
    }
`


const PostChat = ({}) => {
    const posts = useSelector((state) => state.business.posts);
    return (
    <>
     <Scrollbars  
        autoHeight
        autoHeightMin={0}
        autoHeightMax={450}
        thumbMinSize={30}
        >
        <ChatContent>
        {posts.map((i) => (
            <UserMessage postData={i} />
          ))}
        </ChatContent>
    </Scrollbars>
    </>
    )
}
  
  export default PostChat
