import React from 'react'
import styled from 'styled-components'

const Title = styled.div`
 font-size: 0px;
 cursor: pointer;
 border-bottom:2px solid #fff;
 opacity: 0.3;
`

const Tabs = ({setMentions,name,isActive,image}) => {
    return(
    <Title className={isActive? 'active' : null} onClick={()=>setMentions(name)}>{name}<img src={image} /></Title>
    )
}

export default Tabs