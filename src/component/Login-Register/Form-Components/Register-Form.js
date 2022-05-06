import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import SearchLocationInput from '../../../utils/findYourBusiness';
import ValueLoader from '../../../utils/loader';
import Label from '../../UI/Label/label';
import PasswordStrengthMeter from '../../PasswordStrenthMeter/PasswordStrengthMeter';

const FormGroup = styled.div`
  margin-bottom: 22px;
  position: relative;
  h6 {
    color: red;
  }

  @media (max-width: 899px) {
    margin-bottom: 25px;
  }
`;
const FindYourBusinessWrapper = styled.div`
  h2 {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #280a33;
  }
  p {
    font-size: 11px;
    line-height: 10px;
    margin: 20px 0 30px;
    color: #000;
    line-height: 14px;
  }
`;
const ErrorMessage = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  text-align: right;
  color: #ff7171;
  position: relative;
  right: 0;
  margin-top: 6px;
`;

function RegisterForm({
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
}) {
  return (
    <>
      {verified ? (
        <form>
          <p className="code">
            {' '}
            We have send you a verification link on your registered email,
            Please Verify your email then you can Click on Sign In to login into
            the Plazm{' '}
          </p>

          {/* <FormGroup>
                            <Label name="Confirmation Code" />
                            <Input value={confirmationCode} id='confirmationCode' type='text' onChange={(e) => handleChange(e)} error={emptyCode} />
                            {codeError ? <ErrorMessage>Confirmation code does not match</ErrorMessage> : null}
                        </FormGroup> */}
          {type.includes('business') ? (
            <Link to="/business/login" className="link-btn">
              <strong>Sign In</strong>
            </Link>
          ) : (
            <Link to="/consumer/login" className="link-btn">
              <strong>Sign In</strong>
            </Link>
          )}
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
              id="phone_number"
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
            {type.includes('business') ? (
              <>
                <h2 onClick={() => setbusiness(true)}> Find Your Business</h2>
                <FormGroup>
                  <SearchLocationInput
                    disabled={disable}
                    id="location"
                    error={locationError}
                    handleChange={handleChange}
                    setBusinessInfo={setBusinessInfo}
                    setName={setName}
                  />
                </FormGroup>
              </>
            ) : null}
            {err && message && message.includes('business') ? (
              <ErrorMessage>{message}</ErrorMessage>
            ) : null}
            <p>
              By clicking sign up, I represent I have read, understand, and
              agree to the Postmates Privacy Policy and Terms of Service. This
              site is protected bt reCAPTCHA and google Privacy Policy and Terms
              of Service apply.
            </p>
          </FindYourBusinessWrapper>

          <Button type="submit" maxWidth="183px" className="btnRegister">
            {loader && !message ? <ValueLoader /> : 'Sign Up'}
          </Button>
        </form>
      )}
    </>
  );
}

export default RegisterForm;
