
import React from 'react'
import styled from 'styled-components'
import Logo from '../../images/logo.svg'
import ProfileImage from '../../images/profile-img.png'
import Sidebar from '../UI/Sidebar/Sidebar'
import {GoogleApiWrapper} from 'google-maps-react';

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom:60px;
position:relative;
@media (max-width:1024px){
  margin-bottom:50px;
}
@media (max-width:767px){
  margin-bottom:30px;
}
`
const LogoWrapper = styled.div`
padding:0px;
@media (max-width:767px){
  img{max-width:100px;}
}
`
const ProfileSection = styled.div`
display: flex;
align-items: center;
padding-bottom:40px;
h2{
  font-size: 16px;
  line-height: 17px;
  color:#fff;
  font-weight:normal;
  margin-right:25px;
  @media (max-width:767px){
    font-size: 14px;
    margin-right:15px;
  }
  @media (max-width:370px){
    font-size: 12px;
    margin-right:10px;
  }
}
@media (max-width:1024px){
  padding-bottom:0px; 
}
.profileHover{
  visibility:hidden;
}
:hover .profileHover{
  visibility:visible;
}
`
const ProfileImg = styled.div`
display: flex;
justify-content: center;
background: #7C9CBF;
border:8px solid #FFFFFF;
width:96px;
height:96px;
border-radius:100%;
box-shadow: 0px 2px 4px rgba(44, 39, 56, 0.04), 0px 4px 8px rgba(44, 39, 56, 0.08);
overflow:hidden;
img{
  width:100%;
}
@media (max-width:767px){
width:50px;
height:50px;
}
@media (max-width:370px){
  width:35px;
  height:35px;
  }
`


const Header = props => {
  return (
    <Container>
      <LogoWrapper><img src={Logo} alt="logo" /></LogoWrapper>
      <ProfileSection>
          <h2>Welcome { typeof props.value!=='undefined'?props.value.company_name:null}</h2>
        <ProfileImg><img src={typeof props.value!=='undefined'?props.value.default_image_url:null} alt="" /></ProfileImg>
        <div className="profileHover">
          <Sidebar value={props.value} />
        </div>

      </ProfileSection>
    </Container>
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(Header)