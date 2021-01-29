import React, { useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import SaveButton from "../UI/SaveButton";
import BackButton from "../UI/BackButton";
import { Formik } from "formik";
import * as Yup from "yup";
import FormBody from "./formBody";
import error from "../../../constants";
import { Auth } from "aws-amplify";
import ValueLoader from "../../../utils/loader";

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
`;

// validation schema
const validate = {
  oldPassword: Yup.string()
    .matches(/^.{6,}$/, error.PASSWORD_MISMATCH)
    .required(error.REQUIRED),
  newPassword: Yup.string()
    .matches(/^.{6,}$/, error.PASSWORD_MISMATCH)
    .required(error.REQUIRED),
  confirmPassword: Yup.string()
    .matches(/^.{6,}$/, error.PASSWORD_MISMATCH)
    .oneOf([Yup.ref("newPassword"), null], error.BOTH_PASSWORD_UNMATCH)
    .required(error.REQUIRED),
};

/*
@desc: change password component
@params: setChangePassword (to display change password component or edit profile component)
*/
const ChangePassword = ({ setChangePassword }) => {
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  return (
    <>
      <ChangePasswordContent>
        <CloseDiv>
          <IoMdClose />
        </CloseDiv>
        <MainHeading>Change Password</MainHeading>
        <FormContainer>
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            /*validation schema */
            validationSchema={Yup.object(validate)}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values) => {
              /*change password */
              Auth.currentAuthenticatedUser()
                .then((user) => {
                  return Auth.changePassword(
                    user,
                    values.oldPassword,
                    values.newPassword
                  );
                })
                .then((data) => {
                  setLoader(true);
                  setError("");
                  setTimeout(() => {
                    setLoader(false);
                    setError("");
                  }, 2000);
                })
                .catch((err) => {
                  setLoader(true);
                  setError("");
                  setTimeout(() => {
                    setLoader(false);
                    setError("There was an error.  Please try again!");
                  }, 10000);
                });
            }}
          >
            {(formik) => (
              <form
                onSubmit={formik.handleSubmit}
                method="POST"
                className="login-form"
              >
                {/* form body */}
                <FormBody />
                {/* display error message */}
                {error !== "" ? <ErrorDiv>{error}</ErrorDiv> : <></>}

                {/* change password btn */}
                <BottomBtns>
                  <BackButton onClick={() => setChangePassword(false)}>
                    Back
                  </BackButton>
                  <SaveButton type="submit" disabled={loader}>
                    {loader ? <ValueLoader /> : "Save"}
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
