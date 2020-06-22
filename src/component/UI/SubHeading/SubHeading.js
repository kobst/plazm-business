
import React from 'react'
import styled from 'styled-components'

const Title = styled.h2`
font-size:18px;
font-weight:500;
margin-top:10px;
font-family: 'Roboto', sans-serif;
`

const SubHeading = props => {
    return(
      <Title>{props.name}</Title>
    )
}

export default SubHeading