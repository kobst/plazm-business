
import React from 'react'
import styled from 'styled-components'
import Logo from '../../images/logo.svg'
import ProfileImage from '../../images/profile-img.png'
import Sidebar from '../UI/Sidebar/Sidebar'

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
border:2px solid #FFFFFF;
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
        <h2>Welcome Edward,</h2>
        <ProfileImg><img src={ProfileImage} alt="Profile" /></ProfileImg>
        <div className="profileHover">
          <Sidebar />
        </div>

      </ProfileSection>
    </Container>
  )
}

export default Header