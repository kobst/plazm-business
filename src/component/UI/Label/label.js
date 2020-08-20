
import React from 'react'
import styled from 'styled-components'

const LabelText = styled.label`
font-weight: 600;
font-size:16px;
line-height: 21px;
color: #756F86;
font-family: 'IBM Plex Sans', sans-serif;
margin:0px;

`

const Label = (props) => {
    return(
    <LabelText>{props.name}</LabelText>
    )
}

export default Label