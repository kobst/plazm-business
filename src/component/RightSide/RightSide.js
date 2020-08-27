
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
import EventImg from '../../images/eventimg.png'
import SubHeading from '../UI/SubHeading'
import ButtonSmall from '../UI/ButtonSmall'
import Textarea from '../UI/Textarea'
import CrossIcon from '../../images/cross-icon.svg'
import UploadImg from '../../images/upload-img1.png'
import UserIcon from '../../images/user.svg'
import WishlistIcon from '../../images/wishlist-icon.svg'
import CommentIcon from '../../images/comment.svg'
import SortIcon from '../../images/sort.svg'
import UploadIocn from '../../images/upload.svg'
import PlusIcon from '../../images/plus.svg'
import CloseIcon from '../../images/close.svg'
import GallerySec from '../UI/Gallery'

const RightSection = styled.div`

`
const Row = styled.div`
display:flex;
justify-content: space-between;
@media (max-width:767px){
  margin-top:10px; 
}
`
const FlexRow = styled.div`
display: flex;
justify-content: space-between;
align-items:center;
flex-wrap:wrap;
padding:0 15px;
@media (max-width:767px){
  padding:0px;
}
`

const EventLeft = styled.div`
display:flex;
max-width:804px;
margin-right: 5px;
width:100%;
position:relative;
&:after{
  background: linear-gradient(180deg,rgba(255,255,255,0) -51.89%,#FFFFFF 79.25%);
  border-radius: 0px 0px 24px 24px;
  position: absolute;
  width: 100%;
  left: 0px;
  bottom: 10px;
  content: '';
  height:92px;

@media (max-width:767px){
max-width:inherit;
}
`
const CalenderSection = styled.div`
margin-top:50px;
@media (max-width:767px){
  margin-top:20px;
}
`
const EventRight = styled.div`
padding:0px;
max-width: 550px;
width:100%;
margin-left:5px;
position:relative;
&:after{
  background: linear-gradient(180deg,rgba(255,255,255,0) -51.89%,#FFFFFF 79.25%);
  border-radius: 0px 0px 24px 24px;
  position: absolute;
  width: 100%;
  left: 0px;
  bottom: 10px;
  content: '';
  height:92px;
}
@media (max-width:767px){
  max-width:inherit;
  margin-left:0px;
  button{
    margin:3px 0;
  }
}
`
const AllEvent = styled.div`
margin-top:20px;
position:relative;
}
h2{
  font-size: 15px;
  line-height: 36px;
  color: #280A33;
  background: rgba(255,111,115,0.1);
  border-radius: 10px;
  font-weight: normal;
  padding: 3px 19px;
  
}
`
const EventOuter = styled.div`
display:flex;
width:100%;
@media (max-width:767px){
  flex-direction: column;
}
`

const EventList = styled.div`
padding:0px;
max-height:566px;
overflow-y:auto;
position:relative;

`
const EventListing = styled.div`
padding: 15px;
background: #FAFDFF;
border: 1px solid #E2F1F8;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
border-radius: 16px;
margin-top:10px;
display: flex;
justify-content: space-between;
:hover{
  background: rgba(255, 79, 148, 0.05);
border: 1px solid #FF479D;

}
`
const FeedListing = styled.div`
padding: 15px;
background: #FAFDFF;
border: 1px solid #E2F1F8;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
border-radius: 16px;
margin-top:10px;
display: flex;
> div:last-child{
  width: calc(100% - 70px);
  padding-right:0px;
}
span{
  font-size:12px;
  line-height:15px !important;
  color: #FF4F94 !important;
  display: flex;
    justify-content: flex-end;
}
p{
  margin-top:5px !important;
}

}`
const Icon = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
margin-top: 10px;
div{
  margin-left: 13px;
  position:relative;
  cursor:pointer;
  display:flex;
  align-items: center;
}
sup{
  background: #FF479D;
  width: 14px;
  height: 14px;
  color: #fff;
  border-radius: 100%;
  font-size: 9px;
  font-weight: 700;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -7px;
  right: -7px;
}
div:last-child{
  sup{
    top: -2px;
    right: -3px;
  }
}
`
const FeedImage = styled.div`
width:53px;
height:53px;
border:2px solid #fff;
overflow:hidden;
margin-right:10px;
border-radius:100%;
`
const EventText = styled.div`
padding-right:30px;
h3{
margin:0px;
font-weight: normal;
font-size: 18px;
line-height: 20px;
color: #FF479D;
}sortSection
  font-weight: normal;
font-size: 12px;
line-height:27px;
color: #280A33;
}
p{
font-weight: normal;
font-size: 13px;
line-height: 15px;
color:#626262;
margin: 3px 0 0 0;
}
`

const EventImage = styled.div`


`
const TabsOuter = styled.div`
margin-left:auto;
display:flex;
align-items:center;
div{
  margin-left:20px;
}
`
const SortSection = styled.div`
margin-left:auto;
display:flex;
align-items: center;
p{
font-size: 12px;
line-height: 14px;
color: #979797;
margin-right:38px;
}
`
const UploadImage = styled.div`
width: 31px;
height: 33px;
border-radius: 5px;
overflow:hidden;
margin-right:3px;
position:relative;
cursor:pointer;
:hover{
  :after{
    content:"";
    position: absolute;
    background: rgba(0,0,0,0.7) url(${CrossIcon});
    width: 31px;
    height: 33px;
    left: 0;
    top: 0;
    background-repeat: no-repeat;
    background-position: center;
  }
}
`
const UploadOuter = styled.div`
display:flex;
margin:0 10px;
`

moment.locale('en-GB')
const localizer = momentLocalizer(moment)
const RightSide = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [place, setPlace] = useState({})
  const [event, setEvent] = useState()
  const [details, setDetails] = useState()
  const [edit, setEdit] = useState(false)
  const [eventList, setEventList] = useState()
  const [feed, setFeed] = useState()
  const [posts, setPosts] = useState()
  const [mentions, setMention] = useState()
  const [allFeed, setAllFeed] = useState()
  const [description, setDescription] = useState()
  const [saveDisable, setSaveDisable] = useState(false)
  const [showTag, setShowTag] = useState(false)
  const [curators, setCurators] = useState([])
  const [activePublic, setActivePublic] = useState(false)
  const [activeMentions, setActiveMentions] = useState(false)
  const [mess, setActiveMess] = useState(false)
  const [allMentions, setAllMentions] = useState()

  useEffect(() => {
    let updateUser = async authState => {
      try {
        const value = await Auth.currentAuthenticatedUser()
        const place = await callPlace(value.attributes.sub)
        const users = await fetchUsers()
        if (users) {
          const userVal = []
          users.map(v => {
            return userVal.push({ name: v.name })
          })
          const val = userVal.sort(dynamicSort("name"))
          setCurators(val)

        }
        setPlace(place[0])
        if (place && place.length !== 0) {

          const val = await fetchItems(place[0]._id)
          const sol = val.filter(v => v.eventSchedule !== null && v.eventSchedule)
          const feed = val.filter(v => (!v.eventSchedule || v.eventSchedule === null))
          const allMentions = val.filter(v => (!v.eventSchedule || v.eventSchedule === null) && (v.name !== place[0].company_name) && v.name)
          setMention('Public')
          setActivePublic(true)
          setPosts(val)
          setEventList(sol)
          setFeed(feed)
          setAllFeed(feed)
          setAllMentions(allMentions)
          eventManage(sol)
        }
        else {
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
  useEffect(() => {

    const checkMentions = () => {
      if (mentions === 'Public') {
        setAllFeed(feed)
        setActiveMentions(false)
        setActiveMess(false)
        setActivePublic(true)
      }
      else if (mentions === 'All Mentions') {
        setAllFeed(allMentions)
        setActiveMentions(true)
        setActiveMess(false)
        setActivePublic(false)
      }
      else {
        setAllFeed(posts)
        setActiveMentions(false)
        setActiveMess(true)
        setActivePublic(false)
      }
    }
    checkMentions()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mentions])

  const eventManage = (sol) => {
    let eventArr = []
    setEvent(eventArr)
    // eslint-disable-next-line array-callback-return
    sol.map(v => {
      if (v.eventSchedule.recurring === 'weekly' || v.eventSchedule.recurring === 'Weekly') {
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
      else if (v.eventSchedule.recurring === 'daily' || v.eventSchedule.recurring === 'Daily') {
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
      else if (v.eventSchedule.recurring === 'mondayFriday' || v.eventSchedule.recurring === 'Monday-Friday') {
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
      else {
        eventArr.push({
          id: v._id,
          title: v.name,
          start: v.eventSchedule.start_time,
          end: v.eventSchedule.end_time,
          allDay: true
        })
        setEvent(eventArr)

      }
    })
  }
  const ConvertNumberToTwoDigitString = (n) => {
    return n > 9 ? "" + n : "0" + n;
  }
  const dynamicSort = (property) => {
    var sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    }
  }

  const getDate = (value) => {
    const date = new Date(value);
    const time = ConvertNumberToTwoDigitString(date.getHours()) +
      ":" + ConvertNumberToTwoDigitString(date.getMinutes());
    return time

  }
  const setMentions = (val) => {
    if (val === 'Public') {
      setMention('Public')
    }
    else if (val === 'All Mentions') {
      setMention('All Mentions')
    }
    else {
      setMention('Messages')
    }
  }

  const Validation = () => {
    if (!(description.trim())) {
      return false
    }
    else {
      return true
    }
  }
  const addPost = async () => {
    if (Validation()) {
      setSaveDisable(true)
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          place_id: place._id,
          content: description,
          scheduledEvent: "no",
        })
      });
      const body = await response.text();
      window.location.reload()
      return body
    }

  }
  const handleChange = (e) => {
    setDescription(e.target.value)
  }

  // const options = [{name: 'John Watson', id: 1},{name: 'Marie Curie', id: 2}]

  return (
    <RightSection>
      <Row>
        <EventOuter>
          <EventLeft>
            <Card>
              {/* Claender Section */}
              <FlexRow>
                <SubHeading name="Events" />
                <ButtonSmall onClick={() => setIsOpen(true)}>Add Events</ButtonSmall>
              </FlexRow>

              <AddModalBox editValue={edit} events={eventList} setEdit={setEdit} value={details} isOpen={isOpen} setIsOpen={setIsOpen} data={place} closeModal={() => (setEdit(false), setIsOpen(false))} />
              <CalenderSection>
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
                    views={['day', 'week', 'month',]}
                    style={{ height: 463, width: "100%", }}
                  /> : <div className="loader"> <ValueLoader height="70" width="70" /></div>

                }
              </CalenderSection>


              {/* All Events */}

              <AllEvent>
                <h2>All Events</h2>
                <EventList>
                  {eventList ? eventList.map(v =>
                    <>
                      {v.name ?
                        <EventListing>
                          <EventText>
                            <h3>{v.name}</h3>
                            {/* <p>{v.eventSchedule.recurring}</p> */}
                            <span>{getDate(v.eventSchedule.start_time)} to {getDate(v.eventSchedule.end_time)}</span>
                            <p>{v.content}</p>
                          </EventText>
                          <EventImage><img src={EventImg} alt="Event" /></EventImage>
                        </EventListing> : null
                      }
                    </>) : null
                  }
                </EventList>
              </AllEvent>
            </Card>
          </EventLeft>
          <EventRight>
            <Card>
              <SubHeading name="Write a Post" />
              <div className="mt-15">
                <Textarea />
                <div className="mt-10">
                  <FlexRow style={{ padding: '0px' }}>
                    <ButtonSmall bgColor="#0FB1D2"><img src={UploadIocn} alt="Upload" />Upload</ButtonSmall>
                    <UploadOuter>
                      <UploadImage><img src={UploadImg} alt="Upload" /></UploadImage>
                      <UploadImage><img src={UploadImg} alt="Upload" /></UploadImage>
                      <UploadImage><img src={UploadImg} alt="Upload" /></UploadImage>
                    </UploadOuter>
                    <ButtonSmall
                      maxWidth="34px"
                      bgColor="#FF7171"
                      style={{ marginLeft: 'auto', marginRight: '9px' }}>
                      <img src={CrossIcon} alt="Cross Icon" style={{ marginRight: '0px' }} />
                    </ButtonSmall>
                    <ButtonSmall>Publish</ButtonSmall>
                  </FlexRow>
                </div>
              </div>
            </Card>
            <Card>
              <FlexRow>
                <SubHeading name="Feed" />
                <TabsOuter>
                  <Tabs isActive={activePublic} setMentions={setMentions} name="Public" image={UserIcon} />
                  <Tabs isActive={mess} setMentions={setMentions} name="Message" image={CommentIcon} />
                </TabsOuter>
              </FlexRow>

              {mentions === 'Public' ?
                <>
                <div class="mt-25">
                  <FeedListing>
                    <FeedImage><img src={EventImg} alt="Event" /></FeedImage>
                    <EventText>
                      <span>08:35 AM, 12 - 08 - 12</span>
                      <h3>Marcus George</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet sed eget eros, viverra erat morbi. Nulla eleifend a elit sapien. Feugiat orci ullamcorper elit malesuada lacus. Pulvinar convallis rutrum accumsan pulvinar in sodales nullam velit.</p>
                      <Icon>
                        <div><img src={WishlistIcon} alt="" /><sup>3</sup></div>
                        <div><img src={CommentIcon} alt="" /><sup>3</sup></div>
                      </Icon>
                    </EventText>
                  </FeedListing>

                  <FeedListing>
                    <FeedImage><img src={EventImg} alt="Event" /></FeedImage>
                    <EventText>
                      <span>08:35 AM, 12 - 08 - 12</span>
                      <h3>Marcus George</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet sed eget eros, viverra erat morbi. Nulla eleifend a elit sapien. Feugiat orci ullamcorper elit malesuada lacus. Pulvinar convallis rutrum accumsan pulvinar in sodales nullam velit.</p>
                      <Icon>
                        <div><img src={WishlistIcon} alt="" /><sup>3</sup></div>
                        <div><img src={CommentIcon} alt="" /><sup>3</sup></div>
                      </Icon>
                    </EventText>
                  </FeedListing>

                  <FeedListing>
                    <FeedImage><img src={EventImg} alt="Event" /></FeedImage>
                    <EventText>
                      <span>08:35 AM, 12 - 08 - 12</span>
                      <h3>Marcus George</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet sed eget eros, viverra erat morbi. Nulla eleifend a elit sapien. Feugiat orci ullamcorper elit malesuada lacus. Pulvinar convallis rutrum accumsan pulvinar in sodales nullam velit.</p>
                      <Icon>
                        <div><img src={WishlistIcon} alt="" /><sup>3</sup></div>
                        <div><img src={CommentIcon} alt="" /><sup>3</sup></div>
                      </Icon>
                    </EventText>
                  </FeedListing>

                  <FeedListing>
                    <FeedImage><img src={EventImg} alt="Event" /></FeedImage>
                    <EventText>
                      <span>08:35 AM, 12 - 08 - 12</span>
                      <h3>Marcus George</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet sed eget eros, viverra erat morbi. Nulla eleifend a elit sapien. Feugiat orci ullamcorper elit malesuada lacus. Pulvinar convallis rutrum accumsan pulvinar in sodales nullam velit.</p>
                      <Icon>
                        <div><img src={WishlistIcon} alt="" /><sup>3</sup></div>
                        <div><img src={CommentIcon} alt="" /><sup>3</sup></div>
                      </Icon>
                    </EventText>
                  </FeedListing>

                  <FeedListing>
                    <FeedImage><img src={EventImg} alt="Event" /></FeedImage>
                    <EventText>
                      <span>08:35 AM, 12 - 08 - 12</span>
                      <h3>Marcus George</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet sed eget eros, viverra erat morbi. Nulla eleifend a elit sapien. Feugiat orci ullamcorper elit malesuada lacus. Pulvinar convallis rutrum accumsan pulvinar in sodales nullam velit.</p>
                      <Icon>
                        <div><img src={WishlistIcon} alt="" /><sup>3</sup></div>
                        <div><img src={CommentIcon} alt="" /><sup>3</sup></div>
                      </Icon>
                    </EventText>
                  </FeedListing>
                  </div>
                </> : null
              }

              {mentions === 'Messages' ?
                <div class="mt-25"><ChatBox /></div> : null
              }



            </Card>
          </EventRight>
        </EventOuter>
      </Row>
      <Row>
        <Card>
          <FlexRow>

            <SubHeading name="Gallery" />
            <SortSection>
              <p>You may upload images under the size of 2 MB each. Any dimension related message goes here*</p>
              <a href="javascript:;"> <img src={SortIcon} alt="" /></a>
            </SortSection>
          </FlexRow>
          <hr></hr>
          {/* Gallery section */}
          <GallerySec />

        </Card>
      </Row>
      {/* <Row>
        <Card>
          <FlexRow>
            <Tabs isActive={activePublic} setMentions={setMentions} name="Public" />
            <Tabs isActive={activeMentions} setMentions={setMentions} name="All Mentions" />
            <Tabs isActive={mess} setMentions={setMentions} name="Messages" />
          </FlexRow>
          {mentions === 'Public' ?
            <>
              <TextArea value={description} onChange={(e) => handleChange(e)} placeholder="Type your post here" />
              <FlexRow>
                <LineButton setShowTag={setShowTag} name="Add Tags" />
                {showTag ?
                  <Multiselect options={curators} displayValue="name" /> : null
                }
                <Anchor onClick={() => setDescription('')}>Cancel</Anchor>
                <Button className="btn btn-primary" disabled={saveDisable} onClick={() => addPost()} buttontext="Publish" >{'Publish'}</Button>
              </FlexRow>
            </> : null
          }

          <BottomSection>
            {mentions === 'Public' ?
              <Heading name="Feed" /> : null
            }
            {mentions === 'Messages' ?
              <Search /> : null
            }
            <ListingOuter>
              <Listing mentions={mentions} data={place} value={allFeed} />
            </ListingOuter>
          </BottomSection>

        </Card>
        <Card>
          <FlexRow>
            <Heading name="Message" />
            <Button buttontext="New"></Button>
          </FlexRow>
          <Search />

          <Messages />
    
          <ChatBox />
        </Card>
      </Row> */}

    </RightSection>
  )
}

export default RightSide