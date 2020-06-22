
import React from 'react'
import styled from 'styled-components'
import CrossIcon from '../../../Public/images/cross.svg'
import LineButton from '../LineButton/LineButton'
import Button from '../Button/Button'

const MessagesSection = styled.div`
font-family: 'Roboto',sans-serif;
margin-top:30px;
input{
  border:none;
  width:100%;
  :focus{
    outline:none;
  }
}
textarea{
  border: none;
  border-bottom: 1px solid #ddd;
  margin-bottom: 12px;
  width: 100%;
  height: 26px;
  resize: none;
  font-size: 12px;
  :focus{
    outline:none;
  }
}
`
const InputBox = styled.div`
border-bottom:1px solid #ddd;
margin-bottom:15px;
padding-bottom: 10px;
span{
  font-size:14px;
  margin-right:5px;
  font-weight:500;
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
color:#848484;
cursor:pointer;
img{
    margin-left: 9px;
}
`
const FlexRow = styled.div`
display: flex;
justify-content: space-between;
align-items:center;
margin-top:30px;
`
const Anchor = styled.a`
margin-left:auto;
font-size:14px;
font-weight:500px;
margin-right:20px;
cursor:pointer;
`

const Messages = props => {
  return (
    <MessagesSection>
      <InputBox>
        <span>TO:</span>
        <Badges>Steve Murph <img src={CrossIcon} alt={CrossIcon} /></Badges>
      </InputBox>
      <textarea placeholder="Messages" />
      <LineButton name="Media" />
      <FlexRow>
            <Anchor>Cancle</Anchor>
            <Button buttontext="Post"></Button>
          </FlexRow>

    </MessagesSection>
  )
}

export default Messages