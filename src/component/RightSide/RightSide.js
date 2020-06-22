
import React from 'react'
import styled from 'styled-components'
import Heading from '../UI/Heading/Heading'
import Card from '../UI/Card/Card'
import LineButton from '../UI/LineButton/LineButton'
import Button from '../UI/Button/Button'
import { BsChevronDown } from "react-icons/bs";
import Listing from '../UI/Listing/Listing'
import Search from '../UI/Search/Search'
import Messages from '../UI/Messages/Messages'
import ChatBox from '../UI/ChatBox/ChatBox'

const RightSection = styled.div`
margin-left: 30px;
width: calc(100% - 300px);
font-family: 'Roboto',sans-serif;
@media (max-width:767px){
  margin-left: 0;
  width: 100%;
  margin-top: 30px;
}
`
const Events = styled.div`
height: 100px;
`
const Row = styled.div`
display:flex;
margin-top:30px;
justify-content: space-between;
> div{
  width:50%;
  :first-child{
    margin-right:30px;
  }
}
@media (max-width:767px){
  flex-direction: column;
  > div{
    width:100%;
    :first-child{
      margin-right:0px;
      margin-bottom: 30px;
    }
}
`
const FlexRow = styled.div`
display: flex;
justify-content: space-between;
align-items:center;
`
const TextArea = styled.textarea`
background-color: #F2F2F2;
border-radius: 6px;
width: 100%;
border: none;
resize: none;
height: 85px;
margin-top: 20px;
font-size: 14px;
color: #8b8b8b;
padding: 10px;
margin-bottom:7px;
:focus{
  outline:none;
}
`
const Anchor = styled.a`
margin-left:auto;
font-size:14px;
font-weight:500px;
margin-right:20px;
cursor:pointer;
`
const BottomSection = styled.div`
margin-top:30px;
`
const ListingOuter = styled.div`
padding: 0px;
margin-top: 20px;
height: 300px;
overflow-y: auto;
`

const RightSide = () => {
  return (
    <RightSection>
      <Card>
        <Heading name="Event" />
        <Events />
      </Card>

      <Row>
        {/* Left card */}
        <Card>
          <FlexRow>
            <Heading name="Post" />
            <Heading name="Mentions" />
          </FlexRow>
          <TextArea placeholder="Type your post here" />
          <FlexRow>
            <LineButton name="Public" />
            <Anchor>cancle</Anchor>
            <Button buttontext="Publish"><BsChevronDown /></Button>
          </FlexRow>

          <BottomSection>
            <Heading name="Feed" />
            <ListingOuter>
            <Listing/>
            <Listing/>
            <Listing/>
            </ListingOuter>
          </BottomSection>

        </Card>

        {/* Right Card */}
        <Card>
        <FlexRow>
          <Heading name="Messages" />
          <Button buttontext="New"></Button>
          </FlexRow>
          <Search/>
          <ListingOuter>
            <Listing/>
            <Listing/>
            <Listing/>
            </ListingOuter>
            {/* Messages Section */}
            <Messages />
            {/* Chat Section */}

            <ChatBox />
        </Card>
      </Row>

    </RightSection>
  )
}

export default RightSide