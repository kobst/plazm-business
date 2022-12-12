import React from "react";
import PlazmText from "../../../images/auth-Plazm-logo.png";
import ResetImg from "../../../images/resetimg.png";
import Line from "../../../images/line.png";
import ArrowDown from "../../../images/arrow-down.png";
import { Link } from "react-router-dom";
import {
  LoginWrapper,
  OuterWrapper,
  LoginContainer,
  LoginFormWrapper,
  LoginFormHeader,
  LoginOuter,
  LoginInner,
  RightSide,
  LeftSide,
  ResetImage,
  RegisterLeft,
  SignIn,
  LineImage,
  SignUpOuter,
  AuthInfoWrap,
  AuthInfoBusinessWrap,
} from "./style";

const Wrapper = (props) => {
  return (
    <LoginWrapper>
      {props.page === "login" ? (
        <OuterWrapper>
          <LoginContainer>
            <LoginInner>
              {props.page === "register" ? (
                <LineImage>
                  <img src={Line} alt="" />
                </LineImage>
              ) : null}
              <LeftSide>
                <AuthInfoWrap>
                  <img src={PlazmText} alt="Plazm" />
                  {props.page === "register" ? (
                    <RegisterLeft>
                      <h2>Howdy! Let's get you started</h2>
                      <p>
                        Login to start working on your business profile page
                      </p>
                    </RegisterLeft>
                  ) : null}
                  <h2>Let’s get you started</h2>
                  <p>Login to start working on your profile page</p>
                  <SignUpOuter>
                    {props.page === "login" ? (
                      props.type.includes("business") ? (
                        <Link to="/business/register">
                          <img src={ArrowDown} /> <strong>Sign Up</strong>
                        </Link>
                      ) : (
                        <Link to="/consumer/register">
                          <img src={ArrowDown} /> <strong>Sign Up</strong>
                        </Link>
                      )
                    ) : null}
                  </SignUpOuter>
                  {props.page === "register" ? (
                    <SignIn>
                      <span>Already On Plazm?</span>
                      {props.type.includes("business") ? (
                        <Link to="/business/login" className="link-btn">
                          <strong>Sign In</strong>
                        </Link>
                      ) : (
                        <Link to="/consumer/login" className="link-btn">
                          <strong>Sign In</strong>
                        </Link>
                      )}
                    </SignIn>
                  ) : null}
                  {props.page === "forgot" ? (
                    <ResetImage>
                      <img src={ResetImg} alt="" />
                    </ResetImage>
                  ) : null}
                </AuthInfoWrap>
              </LeftSide>
              <RightSide>
                <LoginOuter>
                  <LoginFormWrapper>
                    <LoginFormHeader>
                      <h2>{props.heading}</h2>
                      <h2 className="colorRed">Sign in</h2>
                      <img className="MT-15" src={ArrowDown} />
                      {props.page === "register" ? (
                        <h3>{props.welcomeMessage}</h3>
                      ) : (
                        <p></p>
                      )}
                    </LoginFormHeader>
                    <div className="login-form-nested-wrapper">
                      {props.children}
                    </div>
                  </LoginFormWrapper>
                </LoginOuter>
              </RightSide>
            </LoginInner>
          </LoginContainer>
        </OuterWrapper>
      ) : (
        <>
          <LoginContainer>
            <LoginInner>
              {props.page === "register" ? (
                <LineImage>
                  <img src={Line} alt="" />
                </LineImage>
              ) : null}
              <LeftSide>
                <AuthInfoWrap>
                  <img src={PlazmText} alt="Plazm" />
                  {props.page === "register" ? (
                    <RegisterLeft>
                      <h2>Let’s get you started</h2>
                      <p>Login to start working on your profile page</p>
                    </RegisterLeft>
                  ) : null}
                  {props.type.includes("business") ? (
                    <AuthInfoBusinessWrap>
                      <p>Claim and Customize your spot on Plazm Map</p>
                      <p>Connect & engage your nearby audience</p>
                      <p>
                        Make announcement, share photos, schedule events and
                        moderate your board
                      </p>
                    </AuthInfoBusinessWrap>
                  ) : (
                    <></>
                  )}

                  {props.page === "register" ? (
                    <SignIn>
                      <span>We Missed You?</span>
                      <img src={ArrowDown} />
                      {props.type.includes("business") ? (
                        <Link to="/business/login" className="link-btn">
                          <strong>Sign In</strong>
                        </Link>
                      ) : (
                        <Link to="/consumer/login" className="link-btn">
                          <strong>Sign In</strong>
                        </Link>
                      )}
                    </SignIn>
                  ) : null}
                  {props.page === "forgot" ? (
                    <ResetImage>
                      <img src={ResetImg} alt="" />
                    </ResetImage>
                  ) : null}
                </AuthInfoWrap>
              </LeftSide>
              <RightSide>
                <LoginOuter>
                  <LoginFormWrapper>
                    <LoginFormHeader>
                      {props.page === "register" ? (
                        <h3 className="colorRed">{props.welcomeMessage}</h3>
                      ) : (
                        <p>{props.welcomeMessage}</p>
                      )}
                      <img className="MT-15" src={ArrowDown} />
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
      )}
    </LoginWrapper>
  );
};

export default Wrapper;
