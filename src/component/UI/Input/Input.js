
import React from 'react'
import styled from 'styled-components'

const InputText = styled.input`
height: 52px;
font-size: 16px;
line-height:21px;
border: 1px solid  ${props => props.usererror ? "red" : "#FF7171" };
border-radius: 0;
width: 100%;
padding:0 15px;
margin-top:7px;
background: #FFFFFF;
border: 1px solid #DBE2EA;
box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
font-family: 'IBM Plex Sans', sans-serif;
border-radius: 6px;
:focus{
    outline:none;
}
::placeholder{
color:#7C9CBF
}

`

const Input = (props) => {
    return(
    <InputText ref={props.refs} {...props} usererror = {props.error}/>
    )
}

export default Input