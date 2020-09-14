
import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify';
import styled from 'styled-components'
import { Link } from "react-router-dom";
import SubHeading from '../SubHeading'
import Facebook from '../../../images/facebook.svg'
import Twitter from '../../../images/Twitter.svg'
import Instagram from '../../../images/Instagram.svg'
import linkedIn from '../../../images/linkedIn.svg'
import ModalBox from '../../Edit-Business/index'
import { callPlace } from '../../../Api'
import Badges from '../../UI/Badges'
import MapImage from '../../../images/profile-map.png'
import ButtonSmall from '../../UI/ButtonSmall'
import history from '../../../utils/history'
import GoogleMapReact from 'google-map-react';
import {GoogleApiWrapper} from 'google-maps-react';


const LeftSidebar = styled.div`
  width:100%;
  max-width: 614px;
  background: #F2FBFF;;
  padding: 10px 10px 15px;
  border: 1px solid #DBE2EA;
  box-shadow:  0px 56px 63px rgba(255, 82, 117, 0.19), 0px 23.3955px 26.3199px rgba(255, 82, 117, 0.136582), 0px 12.5083px 14.0719px rgba(255, 82, 117, 0.11326), 0px 7.01207px 7.88858px rgba(255, 82, 117, 0.095), 0px 3.72406px 4.18956px rgba(255, 82, 117, 0.0767396), 0px 1.54966px 1.74337px rgba(255, 82, 117, 0.0534177);
}
  border-radius:25px;
  position: absolute;
  top: 110px;
  right:0px;
  z-index: 91;
  visibilty:hidden;
  :after,:before{
    bottom: 100%;
    right: 37px;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  :after{
    border-color: rgba(136, 183, 213, 0);
    border-bottom-color: #f1fbff;
    border-width: 7px;
    right: 39px;
  }
  :before{
    border-color: rgba(194,225,245,0);
    border-bottom-color: #dae2e9;
    border-width: 9px;
  }
  @media (max-width:767px){
    width:100%; 
    top:62px;
    :after{
      right:21px;
    }
    :before{
      right:19px;
    }
  }
`
const Listing = styled.div`
width: 94%;
margin: 0 auto;
padding: 15px 0;
border-bottom: 1px solid #e5e9eb;
&:last-child{
  border-bottom:none;
}

h2{
  margin:0px;
  color: #2C2738 !important;
  font-size: 17px !important;
}
p{
font-size:12px;
line-height:18px;
color:#2C2738;
margin-bottom:0px;
margin-top:5px;
display:flex;
width:100%;
span:last-child{
margin-left: auto;
width: 33%;
}
}
`

const SocialIcon = styled.div`
display:flex;
margin-top: 10px;
align-items: center;
justify-content: space-between;
img{
  margin-right:10px;
}
`
const Map = styled.div`
height:250px;
img{
  max-width:100%;
}
`
const CompanyAddress = styled.div`
width: 94%;
margin: 30px auto 20px;
display: flex;
align-items: center;
justify-content: space-between;
h3{
font-size: 20px;
line-height: 28px;
color: #FF479D;
font-weight:normal;
}
p{
font-size: 12px;
line-height: 18px;
color: #2C2738;
}
`
const SocialOuter = styled.div`
width: 94%;
margin:40px auto 10px;
@media (max-width:767px){
  margin:15px auto 0;
}
`


const Sidebar = () => {
  const [placeValue, setPlace] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [facebook,setFacebook]= useState()
  const [instagram,setInstagram]= useState()
  const [twitter,setTwitter]= useState()
  const [linkedIn,setLinkedIn] = useState()
  const [tags, setTags] = useState([])


  useEffect(() => {
    let updateUser = async authState => {
      try {
        const value = await Auth.currentAuthenticatedUser()
        const place = await callPlace(value.attributes.sub)
        setFacebook(place[0].handles.facebook)
        setInstagram(place[0].handles.instagram)
        setTwitter(place[0].handles.twitter)
        setLinkedIn(place[0].handles.linkedin)
        setTags(place[0].filter_tags)
        setPlace(place[0])
      } catch (err) {
        console.log(err)
      }
    }
    updateUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const center= {
    lat: 30.7092231,
    lng: 76.68880390000004,
  }
  const zoom = 15
  const AnyReactComponent = ({ text }) => (
    <div style={{
      color: 'white', 
      background: 'grey',
      padding: '10px 5px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}>
      {text}
    </div>
  );

  return (
    <LeftSidebar>
      {/* <div name={typeof placeValue !== 'undefined'&& placeValue.company_name?placeValue.company_name:'-'} setIsOpen={setIsOpen} /> */}
      <Map>
        <div style={{ height: '100%', width: '100%' }}><GoogleMapReact
        defaultCenter={center}
        defaultZoom={zoom}
         >
        <AnyReactComponent 
          lat={placeValue.latitude} 
          lng={placeValue.longitude} 
          text={'VT Netzwelt'} 
        />
      </GoogleMapReact></div></Map>
      <CompanyAddress>
        <div>
          <h3>VT Netzwelt Pvt Ltd</h3>
           <p>0 Followers</p> 
        </div>
        <ButtonSmall onClick={()=>(history.push(`/edit-profile`) ,window.location.reload())} setIsOpen={setIsOpen}>Edit Profile</ButtonSmall>
      </CompanyAddress>
      <Listing>
        <SubHeading name="Address" />
        <p>{typeof placeValue !== 'undefined' ? placeValue.address : null}</p>
        <ModalBox value={placeValue} isOpen={isOpen} setIsOpen={setIsOpen} data='' closeModal={() => setIsOpen(false)} />
      </Listing>
      <Listing>
        <SubHeading name="Website" />
        <p>{typeof placeValue !== 'undefined' && placeValue.web_site ? placeValue.web_site : '-'}</p>
      </Listing>
      <Listing>
        <SubHeading name="Type" />
        <p>{typeof placeValue !== 'undefined' && placeValue.type ? placeValue.type : '-'}</p>
      </Listing>
      <Listing>
        <SubHeading name="Status" />
        <p>{typeof placeValue !== 'undefined' && placeValue.status ? placeValue.status : '-'}</p>
      </Listing>
      <Listing>
        <SubHeading name="Phone" />
        <p>{typeof placeValue !== 'undefined' && placeValue.telephone ? placeValue.telephone : '-'}</p>
      </Listing>
      <Listing>
        <SubHeading name="Opening Hours" />
        {/* <p><span>Monday - Friday</span><span> </span></p>
        <p><span>Saturday - Sunday</span><span> </span></p> */}
      </Listing>

      <Listing style={{ borderBottom: 'none' }}>
        <SubHeading name="Hashtags" />
        {typeof placeValue !== 'undefined'?
        tags.map(v => 
         <Badges name={v} />)
        :null}
        
      </Listing>

      <SocialOuter>
        <SocialIcon>
          <div>
         {typeof placeValue !== 'undefined' && facebook ? <a href={facebook}>
             <img src={Facebook} alt={Facebook} />
             </a>  :null}
            {typeof placeValue !== 'undefined' && twitter ? <a href={twitter}>
            <img src={Twitter} alt={Twitter} />
            </a>:null}
            {typeof placeValue !== 'undefined' && linkedIn ? <a href={linkedIn}>
            <img src={linkedIn} alt={linkedIn} />
            </a>:null}
            {typeof placeValue !== 'undefined' && instagram ? <a href={instagram}>
            <img src={Instagram} alt={Instagram} />
            </a>:null} 
          </div>
          <ButtonSmall bgColor="#FF7171" maxWidth="139px" type="submit" onClick={() => (
            Auth.signOut())} className="btn btn-primary"> <Link to='/business/login' >Logout</Link></ButtonSmall>
        </SocialIcon>

      </SocialOuter>
    </LeftSidebar >

  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAYVZIvAZkQsaxLD3UdFH5EH3DvYmSYG6Q"
})(Sidebar)