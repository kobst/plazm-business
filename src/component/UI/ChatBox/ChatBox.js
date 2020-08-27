
import React from 'react'
import styled from 'styled-components'
import SendIcon from '../../../images/send.svg'
import UserImage from '../../../images/profile-img.png'
import WishlistIcon from '../../../images/wishlist-icon.svg'

const MessagesSection = styled.div`
font-family: 'Roboto',sans-serif;
background: #FFFFFF;
border: 0.25px solid rgba(239, 77, 182, 0.5);
box-shadow: inset 0px 0px 8px rgba(124, 156, 191, 0.1);
border-radius: 25px;
padding: 20px 15px;
`

const ImgSmall = styled.div`
width:12px;
height:12px;
border: 1px solid #FFFFFF;
box-shadow: inset 0px 0px 8px rgba(124, 156, 191, 0.1);
border-radius: 100%;
overflow: hidden;
display:flex;
margin-left:auto;
margin-top:5px;
`
const GreyBoxOuter = styled.div`
display:flex;
width:100%;
margin-bottom:10px;
img{
  width:48px;
  height:48px;
  border-radius:100%;
  margin-right:10px;
}
span{
  font-size: 11px;
line-height: 21px;
color: #979797;
}
div{
  width: auto;
  max-width: 340px;
  padding-right: 15px;
  min-width: 160px;
}
`
const GreyBox = styled.div`
background: linear-gradient(144.72deg, #FF4F94 0%, #FF7171 92.13%);
box-shadow: 0px 22px 43px rgba(255, 47, 131, 0.0713042), 0px 8.03036px 15.6957px rgba(255, 47, 131, 0.102053), 0px 3.89859px 7.61997px rgba(255, 47, 131, 0.127947), 0px 1.91116px 3.73545px rgba(255, 47, 131, 0.158696), 0px 0.755676px 1.477px rgba(255, 47, 131, 0.23);
border-radius: 0px 19px 19px 19px;
    font-weight: 500;
    font-size: 11px;
    line-height: 15px;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 15px;
    position:relative;
  img{
    position: absolute;
    width: 15px;
    height: 14px;
    border-radius: 0;
    right: -18px;
    top: 0;
    margin-right: 0;
  }
`

const BlackBoxOuter = styled.div`
display:flex;
width:100%;
img{
  width:48px;
  height:48px;
  border-radius:100%;
  margin-right:10px;
}
span{
  font-size: 11px;
line-height: 21px;
color: #979797;
}
div{
  width: auto;
  max-width: 340px;
  min-width: 160px;
  text-align: right;
  display: flex;
    flex-direction: column;
    margin-left: auto;
}
`
const BlackBox = styled.div`
background: #F2FBFF;
box-shadow: 0px 8.03036px 15.6957px rgba(219, 226, 234, 0.102053), 0px 3.89859px 7.61997px rgba(219, 226, 234, 0.127947), 0px 1.91116px 3.73545px rgba(219, 226, 234, 0.158696), 0px 0.755676px 1.477px rgba(219, 226, 234, 0.23);
border-radius: 13px 13px 0px 13px;
font-size:11px;
line-height: 15px;
font-weight:normal;
text-align:right;
width: 100%;
max-width:233px;
color: #626262;
display: flex;
align-items: center;
padding: 15px;
border-radius: 13px 13px 0px 13px;
position:relative;
margin-top:0px;
margin-left:auto;
  span{

  }
`
const TextareaBox = styled.div`
background: #FFFFFF;
border: 0.25px solid rgba(239, 77, 182, 0.5);
box-sizing: border-box;
box-shadow: inset 0px 0px 8px rgba(124, 156, 191, 0.1);
border-radius: 15px;
height:69px;
display: flex;
align-items: center;
margin-top:10px;
padding:0 15px;
textarea{
    color: #626262;
    font-size: 16px;
    line-height: 21px;
    background: none;
    border: none;
    resize: none;
    width: calc(100% - 46px);
    :focus{
      outline:none;
    }
}
`
const Icon = styled.div`
padding:0px;
display:flex;
align-items:center;
width: 46px;
height: 46px;
border: 1px solid #FF479D;
box-sizing: border-box;
border-radius: 9px;
justify-content: center;
cursor:pointer;
img{
  position: relative;
    left: 2px;
    bottom: 2px;
}
`
const UserList = styled.div`
display: flex;
border-top: 1px dashed #ff479d;
border-bottom: 1px dashed #ff479d;
padding: 15px 0;
margin-top: 10px;
.active{
  opacity:0.5 !important;
  span{
    background: #d4d6d6 !important;
  }
}
.users{
  padding: 0px;
  width: 33px;
  height: 33px;
  border-radius: 100%;
  position:relative;
  margin:0 5px;

  div{
    overflow: hidden;
  width: 33px;
  height: 33px;
  border-radius: 100%;
  }
  span{
    border: 2px solid #fff;
    width: 11px;
    height: 11px;
    background: #00a38c;
    display: block;
    border-radius: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
`
const ActiveUser = styled.div`
margin:10px 0;
display: flex;
align-items: center;
`
const UserImg = styled.div`
width:48px;
height:48px;
overflow: hidden;
border-radius:100%;
border:1px solid #ff479d;
box-shadow: inset 0px 0px 8px rgba(124, 156, 191, 0.1);
margin-right:15px;
`
const UserDetails = styled.div`

h2{
  font-size: 16px;
  line-height: 21px;
  color: #000000;
  font-weight:normal;
}
p{
  font-size: 11px;
line-height: 16px;
color: #979797;
}
`
const ChatBox = props => {
  return (
    <>
      <UserList>
        <div className="users">
          <div><img src={UserImage} alt="user" /></div>
          <span></span>
        </div>
        <div className="users active">
          <div><img src={UserImage} alt="user" /></div>
          <span></span>
        </div>
        <div className="users">
          <div><img src={UserImage} alt="user" /></div>
          <span></span>
        </div>
        <div className="users">
          <div><img src={UserImage} alt="user" /></div>
          <span></span>
        </div>
        <div className="users">
          <div><img src={UserImage} alt="user" /></div>
          <span></span>
        </div>
      </UserList>
      <ActiveUser>
        <UserImg>
          <img src={UserImage} alt="user" />
        </UserImg>
        <UserDetails>
          <h2>Edward Han</h2>
          <p>Last seen 38m ago</p>
        </UserDetails>

      </ActiveUser>
      <MessagesSection>
        <GreyBoxOuter>
          <img src={UserImage} alt="user" />
          <div><span>2 hours ago</span>
            <GreyBox>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Parturient urna, nibh sed fermentum, scelerisque pharetra.
              <img src={WishlistIcon} alt="wishlist" />
            </GreyBox>
          </div>
        </GreyBoxOuter>

        <BlackBoxOuter>
          <div><span>2 hours ago</span>
            <BlackBox>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Parturient urna, nibh sed fermentum, scelerisque pharetra.
            </BlackBox>
          </div>
        </BlackBoxOuter>

        <GreyBoxOuter>
          <img src={UserImage} alt="user" />
          <div><span>2 hours ago</span>
            <GreyBox>
              This is awesome!
              <img src={WishlistIcon} alt="wishlist" />
            </GreyBox>
          </div>
        </GreyBoxOuter>

        <BlackBoxOuter>
          <div><span>2 hours ago</span>
            <BlackBox>
              This is awesome!
            </BlackBox>
          </div>
        </BlackBoxOuter>
        <ImgSmall><img src={UserImage} alt="user" /></ImgSmall>
      </MessagesSection>
      <TextareaBox>
          <textarea></textarea>
          <Icon><img src={SendIcon} alt="" /></Icon>
        </TextareaBox>
    </>
  )
}

export default ChatBox