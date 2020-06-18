
import React from 'react'
import styled from 'styled-components'
import Heading from '../Heading/Heading'
import Button from '../Button/Button'
import SubHeading from '../SubHeading/SubHeading'

const ProfileSection = styled.div`
margin-bottom:25px;
text-align:center;
`
const ProfileImg = styled.div`
width: 124px;
height: 124px;
border-radius: 100%;
background-color:#C4C4C4;
margin:0 auto 10px;
`
const Numbers = styled.p`
font-size:14px;
margin-top:10px;
font-family: 'Roboto', sans-serif;
`

const ProfileImage = () => {
    return(
      <ProfileSection>
       <ProfileImg/>
       <Heading name="Steve’s Pizza" />
       <SubHeading name="Followers" />
       <Numbers>121</Numbers>
       <Button buttontext="Edit Profile" />
       </ProfileSection>
    )
}

export default ProfileImage