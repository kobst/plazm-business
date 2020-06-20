
import React from 'react'
import styled from 'styled-components'

const InputText = styled.input`
height: 38px;
font-size: 14px;
border: 1px solid  ${props => props.usererror ? "red" : "#c9c9c9" };
border-radius: 0;
width: 100%;
padding:0 15px;
:focus{
    outline:none;
}

`

const Input = (props) => {
    return(
    <InputText usererror = {props.error}/>
    )
}

export default Input