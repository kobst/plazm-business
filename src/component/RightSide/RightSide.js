
import React, {useState, useEffect} from 'react'
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
import {Link} from "react-router-dom";
import AddModalBox from '../Add-Event/index'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import {callPlace,fetchItems} from '../../Api'
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
const localizer = momentLocalizer(moment)
const RightSide = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [place,setPlace]= useState({})
  const [event,setEvent]= useState()
  const [details,setDetails]= useState() 
  const [edit , setEdit]= useState(false)
  useEffect(() => {
    let updateUser = async authState => {
      try {
         const value = await Auth.currentAuthenticatedUser()
        const place = await callPlace(value.attributes.sub)
        setPlace(place[0])
        if(place){
        const val = await fetchItems(place[0]._id)
        const sol = val.filter(v=> v.eventSchedule!==null)
        eventManage(sol)
        }
      } catch (err){
         console.log(err)
      }
    }
    updateUser()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  const eventManage= (sol)=> {
    let eventArr = []
      // eslint-disable-next-line array-callback-return
      sol.map(v => {
        console.log(v)
        if(v.eventSchedule.recurring==='weekly'){
        const weeklyStartRule =new RRule({
        freq: RRule.WEEKLY,
       dtstart: new Date(v.eventSchedule.start_time),
       count: 30,
       interval: 1
       })
       const weeklyEndRule =new RRule({
        freq: RRule.WEEKLY,
       dtstart: new Date(v.eventSchedule.end_time),
       count: 30,
       interval: 1
       })
       weeklyStartRule.all().forEach((num1, index) => {
        const num2 = weeklyEndRule.all()[index];
        eventArr.push({
          id:v._id,
          title:v.name,
          start:num1,
          end: num2,
        })
      });
     setEvent(eventArr)
      }
     else if(v.eventSchedule.recurring==='daily'){
      const dailyStartRule =new RRule({
        freq: RRule.DAILY,
       dtstart: new Date(v.eventSchedule.start_time),
       count: 30,
       interval: 1
       })
       const dailyEndRule =new RRule({
        freq: RRule.DAILY,
       dtstart: new Date(v.eventSchedule.end_time),
       count: 30,
       interval: 1
       })
       dailyStartRule.all().forEach((num1, index) => {
        const num2 = dailyEndRule.all()[index];
        eventArr.push({
          id:v._id,
          title:v.name,
          start:num1,
          end: num2,
        })
      });
     setEvent(eventArr)
     }
    else if(v.eventSchedule.recurring==='mondayFriday'){
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
          id:v._id,
          title:v.name,
          start:num1,
          end: num2,
        })
      });
     setEvent(eventArr)
    }
  })
}

  
  return (
    <RightSection>
      <Card>
        <Heading name="Event" />
        <button type="submit" onClick = {() => (
                    Auth.signOut() )} className="btn btn-primary">  <Link to ='/business/login' >Logout</Link></button>
        <Events />
        <AddModalBox editValue={edit} setEdit={setEdit} value={details} isOpen={isOpen} setIsOpen={setIsOpen} data={place} closeModal={()=> (setEdit(false),setIsOpen(false))} />
       <div>
         {typeof event !== 'undefined' ?
    <Calendar
      localizer={localizer}
      events={event}
      startAccessor="start"
      endAccessor="end"
      onSelectEvent={(e)=> (
        // eslint-disable-next-line no-sequences
        setEdit(true),
        setIsOpen(true),
        setDetails(e)
      ) }
      step={60}
      view='week'
      views={['week']}
      style={{ height: 400, width:800 }}
    /> : <ValueLoader height="100" width="100"/>
         }
  </div>
      </Card>
      <Card >
        <Button onClick ={() => setIsOpen(true)}>Add Events</Button>
    </Card>
    <Card >
        <h2>All Events</h2>
          <h3>Discussion</h3>
          <h4>9th july- 10th July</h4>
          <h3>New event</h3>
          <h4>12th july- 13th July</h4>
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