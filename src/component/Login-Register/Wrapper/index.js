import React from 'react'
import styled from 'styled-components'
import PlazmText from '../../../images/plazm.svg'
import ResetImg from '../../../images/resetimg.png'
import Line from '../../../images/line.png'
import { Link } from 'react-router-dom'

const LoginWrapper = styled.div`
height: 100%;
background: linear-gradient(313.15deg, #FF479D 8.23%, #FF7171 95.51%);
display:flex; 
align-items:center;
width:100%;
flex-wrap:wrap;
`
const OuterWrapper = styled.div`
width:100%
`

const LoginContainer = styled.div`
background:#fff;
display:flex;
padding: 3.2vw 0 3.5vw;
width:100%;
min-height:485px;
flex-direction: column;
overflow-y: auto;
flex: 1 1 auto;
position:relative;
justify-content: center;
// justify-content:${props => props.page === 'register' ? 'center' : 'start'};
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
    margin:0px 0 5px;
}
p{
    font-size: 16px;
    line-height: 22px;
    font-family: 'IBM Plex Sans', sans-serif;
    margin:0px;
    color:#2C2738;
}
h3{
    font-weight: 500;
font-size: 16px;
line-height: 19px;
color: #FF479D;

}

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
    h3{
        padding-top:0px;
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
    padding-bottom: 0px;
    margin-bottom: 15px;
img{
    max-width:150px;
}
p{
display:none;
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

@media (max-width:991px){
display:none;
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

@media (max-width:991px){
display:none;
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
@media (max-width:991px){
    margin:0px 0 15px;  
}
`
const LineImage = styled.div`
position:absolute;
@media (max-width:991px){
    display:none;
}

`
const SignUpOuter = styled.div`
text-align: right;
max-width: 1140px;
padding:0 25px;
margin: 20px auto 0;
a{
color:#fff;
font-size: 13px;
line-height: 22px;
text-decoration:none;
margin-right: 140px;
strong{
font-weight: 500;
font-size: 16px;
line-height: 17px;
margin-left:10px;
}
}
@media (max-width:767px){
    margin: 15px auto 0;
    a{
        margin-right: 0;   
    }

}
`

const Wrapper = (props) => {
    return (
        <LoginWrapper>
              {props.page === 'login' ?
            <OuterWrapper>
                <LoginContainer>
                    <LoginInner>
                        {props.page === 'register' ?
                            <LineImage><img src={Line} alt="" /></LineImage> : null
                        }
                        <LeftSide>
                            <img src={PlazmText} alt="Plazm" />
                            {props.page === 'register' ?
                                <RegisterLeft>
                                    <h2>Howdy! Let's get you started</h2>
                                    <p>Login to start working on your business profile page</p>
                                </RegisterLeft> : null
                            }
                            <p>Claim and Customize your spot on Plazm Map</p>
                            <p>Connect & engage your nearby audience</p>
                            <p>Make announcement, share photos, schedule events and moderate your board</p>
                            {props.page === 'register' ?
                                <SignIn><span>Already On Plazm?</span>{props.type.includes('business') ?
                                    <Link to='/business/login' className="link-btn"><strong>Sign In</strong></Link> :
                                    <Link to='/customer/login' className="link-btn"><strong>Sign In</strong></Link>
                                }</SignIn>
                                : null}
                            {props.page === 'forgot' ?
                                <ResetImage><img src={ResetImg} alt="" /></ResetImage>
                                : null}
                        </LeftSide>
                        <RightSide>
                            <LoginOuter>
                                <LoginFormWrapper>
                                    <LoginFormHeader>
                                        <h2>{props.heading}</h2>
                                        {props.page === 'register' ?
                                            <h3>{props.welcomeMessage}</h3> :
                                            <p>{props.welcomeMessage}</p>
                                        }
                                    </LoginFormHeader>
                                    <div className="login-form-nested-wrapper">
                                        {props.children}
                                    </div>
                                </LoginFormWrapper>
                            </LoginOuter>
                        </RightSide>
                    </LoginInner>
                </LoginContainer>
                <SignUpOuter>
                    {props.page === 'login' ?
                        (props.type.includes('business') ?
                            <Link to='/business/register' >Don't have an account yet?<strong>Sign Up</strong></Link> :
                            <Link to='/customer/register' >Don't have an account yet?<strong>Sign Up</strong></Link>
                        )
                        : null
                    }
                </SignUpOuter>
            </OuterWrapper>: <> 
                            <LoginContainer>
                            <LoginInner>
                                {props.page === 'register' ?
                                    <LineImage><img src={Line} alt="" /></LineImage> : null
                                }
                                <LeftSide>
                                    <img src={PlazmText} alt="Plazm" />
                                    {props.page === 'register' ?
                                        <RegisterLeft>
                                            <h2>Howdy! Let's get you started</h2>
                                            <p>Login to start working on your business profile page</p>
                                        </RegisterLeft> : null
                                    }
                                    <p>Claim and Customize your spot on Plazm Map</p>
                                    <p>Connect & engage your nearby audience</p>
                                    <p>Make announcement, share photos, schedule events and moderate your board</p>
                                    {props.page === 'register' ?
                                        <SignIn><span>Already On Plazm?</span>{props.type.includes('business') ?
                                            <Link to='/business/login' className="link-btn"><strong>Sign In</strong></Link> :
                                            <Link to='/customer/login' className="link-btn"><strong>Sign In</strong></Link>
                                        }</SignIn>
                                        : null}
                                    {props.page === 'forgot' ?
                                        <ResetImage><img src={ResetImg} alt="" /></ResetImage>
                                        : null}
                                </LeftSide>
                                <RightSide>
                                    <LoginOuter>
                                        <LoginFormWrapper>
                                            <LoginFormHeader>
                                                <h2>{props.heading}</h2>
                                                {props.page === 'register' ?
                                                    <h3>{props.welcomeMessage}</h3> :
                                                    <p>{props.welcomeMessage}</p>
                                                }
                                            </LoginFormHeader>
                                            <div className="login-form-nested-wrapper">
                                                {props.children}
                                            </div>
                                        </LoginFormWrapper>
                                    </LoginOuter>
                                </RightSide>
                            </LoginInner>
                        </LoginContainer>

                        </>
          }
        </LoginWrapper>
    )
}

export default Wrapper