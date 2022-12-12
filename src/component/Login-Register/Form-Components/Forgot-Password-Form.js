import React from 'react';
import styled from 'styled-components';
import Links from '../../UI/Link/Link';
import {Link} from 'react-router-dom';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import ValueLoader from '../../../utils/loader';
import {getMessage} from '../../../config';
import Label from '../../UI/Label/label';
import PasswordStrengthMeter from '../../PasswordStrenthMeter/PasswordStrengthMeter';

const FormGroup = styled.div`
  margin-bottom: 22px;
  position: relative;
  h6 {
    color: red;
  }
  h5 {
    color: green;
  }
`;
const ErrorMessage = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  text-align: right;
  color: #ff7171;
  position: absolute;
  right: 0;
  bottom: -25px;
`;

const renderMessage = getMessage();

const ForgotPasswordForm = ({
  isNewPasswordPage,
  emailSent,
  password,
  errors,
  type,
  con,
  loader,
  onChangeDetails,
  onSubmitEmail,
  onSubmitPassword,
}) => {
  if (isNewPasswordPage) {
    return (
      <form onSubmit={onSubmitPassword}>
        <FormGroup>
          <Label name="New Password" />
          <Input
            type="password"
            id="password"
            error={errors.password}
            onChange={onChangeDetails}
          />
          <PasswordStrengthMeter password={password} />
        </FormGroup>
        <FormGroup>
          <Label name="Confirm Password" />
          <Input
            type="password"
            id="confirmPassword"
            error={errors.confirmPassword}
            onChange={onChangeDetails}
          />
          {errors.password && (
            <ErrorMessage> {renderMessage.Pass_Err}</ErrorMessage>
          )}
          {/* //ToDo: Show success message when password is successfully changed.  */}
          {/* {isPasswordChanged && <SuccessMessage> {renderMessage.con} </SuccessMessage>} */}
        </FormGroup>
        <Button type="submit" className="btn btn-primary">
          {renderMessage.Reset}
        </Button>
      </form>
    );
  }
  return (
    <form onSubmit={onSubmitEmail}>
      {emailSent ? (
        <p className="code">
          {' '}
          We have send you a Reset Password link on your registered email,
          Please click on the reset link to reset your password.{' '}
        </p>
      ) : (
        <>
          <FormGroup>
            <Label name="Email address" />
            <Input
              type="text"
              id="email"
              onChange={onChangeDetails}
              error={errors.email}
            />
            {errors.email && (
              <ErrorMessage>{renderMessage.Email_Err}</ErrorMessage>
            )}
          </FormGroup>
          <Button type="submit" className="btn btn-primary">
            {loader && !errors.email ? <ValueLoader /> : 'Reset'}
          </Button>

          <Links>
            {type.includes('business') ? (
              <Link to="/business/login" className="link-btn">
                {renderMessage.Log_Link}
              </Link>
            ) : (
              <Link to="/consumer/login" className="link-btn">
                {renderMessage.Log_Link}
              </Link>
            )}
          </Links>
        </>
      )}
    </form>
  );
};

export default ForgotPasswordForm;
