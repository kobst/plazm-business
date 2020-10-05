/* eslint-disable no-sequences */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Card from '../UI/Card/Card'
import PinIcon from '../../images/location.svg'
import Label from '../UI/Label/label'
import Input from '../UI/Input/Input'
import ButtonSmall from '../UI/ButtonSmall'
import PlusIcon from '../../images/plus-img.svg'
import DropdownIcon from '../../images/dropdown-arrow.svg'
import MapPin from '../../images/map-pin.svg'
import history from '../../utils/history'
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import TimePicker from 'react-bootstrap-time-picker';
// import GallerySec from '../UI/Gallery'
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";
import FindAddressValue from '../../utils/findAddress'
import reactS3 from 'react-s3'
import TagInputCross from '../../images/Mask.svg'
const bucket = process.env.REACT_APP_BUCKET_NAME
const dir = process.env.REACT_APP_DIRNAME
const region = process.env.REACT_APP_REGION
const accessKey = process.env.REACT_APP_ACCESS_KEY_ID
const Secret = process.env.REACT_APP_SECRET_ACCESS_KEY

const config = {
  bucketName: bucket,
  dirName: dir,
  region: region,
  accessKeyId: accessKey,
  secretAccessKey:Secret,
}
 Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
 Geocode.setLanguage("en");

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
margin-bottom: 10px;
margin-right:5px;
position:relative;
>div{
  padding:10px;
  height:100%;
  border-radius: 20px;
  overflow: hidden;
  @media (max-width:767px){
    height: 350px;
  }
  >div{
    border-radius: 20px;
    overflow: hidden; 
  }
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
overflow: hidden;
img{max-width:100%;}
cursor:pointer;
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
  height: 85px;
}
img

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
  margin-top: 30px;
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
const HashSearch = styled.div`

input{
  background: #FFFFFF;
border: 1px solid #DBE2EA;
box-sizing: border-box;
box-shadow: 0px 2px 4px rgba(44, 39, 56, 0.08);
border-radius: 17px;
height:34px;
padding:0 35px 0 15px;
font-family: 'IBM Plex Sans',sans-serif;
width: calc(100% - 195px);
:focus{
  outline:none;
  border: 1px solid #DBE2EA;
  background:#ffffff url(${TagInputCross}) no-repeat top 10px right 15px;
  cursor:pointer;
}
::placeholder{
  font-weight: 500;
font-size: 14px;
line-height: 18px;
color: #7C9CBF;
}
}
`

const SelectSection = styled.div`
display:flex;
justify-content: space-between;
flex-wrap:wrap;
padding: 0 15px;
div{
  display:flex;
  flex-direction:column;
 margin-bottom:10px;
 width:20%;
 @media (max-width:991px){
  width:45%;
 }
}
label{
  font-size:13px;
  color: #B5B5B5;
  font-weight:400;
}
select{
  border: none;
  border-bottom: 2px solid #FF479D;
  font-size: 14px;
  color: #121232;
  padding-bottom: 6px;
  width: 100%;
  margin-top: 10px;
  appearance: unset;
  background:transparent url(${DropdownIcon}) no-repeat top 7px right;
  border-radius:0px;
  &:focus{
    outline: none;
  }
}
`

const EditProfile = ({ value }) => {
  const [company, setCompany] = useState()
  const [website, setWebsite] = useState()
  const [phone, setPhone] = useState()
  const [rating, setRating] = useState()
  const [type, setType] = useState()
  const [status, setStatus] = useState()
  const [map, setMap] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [userAddress, setAddress] = useState()
  const [twitter, setTwitter] = useState()
  const [instagram, setInstagram] = useState()
  const [facebook, setFacebook] = useState()
  const [linkedin,setLinkedIn]= useState()
  const [tags, setTags] = useState([])
  const [DropPin,setDropPin]= useState(false)
  const [imageUrl,setImageUrl]= useState()
  const [changeCenter,setChangeCenter]= useState()
  const [inputList, setInputList] = useState([
    { StartDay: "Monday", EndDay: "Monday", Start: "00:00", End: "00:00"}
  ]);

  useEffect(() => {
    if (typeof value !== 'undefined') {
      window.scrollTo(0, 0)
      if (value.company_name) {
        console.log(value)
        setCompany(value.company_name)
      }
      if (value.web_site) {
        setWebsite(value.web_site)
      }
      if (value.telephone) {
        setPhone(value.telephone)
      }
      if (value.rating) {
        setRating(value.rating)
      }
      if (value.type) {
        setType(value.type)
      }
      if (value.status) {
        setStatus(value.status)
      }
      if (value.map_link) {
        setMap(value.map_link)
      }
      if (value.latitude) {
        setLatitude(value.latitude)
      }
      if (value.longitude) {
        setLongitude(value.longitude)
      }
      if (value.address) {
        setAddress(value.address)
        FindAddress(value.address)
      }
      if(value.hours_format){
        setInputList(value.hours_format)
      }
      if (value.filter_tags) {
        setTags(value.filter_tags)
      }
      if(typeof value.handles!=='undefined'){
      if (value.handles.twitter) {
        setTwitter(value.handles.twitter)
      }
      if (value.handles.instagram) {
        setInstagram(value.handles.instagram)
      }
      if (value.handles.facebook) {
        setFacebook(value.handles.facebook)
      }
      if (value.handles.linkedin) {
        setLinkedIn(value.handles.linkedin)
      }
    }
      if(value.default_image_url){
        setImageUrl(value.default_image_url)
      }
    }


  }, [value])

  const updateBusiness = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/place`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: value._id,
        status: status,
        userAddress: userAddress,
        telephone: phone,
        companyName: company,
        placeId: value.place_id,
        mapLink: map,
        type: type,
        rating: rating,
        website: website,
        userSub: value.userSub,
        latitude: latitude,
        longitude: longitude,
        twitter: twitter,
        instagram: instagram,
        facebook: facebook,
        linkedin:linkedin,
        filterTags: tags,
        file:imageUrl,
        hoursFormat:inputList,

      })
    });
    const body = await response.text();
    window.location.reload()
    return body

  }

  const AnyReactComponent = ({ text }) => (
    <div style={{
      color: 'white',
      padding: '10px 5px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'translate(-50%, -50%)'
    }}>
      <div className="mapTextOuter"><img src={MapPin} alt=""/> <div className="mapText">{text}</div></div>
     
    </div>
  );



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
    } else if (e.target.id === 'map') {
      setMap(e.target.value)
    } else if (e.target.id === 'lat') {
      setLatitude(e.target.value)
    } else if (e.target.id === 'long') {
      setLongitude(e.target.value)
    } else if (e.target.id === 'facebook') {
      setFacebook(e.target.value)
    } else if (e.target.id === 'twitter') {
      setTwitter(e.target.value)
    } else if (e.target.id === 'instagram') {
      setInstagram(e.target.value)
    }
    else if (e.target.id === 'linkedin') {
      setLinkedIn(e.target.value)
    }

}
const updateTime = (time)=>{
  const timePointer = time/1800
  if(timePointer===1){
    return ("00:30")
  }
 else if(timePointer%2===0){
     return (timePointer/2+':00')
}
 else{
  return ((timePointer-1)/2+':30')
 }
}
const handleStartChange = (time,index,name) => {    
  const list = [...inputList];
  list[index][name] = updateTime(time);
  setInputList(list);
}
const handleEndChange = (time,index,name) => {
   const list = [...inputList];
   list[index][name] = updateTime(time);
   setInputList(list);
}
 const center= {
  lat: 30.7092231,
  lng: 76.68880390000004,
}

const zoom = 15
const renderMarkers = (val) => {
  if(DropPin===true){
    setChangeCenter({lat: val.lat,
      lng: val.lng,})
  setLatitude(val.lat)
  setLongitude(val.lng)
  Geocode.fromLatLng(val.lat,val.lng).then(
    response => {
      const address = response.results[0].formatted_address;
      setAddress(address)
    },
    error => {
      console.error(error);
    }
  );
  }
 };
const FindAddress = (userAddress)=>{
 Geocode.fromAddress(userAddress).then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    setChangeCenter({lat, lng})
    setLatitude(lat)
    setLongitude(lng)
  },
  error => {
    console.error(error);
  }
);
}
const upload =(e)=> {
reactS3.uploadFile(e.target.files[0],config).then(data => setImageUrl(data.location))
.catch(err => console.error(err))
}

const handleInputChange = (e, index) => {
  const { name, value } = e.target;
  const list = [...inputList];
  list[index][name] = value;
  setInputList(list);
};

const handleAddClick = () => {
  console.log(inputList)
  setInputList([...inputList, { StartDay: "Monday", EndDay: "Monday", Start: "00:00", End: "00:00"}]);
};
let myInput
  return (
    <ProfileOuter>
      <p>Edit Profile</p>
      <ProfileInner>
        <LeftProfile>
          <Card>
            {typeof value!=='undefined' && value.latitude!=='undefined'?
            <GoogleMapReact
            center={typeof changeCenter==='undefined'?center:changeCenter}
           defaultZoom={zoom}
          onClick={(e)=>renderMarkers(e)}
      
         >
        <AnyReactComponent 
          lat={latitude} 
          lng={longitude} 
          text={ company }
        />
      </GoogleMapReact>:null}
          </Card>
        </LeftProfile>
        <RightProfile>
          <Card>
            <FormGroup>
              <FlexRow>
              <input id="myInput" onChange={(e)=> upload(e)} type="file"  ref={(ref) => myInput = ref} style={{ display: 'none' }} />
                <TopProfile onClick={(e) => myInput.click() }>
                  {typeof value !== 'undefined'&& value.default_image_url?
                    <img src={imageUrl} alt='img'/>: null
                  }
              </TopProfile>
                <LabelRight>
                  <Label name="Business Name"></Label>
                  <Input className="disabledCompanyname" disabled type="text" id='company' value={company} />
                </LabelRight>
              </FlexRow>

            </FormGroup>
            <FormGroup>
              <Label name="Address"></Label>
              {/* <Input type="text" id='add' value={userAddress} onChange={(e) => handleChange(e)} /> */}
              <FindAddressValue id="add" setAddress={setAddress} handleChange={handleChange} addressValue={userAddress}  />

              <div className="mt-15">
                <FlexRow>
                  <ButtonSmall onClick={()=>setDropPin(true)} maxWidth="103px" bgColor="#0FB1D2"><img src={PinIcon} alt="Drop Pin" />Drop Pin</ButtonSmall>
                  <ButtonSmall onClick={()=>FindAddress(userAddress)} maxWidth="137px" style={{ marginLeft: 'auto' }}>Find Address</ButtonSmall>
                </FlexRow>
              </div>

            </FormGroup>
            <FormGroup>
              <Label name="Phone"></Label>
              <Input type="text" id='phone' value={phone} onChange={(e) => handleChange(e)} />
            </FormGroup>
            <FormGroup>
              <Label name="Website"></Label>
              <Input type="text" id='website' value={website} onChange={(e) => handleChange(e)} />
            </FormGroup>
            <FormGroup>
              <Label name="Type"></Label>
              <Input type="text" id='type' value={type} onChange={(e) => handleChange(e)} />
            </FormGroup>
            <FormGroup>
              <Label name="Facebook Profile"></Label>
              <Input type="text" id='facebook' value={facebook} onChange={(e) => handleChange(e)} />
            </FormGroup>
            <FormGroup>
              <Label name="Twitter Profile"></Label>
              <Input type="text" id='twitter' value={twitter} onChange={(e) => handleChange(e)} />
            </FormGroup>
            <FormGroup>
              <Label name="LinkedIN Profile"></Label>
              <Input type="text" id='linkedin' value={linkedin} onChange={(e) => handleChange(e)} />
            </FormGroup>
            <FormGroup>
              <Label name="Instagram Profile"></Label>
              <Input type="text" id='instagram' value={instagram} onChange={(e) => handleChange(e)} />
            </FormGroup>
          </Card>
        </RightProfile>
      </ProfileInner>
      <HashTags>
        <Card>
          <HashTagsSearch>
            <h3>Select Hashtags</h3>
          </HashTagsSearch>
          <HashSearch onClick={(e)=> e.target.reset}>
            <ReactTagInput
              tags={tags} placeholder="Label"
              onChange={(newTags) => setTags(newTags)}
            />
          </HashSearch>
        </Card>
        <Card>
          <HashTagsSearch>
            <h3>Opening Hours</h3>
          </HashTagsSearch>
          {inputList.map((x,i) => {
            return(
          <SelectSection>
            <div>
              <Label name="Start Day"></Label>
              <select name="StartDay" value={x.StartDay} onChange={e => handleInputChange(e,i)}>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <div>
              <Label name="End Day"></Label>
              <select name="EndDay" value={x.EndDay} onChange={e => handleInputChange(e,i)}>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <div>
              <Label name="Start Time"></Label>
              <TimePicker onChange={(e)=>handleStartChange(e,i,'Start')} value={x.Start} />
            </div>
            <div>
              <Label name="End Time"></Label>
              <TimePicker onChange={(e)=>handleEndChange(e,i,'End')} value={x.End} />
            </div>
          </SelectSection>)
          })}
          <Button onClick={handleAddClick}>Add New Time Slot <img src={PlusIcon} alt="plus icon" /></Button>
        </Card>
      </HashTags>
      <row>
        {/* <Card>
          <HashTagsSearch>
            <h3>Upload Highlight Images</h3>
          </HashTagsSearch>
          <GallerySec type="edit" />
        </Card> */}
      </row>
      <row>
        <Card>
          <FlexRow>
            <ButtonSmall onClick={() => (history.push(`/dashboard`), window.location.reload())} maxWidth="110px" bgColor="#FF7171" style={{ marginLeft: 'auto', marginRight: '10px' }}>Cancel</ButtonSmall>
            <ButtonSmall onClick={() => updateBusiness()} maxWidth="110px" >Save</ButtonSmall>
          </FlexRow>
        </Card>
      </row>
    </ProfileOuter>

  )
}

export default EditProfile