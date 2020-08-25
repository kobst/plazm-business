
import React from 'react'
import styled from 'styled-components'
// import PlusIcon from '../../../Public/images/plus.svg'

const ButtonText = styled.button`
background: #280A33;
background: ${props => props.bgColor ? props.bgColor : '#280A33'};
border-radius: 5px;
height:34px;
max-width:${props => props.maxWidth ? props.maxWidth : '100px'};
font-weight: 500;
font-size: 14px;
line-height: 16px;
cursor:pointer;
border:none;
color:#fff;
width:100%;
display: flex;
align-items: center;
justify-content: center;
font-family: 'Roboto', sans-serif;
:hover,:focus{
  background: #280A33;
  outline:none;
}
img{
  margin-right:10px;
}
@media (max-width:991px){
height:30px;
font-size:13px;
line-height:16px;
}
`

const ButtonSmall = props => {
  const { bgColor,maxWidth} = props
    return(
      <ButtonText bgColor={bgColor} maxWidth={maxWidth} {...props} />
    )
}

export default ButtonSmall