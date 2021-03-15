import React,{useState, useEffect} from "react"
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

const TimeBar = ({startTime, endTime}) => {
  const [sTime, setSTime] = useState();
  const [eTime, setETime] = useState();

  /*
  @desc: to convert time into 12 hours format
  @params: time
   */
  const formatTime = (time) => {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime
  }

  /** to convert time in display format */
  useEffect(()=>{
      const stTime = formatTime(startTime)
      setSTime(stTime);
      const etTime = formatTime(endTime)
      setETime(etTime)
  },[endTime, startTime])
    return (
    <>
    <BottomBarLikes>
      <LabelWrap>Time -</LabelWrap>
      <LabelInput>{sTime} - {eTime}</LabelInput>
    </BottomBarLikes>
    </>
    )
}
  
export default TimeBar