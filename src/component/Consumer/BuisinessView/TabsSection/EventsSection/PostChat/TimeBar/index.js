import React,{useState} from "react"
import styled from "styled-components"



const BottomBarLikes = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin: 0 0 5px;
  @media (max-width:767px){
    flex-direction: column;
    align-items: flex-start;
  }
`
const LabelWrap = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  min-width: 60px;
  margin-right: 5px;
`
const LabelInput = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #FF2E9A;
`

const TimeBar = ({}) => {
    return (
    <>
    <BottomBarLikes>
      <LabelWrap>Time -</LabelWrap>
      <LabelInput>04:00 PM - 8:00 PM</LabelInput>
    </BottomBarLikes>
    </>
    )
}
  
export default TimeBar