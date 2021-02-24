import React,{useState} from "react";
import styled from "styled-components"
import { FaRegSmile } from "react-icons/fa";
import ProfileImg from '../../../../../../../../images/profile-img.png'


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
const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0;
  margin: 0;
`

const ProfileThumb = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 10px 0 0;
  border: 1px solid #FFFFFF;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 30px;
    height: 30px;
  }
`
const ProfileNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: calc(100% - 40px);
  padding: 0 25px 0px 0px;
  width: 100%;
  @media (max-width:1024px){
    padding: 0 45px 0px 0px;
  }
`

const InputWrap = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 0 0 5px 0;
  font-weight: 500;
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
  height: 37px;
  border-bottom: 0.5px solid #AFAFAF;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  input {
      border: 0;
      outline: 0;
      padding:0;
      margin: 0;
      font-size: 13px;
      font-weight: 400;
      color: #fff;
      background: transparent;
      height: 37px;
      max-width: calc(100% - 30px);
      width: 100%;
      :hover, :focus {
        border: 0;
        outline: 0;
      }
  }
`
const EmojiWrap = styled.div`
  width: 15px;
  height: 15px;
  svg {
      color: #fff;
      font-size: 15px;
  }
`

const ReplyInput = ({}) => {
    return (
    <>
        <ChatContent>
            <ProfileNameHeader>
                <ProfileThumb>
                    <img src={ProfileImg} alt="" />
                </ProfileThumb>
                <ProfileNameWrap>
                    <InputWrap>
                        <input></input>
                        <EmojiWrap>
                            <FaRegSmile />
                        </EmojiWrap>
                    </InputWrap>
                    
                </ProfileNameWrap>
            </ProfileNameHeader>
        </ChatContent>
    </>
    )
}
  
  export default ReplyInput