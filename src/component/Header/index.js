
import React from 'react'
import styled from 'styled-components'
import Logo from '../../images/logo.svg'
import ProfileImage from '../../images/profile-img.png'
import Sidebar from '../UI/Sidebar/Sidebar'

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom:100px;
position:relative;
`
const LogoWrapper = styled.div`
padding:0px;
`
const ProfileSection = styled.div`
display: flex;
align-items: center;
h2{
  font-size: 16px;
  line-height: 17px;
  color:#fff;
  font-weight:normal;
  margin-right:25px;
}
`
const ProfileImg = styled.div`
background: #7C9CBF;
border:7px solid #FFFFFF;
width:96px;
height:96px;
border-radius:100%;
box-shadow: 0px 2px 4px rgba(44, 39, 56, 0.04), 0px 4px 8px rgba(44, 39, 56, 0.08);
overflow:hidden;

`

const Header = props => {
  return (
    <Container>
      <LogoWrapper><img src={Logo} alt="logo" /></LogoWrapper>
      <ProfileSection>
        <h2>Welcome Edward,</h2>
        <ProfileImg><img src={ProfileImage} alt="Profile" /></ProfileImg>
        {/* <Sidebar /> */}
      </ProfileSection>
    </Container>
  )
}

export default Header