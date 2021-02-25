import React,{useState} from "react";
import styled from "styled-components"
import UserMessage from './UserMessage'
import { Scrollbars } from 'react-custom-scrollbars';


const ChatContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    padding: 12px 0 12px 12px;
    flex-direction: column;
    overflow: hidden;
    @media (max-width:767px){
    }
`


const PostChat = ({}) => {
    return (
    <>
     <Scrollbars  
        autoHeight
        autoHeightMin={0}
        autoHeightMax={500}
        thumbMinSize={30}
        >
        <ChatContent>
            <UserMessage />
            <UserMessage />
            <UserMessage />
            <UserMessage />
            <UserMessage />
            <UserMessage />
        </ChatContent>
    </Scrollbars>
    </>
    )
}
  
  export default PostChat