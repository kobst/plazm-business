
import React from 'react'
import styled from 'styled-components'
import ProfileImage from '../ProfileImage/ProfileImage'
import SubHeading from '../SubHeading/SubHeading'
import Facebook from '../../../Public/images/facebook.svg'
import Twitter from '../../../Public/images/twitter.svg'
import Instagram from '../../../Public/images/instagram.svg'
import Linkedin from '../../../Public/images/linkedin.svg'

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
  return (

    <LeftSidebar>
      <ProfileImage />
      <Listing>
        <SubHeading name="Address" />
        <p>110 Cedar St, New York, NY 10006</p>
      </Listing>
      <Listing>
        <SubHeading name="Website" />
        <p>www.stevepizza.com</p>
      </Listing>
      <Listing>
        <SubHeading name="General Type" />
        <p>Restaurant</p>
      </Listing>
      <Listing>
        <SubHeading name="Specific Type" />
        <p>-</p>
      </Listing>
      <Listing>
        <SubHeading name="Phone" />
        <p>202 619 3062</p>
      </Listing>
      <Listing>
        <SubHeading name="Opening Hours" />
        <p><span>Monday - Friday</span><span>8 am - 9 pm</span></p>
        <p><span>Saturday - Sunday</span><span>Closed</span></p>
      </Listing>

      <Listing>
        <SubHeading name="Hashtags" />
          <Badges>Comfort food</Badges>
          <Badges>Quick bite</Badges>
          <Badges>Bar</Badges>
          <Badges>Longe</Badges>
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