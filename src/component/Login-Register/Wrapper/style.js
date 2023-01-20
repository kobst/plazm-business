import styled from "styled-components";
import AuthImg from "../../../images/auth-img.png";

export const LoginWrapper = styled.div`
  height: 100%;
  background: #e5e5e5;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;
export const OuterWrapper = styled.div`
  width: 100%;
`;

export const LoginContainer = styled.div`
  background: #fafafa;
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-y: auto;
  flex: 1 1 auto;
  position: relative;
  justify-content: center;
  height: 100%;
  // justify-content:${(props) =>
    props.page === "register" ? "center" : "start"};
  @media (max-width: 991px) {
    height: auto;
  }
`;

export const LoginFormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 0px 0 0;
  @media (max-width: 1024px) {
    padding: 60px 0;
  }
  @media (max-width: 991px) {
    padding: 50px 0;
  }
  @media (max-width: 767px) {
    padding: 50px 25px;
  }
`;

export const LoginFormHeader = styled.div`
  padding-bottom: 26px;
  h2,
  h3 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    text-transform: uppercase;
    color: #280a33;
    &.colorRed {
      color: #ff479d;
    }
  }
  p {
    font-size: 16px;
    line-height: 22px;
    font-family: "IBM Plex Sans", sans-serif;
    margin: 0px;
    color: #2c2738;
  }

  .MT-15 {
    margin-top: 15px;
  }

  @media (max-width: 991px) {
    h2 {
      font-size: 24px;
      line-height: 30px;
    }
    p {
      font-size: 14px;
      line-height: 18px;
    }
    h3 {
      padding-top: 0px;
    }
  }
`;
export const LoginOuter = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  @media (max-width: 1024px) {
    justify-content: center;
    align-items: flex-start;
  }
`;
export const LoginInner = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  @media (max-width: 991px) {
    flex-direction: column;
  }
  @media (max-width: 767px) {
    padding: 0px;
  }
`;

export const LeftSide = styled.div`
  max-width: 50%;
  background: url(${AuthImg}) no-repeat top center;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  img {
    margin-bottom: 15px;
  }
  @media (max-width: 991px) {
    max-width: 100%;
    height: 800px;
  }
  @media (max-width: 767px) {
    height: 580px;
  }
`;

export const RightSide = styled.div`
  max-width: 50%;
  width: 100%;
  height: 100%;
  @media (max-width: 991px) {
    max-width: 100%;
    height: auto;
  }
  @media (min-width: 992px) {
    overflow-y: auto;
  }
`;

export const ResetImage = styled.div`
  position: absolute;
  left: 50%;
  margin-left: -230px;
  bottom: 0px;
  img {
    margin-bottom: 0px;
    max-width: 65%;
    display: block;
  }

  @media (max-width: 991px) {
    display: none;
  }
`;
export const RegisterLeft = styled.div`
  /* margin: 10px 0 50px; */
  h2 {
    font-weight: 700;
    font-size: 28px;
    line-height: 33px;
    color: #ff479d;
  }
  p {
    font-size: 14px;
    line-height: inherit;
    color: #2c2738;
    margin: 0px;
  }
`;
export const SignIn = styled.div`
  text-align: left;
  max-width: 100%;
  padding: 0;
  margin: 320px 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 1024px) {
    margin: 150px 0 0;
  }
  @media (max-width: 767px) {
    margin: 50px 0 0;
  }
  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-transform: uppercase;
    color: #ff4f94;
  }
  a {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 17px;
    color: #fff;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    strong {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 17px;
    }
  }
  img {
    margin: 10px 0;
  }
`;
export const LineImage = styled.div`
  position: absolute;
  @media (max-width: 991px) {
    display: none;
  }
`;
export const SignUpOuter = styled.div`
  text-align: left;
  max-width: 100%;
  padding: 0;
  margin: 350px 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 1024px) {
    margin: 200px 0 0;
  }
  @media (max-width: 767px) {
    margin: 50px 0 0;
  }
  a {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 17px;
    color: #fff;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    strong {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 17px;
    }
    img {
      margin: 0 0 15px;
    }
  }
  img {
    margin: 0;
  }
`;

export const AuthInfoWrap = styled.div`
  padding: 116px 0 0 120px;
  position: relative;
  @media (max-width: 767px) {
    padding: 120px 50px;
  }
  h2 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 28px;
    color: #ffffff;
  }
  p {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: normal;
    color: #ffffff;
    margin: 12px 0;
    padding: 0;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 22px;
  position: relative;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  .RememberMeLabel {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 14px;
    color: #756f86;
  }
  .switch {
    display: block;
    position: relative;
    margin: 0 5px 0 0;
    width: 34px;
    height: 20px;
    cursor: pointer;
    overflow: hidden;
  }
  .switch input {
    position: absolute;
    top: -30px;
    left: -30px;
    width: 0;
    height: 0;
  }
  .switch input + span {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #d4d6d8;
    border-radius: 20px;
  }
  .switch input:checked + span {
    background: #ff479d;
  }
  .switch input + span:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 4px;
    width: 15px;
    height: 15px;
    background: white;
    border-radius: 50%;
    transform: translateY(-50%);
    transition: all 0.3s;
  }
  .switch input:checked + span:before {
    left: 16px;
  }
`;
export const ForgotPassword = styled.div`
  margin-top: 10px;
  text-align: right;
  a {
    font-family: "IBM Plex Sans", sans-serif;
    font-size: 16px;
    line-height: 21px;
    text-decoration: none;
    color: #156064;
    :hover {
      color: #156064;
      text-decoration: underline;
    }
  }
`;
export const ErrorMessage = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: normal;
  text-align: left;
  color: #ff7171;
  position: relative;
  margin-top: 6px;
`;

export const OrDivider = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 65px auto 40px;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-family: "Montserrat";
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    text-transform: uppercase;
    color: #000000;
    position: absolute;
    background: #fafafa;
    padding: 5px 10px;
  }
`;

export const SocialLoginBtnWrap = styled.div`
  max-width: 220px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FindYourBusinessWrapper = styled.div`
  margin: 10px 0 30px;
  h2 {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #280a33;
  }
  p {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: normal;
    text-align: left;
    color: #3a3a3a;
    padding-left: 22px;
  }
`;

export const TermsWrap = styled.div`
  width: 100%;
  margin: 0;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  .container {
    display: flex;
    position: relative;
    padding-left: 22px;
    margin-bottom: 5px;
    cursor: pointer;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #3a3a3a;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 16px;
    width: 16px;
    background: #d9d9d9;
    box-shadow: inset 0px 0px 3px -1px rgba(0, 0, 0, 0.15);
    border-radius: 3px;
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: #ff479d;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 5px;
    top: 1px;
    width: 3px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

export const AuthInfoBusinessWrap = styled.div`
  max-width: 326px;
  margin-bottom: -130px;
  margin-top: 50px;
  @media (max-width: 767px) {
    margin-bottom: 0;
    margin-top: 15px;
  }
  p {
    line-height: normal;
    margin: 0 0 10px;
    padding: 0;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
  }
`;
