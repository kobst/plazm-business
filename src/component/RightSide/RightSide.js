
import React, { useState, useEffect } from 'react'
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
import { Auth } from 'aws-amplify';
import { Link } from "react-router-dom";
import AddModalBox from '../Add-Event/index'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { callPlace, fetchItems } from '../../Api'
import ValueLoader from '../../utils/loader'
import { RRule } from 'rrule'
import 'react-big-calendar/lib/css/react-big-calendar.css';



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
const EventSection = styled.div`
display:flex;
@media (max-width:767px){
  flex-direction: column;
}
`
const EventLeft = styled.div`
padding:0px;
width:calc(100% - 300px);
@media (max-width:767px){
  width:100%;
}
`

const EventRight = styled.div`
padding:0px;
width:270px;
button{
  float:right;
}
@media (max-width:767px){
  width:100%;
}
`
const EventOuter = styled.div`
padding:15px 0;
margin-top: 20px;
background:#F5F5F5;
float: left;
width:100%;

h2{
  padding: 0 15px;
  margin-bottom:15px;
}
h3{
  font-size:16px;
  color:#000;
  margin-bottom:0px;
  padding: 0 15px;
}
span{
  font-size:10px;
  color:#7D7D7D;
  padding: 0 15px;
  position:relative;
  top:-5px;
}
p{
  font-size:14px;
  color:#000;
  margin:0 0 10px 0;
  padding: 0 15px;
  line-height:16px;
}
@media (max-width:767px){
  width:100%;
  height: auto;
}

`
const EventList = styled.div`
padding:0px;
max-height: 344px;
overflow-y: auto;
> div{
  border-bottom:1px solid #ddd;
  margin-bottom:10px;
  :last-child{
    border:none; 
    margin-bottom:0px;
    p{
      margin-bottom:5px;
    }
  }

`

const localizer = momentLocalizer(moment)
const RightSide = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [place, setPlace] = useState({})
  const [event, setEvent] = useState()
  const [details, setDetails] = useState()
  const [edit, setEdit] = useState(false)
  const [eventList,setEventList]= useState()
  useEffect(() => {
    let updateUser = async authState => {
      try {
        const value = await Auth.currentAuthenticatedUser()
        const place = await callPlace(value.attributes.sub)
        setPlace(place[0])
        if (place && place.length!==0) {
          console.log('okkay')
          const val = await fetchItems(place[0]._id)
          const sol = val.filter(v => v.eventSchedule !== null)
          setEventList(sol)
          eventManage(sol)
        }
        else{
          console.log('okkay1')
          let eventArr = []
          setEvent(eventArr)
        }
      } catch (err) {
        console.log(err)
      }
    }
    updateUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eventManage = (sol) => {
    let eventArr = []
    // eslint-disable-next-line array-callback-return
    setEvent(eventArr)
    sol.map(v => {
      console.log(v)
      if (v.eventSchedule.recurring === 'weekly'&&v.eventSchedule.recurring === 'Weekly') {
        const weeklyStartRule = new RRule({
          freq: RRule.WEEKLY,
          dtstart: new Date(v.eventSchedule.start_time),
          count: 30,
          interval: 1
        })
        const weeklyEndRule = new RRule({
          freq: RRule.WEEKLY,
          dtstart: new Date(v.eventSchedule.end_time),
          count: 30,
          interval: 1
        })
        weeklyStartRule.all().forEach((num1, index) => {
          const num2 = weeklyEndRule.all()[index];
          eventArr.push({
            id: v._id,
            title: v.name,
            start: num1,
            end: num2,
          })
        });
        setEvent(eventArr)
      }
      else if (v.eventSchedule.recurring === 'daily'||v.eventSchedule.recurring === 'Daily') {
        const dailyStartRule = new RRule({
          freq: RRule.DAILY,
          dtstart: new Date(v.eventSchedule.start_time),
          count: 30,
          interval: 1
        })
        const dailyEndRule = new RRule({
          freq: RRule.DAILY,
          dtstart: new Date(v.eventSchedule.end_time),
          count: 30,
          interval: 1
        })
        dailyStartRule.all().forEach((num1, index) => {
          const num2 = dailyEndRule.all()[index];
          eventArr.push({
            id: v._id,
            title: v.name,
            start: num1,
            end: num2,
          })
        });
        setEvent(eventArr)
      }
      else if (v.eventSchedule.recurring === 'mondayFriday'||v.eventSchedule.recurring === 'Monday-Friday') {
        const weekDayStartRule = new RRule({
          freq: RRule.WEEKLY,
          dtstart: new Date(v.eventSchedule.start_time),
          count: 60,
          interval: 1,
          byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR]
        })
        const weekDayEndRule = new RRule({
          freq: RRule.WEEKLY,
          dtstart: new Date(v.eventSchedule.end_time),
          count: 60,
          interval: 1,
          byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR]
        })
        weekDayStartRule.all().forEach((num1, index) => {
          const num2 = weekDayEndRule.all()[index];
          eventArr.push({
            id: v._id,
            title: v.name,
            start: num1,
            end: num2,
          })
        });
        setEvent(eventArr)
      }
    })
  }
  const ConvertNumberToTwoDigitString = (n) => {
    return n > 9 ? "" + n : "0" + n;
}

const getDate = (value) =>{
  const date = new Date(value);
  const time = ConvertNumberToTwoDigitString(date.getHours()) + 
           ":" + ConvertNumberToTwoDigitString(date.getMinutes());
      return time

}


  return (
    <RightSection>
      <Card>
        <EventSection>
          <EventLeft>
            <Heading name="Event" />
            <button type="submit" onClick={() => (
              Auth.signOut())} className="btn btn-primary">  <Link to='/business/login' >Logout</Link></button>
            <AddModalBox editValue={edit} events={eventList} setEdit={setEdit} value={details} isOpen={isOpen} setIsOpen={setIsOpen} data={place} closeModal={() => (setEdit(false), setIsOpen(false))} />
            <div>
              {typeof event !== 'undefined' ?
                <Calendar
                  className="CalenderSec"
                  localizer={localizer}
                  events={event}
                  startAccessor="start"
                  endAccessor="end"
                  onSelectEvent={(e) => (
                    // eslint-disable-next-line no-sequences
                    setEdit(true),
                    setIsOpen(true),
                    setDetails(e)
                  )}
                  step={60}
                  views={['month','week','day']}
                  style={{ height: 400, width:"95%", marginTop:"15px" }}
                /> : <div className="loader"> <ValueLoader  height="70" width="70" /></div>

              }
            </div>
          </EventLeft>
          <EventRight>
            <Button onClick={() => setIsOpen(true)}>Add Events</Button>
            <EventOuter>
              <Heading name="All Events" />
              <EventList>
                { eventList? eventList.map(v=>
                <>
                { v.name ?
              <div>
                <h3>{v.name}</h3>
                <p>{v.eventSchedule.recurring}</p>
                <span>{getDate(v.eventSchedule.start_time)} to {getDate(v.eventSchedule.end_time)}</span>
                 <p>{v.content}</p>
              </div>:null
            }
              </> ): null
           }
              </EventList>
            </EventOuter>
          </EventRight>
        </EventSection>
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
            <Anchor>cancel</Anchor>
            <Button buttontext="Publish"><BsChevronDown /></Button>
          </FlexRow>

          <BottomSection>
            <Heading name="Feed" />
            <ListingOuter>
              <Listing />
              <Listing />
              <Listing />
            </ListingOuter>
          </BottomSection>

        </Card>

        {/* Right Card */}
        <Card>
          <FlexRow>
            <Heading name="Messages" />
            <Button buttontext="New"></Button>
          </FlexRow>
          <Search />
          <ListingOuter>
            <Listing />
            <Listing />
            <Listing />
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