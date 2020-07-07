
import React, {useEffect, useState} from 'react'
import { Auth } from 'aws-amplify';
import styled from 'styled-components'
import ProfileImage from '../ProfileImage/ProfileImage'
import SubHeading from '../SubHeading/SubHeading'
import Facebook from '../../../Public/images/facebook.svg'
import Twitter from '../../../Public/images/twitter.svg'
import Instagram from '../../../Public/images/instagram.svg'
import Linkedin from '../../../Public/images/linkedin.svg'
import ModalBox from '../../Edit-Business/index'
import {callPlace} from '../../../Api'


const LeftSidebar = styled.div`
  width:270px;
  background: #fff;
  padding:15px 0;
  @media (max-width:767px){
    width:100%; 
  }
`
const Listing = styled.div`
padding:15px;
border-bottom: 1px solid #ddd;
h2{
  margin:0px;
}
p{
font-size:14px;
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
background: #E4E4E4;
font-size: 14px;
display: inline-flex;
border-radius: 4px;
justify-content: center;
align-items: center;
padding: 0 10px;
margin-right: 10px;
margin: 10px 10px 0px 0;
line-height:26px;
cursor:pointer;

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
      <ProfileImage name={placeValue.company_name?placeValue.company_name:'-'} setIsOpen={setIsOpen} />
      <Listing>
        <SubHeading name="Address" />
        <p>{placeValue.address}</p>
        <ModalBox value={placeValue} isOpen={isOpen} setIsOpen={setIsOpen} data='' closeModal={()=> setIsOpen(false)} />
      </Listing>
      <Listing>
        <SubHeading name="Website" />
        <p>{placeValue.web_site?placeValue.web_site:'-'}</p>
      </Listing>
      <Listing>
        <SubHeading name="Type" />
        <p>{placeValue.type?placeValue.type:'-'}</p>
      </Listing>
      <Listing>
        <SubHeading name="Status" />
        <p>{placeValue.status?placeValue.status:'-'}</p>
      </Listing>
      <Listing>
        <SubHeading name="Phone" />
        <p>{placeValue.telephone?placeValue.telephone:'-'}</p>
      </Listing>
      <Listing>
        <SubHeading name="Opening Hours" />
        <p><span>Monday - Friday</span><span> </span></p>
        <p><span>Saturday - Sunday</span><span> </span></p>
      </Listing>

      <Listing>
        <SubHeading name="Hashtags" />
          <Badges></Badges>
          <Badges></Badges>
          <Badges></Badges>
          <Badges></Badges>
      </Listing>
      <Listing>
        <SubHeading name="Social Media" />
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