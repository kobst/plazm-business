
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Heading from '../UI/Heading/Heading'
import Tabs from '../UI/Tabs/Tabs'
import Card from '../UI/Card/Card'
import LineButton from '../UI/LineButton/LineButton'
import Button from '../UI/Button/Button'
import Listing from '../UI/Listing/Listing'
import Search from '../UI/Search/Search'
import Messages from '../UI/Messages/Messages'
import ChatBox from '../UI/ChatBox/ChatBox'
import { Auth } from 'aws-amplify';
import { Link } from "react-router-dom";
import AddModalBox from '../Add-Event/index'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { callPlace, fetchItems, fetchUsers } from '../../Api'
import ValueLoader from '../../utils/loader'
import { RRule } from 'rrule'
import 'react-big-calendar/lib/css/react-big-calendar.css';
 import { Multiselect } from 'multiselect-react-dropdown';



const RightSection = styled.div`
margin-left: 30px;
width: calc(100% - 300px);
font-family: 'Roboto',sans-serif;
@media (min-width:768px) and (max-width:1024px){
  width:calc(100% - 325px);
}
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
@media (max-width:991px){
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
flex-wrap:wrap;
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
color: #000;
padding: 10px;
margin-bottom:7px;
:focus{
  outline:none;
}
`
const Anchor = styled.div`
margin-left:auto;
font-size:14px;
font-weight:500;
margin-right:20px;
cursor:pointer;
`
const BottomSection = styled.div`
margin-top:30px;
`
const ListingOuter = styled.div`
padding: 0px;
margin-top: 20px;
overflow-y: auto;
height: calc(100vh - 50px);
`
const EventSection = styled.div`
display:flex;
@media (max-width:991px){
  flex-direction: column;
}
`
const EventLeft = styled.div`
padding:0px;
width:calc(100% - 300px);
@media (max-width:991px){
  width:100%;
}
`

const EventRight = styled.div`
padding:0px;
width:270px;
button{
  float:right;
}
@media (max-width:991px){
  width:100%;
  margin-top: 15px;
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
@media (max-width:991px){
  width:100%;
  height: auto;
}

`
const EventList = styled.div`
padding:0px;
max-height: 545px;
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
moment.locale('en-GB')
const localizer = momentLocalizer(moment)
const RightSide = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [place, setPlace] = useState({})
  const [event, setEvent] = useState()
  const [details, setDetails] = useState()
  const [edit, setEdit] = useState(false)
  const [eventList,setEventList]= useState()
  const [feed,setFeed]= useState()
  const [posts,setPosts]= useState()
  const [mentions,setMention]= useState()
  const [allFeed,setAllFeed]= useState()
  const [description,setDescription]= useState()
  const [saveDisable, setSaveDisable]= useState(false)
  const [showTag,setShowTag]= useState(false)
  const [curators,setCurators]= useState([])
  const [activePublic,setActivePublic]= useState(false)
  const [activeMentions,setActiveMentions]= useState(false)
  const [mess,setActiveMess]= useState(false)

  useEffect(() => {
    let updateUser = async authState => {
      try {
        const value = await Auth.currentAuthenticatedUser()
        const place = await callPlace(value.attributes.sub)
        const users = await fetchUsers()
        if(users){
          const userVal=[]
         users.map(v=>{
           return userVal.push( {name: v.name})
          })
          setCurators(userVal)
    
        }
        setPlace(place[0])
        if (place && place.length!==0) {
          const val = await fetchItems(place[0]._id)
          const sol = val.filter(v => v.eventSchedule !== null)
          const feed = val.filter(v => !v.eventSchedule || v.eventSchedule === null)
          setMention('Public')
          setActivePublic(true)
          setPosts(val)
          setEventList(sol)
          setFeed(feed)
          setAllFeed(feed.reverse())
          eventManage(sol)
        }
        else{
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
  useEffect(()=>{

    const checkMentions = ()=> {
    if(mentions==='Public'){
      setAllFeed(feed)
      setActiveMentions(false)
      setActiveMess(false)
      setActivePublic(true)
    }
    else if(mentions==='All Mentions'){
      setAllFeed(posts)
      setActiveMentions(true)
      setActiveMess(false)
      setActivePublic(false)
    }
    else{
      setAllFeed(posts)
      setActiveMentions(false)
      setActiveMess(true)
      setActivePublic(false)
    }
  }
  checkMentions()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[mentions])

  const eventManage = (sol) => {
    let eventArr = []
    setEvent(eventArr)
    // eslint-disable-next-line array-callback-return
    sol.map(v => {
      if (v.eventSchedule.recurring === 'weekly'|| v.eventSchedule.recurring === 'Weekly') {
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
      else{
        eventArr.push({
          id: v._id,
          title: v.name,
          start: v.eventSchedule.start_time,
          end: v.eventSchedule.end_time,
          allDay:true
        })
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
  const setMentions = (val) => {
  if(val==='Public'){
     setMention('Public')
   }
   else if(val=== 'All Mentions'){
    setMention('All Mentions')
  }
  else{
    setMention('Messages')
  }
}

const Validation= ()=> {
  if(!(description.trim())){
    return false
  }
  else{
    return true
  }
}
const addPost = async () => {
  if(Validation()){
    setSaveDisable(true)
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      place_id: place._id,
      content:description,
      scheduledEvent: "no",
    })
  });
  const body = await response.text();
  window.location.reload()
  return body
}

}
const handleChange=(e)=>{
setDescription(e.target.value)
}

// const options = [{name: 'John Watson', id: 1},{name: 'Marie Curie', id: 2}]

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
                  defaultView="day"
                  step={60}
                  views={['day','week','month',]}
                  style={{ height: 600, width:"95%", marginTop:"15px" }}
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
            <Tabs isActive={activePublic} setMentions={setMentions} name="Public" />
            <Tabs isActive={activeMentions} setMentions={setMentions} name="All Mentions" />
            <Tabs isActive={mess}  setMentions={setMentions} name="Messages" />
          </FlexRow>
          {mentions==='Public'?
          <>
          <TextArea value={description} onChange={(e) => handleChange(e)} placeholder="Type your post here" />
          <FlexRow>
          <LineButton setShowTag={setShowTag} name="Add Tags" />
          { showTag ?
          <Multiselect options={curators} displayValue="name" />: null
            } 
            <Anchor onClick={()=>setDescription('')}>cancel</Anchor>
            <Button className="btn btn-primary" disabled={saveDisable} onClick={()=> addPost()} buttontext="Publish" >{'Publish'}</Button>
          </FlexRow>
          </>: null
}

          <BottomSection>
          {mentions==='Public'?
            <Heading name="Feed" />: null
             }
          {mentions==='Messages'?
            <Search />: null
             }
            <ListingOuter>
              <Listing value={allFeed}/>
            </ListingOuter>
          </BottomSection>

        </Card>

        {/* Right Card */}
        <Card>
          <FlexRow>
            <Heading name="Message" />
            <Button buttontext="New"></Button>
          </FlexRow>
          <Search />
         
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