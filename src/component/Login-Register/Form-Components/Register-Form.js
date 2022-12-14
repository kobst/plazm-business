import React from 'react';
import {Link} from 'react-router-dom';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import ValueLoader from '../../../utils/loader';
import Label from '../../UI/Label/label';
import PasswordStrengthMeter from '../../PasswordStrenthMeter/PasswordStrengthMeter';

import {
  FormGroup,
  FindYourBusinessWrapper,
  ErrorMessage,
  TermsWrap,
} from '../Wrapper/style';
import SocialLogin from './Social-Login';

const RegisterForm = ({
  verified,
  disable,
  err,
  confirmationCode,
  password,
  phoneLong,
  phoneShort,
  firstError,
  emptyCode,
  business,
  loader,
  setbusiness,
  setBusinessInfo,
  setName,
  message,
  type,
  locationError,
  codeError,
  firstNameError,
  phoneError,
  emailError,
  passwordError,
  handleChange,
  handleSubmit,
  phoneOnlyNumbers,
}) => {
  return (
    <>
      {verified ? (
        <form>
          <>
            <p className="code">
              {' '}
              We have send you a verification link on your registered email,
              Please Verify your email then you can Click on Sign In to login
              into the Plazm{' '}
            </p>
            {type.includes('business') ? (
              <Link to="/business/login" className="link-btn">
                <strong>Sign In</strong>
              </Link>
            ) : (
              <Link to="/consumer/login" className="link-btn">
                <strong>Sign In</strong>
              </Link>
            )}
          </>
        </form>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormGroup>
            <Label
              name={type.includes('business') ? 'Business Name' : 'Name'}
            />
            <Input
              disabled={disable}
              type="text"
              id="username"
              onChange={(e) => handleChange(e)}
              error={firstNameError}
              placeholder=""
            />
            {firstError ? (
              <ErrorMessage>
                Username length should be greater than 3.
              </ErrorMessage>
            ) : null}
          </FormGroup>

          <FormGroup>
            <Label name="Phone Number" />
            <Input
              disabled={disable}
              id="phoneNumber"
              onChange={(e) => handleChange(e)}
              error={phoneError}
              placeholder=""
            />
            {phoneOnlyNumbers ? (
              <ErrorMessage>
                Phone Number should only contain numbers.
              </ErrorMessage>
            ) : null}
            {phoneShort ? (
              <ErrorMessage>
                Phone Number length should be greater than 5.
              </ErrorMessage>
            ) : null}
            {phoneLong ? (
              <ErrorMessage>
                Phone Number length should be less than 50.
              </ErrorMessage>
            ) : null}
            {err && message && message.includes('number') ? (
              <ErrorMessage>{message}</ErrorMessage>
            ) : null}
          </FormGroup>

          <FormGroup>
            <Label name="Email Address" />
            <Input
              disabled={disable}
              type="text"
              id="email"
              onChange={(e) => handleChange(e)}
              error={emailError}
              placeholder=""
            />
            {err && message && message.includes('exists') ? (
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
              placeholder=""
            />
            <PasswordStrengthMeter password={password} />
            {err && message && message.includes('Password') ? (
              <ErrorMessage>{message}</ErrorMessage>
            ) : null}
          </FormGroup>

          <FindYourBusinessWrapper>
            <TermsWrap>
              <label className="container">
                I accept the Terms & Conditions
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
              <p>
                By clicking sign up, I represent I have read, understand, and agree
                to the Postmates Privacy Policy and Terms of Service. This site is
                protected bt reCAPTCHA and google Privacy Policy and Terms of Service apply.
              </p>
            </TermsWrap>
          </FindYourBusinessWrapper>

          <Button type="submit" className="btnRegister">
            {loader && !message ? <ValueLoader /> : 'Sign Up'}
          </Button>

          <SocialLogin />
        </form>
			)}
    </>
  );
};

export default RegisterForm;
