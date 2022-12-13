import React, {useState} from 'react';
import styled from 'styled-components';
import {IoMdClose} from 'react-icons/io';
import SaveButton from '../UI/SaveButton';
import BackButton from '../UI/BackButton';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FormBody from './formBody';
import error from '../../../constants';
import {Auth} from 'aws-amplify';
import ValueLoader from '../../../utils/loader';

const ChangePasswordContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const MainHeading = styled.h1`
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
  margin: 48px 0 0;
  padding: 0 0 13px 23px;
  border-bottom: 0.5px dashed #ffffff;
  @media (max-width: 767px) {
    font-size: 16px;
    padding: 0 0 13px 20px;
  }
`;
const CloseDiv = styled.div`
  width: 24px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 17px;
  cursor: pointer;
  top: 17px;
  svg {
    font-size: 24px;
    color: #fff;
  }
`;

const FormContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    padding: 20px;
  }
`;
const BottomBtns = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0;
`;

const ErrorDiv = styled.div`
  color: #ff0000;
  font-weight: 600;
  font-size: 12px;
  margin: 0;
`;

// validation schema
const validate = {
  oldPassword: Yup.string()
      .matches(/^.{6,}$/, error.PASSWORD_LENGTH_MISMATCH)
      .required(error.REQUIRED),
  newPassword: Yup.string()
      .matches(/^.{6,}$/, error.PASSWORD_LENGTH_MISMATCH)
      .required(error.REQUIRED),
  confirmPassword: Yup.string()
      .matches(/^.{6,}$/, error.PASSWORD_LENGTH_MISMATCH)
      .oneOf([Yup.ref('newPassword'), null], error.PASSWORD_MISMATCH)
      .required(error.REQUIRED),
};

/*
@desc: change password component
@params: setDisplayChangePassword (to display change password component or edit profile component)
*/
const ChangePassword = ({setDisplayChangePassword, setDisplayTab}) => {
  const [formError, setFormError] = useState('');
  const [response, setResponse] = useState('');
  const [loader, setLoader] = useState(false);

  /*
  @desc: update password function
  @params: form values
  */
  const updatePassword = (values) => {
    setLoader(true);
    Auth.currentAuthenticatedUser()
        .then((user) => {
          return Auth.changePassword(
              user,
              values.oldPassword,
              values.newPassword,
          );
        })
        .then((data) => {
          setLoader(false);
          setFormError('');
          setResponse(error.PASSWORD_UPDATED_SUCCESSFULLY);
        })
        .catch((err) => {
          setLoader(false);
          setResponse('');
          if (err.message === 'Incorrect username or password.') {
            setFormError(error.INCORRECT_OLD_PASSWORD);
          } else {
            setFormError(err.message);
          }
        });
  };

  /** back to profile settings screen function */
  const backFunction = (e) => {
    e.preventDefault();
    setDisplayChangePassword(false);
  };
  return (
    <>
      <ChangePasswordContent>
        <CloseDiv>
          <IoMdClose onClick={()=>setDisplayTab(false)} />
        </CloseDiv>
        <MainHeading>Change Password</MainHeading>
        <FormContainer>
          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            /* validation schema */
            validationSchema={Yup.object(validate)}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values) => {
              /* update password function call*/
              updatePassword(values);
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit} method="POST">
                {/* form body */}
                <FormBody formError={formError} setResponse={setResponse}/>
                {/* display error message */}
                {response !== '' ? <ErrorDiv>{response}</ErrorDiv> :
                 formError !== error.INCORRECT_OLD_PASSWORD? <ErrorDiv>{formError}</ErrorDiv>:null}

                {/* change password btn */}
                <BottomBtns>
                  <BackButton onClick={(e) => backFunction(e)} disabled={loader}>
                    Back
                  </BackButton>
                  <SaveButton type="submit" disabled={loader}>
                    {loader ? <ValueLoader /> : 'Save'}
                  </SaveButton>
                </BottomBtns>
              </form>
            )}
          </Formik>
        </FormContainer>
      </ChangePasswordContent>
    </>
  );
};

export default ChangePassword;
