import React, { useState, useEffect } from "react";
import "./style.css";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

import Wrapper from "../../component/Login-Register/Wrapper";
import RegisterForm from "../../component/Login-Register/Form-Components/Register-Form";
import { getMessage } from "../../config";
import ValueLoader from "../../utils/loader";
import {
  callApi,
  addBusiness,
  updateBusiness,
  addUserProfile,
} from "../../Api";

const renderMessage = getMessage();

const Register = (props) => {
  const history = useHistory();
  const { userType } = props;
  const type = props.match.url;
  const [username, setUser] = useState();
  const [password, setPassword] = useState();
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState();
  const [loc, setLoc] = useState();
  const [confirmationCode, setconfirmationCode] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [err, setError] = useState(false);
  const [message, setMessage] = useState();
  const [businessInfo, setBusinessInfo] = useState();
  const [name, setName] = useState();
  const [codeError, setCodeError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [firstError, setFirstError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [locationError, setLocError] = useState(false);
  const [business, setbusiness] = useState(false);
  const [loader, setLoader] = useState(false);
  const [emptyCode, setEmptyCodeError] = useState(false);
  const [phoneShort, setPhoneShort] = useState(false);
  const [phoneLong, setPhoneLong] = useState(false);
  const [loginValue, setLoginValue] = useState(false);
  const [disable, setDisable] = useState(false);
  const [phoneOnlyNumbers, setPhoneOnlyNumbers] = useState(false);

  useEffect(() => {
    const updateUser = async (authState) => {
      try {
        await Auth.currentAuthenticatedUser();
        history.push("/");
      } catch (error) {
        setLoginValue(true);
      }
    };
    updateUser();
  }, []);

  const signUp = (form) => {
    Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email,
        phone_number: phoneNumber,
        name: username,
        "custom:type": userType,
      },
    })
      .then(async (res) => {
        if (res.userSub) {
          if (type.includes("consumer")) {
            const obj = {
              name: username,
              email: email,
              phoneNumber: phoneNumber,
              userSub: res.userSub,
            };
            const profile = await addUserProfile(obj);
            if (profile.data.addUser.success === true) {
              form.reset();
              setVerified(true);
              setError(false);
              setLoader(false);
            }
          }
          if (type.includes("business") && (await checkUser(res.userSub))) {
            form.reset();
            setVerified(true);
            setError(false);
            setLoader(false);
          }
        }
      })
      .catch((err) => {
        if (err.message.includes("phone")) {
          return (
            setMessage(renderMessage.phone_Err),
            setError(true),
            setDisable(false)
          );
        } else {
          return setMessage(err.message), setError(true), setDisable(false);
        }
      });
  };

  const confirmSignUp = () => {
    Auth.confirmSignUp(email, confirmationCode)
      .then(() => {
        Auth.signIn({
          username: email,
          password: password,
        })
          // eslint-disable-next-line no-sequences
          .then(() => history.push("/"))
          .catch((err) => console.log(err));
      })
      .catch((err) => setCodeError(true));
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const validateCode = () => {
    if (!confirmationCode) {
      setEmptyCodeError(true);
    } else {
      return true;
    }
  };

  const validation = () => {
    if (!username) {
      setFirstNameError(true);
    }
    if (username) {
      if (username.length <= 3) {
        setFirstError(true);
      }
    }
    if (!loc && type.includes("business")) {
      setLocError(true);
    }
    if (loc) {
      if (!name) {
        setError(true);
        setMessage(renderMessage.Err);
      } else if (!businessInfo) {
        setError(true);
        setMessage(renderMessage.Err);
      }
    }
    if (!phoneNumber) {
      setPhoneError(true);
    }
    if (phoneNumber) {
      if (phoneNumber.length <= 5) {
        setPhoneShort(true);
      } else if (phoneNumber.length >= 50) {
        setPhoneLong(true);
      } else if (!phoneNumber.match(/^[^a-zA-Z]*$/)) {
        setPhoneOnlyNumbers(true);
      }
    }
    if (!validateEmail(email)) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (password) {
      if (password.length <= 7) {
        setError(true);
        setMessage(renderMessage.pass_length);
      }
    }
    if (
      type.includes("business") &&
      username &&
      loc &&
      username.length > 3 &&
      phoneNumber &&
      phoneNumber.match(/^[^a-zA-Z]*$/) &&
      validateEmail(email) &&
      password &&
      name &&
      password.length > 7 &&
      phoneNumber.length >= 5 &&
      phoneNumber.length <= 50
    ) {
      return true;
    }
    if (
      type.includes("consumer") &&
      username &&
      username.length > 3 &&
      phoneNumber &&
      phoneNumber.match(/^[^a-zA-Z]*$/) &&
      validateEmail(email) &&
      password &&
      password.length > 7 &&
      phoneNumber.length >= 5 &&
      phoneNumber.length <= 50
    ) {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setMessage();
    if (verified && validateCode()) {
      setMessage();
      confirmSignUp();
      setLoader(true);
    }
    if (!verified && validation()) {
      setLoader(true);
      setDisable(true);
      if (await checkBusiness()) {
        setMessage();
        setError(false);
        signUp(form);
      } else {
        setDisable(false);
        setError(true);
        setMessage(renderMessage.Busi_Err);
      }
    }
  };

  const checkBusiness = async () => {
    const val = await callApi(name);
    if (val.length !== 0 && val[0].userSub) {
      return false;
    } else {
      return true;
    }
  };
  const checkUser = async (userSub) => {
    const val = await callApi(name);
    if (val.length === 0) {
      await addBusiness(userSub, businessInfo);
      return true;
    } else if (val.length !== 0 && !val[0].userSub) {
      await updateBusiness(val[0], userSub);
      return true;
    }
  };
  const handleChange = (e) => {
    setFirstNameError(false);
    setFirstError(false);
    setPhoneError(false);
    setEmailError(false);
    setPasswordError(false);
    setError(false);
    setCodeError(false);
    setLocError(false);
    setLoader(false);
    setEmptyCodeError(false);
    setPhoneLong(false);
    setPhoneShort(false);
    setPhoneOnlyNumbers(false);
    if (e.target.id === "username") {
      setUser(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    } else if (e.target.id === "phoneNumber") {
      setPhoneNumber(e.target.value);
    } else if (e.target.id === "email") {
      setEmail(e.target.value.trim());
    } else if (e.target.id === "confirmationCode") {
      setconfirmationCode(e.target.value);
    } else if (e.target.id === "location") {
      setName("");
      setBusinessInfo("");
      setLoc(e.target.value);
    }
  };

  return (
    <>
      {loginValue === true ? (
        <Wrapper
          type={type}
          page="register"
          welcomeMessage={
            type.includes("business")
              ? renderMessage.New_Reg
              : renderMessage.New_Reg_Consumer
          }
        >
          <RegisterForm
            type={type}
            err={err}
            firstError={firstError}
            passwordError={passwordError}
            loader={loader}
            message={message}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            verified={verified}
            business={business}
            setbusiness={setbusiness}
            setBusinessInfo={setBusinessInfo}
            setName={setName}
            codeError={codeError}
            firstNameError={firstNameError}
            phoneError={phoneError}
            emailError={emailError}
            locationError={locationError}
            emptyCode={emptyCode}
            phoneLong={phoneLong}
            phoneShort={phoneShort}
            password={password}
            disable={disable}
            phoneOnlyNumbers={phoneOnlyNumbers}
          />
        </Wrapper>
      ) : (
        <div style={{ textAlign: "center", margin: " 40px auto 0" }}>
          <ValueLoader />
        </div>
      )}
    </>
  );
};

export default Register;
