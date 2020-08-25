import React from 'react'
import styled from 'styled-components'

const Title = styled.h2`
 font-size: 24px;
 color:#000;
 font-weight:500;
 font-family: 'Roboto', sans-serif;
 cursor: pointer;
`

const Tabs = ({setMentions,name,isActive}) => {
    return(
      <Title className={isActive? null : 'active'} onClick={()=>setMentions(name)}>{name}</Title>
    )
}

export default Tabs