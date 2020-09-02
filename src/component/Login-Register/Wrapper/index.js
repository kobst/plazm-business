import React from 'react'
import styled from 'styled-components'
import PlazmText from '../../../images/plazm.svg'
import ResetImg from '../../../images/resetimg.png'
import Line from '../../../images/line.png'

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
min-height:485px;
max-height: 90%;
flex-direction: column;
overflow-y: auto;
flex: 1 1 auto;
justify-content: center;
position:relative;
@media (max-width:1024px){
    min-height:inherit;
}
@media (max-width:767px){
    padding:25px;
    max-height: 85%;
    justify-content: start;
}
`

const LoginFormWrapper = styled.div`
padding:0px;
width:100%;
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
@media (max-width:991px){
    h2{
        font-size:24px;
    line-height:30px; 
    }
    p{
        font-size: 14px;
        line-height: 18px;
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
height:auto;
@media (max-width:991px){
    flex-direction:column;  
  }
  @media (max-width:767px){
    padding: 0px; 
  }
`
const RightSide = styled.div`
max-width:440px;
width:100%;
button{
    margin-top: 12px;
}
@media (max-width:767px){
    max-width:inherit;
}
`
const LeftSide = styled.div`

img {
    margin-bottom: 15px;
}
p{
    font-size: 16px;
    line-height:20px;
    font-family: 'IBM Plex Sans', sans-serif;
    margin:10px 0px; 
    color:#2C2738;
    max-width:385px;
    width:100%;
}
@media (max-width:991px){
    max-width:435px;
    width:100%;
    border-bottom: 1px solid #eee;
    padding-bottom: 15px;
    margin-bottom: 15px;
img{
    max-width:200px;
}
p{
    margin:5px 0; 
    max-width: inherit;
}
}
@media (max-width:767px){
    max-width:inherit;

}
`
const ResetImage = styled.div`
position: absolute;
left: 50%;
margin-left: -230px;
bottom:0px;
img{
    margin-bottom:0px;
    max-width: 65%;
    display:block;
}

@media (max-width:767px){
    position:relative;
    margin-top:10px;
    left: 0px;
     margin-left:0px;
    img{
        max-width:250px;
    }
}
`
const RegisterLeft = styled.div`
margin:10px 0 50px;
h2{
font-weight: 700;
font-size: 28px;
line-height: 33px;
color: #FF479D;
}
p{
font-size: 14px;
line-height: inherit;
color: #2C2738;
margin: 0px;
}
@media (max-width:767px){
    margin:10px 0 30px;
    h2{
        font-size: 22px;
        line-height: 28px;
     }   
}
`
const SignIn = styled.div`
margin-top:30px;
span{
font-size: 13px;
line-height: 22px;
color: #FF479D;
}
a{
font-weight: 700;
font-size: 16px;
line-height: 17px;
color: #280A33;
text-decoration:none;
margin-left:5px;
}
@media (max-width:767px){
    margin-top:15px;  
}
`
const LineImage = styled.div`
position:absolute;
`

const Wrapper = (props) => {
    return (
        <LoginWrapper>
            <LoginContainer>
                <LoginInner>
                    <LineImage><img src={Line} alt="" /></LineImage>
                     <LeftSide>
                        <img src={PlazmText} alt="Plazm" />
                        <RegisterLeft>
                            <h2>Howdy! Let's get you started</h2>
                            <p>Login to start working on your business profile page</p>
                        </RegisterLeft>
                        <p>Claim and Customize your spot on Plazm Map</p>
                        <p>Connect & engage your nearby audience</p>
                        <p>Make Announcement, share photos, schedule events and moderate your board</p>
                        <SignIn><span>Already On Plazm?</span><a href="">Sign In</a></SignIn>
                        <ResetImage><img  src={ResetImg} alt="" /></ResetImage>
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