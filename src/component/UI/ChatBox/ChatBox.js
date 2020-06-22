
import React from 'react'
import styled from 'styled-components'
import SubHeading from '../SubHeading/SubHeading'
import PinIcon from '../../../Public/images/pin.svg'
import SendIcon from '../../../Public/images/send.svg'
import ArrowLeft from '../../../Public/images/arrow-left.svg'


const MessagesSection = styled.div`
margin-top:30px;
font-family: 'Roboto',sans-serif;
`
const HeadingBox = styled.div`
display:flex;
align-items:center;
img{
  margin-right:15px;
}
`
const GreyBox = styled.div`
background-color: #f2f2f2;
    font-size: 14px;
    width: 50%;
    color: #676767;
    min-height: 47px;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 6px;
    position:relative;
    margin-top:30px;
  span{
    position:absolute;
    right:5px;
    bottom:3px;
    font-size:10px;
    color:#aaa;
  }
`

const BlackBox = styled.div`
   background-color: #363636;
    font-size: 14px;
    width: 50%;
    color: #fff;
    min-height: 47px;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 6px;
    position:relative;
    margin-top:30px;
    margin-left:auto;
  span{
    position:absolute;
    right:5px;
    bottom:3px;
    font-size:10px;
    color:#aaa;
  }
`
const TextareaBox = styled.div`
background: #DEDEDE;
height: 46px;
border-radius: 6px;
display: flex;
align-items: center;
margin-top:50px;
padding:0 15px;
textarea{
  background: none;
  border: none;
  resize: none;
  width: calc(100% - 61px);
}
`
const Icon = styled.div`
padding:0px;
display:flex;
align-items:center;
img:first-child{
  margin-right:10px;
}
`
const ChatBox = props => {
  return (
    <MessagesSection>
      <HeadingBox><img src={ArrowLeft} alt={ArrowLeft} /> <SubHeading name="John Watson" /></HeadingBox>
    <GreyBox>
      This is awesome!
      <span>2 hours ago</span>
    </GreyBox>
    <BlackBox>
      Will 14:00 est Work?
      <span>2 hours ago</span>
    </BlackBox>
    <GreyBox>
      This is awesome!
      <span>2 hours ago</span>
    </GreyBox>
    <BlackBox>
      Will 14:00 est Work?
      <span>2 hours ago</span>
    </BlackBox>
    <TextareaBox>
      <textarea></textarea>
      <Icon><img src={PinIcon} alt="" /> <img src={SendIcon} alt="" /></Icon>
    </TextareaBox>
    </MessagesSection>
  )
}

export default ChatBox