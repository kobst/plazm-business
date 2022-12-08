import React, {useState, useEffect} from 'react';
import {Auth} from 'aws-amplify';
import {useHistory} from 'react-router-dom';

import Wrapper from '@components/Login-Register/Wrapper';
import ForgotPasswordForm from '@components/Login-Register/Form-Components/Forgot-Password-Form';
import ValueLoader from '@utils/loader';
import './style.css';
import {getMessage} from '../../config';
import {validateEmail, validatePassword} from './helper';

const renderMessage = getMessage();

const initialUserDetailsState = {
  email: '',
  password: '',
  confirmPassword: '',
};

const initialErrorsState = {
  email: '',
  password: '',
  verification: '',
  new_password: '',
  confirmPass: '',
  code: '',
  email: '',
  emError: '',
};

const ForgotPassword = ({match}) => {
  const history = useHistory();

  const isNewPasswordPage = Object.keys(match.params).length;
  const type = match.url;

  const [userDetails, setUserDetails] = useState(initialUserDetailsState);
  const [errors, setErrors] = useState(initialErrorsState);
  const [emailSent, setEmailSent] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isAlreadyAuthenticated, setIsAlreadyAuthenticated] = useState(false);

  const {email, password, confirmPassword} = userDetails;

  useEffect(() => {
    const updateUser = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        history.push('/');
      } catch (err) {
        setIsAlreadyAuthenticated(true);
      }
    };
    updateUser();
  }, []);

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    setLoader(true);
    const errors = validateEmail(email);
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    Auth.forgotPassword(email)
        .then(() => setEmailSent(true))
        .catch(() =>
          setErrors((prevState) => ({
            ...prevState,
            email: renderMessage.Email_Err,
          }))
        );
    e.target.reset();
    setLoader(false);
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    const errors = validatePassword({
      password,
      confirmPassword,
    });
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    Auth.forgotPasswordSubmit(match.params.id, match.params.code, password)
        .then(() => {
          if (type.includes('business')) {
            history.push(`/business/login`);
          } else {
            history.push(`/consumer/login`);
          }
        })
        .catch(() =>
          setErrors((prevState) => ({
            ...prevState,
            verification: renderMessage.Email_Err,
          }))
        );
  };

  const handleChangeDetails = (e) => {
    const {value, id} = e.target;
    setErrors(initialErrorsState);
    setLoader(false);
    const updatedDetails = Object.assign({}, userDetails);
    updatedDetails[id] = value;
    setUserDetails(updatedDetails);
  };

  if (!isAlreadyAuthenticated) {
    return (
      <div style={{textAlign: 'center', margin: ' 40px auto 0'}}>
        <ValueLoader />
      </div>
    );
  }

  return (
    <Wrapper
      type={type}
      page="forgot"
      heading={renderMessage.Reset}
      welcomeMessage={email ? renderMessage.Res_Message : renderMessage.Email_Msg}
    >
      <ForgotPasswordForm
        loader={loader}
        type={type}
        emailSent={emailSent}
        password={userDetails.password}
        errors={errors}
        isNewPasswordPage={isNewPasswordPage}
        onChangeDetails={handleChangeDetails}
        onSubmitEmail={handleSubmitEmail}
        onSubmitPassword={handleSubmitPassword}
      />
    </Wrapper>
  );
};

export default ForgotPassword;
