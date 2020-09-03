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
`

const Tabs = ({setMentions,name,isActive,image}) => {
    return(
<<<<<<< HEAD
    <Title className={isActive? 'active' : null} onClick={()=>setMentions(name)}><h2>{name}</h2><img src={image} /></Title>
=======
      <Title className={isActive? null : 'active'} onClick={()=>setMentions(name)}>{name}</Title>
>>>>>>> 2cf5563c6956513a02c10a8d0ef92d165115d25d
    )
}

export default Tabs