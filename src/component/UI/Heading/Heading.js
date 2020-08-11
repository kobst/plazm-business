
import React from 'react'
import styled from 'styled-components'

const Title = styled.h2`
 font-size: 24px;
 color:#000;
 font-weight:500;
 font-family: 'Roboto', sans-serif;
 cursor: pointer;
`

const Heading = props => {
    return(
      <Title onClick={()=>props.setMentions(props.name)}>{props.name}</Title>
    )
}

export default Heading