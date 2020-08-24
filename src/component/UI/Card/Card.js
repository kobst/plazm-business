
import React from 'react'
import styled from 'styled-components'

const CardContainer = styled.div`
padding: 20px 10px;
background: #fff;
border-radius:15px;
width:100%;
margin-bottom:10px;
`

const Card = (props,children) => {
    return(
    <CardContainer>{props.children}</CardContainer>
    )
}

export default Card