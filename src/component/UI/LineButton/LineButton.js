
import React from 'react'
import styled from 'styled-components'
// import DownArrow from '../../../Public/images/down-arrow.svg'

const ButtonText = styled.button`
height: 37px;
border:1px solid #A8A8A8;
border-radius: 5px;
font-size: 12px;
color: #848484;
font-family: 'Roboto',sans-serif;
display: inline-flex;
align-items: center;
justify-content: center;
padding: 0 10px;
max-width:83px;
width:100%;
cursor:pointer;
:hover,:focus{
  outline:none;
}
img{
  margin-left:6px;
}
`

const LineButton = props => {
    return(
      <ButtonText onClick={()=>props.setShowTag(true)}>{props.name}</ButtonText>
    )
}

export default LineButton