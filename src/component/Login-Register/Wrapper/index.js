import React from 'react'
import styled from 'styled-components'
import PlazmText from '../../../images/plazm.svg'
import ResetImg from '../../../images/resetimg.jpg'

const LoginWrapper = styled.div`
height: 100%;
background: linear-gradient(313.15deg, #FF479D 8.23%, #FF7171 95.51%);
display:flex; 
align-items:center;
width:100%;
`

const LoginContainer = styled.div`
background:#fff;
display:flex;
padding: 3.2vw 0 3.5vw;
width:100%;
`

const LoginFormWrapper = styled.div`
padding:0px;
`

const LoginFormHeader = styled.div`
padding-bottom: 26px;
h2{
    font-weight: bold;
    font-size: 34px;
    line-height: 40px;
    color: #2C2738;
    font-family: 'IBM Plex Sans', sans-serif;
    margin:0px 0 10px;
}
p{
    font-size: 16px;
    line-height: 22px;
    font-family: 'IBM Plex Sans', sans-serif;
    margin:0px;
    color:#2C2738;
}
}

`
const LoginOuter = styled.div`
display:flex;
height: 100%;

width:100%;
@media (max-width:1024px){
justify-content: center;
align-items: center;
}
`
const LoginInner = styled.div`
max-width:1440px;
padding: 0 15px;
width:100%;
margin:0 auto;
display: flex;
justify-content: space-around;
align-items: center;
`
const RightSide = styled.div`
max-width:440px;
width:100%;
button{
    margin-top: 12px;
}
`
const LeftSide = styled.div`
img {
    margin-bottom: 15px;
}
p{
    font-size: 16px;
    line-height: 22px;
    font-family: 'IBM Plex Sans', sans-serif;
    margin:12px 0px; 
    color:#2C2738;
    max-width:385px;
    width:100%;
}
`

const Wrapper = (props) => {
    return (
        <LoginWrapper>
            <LoginContainer>
                <LoginInner>
                    <LeftSide>
                        <img src={PlazmText} alt="Plazm" />
                        <p>Claim and Customize your spot on Plazm Map</p>
                        <p>Connect & engage your nearby audience</p>
                        <p>Make Announcement, share photos, schedule events and moderate your board</p>
                        {/* <img src={ResetImg} alt="" /> */}
                    </LeftSide>
                    <RightSide>
                        <LoginOuter>
                            <LoginFormWrapper>
                                <LoginFormHeader>
                                    <h2>{props.heading}</h2>
                                    <p>{props.welcomeMessage}</p>
                                </LoginFormHeader>
                                <div className="login-form-nested-wrapper">
                                    {props.children}
                                </div>
                            </LoginFormWrapper>
                        </LoginOuter>
                    </RightSide>
                </LoginInner>
            </LoginContainer>
        </LoginWrapper>
    )
}

export default Wrapper