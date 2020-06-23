import React from 'react'
import styled from 'styled-components'

const LoginWrapper = styled.div`
height: 100%
`

const LoginContainer = styled.div`
height: 100%;
padding: 0;
display: table;
width: 100%;
`
const Row = styled.div`
height: 100%;
display: table-row;
> div{
    display: table-cell; 
    width: 50%;
}
> div:first-child{
    background-color: #f2f2f2;  
    text-align: center; 
    vertical-align: middle; 
}
> div:last-child{
    background-color: #fff;
}
`
const LoginFormWrapper = styled.div`
padding:65px 50px 50px 50px;
button{
    min-width: 180px;
}

`

const LoginFormHeader = styled.div `
padding-bottom: 30px;
h1{
    font-size:25px; font-weight: 800; margin: 0;
}
p{
    font-size: 12px; 
    font-weight: 400; 
    margin: 10px 0 0 0;
}

`

const Wrapper = (props) => {
return(
<LoginWrapper>
  <LoginContainer>
    <Row>			
        <div className="col-md-6"> </div>
        <div className="col-md-6">
            <LoginFormWrapper>
                <LoginFormHeader>
                    <h1>{props.heading}</h1>
                    <p>{props.welcomeMessage}</p>
                </LoginFormHeader>
                <div className="login-form-nested-wrapper">
                 {props.children}
                </div>
               </LoginFormWrapper>

        </div>			
    </Row>
  </LoginContainer>
</LoginWrapper>
)
}

export default Wrapper