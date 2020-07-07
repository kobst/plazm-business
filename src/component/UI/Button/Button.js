
import React from 'react'
import styled from 'styled-components'
// import PlusIcon from '../../../Public/images/plus.svg'

const ButtonText = styled.button`
height: 37px;
background: #000;
border-radius: 5px;
font-size: 14px;
margin-top: 10px;
color: #fff;
font-weight: 500;
font-family: 'Roboto',sans-serif;
display: inline-flex;
align-items: center;
justify-content: center;
padding: 0 10px;
min-width: 95px;
cursor:pointer;
border:none;
:hover{
  background: rgba(0,0,0,0.9);
}
`

const Button = props => {
    return(
      <ButtonText {...props} />
    )
}

export default Button