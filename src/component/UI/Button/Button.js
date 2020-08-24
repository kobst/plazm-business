
import React from 'react'
import styled from 'styled-components'
// import PlusIcon from '../../../Public/images/plus.svg'

const ButtonText = styled.button`
background: #280A33;
border-radius: 7px;
height:53px;
font-size:18px;
line-height:21px;
cursor:pointer;
border:none;
color:#fff;
font-weight:500;
width:100%;
font-family: 'Roboto', sans-serif;
:hover,:focus{
  background: #280A33;
  outline:none;
}
@media (max-width:991px){
  height:45px;
font-size:16px;
line-height:19px;
}
`

const Button = props => {
    return(
      <ButtonText  {...props} />
    )
}

export default Button