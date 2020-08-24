
import React, {useEffect, useState} from 'react'
import { Auth } from 'aws-amplify';
import styled from 'styled-components'
import SubHeading from '../SubHeading'
import Facebook from '../../../Public/images/facebook.svg'
import Twitter from '../../../Public/images/twitter.svg'
import Instagram from '../../../Public/images/instagram.svg'
import Linkedin from '../../../Public/images/linkedin.svg'
import ModalBox from '../../Edit-Business/index'
import {callPlace} from '../../../Api'


const LeftSidebar = styled.div`
  width:100%;
  max-width:520px;
  background: #f1fbff;
  padding:15px 0;
  border: 2px solid #dae2e9;
  border-radius:25px;
  position: absolute;
  top: 110px;
  right:0px;
  z-index: 9;
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
  }
`
const Listing = styled.div`
width: 95%;
margin: 0 auto;
padding: 15px;
border-bottom: 1px solid #e5e9eb;
:last-child{
  border:none;
}
h2{
  margin:0px;
  color: #2C2738 !important;
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
const Badges = styled.div`
height: 26px;
background: #f3f1f5;
font-size: 14px;
display: inline-flex;
border-radius: 4px;
justify-content: center;
align-items: center;
padding: 0 10px;
margin-right: 10px;
color:462a4d;
margin: 10px 10px 0px 0;
line-height:26px;
cursor:pointer;
box-shadow: 0px 2px 4px rgba(44, 39, 56, 0.08);
border-radius: 17px;
border:1px solid #facdd0;
::empty{
  display:none;
}

`
const SocialIcon = styled.div`
display:flex;
margin-top: 10px;
align-items: center;
img{
  margin-right:10px;
}
`

const Sidebar = () => {
  const [placeValue,setPlace] = useState({})
  const [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    let updateUser = async authState => {
      try {
         const value = await Auth.currentAuthenticatedUser()
        const place = await callPlace(value.attributes.sub)
        setPlace(place[0])
      } catch (err){
         console.log(err)
      }
    }
    updateUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  return (
    <LeftSidebar>
      {/* <ProfileImage name={typeof placeValue !== 'undefined'&& placeValue.company_name?placeValue.company_name:'-'} setIsOpen={setIsOpen} /> */}
      <Listing>
        <SubHeading name="Address" />
        <p>{typeof placeValue !== 'undefined'?placeValue.address:null}</p>
        <ModalBox value={placeValue} isOpen={isOpen} setIsOpen={setIsOpen} data='' closeModal={()=> setIsOpen(false)} />
      </Listing>
      <Listing>
        <SubHeading name="Website" />
        <p>{typeof placeValue !== 'undefined'&& placeValue.web_site?placeValue.web_site:'-'}</p>
      </Listing>
      <Listing>
        <SubHeading name="Type" />
        <p>{typeof placeValue !== 'undefined'&& placeValue.type?placeValue.type:'-'}</p>
      </Listing>
      <Listing>
        <SubHeading name="Status" />
        <p>{typeof placeValue !== 'undefined'&& placeValue.status?placeValue.status:'-'}</p>
      </Listing>
      <Listing>
        <SubHeading name="Phone" />
        <p>{typeof placeValue !== 'undefined'&&placeValue.telephone?placeValue.telephone:'-'}</p>
      </Listing>
      <Listing>
        <SubHeading name="Opening Hours" />
        <p><span>Monday - Friday</span><span> </span></p>
        <p><span>Saturday - Sunday</span><span> </span></p>
      </Listing>

      <Listing>
        <SubHeading name="Hashtags" />
          <Badges>Burger</Badges>
          <Badges>Happy Hours</Badges>
          <Badges>Triple Ham Burger</Badges>
      </Listing>
      <Listing>
        <SocialIcon>
        <img src={Facebook} alt={Facebook} />
        <img src={Twitter} alt={Twitter} />
        <img src={Instagram} alt={Instagram} />
        <img src={Linkedin} alt={Linkedin} />
        </SocialIcon>
      </Listing>
    </LeftSidebar>

  )
}

export default Sidebar