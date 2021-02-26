import React from "react"
import styled from "styled-components"
import ProfileImg from '../../../../../../../images/profile-img.png'
import ReplyInput from './ReplyInput'
import LikesBar from '../LikesBar'
import DateBar from '../DateBar'
import TimeBar from '../TimeBar'
import ImageComment from '../ImageComment'
import { useSelector } from 'react-redux';

const UserMessageContent = styled.div`
    width:100%;
    position: relative;
    display:flex;
    padding: 0;
    flex-direction: column;
    @media (max-width:767px){
        justify-content: flex-start;
        align-items: flex-start;
    }
    &.UserReplyContent{
        padding: 0 0 0 40px;
    }
`
const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0;
  margin: 15px 0;
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
  border-bottom: 0.25px solid #878787;
  padding: 0 25px 15px 0px;
  @media (max-width:1024px){
    padding: 0 45px 15px 0px;
  }
`

const ProfileName = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 0 0 5px 0;
  font-weight: 700;
  color: #FF2E9A;
  span{
    font-weight: 700;  
    color: #fff;
    margin: 0 3px;
  }
`

const ChatInput = styled.div`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0 0 5px;
  color: #fff;
`

const BottomBarLikes = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width:767px){
    flex-direction: column;
    align-items: flex-start;
  }
`
const LikesBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0px;
  align-items: center;
  flex-wrap: wrap;
`

const UsersButton = styled.button`
  font-weight: 600;
  font-size: 13px;
  line-height: normal;
  text-align: center;
  color: #FF2E9A;
  background: transparent;
  width: auto;
  border: 0;
  padding: 0px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 0;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    background: transparent;
  }
`

const CircleDot = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  margin: 0 5px;
  background: #FF2E9A;
`
const ChatDate = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  span {
      margin: 0 10px;
  }
`

const RightDiv = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  align-items: center;
  display: flex;
  margin:0 0 0 20px;
  @media (max-width:767px){
    margin: 8px 15px 0 0px;
  }
  svg {
      margin: 0 7px 0 0;
  }
`

const SubHeading = styled.div`
  font-style: normal;
  font-size: 13px;
  line-height: normal;
  margin: 0 0 5px 0;
  font-weight: 700;
  color: #00C2FF;
`

const UserMessage = ({eventData}) => {
  const businessInfo = useSelector(state => state.business.business)[0]
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return (
    <>
    <UserMessageContent>
        <ProfileNameHeader>
            <ProfileThumb>
                <img src={eventData.user!==null&&eventData.user.photo?eventData.user.photo:eventData.user==null?businessInfo.default_image_url?businessInfo.default_image_url:ProfileImg:ProfileImg}  alt="" />
            </ProfileThumb>
            <ProfileNameWrap>
                <ProfileName>{businessInfo.company_name}</ProfileName>
                <SubHeading>{eventData.title}</SubHeading>
                <ChatInput>
                    {eventData.description}
                </ChatInput>
                <DateBar startDay={days[new Date(eventData.eventSchedule.start_time).getDay()-1]} endDay={days[new Date(eventData.eventSchedule.end_time).getDay()-1]} />
                <TimeBar startTime={new Date(eventData.eventSchedule.start_time)} endTime={new Date(eventData.eventSchedule.end_time)}/>
                <LikesBar date={new Date(eventData.createdAt)}/>
            </ProfileNameWrap>            
        </ProfileNameHeader>
        <ImageComment image={eventData.media.length>0?eventData.media[0].image:""}/>
    </UserMessageContent>
    <UserMessageContent className="UserReplyContent">
        <ProfileNameHeader>
            <ProfileThumb>
                <img src={ProfileImg} alt="" />
            </ProfileThumb>
            <ProfileNameWrap>
                <ProfileName>Top 10 Restaurant in NYC<span>by</span>NYPlazm_Eater </ProfileName>
                <ChatInput>
                    La Morada serves some of the best pasta in the city, but the real attraction is the pizza which is world class...
                </ChatInput>
                <LikesBar date={new Date(eventData.createdAt)}/>
            </ProfileNameWrap>
        </ProfileNameHeader>
        <ReplyInput />
    </UserMessageContent>
    </>
    )
}
  
  export default UserMessage