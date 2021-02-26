import React from "react";
import styled from "styled-components"
import UserMessage from './UserMessage'
import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';


const ChatContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    padding: 12px 0 12px 0px;
    flex-direction: column;
    overflow: hidden;
    @media (max-width:767px){
    }
`

const PostChat = ({}) => {
    const events = useSelector(state => state.event.events);
    return (
    <>
     <Scrollbars  
        autoHeight
        autoHeightMin={0}
        autoHeightMax={500}
        thumbMinSize={30}
        >
        <ChatContent>
            {events&&events.length>0&&events.map(i=><UserMessage eventData={i} />)}
        </ChatContent>
    </Scrollbars>
    </>
    )
}
  
export default PostChat