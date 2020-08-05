import React from 'react'
import styled from 'styled-components'

const LoginLink = styled.div`
font-size: 14px;
margin-top: 20px;
display: -webkit-box; 
display: -moz-box; 
display: -ms-flexbox; 
display: -webkit-flex; 
display: flex; 
-webkit-box-align: center; 
-moz-box-align: center; 
-ms-flex-align: center; 
-webkit-align-items: center; 
align-items: center; 
justify-content: space-between; 
-webkit-justify-content: space-between; 
-ms-justify-content: space-between; 
-moz-justify-content: space-between;
flex-wrap:wrap;
 a{
     color: #000;
    }
 a:hover{
     color: rgba(0,0,0,.80); text-decoration: none;
    }
`

const Links = (props) => {
    return <LoginLink {...props} />

}

export default Links