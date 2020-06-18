
import React from 'react'
import styled from 'styled-components'

const CardContainer = styled.div`
padding: 20px 20px;
background: #fff;
`

const Card = (props,children) => {
    return(
    <CardContainer>{props.children}</CardContainer>
    )
}

export default Card