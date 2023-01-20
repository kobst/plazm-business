import React from "react";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import ValueLoader from "../../../utils/loader";
import { getMessage } from "../../../config";
import Label from "../../UI/Label/label";

import { FormGroup, ErrorMessage } from "../Wrapper/style";
import SocialLogin from "./Social-Login";

const renderMessage = getMessage();
const LoginForm = ({
  type,
  disable,
  userError,
  error,
  passwordError,
  loader,
  message,
  handleChange,
  handleSubmit,
}) => {
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormGroup>
          <Label name="Email ID" />
          <Input
            disabled={disable}
            type="text"
            id="username"
            onChange={(e) => handleChange(e)}
            error={userError}
          />
          {error &&
          (message === "User does not exist." ||
            message === "Invalid Email") ? (
            <ErrorMessage>{message}</ErrorMessage>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label name="Password" />
          <Input
            disabled={disable}
            type="password"
            id="password"
            onChange={(e) => handleChange(e)}
            error={passwordError}
          />
          {error &&
          message !== "User does not exist." &&
          message !== "Invalid Email" ? (
            <ErrorMessage>{message}</ErrorMessage>
          ) : null}
        </FormGroup>
        <FormGroup>
          <label className="switch">
            <input type="checkbox" />
            <span></span>
          </label>
          <div className="RememberMeLabel">Remember Me</div>
        </FormGroup>
        <Button type="submit" className="btn btn-primary">
          {loader && !message ? <ValueLoader /> : renderMessage.Log}
        </Button>

        <SocialLogin />
      </form>
    </>
  );
};

export default LoginForm;
