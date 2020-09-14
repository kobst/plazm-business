import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import Card from '../UI/Card/Card'
import MapImg from '../../images/map.png'
import PinIcon from '../../images/location.svg'
import Label from '../UI/Label/label'
import Input from '../UI/Input/Input'
import ButtonSmall from '../UI/ButtonSmall'
// import Badges from '../UI/Badges'
import PlusIcon from '../../images/plus-img.svg'
import history from '../../utils/history'
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import TimePicker from 'react-bootstrap-time-picker';


const ProfileOuter = styled.div`
display:flex;
flex-direction: column;
p{
  color:#fff;
  padding: 0 0 15px 15px;
  font-size: 18px;
}
}
`
const ProfileInner = styled.div`
display:flex;
width:100%;
@media (max-width:767px){
  flex-direction:column;
}
`

const LeftProfile = styled.div`
padding:0px;
width:50%;
margin-right:5px;
div{
  padding:10px;
}
img{max-width:100%;}
@media (max-width:767px){
width:100%;
margin-right:0px;
margin-bottom:10px;
}
`
const RightProfile = styled.div`
padding:0px;
width:50%;
margin-left:5px;
> div{
  padding:35px;
  @media (max-width:767px){
    padding:15px;
  }
}
@media (max-width:767px){
  width:100%;
  margin-left:0px;
  }
`
const FormGroup = styled.div`
margin-bottom:22px;
:last-child{
  margin-bottom:0px;
}
@media (max-width:767px){
margin-bottom:15px;
  }
`
const FlexRow = styled.div`
display:flex;
`
const TopProfile = styled.div`
width:111px;
height:111px;
border-radius:100%;
background: #7C9CBF;
box-shadow: 0px 2px 4px rgba(44, 39, 56, 0.04), 0px 4px 8px rgba(44, 39, 56, 0.08);
font-family: IBM Plex Sans;
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 21px;
display: flex;
align-items: center;
justify-content: center;
color: #fff;
margin-right:35px;
margin-bottom: 10px;

@media (max-width:767px){
  width:50px;
  height:50px;
  margin-right:15px;
}

`
const LabelRight = styled.div`
padfing:0px;
width: calc(100% - 146px);
@media (max-width:767px){
  width: calc(100% - 65px); 
}
`
const HashTags = styled.div`
padding:0px;
display: flex;

>div:first-child{
  margin-right:5px;
}
>div:last-child{
  margin-left:5px;
}
@media (max-width:767px){
  flex-direction:column;
  >div:first-child{
    margin-right:0px;
  }
  >div:last-child{
    margin-left:0px;
  }
}
`
const HashTagsSearch = styled.div`
background: rgba(226, 241, 248, 0.4);
border-radius: 7px;
display: flex;
align-items: center;
justify-content: space-between;
padding: 5px 10px 5px 15px;
margin-bottom:15px;
h3{
font-size: 16px;
line-height: 44px;
color: #156064;
font-weight:normal;
}

input{
  background: #FFFFFF;
border: 1px solid #DBE2EA;
box-sizing: border-box;
box-shadow: 0px 2px 4px rgba(44, 39, 56, 0.08);
border-radius: 17px;
height:34px;
padding:0 15px;
font-family: 'IBM Plex Sans',sans-serif;
width: calc(100% - 195px);
:focus{
  outline:none;
}
::placeholder{
  font-weight: 500;
font-size: 14px;
line-height: 18px;
color: #7C9CBF;
}
}
@media (max-width:767px){
  margin-bottom:10px;
  h3{
    font-size:14px;
  } 
  input{
    width: calc(100% - 119px);
  }
}
`
const Button = styled.button`
  background: #FF479D;
  box-shadow: 0px 1px 2px rgba(44, 39, 56, 0.0001), 0px 2px 4px rgba(44, 39, 56, 0.08);
  border-radius: 17px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #FFFFFF;
  font-family: 'IBM Plex Sans',sans-serif;
  border:none;
  max-width:197px;
  height:34px;
  width:100%;
  text-align:left;
  cursor:pointer;
  padding:0 20px;
  display: flex;
  float:right;
    align-items: center;
    justify-content: space-between;
  :focus{
    outline:none;
  }
  img{
    float:right;
  }
`

const EditProfile = ({value}) => {
  const [company,setCompany] = useState()
  const [website,setWebsite] = useState()
  const [phone,setPhone] = useState()
  const [rating,setRating] = useState()
  const [type,setType] = useState()
  const [status,setStatus] = useState()
  const [map,setMap] = useState()
  const [latitude,setLatitude] = useState()
  const [longitude,setLongitude] = useState()
  const [userAddress,setAddress] = useState()
  const [twitter,setTwitter]= useState()
  const [instagram,setInstagram]= useState()
  const [facebook,setFacebook]= useState()
  const [tags, setTags] = useState([])
  const [start,setStart]= useState()
  const [end,setEnd]= useState()
  const [startDay,setStartDay]= useState()
  const [endDay,setEndDay]= useState()

  useEffect(()=> {
    if(typeof value!=='undefined'){
    if(value.company_name){
      setCompany(value.company_name)
    }
    if(value.web_site){
      setWebsite(value.web_site)
    }
    if(value.telephone){
      setPhone(value.telephone)
    }
    if(value.rating){
      setRating(value.rating)
    }
    if(value.type){
      setType(value.type)
    }
    if(value.status){
      setStatus(value.status)
    }
    if(value.map_link){
      setMap(value.map_link)
    }
    if(value.latitude){
      setLatitude(value.latitude)
    }
    if(value.longitude){
      setLongitude(value.longitude)
    }
    if(value.address){
      setAddress(value.address)
    }
    if(value.filter_tags){
      setTags(value.filter_tags)
    }
    if(value.handles.twitter){
      setTwitter(value.handles.twitter)
    }
    if(value.handles.instagram){
      setInstagram(value.handles.instagram)
    }
    if(value.handles.facebook){
      setFacebook(value.handles.facebook)
    }
  }


  },[value])

  const updateBusiness = async () => {
    const response= await fetch(`${process.env.REACT_APP_API_URL}/api/place`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  
            _id:value._id,
            status: status,
            userAddress: userAddress,
            telephone: phone,
            companyName:company,
            placeId: value.place_id,
            mapLink:map,
            type:type,
            rating: rating,
            website: website,
            userSub: value.userSub,
            latitude: latitude,
            longitude: longitude,
            twitter:twitter,
            instagram:instagram,
            facebook:facebook,
            filterTags:tags,

                 })
    });
      const body = await response.text();
      window.location.reload() 
      return body

}

const handleSubmit = () => {
  updateBusiness()

}
  

  const handleChange = (e) => {
    if (e.target.id === 'company') {
        setCompany(e.target.value)
    }
    else if (e.target.id === 'add') {
      setAddress(e.target.value)
}
    else if (e.target.id === 'website') {
        setWebsite(e.target.value)
      }
     else if (e.target.id === 'phone') {
      setPhone(e.target.value)
    } else if (e.target.id === 'rating') {
      setRating(e.target.value)
    } else if (e.target.id === 'type') {
      setType(e.target.value)
    } else if (e.target.id === 'status') {
      setStatus(e.target.value)
    }else if (e.target.id === 'map') {
        setMap(e.target.value)
    }else if (e.target.id === 'lat') {
        setLatitude(e.target.value)
    }else if (e.target.id === 'long') {
          setLongitude(e.target.value)
   } else if (e.target.id === 'facebook') {
    setFacebook(e.target.value)
   }else if (e.target.id === 'twitter') {
    setTwitter(e.target.value)
   }else if (e.target.id === 'instagram') {
      setInstagram(e.target.value)
} 
     else if(e.target.id === 'start'){
          setStartDay(e.target.value)
    }
    else if(e.target.id === 'end'){
      setEndDay(e.target.value)
}

}
const handleStartChange = (time) => {    
  setStart(time)
}
const handleEndChange = (time) => {
  setEnd(time)
}

  return (
    <ProfileOuter>
      <p>Edit Profile</p>
      <ProfileInner>
        <LeftProfile>
          <Card><img src={MapImg} alt="map" /></Card>
        </LeftProfile>
        <RightProfile>
          <Card>
            <FormGroup>
              <FlexRow>

                <TopProfile>VT</TopProfile>
                <LabelRight>
                  <Label name="Business Name"></Label>
                  <Input type="text" id='company' value={company}  onChange={ (e) => handleChange(e)} />
                </LabelRight>
              </FlexRow>

            </FormGroup>
            <FormGroup>
              <Label name="Address"></Label>
        <Input type="text" id='add' value={userAddress}  onChange={ (e) => handleChange(e)} />

              <div className="mt-15">
                <FlexRow>
                  <ButtonSmall maxWidth="103px" bgColor="#0FB1D2"><img src={PinIcon} alt="Drop Pin" />Drop Pin</ButtonSmall>
                  <ButtonSmall maxWidth="137px" style={{ marginLeft: 'auto' }}>Find Address</ButtonSmall>
                </FlexRow>
              </div>

            </FormGroup>
            <FormGroup>
              <Label name="Phone"></Label>
              <Input type="text" id='phone'  value={phone}  onChange={ (e) => handleChange(e)} />
            </FormGroup>
            <FormGroup>
              <Label name="Website"></Label>
              <Input type="text" id='website'  value={website}  onChange={ (e) => handleChange(e)} />
            </FormGroup>
            {/* <FormGroup>
              <Label name="Rating"></Label>
              <Input type="text" id='rating' placeholder="Rating" value={rating}  onChange={ (e) => handleChange(e)} />
            </FormGroup>
            <FormGroup>
              <Label name="Map Link"></Label>
              <Input type="text" id='map' placeholder="Map Link" value={map}  onChange={ (e) => handleChange(e)} />
            </FormGroup> */}
             {/* <FormGroup>
              <Label name="Status"></Label>
              <Input type="text" id='status' placeholder="Status" value={status}  onChange={ (e) => handleChange(e)} />
            </FormGroup> */}
            <FormGroup>
              <Label name="Type"></Label>
              <Input type="text" id='type'  value={type}  onChange={ (e) => handleChange(e)} />
            </FormGroup>
            <FormGroup>
              <Label name="Facebook Profile"></Label>
              <Input type="text" id='facebook' value={facebook}  onChange={ (e) => handleChange(e)} />
            </FormGroup>
            <FormGroup>
              <Label name="Twitter Profile"></Label>
              <Input type="text" id='twitter' value={twitter} onChange={ (e) => handleChange(e)} />
            </FormGroup>
            <FormGroup>
              <Label name="LinkedIN Profile"></Label>
              <Input type="text" id='linkedin' onChange={ (e) => handleChange(e)} />
            </FormGroup>
            <FormGroup>
              <Label name="Instagram Profile"></Label>
              <Input type="text" id='instagram' value={instagram} onChange={ (e) => handleChange(e)} />
            </FormGroup>
          </Card>
        </RightProfile>
      </ProfileInner>
      <HashTags>
      <Card>
        <HashTagsSearch>
          <h3>Select HashTags</h3>
          <ReactTagInput 
           tags={tags} 
           onChange={(newTags) => (console.log(newTags),setTags(newTags))}
         />
        </HashTagsSearch>
      </Card>
      <Card>
      <HashTagsSearch>
          <h3>Opening Hours</h3>
        </HashTagsSearch>
        <Label name="Start Day"></Label>
        <select id='start' value={startDay} onChange={e => handleChange(e)}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <Label name="End Day"></Label>
        <select id='end' value={endDay} onChange={e => handleChange(e)}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        <Label name="Start Time"></Label>
        <TimePicker onChange={handleStartChange} value={start} />
        <Label name="End Time"></Label>
        <TimePicker onChange={handleEndChange} value={end} />
        <Button>Add New Time Slot <img src={PlusIcon} alt="plus icon" /></Button>
      </Card>
      </HashTags>
      <row>
        <Card>
          <FlexRow>
            <ButtonSmall onClick={()=>(history.push(`/dashboard`),window.location.reload())} maxWidth="110px" bgColor="#FF7171" style={{ marginLeft: 'auto', marginRight: '10px' }}>Cancel</ButtonSmall>
            <ButtonSmall onClick={() => handleSubmit()} maxWidth="110px" >Save</ButtonSmall>
          </FlexRow>
        </Card>
      </row>
    </ProfileOuter>

  )
}

export default EditProfile