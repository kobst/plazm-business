
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


  useEffect(() => {
    let updateUser = async authState => {
      try {
        const value = await Auth.currentAuthenticatedUser()
        const place = await callPlace(value.attributes.sub)
        setPlace(place[0])
      } catch (err) {
        console.log(err)
      }
    }
    updateUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LeftSidebar>
      {/* <div name={typeof placeValue !== 'undefined'&& placeValue.company_name?placeValue.company_name:'-'} setIsOpen={setIsOpen} /> */}
      <Map><img src={MapImage} alt="map" /></Map>
      <CompanyAddress>
        <div>
          <h3>VT Netzwelt Pvt Ltd</h3>
          {/* <p>250 Followers</p> */}
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
        <p><span>Monday - Friday</span><span> </span></p>
        <p><span>Saturday - Sunday</span><span> </span></p>
      </Listing>

      <Listing style={{ borderBottom: 'none' }}>
        <SubHeading name="Hashtags" />
        {/* <Badges name="Burger" />
        <Badges name="Happy Hours" />
        <Badges name="Triple Ham Burger" /> */}
      </Listing>

      <SocialOuter>
        <SocialIcon>
          <div>
            {/* <img src={Facebook} alt={Facebook} />
            <img src={Twitter} alt={Twitter} />
            <img src={Instagram} alt={Instagram} />
            <img src={linkedIn} alt={linkedIn} /> */}
          </div>
          <ButtonSmall bgColor="#FF7171" maxWidth="139px" type="submit" onClick={() => (
            Auth.signOut())} className="btn btn-primary"> <Link to='/business/login' >Logout</Link></ButtonSmall>
        </SocialIcon>

      </SocialOuter>
    </LeftSidebar >

  )
}

export default Sidebar