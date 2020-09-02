import React from 'react'
import styled from 'styled-components'
import Card from '../UI/Card/Card'
import MapImg from '../../images/map.png'
import PinIcon from '../../images/location.svg'
import Label from '../UI/Label/label'
import Input from '../UI/Input/Input'
import ButtonSmall from '../UI/ButtonSmall'
import Badges from '../UI/Badges'
import PlusIcon from '../../images/plus-img.svg'

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
margin-right:5px;
div{
  padding:10px;
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

input{
  background: #FFFFFF;
border: 1px solid #DBE2EA;
box-sizing: border-box;
box-shadow: 0px 2px 4px rgba(44, 39, 56, 0.08);
border-radius: 17px;
height:34px;
padding:0 15px;
font-family: 'IBM Plex Sans',sans-serif;
width: calc(100% - 195px);
:focus{
  outline:none;
}
::placeholder{
  font-weight: 500;
font-size: 14px;
line-height: 18px;
color: #7C9CBF;
}
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

const EditProfile = () => {
  return (
    <ProfileOuter>
      <p>Edit Profile</p>
      <ProfileInner>
        <LeftProfile>
          <Card><img src={MapImg} alt="map" /></Card>
        </LeftProfile>
        <RightProfile>
          <Card>
            <FormGroup>
              <FlexRow>

                <TopProfile>NK</TopProfile>
                <LabelRight>
                  <Label name="Business Name"></Label>
                  <Input />
                </LabelRight>
              </FlexRow>

            </FormGroup>
            <FormGroup>
              <Label name="Address"></Label>
              <Input />

              <div className="mt-15">
                <FlexRow>
                  <ButtonSmall maxWidth="103px" bgColor="#0FB1D2"><img src={PinIcon} alt="Drop Pin" />Drop Pin</ButtonSmall>
                  <ButtonSmall maxWidth="137px" style={{ marginLeft: 'auto' }}>Find Address</ButtonSmall>
                </FlexRow>
              </div>

            </FormGroup>
            <FormGroup>
              <Label name="Phone"></Label>
              <Input />
            </FormGroup>
            <FormGroup>
              <Label name="Website"></Label>
              <Input />
            </FormGroup>
            <FormGroup>
              <Label name="Facebook Profile"></Label>
              <Input />
            </FormGroup>
            <FormGroup>
              <Label name="Twiiter Profile"></Label>
              <Input />
            </FormGroup>
            <FormGroup>
              <Label name="LinkedIN Profile"></Label>
              <Input />
            </FormGroup>
            <FormGroup>
              <Label name="Instagtam Profile"></Label>
              <Input />
            </FormGroup>
          </Card>
        </RightProfile>
      </ProfileInner>
      <HashTags>
      <Card>
        <HashTagsSearch>
          <h3>Select HashTags</h3>
          <input placeholder="label" type="search" />
        </HashTagsSearch>
        <Badges name="Burger"/>
        <Badges name="Happy Hours"/>
        <Badges name="Triple Ham Burger"/>
        <Badges name="Burger"/>
        <Badges name="Happy Hours"/>
        <Badges name="Triple Ham Burger"/>
      </Card>
      <Card>
      <HashTagsSearch>
          <h3>Opening Hours</h3>
        </HashTagsSearch>
        <Button>Add New Time Slot <img src={PlusIcon} alt="plus icon" /></Button>
      </Card>
      </HashTags>
      <row>
        <Card>
          <FlexRow>
            <ButtonSmall maxWidth="110px" bgColor="#FF7171" style={{ marginLeft: 'auto', marginRight: '10px' }}>Cancle</ButtonSmall>
            <ButtonSmall maxWidth="110px" >Save</ButtonSmall>
          </FlexRow>
        </Card>
      </row>
    </ProfileOuter>

  )
}

export default EditProfile