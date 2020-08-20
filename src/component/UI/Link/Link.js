import React from 'react'
import styled from 'styled-components'

const LoginLink = styled.div`
font-size: 16px;
line-height:21px;
margin-top: 25px;
display: -webkit-box; 
display: -moz-box; 
display: -ms-flexbox; 
display: -webkit-flex; 
display: flex; 
align-items: center; 
justify-content: space-between; 
flex-wrap:wrap;
font-family: 'IBM Plex Sans', sans-serif;
 a{
     color: #2C2738;
     text-decoration: none;
     margin:0 auto;
    }
 a:hover{
    color: #2C2738; text-decoration:underline;
    }
`

const Links = (props) => {
    return <LoginLink {...props} />

}

export default Links