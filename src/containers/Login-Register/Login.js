import React, { useState, useEffect } from "react";
import "./style.css";
import { Auth } from "aws-amplify";
import { getMessage } from "../../config";
import ValueLoader from "../../utils/loader";
import history from "../../utils/history";
import Wrapper from "../../component/Login-Register/Wrapper";
import LoginForm from "../../component/Login-Register/Form-Components/Login-Form";

const renderMessage = getMessage();

const Login = (props) => {
  const type = props.match.url;
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [userError, setuserError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [message, setmessage] = useState();
  const [loader, setLoader] = useState(false);
  const [loginValue, setLoginValue] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    let updateUser = async (authState) => {
      try {
        await Auth.currentAuthenticatedUser();
        history.push("/business");
        window.location.reload();
      } catch {
        setLoginValue(true);
      }
    };
    updateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = () => {
    Auth.signIn({
      username: user,
      password: password,
    })
      // eslint-disable-next-line no-sequences
      .then((data) => {
        if (data.attributes["custom:type"] === "business") history.push("/business");
        else if (
          data.attributes["custom:type"] === "curator" ||
          data.attributes["custom:type"] === "customer" ||
          data.attributes["custom:type"] === "consumer"
        )
          history.push("/");
        else history.push("/business/login");
        window.location.reload();
      })
      .catch((err) => {
        if (err) {
          return setmessage(err.message), setError(true), setDisable(false);
        }
      });
  };

  function validateEmail(user) {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(user).toLowerCase());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setmessage();
    setDisable(true);
    if (Validation()) {
      setLoader(true);
      signIn();
    }
  };

  const Validation = () => {
    if (!user) {
      setuserError(true);
      setDisable(false);
    }
    if (user) {
      if (!validateEmail(user)) {
        setDisable(false);
        setError(true);
        setmessage(renderMessage.emErr);
      }
    }
    if (!password) {
      setDisable(false);
      setPasswordError(true);
    } else if (user && password && validateEmail(user)) {
      return true;
    }
  };

  const handleChange = (e) => {
    setError(false);
    setmessage();
    setLoader(false);
    setuserError(false);
    setPasswordError(false);
    if (e.target.id === "username") {
      setUser(e.target.value.trim());
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <>
      {loginValue === true ? (
        <Wrapper
          type={type}
          page="login"
          heading={renderMessage.Welcome}
          welcomeMessage={
            type.includes("business")
              ? renderMessage.Login_Mess
              : renderMessage.Login_Mess_Consumer
          }
        >
          <LoginForm
            type={type}
            error={error}
            userError={userError}
            passwordError={passwordError}
            loader={loader}
            message={message}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            disable={disable}
          />
        </Wrapper>
      ) : (
        <div style={{ textAlign: "center", margin: " 40px auto 0" }}>
          <ValueLoader height="100" width="100" />
        </div>
      )}
    </>
  );
};

export default Login;
