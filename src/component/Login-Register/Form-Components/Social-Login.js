import React from "react";
import OrdividerLine from "../../../images/ordivider-line.png";
import FacebookLogin from "../../../images/Facebook-login.png";
import TwitterLogin from "../../../images/Twitter-login.png";
import GoogleLogin from "../../../images/Google-login.png";
import { OrDivider, SocialLoginBtnWrap } from "../Wrapper/style";

const SocialLogin = ({}) => {
  return (
    <>
      <OrDivider>
        <img src={OrdividerLine} alt="Or divider" />
        <span>or</span>
      </OrDivider>
      <SocialLoginBtnWrap>
        <img src={FacebookLogin} alt="Facebook" />
        <img src={TwitterLogin} alt="Twitter" />
        <img src={GoogleLogin} alt="Google" />
      </SocialLoginBtnWrap>
    </>
  );
};

export default SocialLogin;
