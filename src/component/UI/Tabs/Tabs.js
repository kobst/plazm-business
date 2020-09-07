import React from 'react'
import styled from 'styled-components'

const Title = styled.div`
 cursor: pointer;
 border-bottom:2px solid #fff;
 opacity: 0.3;
 h2{
     display:none;
 }
 div:first-child img{
     width:28px;
 }
  div:last-child img{
     width:26px;
 }
`

const Tabs = ({setMentions,name,isActive,image}) => {
    return(
    <Title className={isActive? 'active' : null} onClick={()=>setMentions(name)}><h2>{name}</h2><img src={image} width="24px" /></Title>
    )
}

export default Tabs